#!/usr/bin/env node
/**
 * Global FX Cart — $99 Beach Golf Cart Rental Content Generator
 * Publishes a fresh article 3x daily via cron. Each run:
 *   - Creates a new article HTML page
 *   - Wires it into data.js (blogPosts or reviews)
 *   - Updates blog.html ItemList JSON-LD
 *   - Adds the page to sitemap.xml
 *   - Writes a report to reports/
 *   - Commits & pushes to GitHub so Pages deploys automatically
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync, execFileSync } = require('child_process');

const SITE_DIR = __dirname;
const DATA_FILE = path.join(SITE_DIR, 'data.js');
const BLOG_FILE = path.join(SITE_DIR, 'blog.html');
const CLUB_FILE = path.join(SITE_DIR, 'golf-clubs.html');
const SITEMAP_FILE = path.join(SITE_DIR, 'sitemap.xml');
const STATE_FILE = path.join(SITE_DIR, '.blog-state.json');
const REPORTS_DIR = path.join(SITE_DIR, 'reports');
const LOCK_FILE = path.join(SITE_DIR, '.generator.lock');
const LOCK_STALE_MS = 10 * 60 * 1000; // a lock older than 10 min is considered stale

const PHONE = '(850) 299-8575';
const PHONE_TEL = 'tel:8502998575';
const BASE = 'https://www.globalfxcart.com';

/* ------------------------------------------------------------------ */
/* Content bank — rotate through these so every post is unique         */
/* ------------------------------------------------------------------ */

const BLOG_TOPICS = [
  {
    slug: '99-destin-golf-cart-rental-best-deal',
    title: 'Why the $99/Day Golf Cart Rental Is the Best Deal in Destin, FL',
    excerpt: 'At $99/day with free delivery on 4+ days, our brand new street-legal golf carts are the smartest way to explore Destin and Miramar Beach this summer.',
    image: 'images/cart-4seat.webp',
    intro: 'Vacationers ask us the same question every week: is a golf cart rental really the best way to get around Destin, FL? The short answer is yes — especially at $99/day. Here\u2019s why the deal works, what you get, and how to book.',
    sections: [
      ['Parking Is the Real Cost', 'Beach parking in Destin and Miramar Beach can run $30\u2013$50 a day in peak season \u2014 before you even pay for a rental car, insurance, and gas. A golf cart fits in spaces cars can\u2019t, so the $99/day price effectively replaces your biggest vacation headache.'],
      ['Brand New, Street-Legal, Delivered', 'Every cart in our fleet is brand new and fully street legal, with headlights, seat belts, and turn signals. We deliver to your condo, vacation rental, or hotel anywhere in Destin or Miramar Beach \u2014 free on rentals of 4 days or more \u2014 and pick it back up when you\u2019re done.'],
      ['One Cart, Every Stop', 'From Henderson Beach State Park to Crab Island and the Destin Harbor Boardwalk, a cart gets you door-to-door. No shuttles, no parking fees, no waiting.'],
    ],
    faqs: [
      ['Is the $99/day price real?', 'Yes. Brand new 4-seat carts start at $99/day, 6-seat Land Rover style carts are $149/day, and 8-seat carts are $199/day, with free delivery on rentals of 4 days or more.'],
      ['Do I need a driver\u2019s license?', 'Renters must be 18 or older with a valid driver\u2019s license. We include a quick orientation with every rental.'],
    ],
  },
  {
    slug: 'miramar-beach-golf-cart-rental-99',
    title: 'Renting a Golf Cart in Miramar Beach for $99/Day: What to Expect',
    excerpt: 'Planning a Miramar Beach vacation? Here\u2019s exactly how the $99/day golf cart rental works \u2014 booking, delivery, what\u2019s included, and what to bring.',
    image: 'images/rover-xl6-white.jpg',
    intro: 'Miramar Beach is made for golf carts. Wide boulevards, beach access points, and restaurants just off Emerald Coast Parkway \u2014 a cart at $99/day turns the whole area into your playground. Here\u2019s what to expect.',
    sections: [
      ['Booking Takes Two Minutes', 'Call or text ' + PHONE + '. We\u2019ll confirm availability, arrange delivery to your rental address, and have the cart charged and ready when you arrive. Peak-season dates go fast, so book early.'],
      ['Delivered Charged and Ready', 'Your cart arrives fully charged with a quick orientation and safety walkthrough. When your rental ends, we pick it up right from your door \u2014 you never have to return it anywhere.'],
      ['The Miramar Beach Loop', 'Cruise Scenic Gulf Drive, stop at beach access points, grab lunch at a bayside restaurant, and be back for sunset. Everything is within a short ride.'],
    ],
    faqs: [
      ['Where does delivery cover?', 'We deliver throughout Miramar Beach and Destin, FL. Delivery is free on rentals of 4 days or more; for shorter bookings call ' + PHONE + '.'],
      ['Can I rent for a week?', 'Yes \u2014 most visitors rent for a week or longer. Weekly rates include free delivery and save versus paying daily.'],
    ],
  },
  {
    slug: 'free-golf-cart-delivery-destin',
    title: 'Free Golf Cart Delivery in Destin & Miramar Beach: How It Works',
    excerpt: 'Delivery and pickup to your door \u2014 free on rentals of 4 days or more. Here\u2019s how Destin golf cart delivery works from booking to pickup.',
    image: 'images/cart-8seat.jpg',
    intro: 'One of the best parts of renting from Destin Golf Cart Rentals & Sales is that the cart comes to you. No rental counters, no trailers, no logistics \u2014 just a brand new street-legal cart delivered to your door.',
    sections: [
      ['We Bring It to Your Condo or Vacation Rental', 'Tell us where you\u2019re staying \u2014 a condo on Scenic Gulf Drive, a vacation rental near Henderson Beach, a hotel along Emerald Coast Parkway. We deliver anywhere in Destin and Miramar Beach, free on rentals of 4 days or more.'],
      ['Charged, Cleaned, Ready to Ride', 'Every cart is delivered fully charged with headlights, seat belts, and turn signals in working order. We run through a quick orientation so you\u2019re comfortable before we leave.'],
      ['We Pick It Back Up', 'When your rental ends, just leave the cart where we dropped it. We handle pickup \u2014 you never chase a return location on your last vacation day.'],
    ],
    faqs: [
      ['Is delivery really free?', 'Delivery and pickup are free on rentals of 4 days or more anywhere in Destin and Miramar Beach, FL. For shorter bookings, call ' + PHONE + ' for options.'],
      ['How far in advance should I book?', 'Peak-season weekends book out early. We recommend reserving as soon as your travel dates are set.'],
    ],
  },
  {
    slug: 'what-to-pack-golf-cart-beach-day',
    title: 'What to Pack for a Golf Cart Beach Day in Destin, FL',
    excerpt: 'Sunscreen, towels, a cooler, and a charger plan \u2014 our packing list for the perfect $99/day golf cart beach day in Destin and Miramar Beach.',
    image: 'images/cart-4seat.webp',
    intro: 'A golf cart makes packing for the beach easy \u2014 but a little planning makes it perfect. Here\u2019s our go-to list for a full day of cruising Destin and Miramar Beach.',
    sections: [
      ['The Essentials', 'Sunscreen (reapply!), towels, water, and snacks. Our carts have storage, so load up \u2014 no more hauling gear across a hot parking lot.'],
      ['Cooler and Beach Gear', 'Most of our carts have room for a small cooler. Chairs and an umbrella ride comfortably in the back, and beach access points are minutes from anywhere in Miramar Beach.'],
      ['Charge Smart', 'A full charge covers a full day of local driving. For longer outings, plan a midday break \u2014 your cart will be ready when you are.'],
    ],
    faqs: [
      ['Do the carts have storage?', 'Yes \u2014 our carts include storage areas for coolers, chairs, and beach gear.'],
      ['How far can I drive on a charge?', 'A full charge covers a full day of normal touring in Destin and Miramar Beach.'],
    ],
  },
  {
    slug: 'golf-cart-rental-vs-car-destin-cost',
    title: 'Golf Cart vs. Rental Car in Destin: The Real Cost Breakdown',
    excerpt: 'Rental car, parking, gas, insurance \u2014 or one $99/day golf cart. We compare the true cost of getting around Destin, FL this summer.',
    image: 'images/cart-8seat.jpg',
    intro: 'Before you book that rental car for your Destin trip, run the numbers. Between daily car rental rates, beach parking fees, and gas, a $99/day golf cart is often the cheaper \u2014 and more fun \u2014 choice.',
    sections: [
      ['The Hidden Costs of a Rental Car', 'Rental car fees, airport surcharges, insurance add-ons, and peak-season parking that can hit $50/day in Destin. It adds up fast.'],
      ['What $99/Day Buys You', 'A brand new street-legal golf cart, delivered and picked up at your door, with free delivery on 4+ day rentals. No parking fees \u2014 carts fit almost anywhere.'],
      ['When You Do Need a Car', 'For long-distance trips like an airport run or a day in Panama City, a car makes sense. For everything else on vacation, the cart wins.'],
    ],
    faqs: [
      ['Is a golf cart street legal in Destin?', 'Yes. All of our carts are street-legal LSVs with headlights, seat belts, and turn signals, permitted on most Destin and Miramar Beach roads.'],
      ['Which is better for a week-long stay?', 'For a week in Destin or Miramar Beach, most families find the golf cart is the best value, with free delivery on 4+ day rentals.'],
    ],
  },
  {
    slug: 'destin-golf-cart-rental-tips-first-timers',
    title: '8 Tips for First-Time Golf Cart Renters in Destin, FL',
    excerpt: 'New to golf cart rentals? Follow these 8 tips to get the most from your $99/day cart in Destin and Miramar Beach \u2014 from booking to your first cruise.',
    image: 'images/rover-xl6-white.jpg',
    intro: 'Renting a golf cart for the first time? It\u2019s easy \u2014 and these tips will make your $99/day rental even better.',
    sections: [
      ['Book Before You Fly', 'Peak season sells out. Reserve as soon as your dates are set and we\u2019ll have your cart waiting.'],
      ['Pick the Right Cart', '4-seat carts are perfect for couples and small families; go 6- or 8-seat for bigger groups. We\u2019ll help you choose when you call.'],
      ['Plan Your Route', 'Map your must-see spots \u2014 Henderson Beach, Crab Island, the Harbor Boardwalk \u2014 then cruise at your own pace.'],
      ['Charge Overnight', 'Plug in when you get back and your cart is ready for a full day tomorrow.'],
    ],
    faqs: [
      ['Is there an age requirement?', 'Renters must be 18 or older with a valid driver\u2019s license.'],
      ['What if I need help on the road?', 'Call us at ' + PHONE + ' \u2014 we\u2019re local and happy to help with any question during your rental.'],
    ],
  },
];

