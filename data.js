const reviews = [
  {
    id: 1,
    title: "GOUP 4-Seater Electric Golf Cart Review: Is It Worth $9,900?",
    excerpt: "The GOUP 4-seater electric golf cart delivers impressive performance with a 48V motor and starry sky roof. Here's our full review.",
    image: "https://placehold.co/600x400/2d5a27/fff?text=GOUP+4-Seater",
    link: "https://www.amazon.com/gp/product/B0H395JDLD?smid=A1R8ULCM2PHGT&psc=1&linkCode=ll2&tag=techbot00-20&linkId=95036c0df6df729424f403081afc6ff8&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 2,
    title: "X-ARK 4-Seater Electric Golf Cart Review: 60-Mile Range Off-Road Beast",
    excerpt: "The X-ARK packs a 5000W motor, 23.5\" all-terrain tires, 60-mile range, and a 10\" touch screen. Premium off-road performance at $12,999.",
    image: "https://placehold.co/600x400/2a4a2a/fff?text=X-ARK",
    link: "https://www.amazon.com/gp/product/B0DSZY626D?smid=A2Y02GNHP5ZYV6&psc=1&linkCode=ll2&tag=techbot00-20&linkId=f51530d3722cfcc167cd11cb21db105d&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 3,
    title: "GO UP 6-Passenger Electric Golf Cart Review: 48V 150AH Lithium Power",
    excerpt: "The GO UP 4+2 seater seats six with a 48V 150AH lithium battery and one-click start. A spacious option for $12,200.",
    image: "https://placehold.co/600x400/3a5a2a/fff?text=GO+UP+6-Seater",
    link: "https://www.amazon.com/dp/B0H3P7839M?psc=1&pd_rd_i=B0H3P7839M&pd_rd_w=ihEQJ&content-id=amzn1.sym.4a7f44df-467c-45a1-af5f-91661a6df2f9&pf_rd_p=4a7f44df-467c-45a1-af5f-91661a6df2f9&pf_rd_r=SKXF13BAWY7QQYNT69MF&pd_rd_wg=qjxFb&pd_rd_r=cf4ae353-67cd-4e1d-ae16-e09b44146149&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWwy&linkCode=ll2&tag=techbot00-20&linkId=49386e64b7ce37a127c651b88d09e52e&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 4,
    title: "ATS POWER Electric Golf Cart Review: 48V 5KW Beast for $7,999",
    excerpt: "The ATS POWER electric golf cart packs a 48V 5KW AC motor, hits 25 MPH, and features 4-wheel hydraulic disc brakes. A serious contender for the price.",
    image: "https://placehold.co/600x400/4a4a4a/fff?text=ATS+POWER",
    link: "https://www.amazon.com/gp/product/B0GQBL7S4F?smid=AB36SNM4TKDZC&th=1&linkCode=ll2&tag=techbot00-20&linkId=39fd639c0239f1be767e39085ae97fdb&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 5,
    title: "GO UP Sightseeing/Patrol Golf Cart Review: 48V 105AH Lithium with Touchscreen",
    excerpt: "The GO UP sightseeing vehicle features a 48V 105AH lithium battery, 10.1\" touchscreen, 4+2 seating, and double-wishbone suspension. Versatile for $12,050.",
    image: "https://placehold.co/600x400/4a5a3a/fff?text=GO+UP+Sightseeing",
    link: "https://www.amazon.com/dp/B0GL1RC7L1?psc=1&pd_rd_i=B0GL1RC7L1&pd_rd_w=aKjlR&content-id=amzn1.sym.4a7f44df-467c-45a1-af5f-91661a6df2f9&pf_rd_p=4a7f44df-467c-45a1-af5f-91661a6df2f9&pf_rd_r=XPGKE3XZWN7KKJ4HXR9P&pd_rd_wg=ouear&pd_rd_r=1b985000-01ca-4486-b02f-487217473beb&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWwy&linkCode=ll2&tag=techbot00-20&linkId=fa2d98b93bb7931822096a21ac6de302&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 6,
    title: "GIYI 4-Seater Electric Golf Cart Review: 60V 44-Mile Range for $7,999",
    excerpt: "The GIYI 4-seater boasts a 60V 100Ah battery with 44-mile range, 5KW motor, and a 9-inch IPS display. Fully assembled out of the box.",
    image: "https://placehold.co/600x400/1a1a1a/fff?text=GIYI+4-Seater",
    link: "https://www.amazon.com/gp/product/B0GDFMD6QM?smid=A395BR449SJF5J&psc=1&linkCode=ll2&tag=techbot00-20&linkId=8aa651f3067fe06c62c4fe55c641dcf5&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 7,
    title: "GO UP 2-Seater Electric Golf Cart Review: Insulated Cooler & 48V 105AH Lithium",
    excerpt: "The GOUP 2-seater features a 48V 105AH lithium battery, built-in insulated cooler, and a lightweight design. Perfect for solo riders at $7,700.",
    image: "https://placehold.co/600x400/3a4a2a/fff?text=GO+UP+2-Seater",
    link: "https://www.amazon.com/dp/B0GMGR7FT4?psc=1&pd_rd_i=B0GMGR7FT4&pd_rd_w=ihEQJ&content-id=amzn1.sym.4a7f44df-467c-45a1-af5f-91661a6df2f9&pf_rd_p=4a7f44df-467c-45a1-af5f-91661a6df2f9&pf_rd_r=SKXF13BAWY7QQYNT69MF&pd_rd_wg=qjxFb&pd_rd_r=cf4ae353-67cd-4e1d-ae16-e09b44146149&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWwy&linkCode=ll2&tag=techbot00-20&linkId=2ae1dc850cc59bad0c904e9c3064ffe2&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 8,
    title: "EZGO RXV Elite Electric Golf Cart Review",
    excerpt: "The EZGO RXV Elite offers a smooth ride and impressive range. Here's our full hands-on review after a month of testing.",
    image: "https://placehold.co/600x400/2d5a27/fff?text=EZGO+RXV+Elite",
    link: "#",
    date: "July 5, 2026"
  },
  {
    id: 9,
    title: "Club Car Onward 4-Passenger Review",
    excerpt: "Club Car's Onward series blends luxury with performance. We put the 4-passenger model through its paces.",
    image: "https://placehold.co/600x400/1a3a5c/fff?text=Club+Car+Onward",
    link: "#",
    date: "July 1, 2026"
  },
  {
    id: 10,
    title: "Yamaha Drive2 PTV Gas vs Electric Comparison",
    excerpt: "Can't decide between gas and electric? We compare the Yamaha Drive2 PTV in both configurations.",
    image: "https://placehold.co/600x400/3a3a3a/fff?text=Yamaha+Drive2",
    link: "#",
    date: "June 28, 2026"
  }
];

