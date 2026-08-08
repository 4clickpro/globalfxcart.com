#!/usr/bin/env node
/**
 * Global FX Cart — $99 Beach Golf Cart Rental Content Generator
 * Publishes a fresh article 3x daily via cron. Each run:
 *   - Creates a new article HTML page
 *   - Wires it into data.js (blogPosts or reviews)
 *   - Updates blog.html ItemList JSON-LD
 *   - Adds the page to sitemap.xml
 *   - Writes a report to reports/
 */
'use strict';

const fs = require('fs');
const path = require('path');

const SITE_DIR = __dirname;
const DATA_FILE = path.join(SITE_DIR, 'data.js');
const BLOG_FILE = path.join(SITE_DIR, 'blog.html');
const SITEMAP_FILE = path.join(SITE_DIR, 'sitemap.xml');
const STATE_FILE = path.join(SITE_DIR, '.blog-state.json');
const REPORTS_DIR = path.join(SITE_DIR, 'reports');

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

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

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
  try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); } catch { return { blogIdx: 0, reviewIdx: 0, postCounter: 0 }; }
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
  const blog = fs.readFileSync(BLOG_FILE, 'utf8');
  if (!blog.includes('"itemListElement": [')) throw new Error('itemListElement marker missing in blog.html');
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
  fs.writeFileSync(BLOG_FILE, html);
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
  const report = `# Blog Automation Report — ${stamp}

- **Published at:** ${new Date().toString()}
- **Type:** ${kind}
- **Title:** ${entry.title}
- **Page:** ${BASE}/${filename}
- **Added to:** data.js (${kind === 'blog' ? 'blogPosts' : 'reviews'}), blog.html ItemList, sitemap.xml
- **Excerpt:** ${entry.excerpt}

---
*Generated by blog-generator.js — $99 Beach Golf Cart Rental series.*
`;
  fs.writeFileSync(path.join(REPORTS_DIR, `report-${stamp}.md`), report);
  return report;
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

// Publish one article (blog or review per the 2:1 rotation). Returns a short summary.
function publishOne(state) {
  const isBlog = (state.blogIdx + state.reviewIdx) % 3 !== 2; // 2 of 3 posts are blog posts, 1 is a review
  const topic = isBlog ? nextBlogTopic(state) : nextReviewTopic(state);
  const kind = isBlog ? 'blog' : 'review';
  const target = isBlog ? 'blogPosts' : 'reviews';

  // Monotonic counter guarantees unique filenames even after topic rotation repeats
  state.postCounter += 1;
  const uniqueFilename = `${topic.slug}-${state.postCounter}.html`;

  const html = isBlog ? articleHtml(topic, uniqueFilename) : reviewHtml(topic, uniqueFilename);
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

  // Blog posts go at the top of the list; rental-experience reviews are appended
  // at the END of the reviews array so Amazon affiliate reviews keep the
  // homepage featured slots (reviews.slice(0,3)).
  insertIntoDataJs(entry, target, isBlog);
  if (isBlog) addToBlogItemList(topic.title, uniqueFilename);
  addToSitemap(uniqueFilename);
  saveState(state);

  writeReport(entry, uniqueFilename, kind);
  return `Created ${uniqueFilename} (${kind}): ${topic.title}`;
}

function main() {
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

  if (published.length === 0) {
    console.log(`Nothing due yet. Next slot: ${new Date(state.nextDue).toString()}`);
    return;
  }
  console.log(`Published ${published.length} post(s) (catch-up for any missed slots):`);
  published.forEach(p => console.log('  - ' + p));
  console.log(`Next slot: ${new Date(state.nextDue).toString()}`);
}

main();