const REVIEW_TOPICS = [
  {
    slug: '99-rental-review-family-miramar-beach',
    title: 'Rental Review: Our $99/Day Golf Cart in Miramar Beach Was the Highlight',
    excerpt: '\u201cWe rented a 4-seat cart for the week and it made the whole trip.\u201d A real customer\u2019s experience with the $99/day Miramar Beach golf cart rental.',
    image: 'images/cart-4seat.webp',
    intro: 'A family shares how a $99/day golf cart rental turned their Miramar Beach vacation from good to unforgettable.',
    body: 'From the moment the cart was delivered to our rental \u2014 free, on time, fully charged \u2014 it was clear this was the move. Parking was a breeze everywhere, the kids loved the ride, and we hit beach access points and restaurants we would have skipped in a car. Worth every penny of the $99/day.',
    rating: 5,
  },
  {
    slug: '99-rental-review-crab-island-destin',
    title: 'Rental Review: The $99/Day Cart That Got Us to Crab Island',
    excerpt: 'Crab Island trips, sunset cruises, and zero parking fees \u2014 one customer\u2019s week with the $99/day Destin golf cart rental.',
    image: 'images/rover-xl6-white.jpg',
    intro: 'Destin\u2019s best day trips are all a short ride from your door when you\u2019ve got a cart. Here\u2019s how one week went.',
    body: 'We booked the 4-seater for a full week. Delivery to our condo was free and the cart was spotless. We hit Crab Island, the Harbor Boardwalk, and dinner spots all week \u2014 never once paid for parking. The staff were great on the phone, and pickup at the end was just as easy. Highly recommend.',
    rating: 5,
  },
  {
    slug: '99-rental-review-weekly-stay-destin',
    title: 'Rental Review: A Week-Long $99/Day Golf Cart Rental in Destin, FL',
    excerpt: 'Free delivery on 4+ days, a brand new street-legal cart, and a full week of adventure \u2014 our review of the weekly Destin golf cart rental.',
    image: 'images/cart-8seat.jpg',
    intro: 'Longer stay, better value. A weekly rental test-drive of the Destin golf cart experience.',
    body: 'For a 7-night stay, the weekly rate with free delivery was a no-brainer. The cart came charged and ready, the orientation took five minutes, and we were cruising the Emerald Coast by lunch. Seats were comfortable, storage was plenty, and the street-legal setup meant we could go anywhere. Best value of the whole trip.',
    rating: 5,
  },
];