const blogPosts = [
  {
    id: 6,
    title: "GO UP Stylish & Lightweight Electric Golf Caddie Review: Dual System",
    excerpt: "The GOUP dual golf cart system includes two lithium-powered electric caddies with LED displays and insulated coolers. Lightweight and professional-grade at $7,500.",
    image: "https://placehold.co/600x400/5a5a3a/fff?text=GO+UP+Caddie",
    link: "https://www.amazon.com/dp/B0GR9JYP7M?psc=1&pd_rd_i=B0GR9JYP7M&pd_rd_w=aKjlR&content-id=amzn1.sym.4a7f44df-467c-45a1-af5f-91661a6df2f9&pf_rd_p=4a7f44df-467c-45a1-af5f-91661a6df2f9&pf_rd_r=XPGKE3XZWN7KKJ4HXR9P&pd_rd_wg=ouear&pd_rd_r=1b985000-01ca-4486-b02f-487217473beb&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWwy&linkCode=ll2&tag=techbot00-20&linkId=db9edcabe550b970e76e67602ec757b4&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 7,
    title: "5 Best Golf Cart Upgrades for 2026",
    excerpt: "From lithium batteries to LED lighting, here are the top upgrades to transform your golf cart this year.",
    image: "https://placehold.co/600x400/2d5a27/fff?text=Upgrades",
    link: "#",
    date: "July 3, 2026"
  },
  {
    id: 8,
    title: "Golf Cart Maintenance Guide: Keep Your Cart Running",
    excerpt: "Regular maintenance extends the life of your golf cart. Follow our seasonal checklist.",
    image: "https://placehold.co/600x400/1a3a5c/fff?text=Maintenance",
    link: "#",
    date: "June 25, 2026"
  },
  {
    id: 9,
    title: "Electric vs Gas Golf Carts: Pros and Cons",
    excerpt: "We break down the costs, performance, and environmental impact of each option.",
    image: "https://placehold.co/600x400/3a3a3a/fff?text=Electric+vs+Gas",
    link: "#",
    date: "June 18, 2026"
  },
  {
    id: 10,
    title: "Essential Golf Supplies Every Golfer Needs",
    excerpt: "From premium golf balls to the perfect stand bag, here's what to pack for your next round.",
    image: "https://placehold.co/600x400/5a2a1a/fff?text=Golf+Supplies",
    link: "#",
    date: "June 15, 2026"
  }
];