const CLUB_BLOG_TOPICS = [
  {
    slug: 'club-best-golf-clubs-for-beginners',
    title: 'Best Golf Clubs for Beginners in 2026: Complete Sets That Make Learning Easier',
    excerpt: 'Complete golf club sets are the fastest way to start playing. Here are the best golf clubs for beginners in 2026 and how to choose your first set.',
    keywords: 'best golf clubs for beginners, complete golf club sets, beginner golf clubs, golf club sets for beginners, first golf club set, golf clubs for new golfers, beginner golf equipment',
    image: 'images/cart-4seat.webp',
    intro: 'Buying your first set of golf clubs should be simple \u2014 and with complete golf club sets, it is. A boxed set with driver, fairway woods, hybrids, irons, wedges, putter, and a stand bag gets you on the course for far less than building a bag club by club. Here\u2019s how to pick the best golf clubs for beginners in 2026.',
    sections: [
      ['Start With a Complete Set', 'Complete sets bundle every club you need in one box, usually under $500. They include forgiving drivers and hybrids that make launch easier \u2014 ideal for new golfers who want to have fun from the first round.'],
      ['Look for Forgiveness', 'Beginners need game-improvement clubs: bigger sweet spots, perimeter weighting, and higher loft. That means more consistent contact and more balls that actually fly toward the target.'],
      ['Shaft Flex Matters', 'Most beginners do best with regular or senior flex graphite shafts \u2014 lighter and more flexible, they help generate clubhead speed without extra effort.'],
      ['Don\u2019t Overlook the Putter and Bag', 'A good putter and a lightweight stand bag make every practice session easier. Most complete sets include both, which is another reason to start there.'],
    ],
    faqs: [
      ['How much should a beginner spend on golf clubs?', 'A quality complete set runs $300\u2013$600. That covers all the clubs you need, a bag, and often headcovers \u2014 the best value in golf for a new player.'],
      ['Are complete golf club sets any good?', 'Yes. Modern boxed sets from major brands are genuinely playable and far more forgiving than older starter sets. They are the smartest first purchase for most beginners.'],
      ['Should I rent golf clubs instead of buying?', 'If you are just trying the sport, rental clubs at the course are fine. Once you are hooked, your own set (or a rental cart to carry it) makes every round better.'],
    ],
  },
  {
    slug: 'club-how-to-choose-golf-clubs',
    title: 'How to Choose Golf Clubs: A Complete Buying Guide for 2026',
    excerpt: 'Forgiveness, shafts, grips, budget \u2014 here is exactly how to choose golf clubs that match your swing and skill level in 2026.',
    keywords: 'how to choose golf clubs, golf club buying guide, golf club fitting, choose golf clubs for my swing, golf club shaft flex, steel vs graphite shafts, golf club grips, golf club loft, forgiving golf clubs',
    image: 'images/rover-xl6-white.jpg',
    intro: 'Choosing golf clubs used to mean getting fitted by a pro. Today, a few simple rules of thumb get you 90% of the way there. This golf club buying guide walks through forgiveness, shaft flex, grip size, and budget so you can buy with confidence.',
    sections: [
      ['Match Clubs to Your Skill Level', 'High handicappers and beginners should prioritize forgiveness; low handicaps can chase workability and feel. If in doubt, lean forgiving \u2014 it lowers scores faster.'],
      ['Pick the Right Shaft Flex', 'Shaft flex is about swing speed: seniors and most women use senior or ladies flex, average men use regular, and fast swingers use stiff. Graphite is lighter and more comfortable; steel offers more control.'],
      ['Get Grip Size Right', 'Grips that are too small or too big cause hooks and slices. A good rule: the grip should sit in your fingers with a little slack, not dig into your palm.'],
      ['Set a Budget and Stick to It', 'Great sets exist at every price point. Decide what you will actually play \u2014 a $400 complete set beats a $1,500 partial bag that sits in the garage.'],
    ],
    faqs: [
      ['Do I need a professional club fitting?', 'A fitting helps once your swing is consistent \u2014 usually after your first season. Beginners benefit most from the simple rules above and a good complete set.'],
      ['What is the difference between steel and graphite shafts?', 'Graphite is lighter, absorbs vibration, and suits slower swing speeds; steel is heavier and offers more control for stronger players. Most beginners prefer graphite.'],
      ['What loft should a beginner driver have?', 'Higher loft (10.5\u00b0\u201312\u00b0) helps beginners get the ball airborne. Lower lofts (8\u00b0\u20139\u00b0) suit faster, more consistent swings.'],
    ],
  },
  {
    slug: 'club-complete-sets-vs-building-bag',
    title: 'Complete Golf Club Sets vs. Building a Bag: Which Is the Better Buy?',
    excerpt: 'Complete golf club sets cost less and get you playing now; building a bag gives you premium clubs. We break down which choice fits your game and budget.',
    keywords: 'complete golf club sets vs building bag, golf club set comparison, build your own golf bag, boxed golf set vs individual clubs, golf clubs value, buy golf clubs',
    image: 'images/cart-8seat.jpg',
    intro: 'Every golfer faces the same decision: buy a complete golf club set or assemble a bag club by club. There is no single right answer \u2014 it depends on your budget, your goals, and how seriously you plan to play.',
    sections: [
      ['Complete Sets: The Value Play', 'A boxed set typically costs $300\u2013$600 and includes everything: driver, fairway woods, hybrids, irons, wedges, putter, and a bag. For beginners and casual golfers, it is unbeatable value.'],
      ['Building a Bag: For the Serious Golfer', 'When you know your swing, upgrading individual clubs \u2014 starting with driver and putter \u2014 lets you invest where it matters most. Expect to spend $1,000+ for a full quality set.'],
      ['The Hybrid Middle Ground', 'Many golfers buy a complete set for the irons and wedges, then upgrade just the driver or putter. It is the best of both worlds and the most common path we see.'],
    ],
    faqs: [
      ['Is a complete golf club set worth it?', 'For most beginners and weekend golfers, yes. You get a playable, balanced set for less than two premium clubs, and you can upgrade later.'],
      ['What clubs should I upgrade first?', 'Driver and putter matter most to your score. Most players upgrade those two clubs long before replacing irons.'],
      ['Can I mix a boxed set with premium clubs?', 'Absolutely. Mixing is smart: keep the set\u2019s irons and add a premium driver or putter when your game is ready.'],
    ],
  },
  {
    slug: 'club-golf-drivers-guide',
    title: 'Golf Drivers Explained: Loft, Shaft Flex, and Forgiveness for Every Golfer',
    excerpt: 'The driver is the hardest club to hit and the easiest to improve with the right choice. Here is what loft, shaft flex, and head design actually do.',
    keywords: 'golf driver buying guide, best golf drivers, driver loft explained, driver shaft flex, forgiving drivers, golf driver head size, draw bias driver, adjustable driver',
    image: 'images/cart-4seat.webp',
    intro: 'Off the tee, the driver sets up every hole. Yet it is the club most amateurs struggle with \u2014 usually because the driver does not match their swing. This guide explains loft, shaft flex, and forgiveness so your next driver works with you, not against you.',
    sections: [
      ['Higher Loft, Higher Launch', 'Beginner and slower-swing players should look at 10.5\u00b0\u201312\u00b0 loft. More loft means less spin, more carry, and far fewer weak slices.'],
      ['Forgiveness Comes From the Head', 'Larger heads (440\u2013460cc) with perimeter weighting keep the ball straighter on off-center hits. Draw-bias settings help players who tend to slice.'],
      ['Match the Shaft to Your Speed', 'Swing speed determines flex: seniors and many women use senior/ladies flex, average players regular, and fast swingers stiff. The right flex adds distance and control.'],
    ],
    faqs: [
      ['What driver loft should I use?', 'Most amateurs benefit from 10.5\u00b0. If you struggle to get the ball airborne, go to 12\u00b0; if you hit it high already, try 9\u00b0.'],
      ['Do I need an adjustable driver?', 'Adjustable drivers let you change loft and lie to fix ball flight. They are worth the extra cost once you know what your miss is.'],
      ['How much does a good driver cost?', 'Great drivers start around $300 and premium models reach $600\u2013$700. Last year\u2019s models offer nearly identical performance for less.'],
    ],
  },
  {
    slug: 'club-womens-golf-clubs-guide',
    title: "Women's Golf Clubs: How to Choose the Right Set for Your Game",
    excerpt: 'Women\u2019s-specific golf clubs use lighter shafts, softer flexes, and higher lofts to match most women\u2019s swing speeds. Here is how to choose the right set.',
    keywords: "women's golf clubs, best women's golf clubs, women's golf club sets, ladies golf clubs, women's golf set for beginners, women's golf clubs lightweight, ladies complete golf set",
    image: 'images/rover-xl6-white.jpg',
    intro: 'Women\u2019s golf clubs are designed around lighter shafts, softer flex, and higher loft \u2014 specs that match most women\u2019s swing speeds and help launch the ball higher and straighter. Here is how to pick the right set.',
    sections: [
      ['Lighter Shafts, Softer Flex', 'Ladies-flex graphite shafts are lighter and more flexible, which helps generate clubhead speed and gets the ball airborne more easily.'],
      ['Higher Loft Is Your Friend', 'Women\u2019s sets typically include higher-lofted woods and hybrids that are genuinely easier to hit \u2014 perfect for beginners and fairway play.'],
      ['Complete Sets Are the Smart Start', 'Most women\u2019s complete sets include a driver, fairway woods, hybrids, irons, wedges, putter, and a lightweight bag \u2014 everything you need in one box.'],
    ],
    faqs: [
      ['Should women use women\u2019s-specific clubs?', 'If you are new to golf or have a slower swing speed, yes \u2014 women\u2019s clubs are built for your swing. Stronger players can also use men\u2019s or senior-flex clubs.'],
      ['What is included in a women\u2019s complete set?', 'Typically driver, fairway woods, hybrids, irons, wedges, putter, and a stand bag \u2014 often under $400.'],
      ['Are women\u2019s clubs the same as junior clubs?', 'No. Women\u2019s clubs are full-length with lighter, softer shafts; junior clubs are shorter and sized for young players.'],
    ],
  },
  {
    slug: 'club-how-to-choose-putter',
    title: 'How to Choose a Putter: Styles, Weights, and Fitting Basics',
    excerpt: 'Putting is half the game, but the putter is the most personal club in the bag. Here is how to choose a putter that fits your stroke and improves your speed control.',
    keywords: 'how to choose a putter, best putters, putter fitting, putter styles, mallet vs blade putter, putter length, putter weight, golf putter buying guide',
    image: 'images/cart-4seat.webp',
    intro: 'You use the putter more than any other club, yet most golfers buy one off the rack without thinking about their stroke. This putter buying guide covers styles, length, and weight so your next putter feels like an extension of your hands.',
    sections: [
      ['Blade vs. Mallet', 'Blades suit players with a straight-back, straight-through stroke; mallets offer more forgiveness and alignment aids for players who arc the putter. Beginners often putt better with a mallet.'],
      ['Length Determines Setup', 'A putter that is too long forces you into bad posture. Stand naturally and let the putter hang \u2014 the grip should sit near your wrist. Standard length is 34\u201335 inches.'],
      ['Weight Affects Feel', 'Heavier putters promote a smooth pendulum stroke and help on fast greens; lighter putters give more feel. Test both before you buy.'],
    ],
    faqs: [
      ['How do I know what putter length I need?', 'Stand in your putting posture and let the putter hang naturally. The grip should reach your wrist crease. Most golfers use 33\u201335 inches.'],
      ['Are mallet putters easier to use?', 'For most beginners, yes \u2014 mallets are more forgiving and include alignment aids that help you aim straight.'],
      ['How much should I spend on a putter?', 'Good putters start around $100. Mid-range models ($150\u2013$300) offer the best feel and fitting options for most players.'],
    ],
  },
];

const CLUB_REVIEW_TOPICS = [
  {
    slug: 'club-review-best-complete-golf-club-sets',
    title: 'Review: The Best Complete Golf Club Sets for Beginners in 2026',
    excerpt: 'We compared the most popular complete golf club sets of 2026 \u2014 forgiveness, value, and what\u2019s included. Here are the best golf club sets for beginners.',
    keywords: 'best complete golf club sets, best golf club sets for beginners, golf club set review, beginner golf set comparison, boxed golf sets 2026',
    image: 'images/cart-4seat.webp',
    intro: 'Complete golf club sets are the smartest first purchase in golf. We tested and compared the leading boxed sets of 2026 on forgiveness, build quality, and value.',
    body: 'The best complete sets bundle driver, fairway woods, hybrids, irons, wedges, putter, and a stand bag \u2014 typically under $600. Beginners should prioritize forgiveness over brand names: higher loft, lighter graphite shafts, and perimeter-weighted irons turn mishits into playable shots. Our top picks all share those traits, and every one of them will keep you happy through your first full season. If you are ready to upgrade later, you can swap the driver or putter without replacing the whole set.',
    affiliate: 'https://www.amazon.com/s?k=complete+golf+club+sets+for+beginners&tag=techbot00-20&linkCode=ll2',
    rating: 4.5,
  },
  {
    slug: 'club-review-best-forgiving-golf-drivers',
    title: 'Review: The Most Forgiving Golf Drivers of 2026 (Tested & Compared)',
    excerpt: 'We tested the most forgiving golf drivers of 2026 for off-center hits, launch, and distance. Here are the best drivers for amateurs and beginners.',
    keywords: 'best forgiving drivers 2026, forgiving golf driver review, best golf driver for beginners, game improvement driver, golf driver comparison',
    image: 'images/rover-xl6-white.jpg',
    intro: 'The driver is where amateurs lose the most strokes \u2014 and where the right club makes the biggest difference. We tested the most forgiving drivers of 2026.',
    body: 'Forgiving drivers combine high MOI, a larger sweet spot, and higher loft to keep off-center hits straighter and longer. For amateurs, adjustability is less important than fit: choose a loft that gets the ball airborne (10.5\u00b0\u201312\u00b0) and a shaft flex matched to your swing speed. Every driver we recommend here excels at turning weak slices into playable fades \u2014 which is exactly what most weekend golfers need.',
    affiliate: 'https://www.amazon.com/s?k=forgiving+golf+drivers+2026&tag=techbot00-20&linkCode=ll2',
    rating: 4.5,
  },
  {
    slug: 'club-review-best-putters-beginners',
    title: 'Review: The Best Putters for Beginners and Mid-Handicappers in 2026',
    excerpt: 'Alignment aids, forgiveness, and feel \u2014 we tested the best putters of 2026 for beginners and mid-handicappers to help you make more putts.',
    keywords: 'best putters 2026, best putter for beginners, mallet putter review, putter comparison, golf putter recommendations',
    image: 'images/cart-8seat.jpg',
    intro: 'You will use the putter more than any other club, so it deserves the most careful choice. We tested the best putters of 2026 for beginners and mid-handicappers.',
    body: 'For most players, a mallet putter with strong alignment aids is the easiest to aim and the most forgiving on off-center hits. Match the length to your posture (typically 34\u201335 inches) and the weight to your feel \u2014 heavier promotes a smooth stroke on fast greens. The putters we recommend here all combine clear alignment lines, balanced weight, and consistent roll to help you start the ball on line and control distance.',
    affiliate: 'https://www.amazon.com/s?k=best+putters+for+beginners&tag=techbot00-20&linkCode=ll2',
    rating: 4.5,
  },
];

function todayDate() {
  const d = new Date();
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function isoDate() {
  return new Date().toISOString().slice(0, 10);
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); } catch { return { blogIdx: 0, reviewIdx: 0, clubBlogIdx: 0, clubReviewIdx: 0, kindIdx: 0, postCounter: 0 }; }
}

// Self-healing: if the state file is lost, derive the counter from files already on disk
function ensureCounter(state) {
  if (state.postCounter > 0) return;
  let max = 0;
  for (const f of fs.readdirSync(SITE_DIR)) {
    const m = f.match(/-(\d+)\.html$/);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  state.postCounter = max;
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function nextBlogTopic(state) {
  const topic = BLOG_TOPICS[state.blogIdx % BLOG_TOPICS.length];
  state.blogIdx = (state.blogIdx + 1) % BLOG_TOPICS.length;
  return topic;
}

function nextReviewTopic(state) {
  const topic = REVIEW_TOPICS[state.reviewIdx % REVIEW_TOPICS.length];
  state.reviewIdx = (state.reviewIdx + 1) % REVIEW_TOPICS.length;
  return topic;
}

function nextClubBlogTopic(state) {
  if (state.clubBlogIdx === undefined) state.clubBlogIdx = 0;
  const topic = CLUB_BLOG_TOPICS[state.clubBlogIdx % CLUB_BLOG_TOPICS.length];
  state.clubBlogIdx = (state.clubBlogIdx + 1) % CLUB_BLOG_TOPICS.length;
  return topic;
}

function nextClubReviewTopic(state) {
  if (state.clubReviewIdx === undefined) state.clubReviewIdx = 0;
  const topic = CLUB_REVIEW_TOPICS[state.clubReviewIdx % CLUB_REVIEW_TOPICS.length];
  state.clubReviewIdx = (state.clubReviewIdx + 1) % CLUB_REVIEW_TOPICS.length;
  return topic;
}

function articleHtml(topic, filename) {
  const sections = topic.sections.map(([h, p]) => `    <h3>${h}</h3>\n    <p>${p}</p>`).join('\n\n');
  const faqs = topic.faqs.map(([q, a]) => `      <details class="faq-item">\n        <summary>${q}</summary>\n        <p>${a}</p>\n      </details>`).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${topic.title}</title>
  <meta name="description" content="${topic.excerpt}">
  <meta name="robots" content="index, follow">
  <meta name="author" content="Destin Golf Cart Rentals & Sales">
  <link rel="sitemap" type="application/xml" title="Sitemap" href="https://www.globalfxcart.com/sitemap.xml">
  <link rel="canonical" href="${BASE}/${filename}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Destin Golf Cart Rentals & Sales">
  <meta property="og:title" content="${topic.title}">
  <meta property="og:description" content="${topic.excerpt}">
  <meta property="og:image" content="${BASE}/${topic.image}">
  <meta property="og:url" content="${BASE}/${filename}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${topic.title}">
  <meta name="twitter:description" content="${topic.excerpt}">
  <meta name="twitter:image" content="${BASE}/${topic.image}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": "${BASE}/${filename}#article",
    "mainEntityOfPage": "${BASE}/${filename}",
    "headline": "${topic.title}",
    "description": "${topic.excerpt}",
    "datePublished": "${isoDate()}",
    "dateModified": "${isoDate()}",
    "author": {
      "@type": "Organization",
      "name": "Destin Golf Cart Rentals & Sales",
      "url": "${BASE}/about.html"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "${BASE}/#business",
      "name": "Destin Golf Cart Rentals & Sales",
      "url": "${BASE}/",
      "telephone": "+1-850-299-8575"
    },
    "image": "${BASE}/${topic.image}",
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "Blog",
      "name": "Destin Golf Cart Rentals & Sales Blog",
      "url": "${BASE}/blog.html"
    }
  }
  </script>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <div class="logo">
        <h1>Destin Golf Cart Rentals</h1>
      </div>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="reviews.html">Reviews</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="golf-clubs.html">Golf Clubs</a></li>
        <li><a href="golf-cart-rental-guide.html">Guide</a></li>
        <li><a href="about.html">About</a></li>
        <li class="nav-call"><a href="${PHONE_TEL}">Call ${PHONE}</a></li>
      </ul>
    </nav>
  </header>

  <section class="page-header">
    <h2>${topic.title}</h2>
    <p>${topic.excerpt}</p>
  </section>

  <section class="rental-strip">
    <div class="rental-strip-inner">
      <span class="rental-strip-item"><strong>$99/Day</strong> Summer Special</span>
      <span class="rental-strip-item">Destin, FL &amp; Miramar Beach, FL</span>
      <a href="${PHONE_TEL}" class="btn btn-primary">Call ${PHONE}</a>
    </div>
  </section>

  <section class="content-section" style="max-width:860px">
    <p><strong>${topic.intro}</strong></p>

${sections}

    <h3>Book Your $99/Day Golf Cart Today</h3>
    <p>Brand new, street-legal carts start at <strong>$99/day</strong> with free delivery on rentals of 4 days or more anywhere in Destin, FL and Miramar Beach, FL. Call or text <a href="${PHONE_TEL}">${PHONE}</a> to reserve yours \u2014 peak-season dates go fast.</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
${faqs}
    </div>
  </section>

  <section class="cta-banner fade-up">
    <h2>Get Your Cart for $99/Day</h2>
    <p>Golf Carts Delivered ASAP! delivered to your door in Destin &amp; Miramar Beach, FL</p>
    <a href="${PHONE_TEL}" class="btn btn-primary">Call ${PHONE}</a>
  </section>

  <footer>
    <p>Destin Golf Cart Rentals &amp; Sales — Destin, FL &amp; Miramar Beach, FL</p>
    <p>Golf Carts Delivered ASAP! $99/Day &middot; Call <a href="${PHONE_TEL}">${PHONE}</a></p>
    <p class="updated-notice">Site updated August 2026 &middot; Locally owned &amp; operated on the Emerald Coast</p>
    <p class="affiliate-notice">We may earn commissions from affiliate links on this site.</p>
    <p class="disclaimer"><strong>Disclaimer:</strong> Google Gemini and Google Search do not always know the difference between the word &quot;Cart&quot; and confuse it with &quot;Chart&quot;; they can also confuse &quot;FX&quot; with foreign-exchange (Forex) trading. This site is Global FX Cart &mdash; <strong>Golf Cart Sales and Rentals</strong>, with golf clubs and accessories, serving Destin &amp; Miramar Beach, FL.</p>
  </footer>

  <script src="data.js"></script>
  <script src="script.js"></script>
</body>
</html>
`;
}

function reviewHtml(topic, filename) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${topic.title}</title>
  <meta name="description" content="${topic.excerpt}">
  <meta name="robots" content="index, follow">
  <meta name="author" content="Destin Golf Cart Rentals & Sales">
  <link rel="sitemap" type="application/xml" title="Sitemap" href="https://www.globalfxcart.com/sitemap.xml">
  <link rel="canonical" href="${BASE}/${filename}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Destin Golf Cart Rentals & Sales">
  <meta property="og:title" content="${topic.title}">
  <meta property="og:description" content="${topic.excerpt}">
  <meta property="og:image" content="${BASE}/${topic.image}">
  <meta property="og:url" content="${BASE}/${filename}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${topic.title}">
  <meta name="twitter:description" content="${topic.excerpt}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": "${BASE}/${filename}#review",
    "itemReviewed": {
      "@type": "Service",
      "name": "Destin Golf Cart Rentals & Sales \u2014 $99/Day Golf Cart Rental"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "${topic.rating}",
      "bestRating": "5"
    },
    "author": { "@type": "Organization", "name": "Destin Golf Cart Rentals & Sales", "url": "${BASE}/" },
    "datePublished": "${isoDate()}"
  }
  </script>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <div class="logo">
        <h1>Destin Golf Cart Rentals</h1>
      </div>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="reviews.html">Reviews</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="golf-clubs.html">Golf Clubs</a></li>
        <li><a href="golf-cart-rental-guide.html">Guide</a></li>
        <li><a href="about.html">About</a></li>
        <li class="nav-call"><a href="${PHONE_TEL}">Call ${PHONE}</a></li>
      </ul>
    </nav>
  </header>

  <section class="page-header">
    <h2>${topic.title}</h2>
    <p>${topic.excerpt}</p>
  </section>

  <section class="rental-strip">
    <div class="rental-strip-inner">
      <span class="rental-strip-item"><strong>$99/Day</strong> Summer Special</span>
      <span class="rental-strip-item">Destin, FL &amp; Miramar Beach, FL</span>
      <a href="${PHONE_TEL}" class="btn btn-primary">Call ${PHONE}</a>
    </div>
  </section>

  <section class="content-section" style="max-width:860px">
    <p><strong>${topic.intro}</strong></p>
    <p>${topic.body}</p>
    <p style="margin-top:1.5rem"><strong>Rated ${topic.rating}/5</strong> \u2014 rented from <a href="index.html">Destin Golf Cart Rentals &amp; Sales</a>. Golf Carts Delivered ASAP! from $99/day with free delivery on 4+ days. Call <a href="${PHONE_TEL}">${PHONE}</a> to book your own.</p>
  </section>

  <section class="cta-banner fade-up">
    <h2>Rent Your $99/Day Golf Cart</h2>
    <p>Golf Carts Delivered ASAP! delivered to your door in Destin &amp; Miramar Beach, FL</p>
    <a href="${PHONE_TEL}" class="btn btn-primary">Call ${PHONE}</a>
  </section>

  <footer>
    <p>Destin Golf Cart Rentals &amp; Sales — Destin, FL &amp; Miramar Beach, FL</p>
    <p>Golf Carts Delivered ASAP! $99/Day &middot; Call <a href="${PHONE_TEL}">${PHONE}</a></p>
    <p class="updated-notice">Site updated August 2026 &middot; Locally owned &amp; operated on the Emerald Coast</p>
    <p class="affiliate-notice">We may earn commissions from affiliate links on this site.</p>
    <p class="disclaimer"><strong>Disclaimer:</strong> Google Gemini and Google Search do not always know the difference between the word &quot;Cart&quot; and confuse it with &quot;Chart&quot;; they can also confuse &quot;FX&quot; with foreign-exchange (Forex) trading. This site is Global FX Cart &mdash; <strong>Golf Cart Sales and Rentals</strong>, with golf clubs and accessories, serving Destin &amp; Miramar Beach, FL.</p>
  </footer>

  <script src="data.js"></script>
  <script src="script.js"></script>
</body>
</html>
`;
}

function clubArticleHtml(topic, filename) {
  const sections = topic.sections.map(([h, p]) => `    <h3>${h}</h3>\n    <p>${p}</p>`).join('\n\n');
  const faqs = topic.faqs.map(([q, a]) => `      <details class="faq-item">\n        <summary>${q}</summary>\n        <p>${a}</p>\n      </details>`).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${topic.title}</title>
  <meta name="description" content="${topic.excerpt}">
  <meta name="keywords" content="${topic.keywords}">
  <meta name="robots" content="index, follow">
  <meta name="author" content="Destin Golf Cart Rentals & Sales">
  <link rel="sitemap" type="application/xml" title="Sitemap" href="https://www.globalfxcart.com/sitemap.xml">
  <link rel="canonical" href="${BASE}/${filename}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Destin Golf Cart Rentals & Sales">
  <meta property="og:title" content="${topic.title}">
  <meta property="og:description" content="${topic.excerpt}">
  <meta property="og:image" content="${BASE}/${topic.image}">
  <meta property="og:url" content="${BASE}/${filename}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${topic.title}">
  <meta name="twitter:description" content="${topic.excerpt}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": "${BASE}/${filename}#article",
    "mainEntityOfPage": "${BASE}/${filename}",
    "headline": "${topic.title}",
    "description": "${topic.excerpt}",
    "keywords": "${topic.keywords}",
    "datePublished": "${isoDate()}",
    "dateModified": "${isoDate()}",
    "author": {
      "@type": "Organization",
      "name": "Destin Golf Cart Rentals & Sales",
      "url": "${BASE}/about.html"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "${BASE}/#business",
      "name": "Destin Golf Cart Rentals & Sales",
      "url": "${BASE}/",
      "telephone": "+1-850-299-8575"
    },
    "image": "${BASE}/${topic.image}",
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "CollectionPage",
      "name": "Golf Clubs & Golf Club Reviews",
      "url": "${BASE}/golf-clubs.html"
    }
  }
  </script>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <div class="logo">
        <h1>Destin Golf Cart Rentals</h1>
      </div>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="reviews.html">Reviews</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="golf-clubs.html">Golf Clubs</a></li>
        <li><a href="golf-cart-rental-guide.html">Guide</a></li>
        <li><a href="about.html">About</a></li>
        <li class="nav-call"><a href="${PHONE_TEL}">Call ${PHONE}</a></li>
      </ul>
    </nav>
  </header>

  <section class="page-header">
    <h2>${topic.title}</h2>
    <p>${topic.excerpt}</p>
  </section>

  <section class="rental-strip">
    <div class="rental-strip-inner">
      <span class="rental-strip-item"><strong>Golf Clubs</strong> Guides &amp; Reviews</span>
      <span class="rental-strip-item">Destin, FL &amp; Miramar Beach, FL</span>
      <a href="${PHONE_TEL}" class="btn btn-primary">Call ${PHONE}</a>
    </div>
  </section>

  <section class="content-section" style="max-width:860px">
    <p><strong>${topic.intro}</strong></p>

${sections}

    <h3>Browse More Golf Club Guides</h3>
    <p>Find the right clubs for your game in our <a href="golf-clubs.html">golf club section</a>, or check <a href="essential-golf-supplies.html">essential golf supplies</a> for everything else you need. Planning a round in Destin, FL or Miramar Beach, FL? Rent a brand new golf cart from <strong>$99/day</strong> with free delivery on 4+ days \u2014 call or text <a href="${PHONE_TEL}">${PHONE}</a>.</p>

    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
${faqs}
    </div>
  </section>

  <section class="cta-banner fade-up">
    <h2>Get to the Course in Style</h2>
    <p>Rent a brand new golf cart from $99/day \u2014 Golf Carts Delivered ASAP! in Destin &amp; Miramar Beach, FL</p>
    <a href="${PHONE_TEL}" class="btn btn-primary">Call ${PHONE}</a>
  </section>

  <footer>
    <p>Destin Golf Cart Rentals &amp; Sales — Destin, FL &amp; Miramar Beach, FL</p>
    <p>Golf Carts Delivered ASAP! $99/Day &middot; Call <a href="${PHONE_TEL}">${PHONE}</a></p>
    <p class="updated-notice">Site updated August 2026 &middot; Locally owned &amp; operated on the Emerald Coast</p>
    <p class="affiliate-notice">We may earn commissions from affiliate links on this site.</p>
    <p class="disclaimer"><strong>Disclaimer:</strong> Google Gemini and Google Search do not always know the difference between the word &quot;Cart&quot; and confuse it with &quot;Chart&quot;; they can also confuse &quot;FX&quot; with foreign-exchange (Forex) trading. This site is Global FX Cart &mdash; <strong>Golf Cart Sales and Rentals</strong>, with golf clubs and accessories, serving Destin &amp; Miramar Beach, FL.</p>
  </footer>

  <script src="data.js"></script>
  <script src="script.js"></script>
</body>
</html>
`;
}

function clubReviewHtml(topic, filename) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${topic.title}</title>
  <meta name="description" content="${topic.excerpt}">
  <meta name="keywords" content="${topic.keywords}">
  <meta name="robots" content="index, follow">
  <meta name="author" content="Destin Golf Cart Rentals & Sales">
  <link rel="sitemap" type="application/xml" title="Sitemap" href="https://www.globalfxcart.com/sitemap.xml">
  <link rel="canonical" href="${BASE}/${filename}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Destin Golf Cart Rentals & Sales">
  <meta property="og:title" content="${topic.title}">
  <meta property="og:description" content="${topic.excerpt}">
  <meta property="og:image" content="${BASE}/${topic.image}">
  <meta property="og:url" content="${BASE}/${filename}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${topic.title}">
  <meta name="twitter:description" content="${topic.excerpt}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": "${BASE}/${filename}#review",
    "itemReviewed": {
      "@type": "Product",
      "name": "${topic.title.replace(/^Review: /, '')}"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "${topic.rating}",
      "bestRating": "5"
    },
    "author": { "@type": "Organization", "name": "Destin Golf Cart Rentals & Sales", "url": "${BASE}/" },
    "datePublished": "${isoDate()}"
  }
  </script>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <div class="logo">
        <h1>Destin Golf Cart Rentals</h1>
      </div>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="reviews.html">Reviews</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="golf-clubs.html">Golf Clubs</a></li>
        <li><a href="golf-cart-rental-guide.html">Guide</a></li>
        <li><a href="about.html">About</a></li>
        <li class="nav-call"><a href="${PHONE_TEL}">Call ${PHONE}</a></li>
      </ul>
    </nav>
  </header>

  <section class="page-header">
    <h2>${topic.title}</h2>
    <p>${topic.excerpt}</p>
  </section>

  <section class="rental-strip">
    <div class="rental-strip-inner">
      <span class="rental-strip-item"><strong>Golf Clubs</strong> Reviews</span>
      <span class="rental-strip-item">Destin, FL &amp; Miramar Beach, FL</span>
      <a href="${PHONE_TEL}" class="btn btn-primary">Call ${PHONE}</a>
    </div>
  </section>

  <section class="content-section" style="max-width:860px">
    <p><strong>${topic.intro}</strong></p>
    <p>${topic.body}</p>
    <p style="margin-top:1.5rem"><strong>Rated ${topic.rating}/5</strong> \u2014 browse current prices on Amazon: <a href="${topic.affiliate}" rel="nofollow sponsored">Check Price &amp; Reviews</a>. We may earn a commission from qualifying purchases at no extra cost to you.</p>
    <p>Looking for a ride to the course? <a href="index.html">Destin Golf Cart Rentals &amp; Sales</a> rents Golf Carts Delivered ASAP! from $99/day with free delivery on 4+ days. Call <a href="${PHONE_TEL}">${PHONE}</a>.</p>
  </section>

  <section class="cta-banner fade-up">
    <h2>Get to the Course in Style</h2>
    <p>Rent a brand new golf cart from $99/day \u2014 Golf Carts Delivered ASAP! in Destin &amp; Miramar Beach, FL</p>
    <a href="${PHONE_TEL}" class="btn btn-primary">Call ${PHONE}</a>
  </section>

  <footer>
    <p>Destin Golf Cart Rentals &amp; Sales — Destin, FL &amp; Miramar Beach, FL</p>
    <p>Golf Carts Delivered ASAP! $99/Day &middot; Call <a href="${PHONE_TEL}">${PHONE}</a></p>
    <p class="updated-notice">Site updated August 2026 &middot; Locally owned &amp; operated on the Emerald Coast</p>
    <p class="affiliate-notice">We may earn commissions from affiliate links on this site.</p>
    <p class="disclaimer"><strong>Disclaimer:</strong> Google Gemini and Google Search do not always know the difference between the word &quot;Cart&quot; and confuse it with &quot;Chart&quot;; they can also confuse &quot;FX&quot; with foreign-exchange (Forex) trading. This site is Global FX Cart &mdash; <strong>Golf Cart Sales and Rentals</strong>, with golf clubs and accessories, serving Destin &amp; Miramar Beach, FL.</p>
  </footer>

  <script src="data.js"></script>
  <script src="script.js"></script>
</body>
</html>
`;
}

/* ------------------------------------------------------------------ */
/* data.js / blog.html / sitemap.xml updaters                          */
/* ------------------------------------------------------------------ */

function insertIntoDataJs(entry, target, atTop) {
  let src = fs.readFileSync(DATA_FILE, 'utf8');
  const marker = `const ${target} = [`;
  const idx = src.indexOf(marker);
  if (idx === -1) throw new Error(`Cannot find ${marker} in data.js`);
  const entryStr = `\n  {\n    id: ${entry.id},\n    title: "${entry.title}",\n    excerpt: "${entry.excerpt}",\n    image: "${entry.image}",\n    link: "${entry.link}",\n    date: "${entry.date}"\n  },`;
  let insertAt;
  if (atTop) {
    insertAt = idx + marker.length;
    src = src.slice(0, insertAt) + entryStr + src.slice(insertAt);
  } else {
    // append after the last entry, ensuring a comma separates entries
    const end = src.indexOf('];', idx);
    if (end === -1) throw new Error(`Cannot find array close for ${target} in data.js`);
    const lastBrace = src.lastIndexOf('}', end);
    if (lastBrace === -1) throw new Error(`No closing brace found for ${target} array`);
    const entryObj = `{\n    id: ${entry.id},\n    title: "${entry.title}",\n    excerpt: "${entry.excerpt}",\n    image: "${entry.image}",\n    link: "${entry.link}",\n    date: "${entry.date}"\n  }`;
    // comma after the previous entry's closing brace, then the new entry before ];
    src = src.slice(0, lastBrace + 1) + ',' + src.slice(lastBrace + 1, end) + '\n  ' + entryObj + src.slice(end);
  }
  fs.writeFileSync(DATA_FILE, src);
}

// Validate every marker we depend on BEFORE mutating anything, so a failed run
// never leaves the site half-updated.
function validateMarkers() {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  if (!data.includes('const blogPosts = [')) throw new Error('blogPosts marker missing in data.js');
  if (!data.includes('const reviews = [')) throw new Error('reviews marker missing in data.js');
  if (!data.includes('const clubPosts = [')) throw new Error('clubPosts marker missing in data.js');
  const blog = fs.readFileSync(BLOG_FILE, 'utf8');
  if (!blog.includes('"itemListElement": [')) throw new Error('itemListElement marker missing in blog.html');
  const clubs = fs.readFileSync(CLUB_FILE, 'utf8');
  if (!clubs.includes('"itemListElement": [')) throw new Error('itemListElement marker missing in golf-clubs.html');
  const sitemap = fs.readFileSync(SITEMAP_FILE, 'utf8');
  if (!sitemap.includes('</urlset>')) throw new Error('</urlset> missing in sitemap.xml');
}

function nextId(target) {
  const src = fs.readFileSync(DATA_FILE, 'utf8');
  const marker = `const ${target} = [`;
  const start = src.indexOf(marker);
  const end = src.indexOf('];', start);
  const block = src.slice(start, end);
  const ids = [...block.matchAll(/id:\s*(\d+)/g)].map(m => parseInt(m[1], 10));
  return (ids.length ? Math.max(...ids) : 0) + 1;
}

function addToBlogItemList(title, filename) {
  let html = fs.readFileSync(BLOG_FILE, 'utf8');
  const marker = '"itemListElement": [';
  const idx = html.indexOf(marker);
  if (idx === -1) throw new Error('Cannot find itemListElement in blog.html');
  // 1) shift ONLY positions inside the ItemList block, 2) then insert the new item at position 1
  const blockEnd = html.indexOf(']', idx);
  const itemListBlock = html.slice(idx, blockEnd + 1).replace(/("position": )(\d+)/g, (m, p, n) => p + (parseInt(n, 10) + 1));
  html = html.slice(0, idx) + itemListBlock + html.slice(blockEnd + 1);
  const insertAt = idx + marker.length;
  const item = `\n      { "@type": "ListItem", "position": 1, "name": "${title}", "url": "${BASE}/${filename}" },`;
  html = html.slice(0, insertAt) + item + html.slice(insertAt);
  // Normalize a trailing comma before the closing bracket (safe even if the
  // original list was hand-written without one on its last item).
  const endIdx = html.indexOf(']', idx);
  const seg = html.slice(idx, endIdx + 1);
  const cleaned = seg.replace(/,\s*\n\s*\]/, '\n    ]');
  html = html.slice(0, idx) + cleaned + html.slice(endIdx + 1);
  fs.writeFileSync(BLOG_FILE, html);
}

function addToClubItemList(title, filename) {
  let html = fs.readFileSync(CLUB_FILE, 'utf8');
  const marker = '"itemListElement": [';
  const idx = html.indexOf(marker);
  if (idx === -1) throw new Error('Cannot find itemListElement in golf-clubs.html');
  const blockEnd = html.indexOf(']', idx);
  const itemListBlock = html.slice(idx, blockEnd + 1).replace(/("position": )(\d+)/g, (m, p, n) => p + (parseInt(n, 10) + 1));
  html = html.slice(0, idx) + itemListBlock + html.slice(blockEnd + 1);
  const insertAt = idx + marker.length;
  const item = `\n      { "@type": "ListItem", "position": 1, "name": "${title}", "url": "${BASE}/${filename}" },`;
  html = html.slice(0, insertAt) + item + html.slice(insertAt);
  // The ItemList may have started empty, so the last entry can end with a
  // trailing comma that makes the JSON-LD invalid. Normalize: strip any
  // comma directly before the ItemList closing bracket.
  const endIdx = html.indexOf(']', idx);
  const seg = html.slice(idx, endIdx + 1);
  const cleaned = seg.replace(/,\s*\n\s*\]/, '\n    ]');
  html = html.slice(0, idx) + cleaned + html.slice(endIdx + 1);
  fs.writeFileSync(CLUB_FILE, html);
}

function addToSitemap(filename) {
  let xml = fs.readFileSync(SITEMAP_FILE, 'utf8');
  const entry = `  <url>\n    <loc>${BASE}/${filename}</loc>\n    <lastmod>${isoDate()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  const idx = xml.indexOf('</urlset>');
  if (idx === -1) throw new Error('Cannot find </urlset> in sitemap.xml');
  xml = xml.slice(0, idx) + entry + xml.slice(idx);
  fs.writeFileSync(SITEMAP_FILE, xml);
}

function writeReport(entry, filename, kind) {
  if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const addedTo = kind === 'blog' ? 'blogPosts' : kind === 'review' ? 'reviews' : 'clubPosts';
  const list = kind === 'club-blog' || kind === 'club-review' ? 'golf-clubs.html ItemList' : kind === 'blog' ? 'blog.html ItemList' : 'reviews array';
  const report = `# Blog Automation Report — ${stamp}

- **Published at:** ${new Date().toString()}
- **Type:** ${kind}
- **Title:** ${entry.title}
- **Page:** ${BASE}/${filename}
- **Added to:** data.js (${addedTo}), ${list}, sitemap.xml
- **Excerpt:** ${entry.excerpt}

---
*Generated by blog-generator.js — golf cart rental & golf club content series.*
`;
  fs.writeFileSync(path.join(REPORTS_DIR, `report-${stamp}.md`), report);
  return report;
}

/* ------------------------------------------------------------------ */
/* Run lock + auto git deploy                                           */
/* ------------------------------------------------------------------ */

// Atomic lock so overlapping cron entries (0 17 + */30 at 17:00) can't
// double-publish. Stale locks are reclaimed only if the holder PID is dead
// (or the lock is very old and the PID is unreadable).
function lockHolderAlive(pid) {
  if (!pid) return false;
  try { process.kill(pid, 0); return true; } catch (e) { return e.code === 'EPERM'; }
}

function acquireLock() {
  try {
    const fd = fs.openSync(LOCK_FILE, 'wx');
    fs.writeSync(fd, String(process.pid));
    fs.closeSync(fd);
    return true;
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
    try {
      const holderPid = parseInt(fs.readFileSync(LOCK_FILE, 'utf8').trim(), 10);
      const st = fs.statSync(LOCK_FILE);
      if (!lockHolderAlive(holderPid) && Date.now() - st.mtimeMs > 60 * 1000) {
        fs.unlinkSync(LOCK_FILE);
        return acquireLock();
      }
    } catch (e) {
      if (e.code === 'ENOENT') return acquireLock();
      // unreadable/corrupt lock older than stale threshold -> reclaim
      try {
        const st = fs.statSync(LOCK_FILE);
        if (Date.now() - st.mtimeMs > LOCK_STALE_MS) {
          fs.unlinkSync(LOCK_FILE);
          return acquireLock();
        }
      } catch (e2) { /* ignore */ }
    }
    return false;
  }
}

function releaseLock() {
  try { fs.unlinkSync(LOCK_FILE); } catch (e) { /* already gone */ }
}

// Commit any changed site files and push to origin/main. Self-healing:
// if a previous push failed, the local commits get pushed on the next run.
// GIT_TERMINAL_PROMPT=0 ensures cron never hangs waiting for a password.
function gitCommitAndPush(titles) {
  const run = (cmd) => execSync(cmd, {
    cwd: SITE_DIR,
    stdio: 'pipe',
    env: Object.assign({}, process.env, { GIT_TERMINAL_PROMPT: '0' }),
  });
  const runGit = (args) => execFileSync('git', args, {
    cwd: SITE_DIR,
    stdio: 'pipe',
    env: Object.assign({}, process.env, { GIT_TERMINAL_PROMPT: '0' }),
  });
  try {
    run('git add -A');
    const dirty = run('git status --porcelain').toString().trim();
    if (dirty) {
      const msg = `Auto-publish: ${titles.join(' | ') || 'content update'}`;
      runGit(['commit', '-m', msg]); // execFileSync: no shell, so $ stays literal
    }
    // Guard for fresh clones where origin/main ref may not exist yet
    let ahead = 0;
    try {
      ahead = parseInt(run('git rev-list --count origin/main..main').toString().trim(), 10) || 0;
    } catch (e) { /* no origin/main ref yet — nothing to compare */ }
    if (ahead === 0) return 'no unpushed changes';
    run('git push origin main');
    return `pushed ${ahead} commit(s) to origin/main — Pages deploying`;
  } catch (err) {
    const detail = ((err.stderr || '') + (err.stdout || '')).toString().split('\n').filter(Boolean).slice(0, 3).join(' | ');
    console.log('[git] WARNING — site updated locally, retry next run: ' + detail);
    return 'error (see above)';
  }
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

const DAILY_SLOTS = [9, 13, 17]; // local hours: 9am, 1pm, 5pm
const MAX_CATCHUP = 6;           // never publish more than this per invocation

// The scheduled slot (as epoch ms) that is due to be published after `now`.
function nextDueSlot(now) {
  const d = new Date(now);
  for (const h of DAILY_SLOTS) {
    const candidate = new Date(now);
    candidate.setHours(h, 0, 0, 0);
    if (candidate.getTime() >= now) return candidate.getTime();
  }
  // roll to tomorrow's first slot
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(DAILY_SLOTS[0], 0, 0, 0);
  return tomorrow.getTime();
}

// 4-kind rotation: cart blog, cart review, club blog, club review.
// Club content gets a dedicated section (golf-clubs.html) and links back
// to the golf cart sales & rental site with keywords.
const KIND_CYCLE = ['cartBlog', 'cartReview', 'clubBlog', 'clubReview'];

// Publish one article per the rotation. Returns a short summary.
function publishOne(state) {
  if (state.kindIdx === undefined) state.kindIdx = 0;
  const kind = KIND_CYCLE[state.kindIdx % KIND_CYCLE.length];
  state.kindIdx = (state.kindIdx + 1) % KIND_CYCLE.length;

  let topic, kindLabel, target, isClub;
  if (kind === 'cartBlog') {
    topic = nextBlogTopic(state);
    kindLabel = 'blog';
    target = 'blogPosts';
    isClub = false;
  } else if (kind === 'cartReview') {
    topic = nextReviewTopic(state);
    kindLabel = 'review';
    target = 'reviews';
    isClub = false;
  } else if (kind === 'clubBlog') {
    topic = nextClubBlogTopic(state);
    kindLabel = 'club-blog';
    target = 'clubPosts';
    isClub = true;
  } else {
    topic = nextClubReviewTopic(state);
    kindLabel = 'club-review';
    target = 'clubPosts';
    isClub = true;
  }

  // Monotonic counter guarantees unique filenames even after topic rotation repeats
  state.postCounter += 1;
  const uniqueFilename = `${topic.slug}-${state.postCounter}.html`;

  let html;
  if (kind === 'cartBlog') html = articleHtml(topic, uniqueFilename);
  else if (kind === 'cartReview') html = reviewHtml(topic, uniqueFilename);
  else if (kind === 'clubBlog') html = clubArticleHtml(topic, uniqueFilename);
  else html = clubReviewHtml(topic, uniqueFilename);
  fs.writeFileSync(path.join(SITE_DIR, uniqueFilename), html);

  const entry = {
    id: nextId(target),
    title: topic.title,
    excerpt: topic.excerpt,
    image: topic.image,
    link: uniqueFilename,
    date: todayDate(),
  };

  validateMarkers(); // fail fast before any writes if a marker is missing

  // Cart blog posts go at the top of blogPosts; rental-experience reviews are
  // appended at the END of the reviews array so Amazon affiliate reviews keep
  // the homepage featured slots (reviews.slice(0,3)). Club content (both blog
  // and review) goes at the top of clubPosts in the golf-clubs.html section.
  insertIntoDataJs(entry, target, !(kind === 'cartReview'));
  if (kind === 'cartBlog') addToBlogItemList(topic.title, uniqueFilename);
  if (isClub) addToClubItemList(topic.title, uniqueFilename);
  addToSitemap(uniqueFilename);
  saveState(state);

  writeReport(entry, uniqueFilename, kindLabel);
  return `Created ${uniqueFilename} (${kindLabel}): ${topic.title}`;
}

function main() {
  if (!acquireLock()) {
    console.log('Another generator run is in progress — skipping.');
    return;
  }
  try {
    const state = loadState();
    ensureCounter(state);

    const now = Date.now();
    if (!state.nextDue) state.nextDue = nextDueSlot(now);

    let published = [];
    let guard = 0;
    while (now >= state.nextDue && published.length < MAX_CATCHUP && guard < 50) {
      published.push(publishOne(state));
      state.nextDue = nextDueSlot(state.nextDue + 1000); // advance to the following slot
      guard++;
    }
    saveState(state);

    const titles = published.map(p => p.split(': ').slice(1).join(': '));
    const gitResult = gitCommitAndPush(titles);

    if (published.length === 0) {
      console.log(`Nothing due yet. Next slot: ${new Date(state.nextDue).toString()}`);
      console.log('[git] ' + gitResult);
      return;
    }
    console.log(`Published ${published.length} post(s) (catch-up for any missed slots):`);
    published.forEach(p => console.log('  - ' + p));
    console.log(`Next slot: ${new Date(state.nextDue).toString()}`);
    console.log('[git] ' + gitResult);
  } finally {
    releaseLock();
  }
}

main();
