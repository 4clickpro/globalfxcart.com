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
    title: "ATS POWER 4-Seater Shuttle Golf Cart Review: IP67 Waterproof 48V 5KW",
    excerpt: "The ATS POWER 4-seater shuttle features a 48V 5KW IP67 waterproof motor, 25 MPH top speed, 7-inch multimedia display, and 5-hour quick charging. Built tough at $10,999.",
    image: "https://placehold.co/600x400/2a2a2a/fff?text=ATS+POWER+4-Seater",
    link: "https://www.amazon.com/ATS-POWER-4-Seater-Electric-Waterproof/dp/B0GXKSCFXF?pd_rd_w=jH0FW&content-id=amzn1.sym.6640a844-ab24-4352-ac9b-78899e683a5e&pf_rd_p=6640a844-ab24-4352-ac9b-78899e683a5e&pf_rd_r=R33V719CJ95J6FNMPZ6W&pd_rd_wg=QDrom&pd_rd_r=ad719f52-fbaf-4b88-8ad9-d8921818b979&pd_rd_i=B0GXKY1GF4&th=1&linkCode=ll2&tag=techbot00-20&linkId=92b11abde1f40b8b3d9c6fcacb325f43&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 5,
    title: "ATS POWER Electric Golf Cart Review: 48V 5KW Beast for $7,999",
    excerpt: "The ATS POWER electric golf cart packs a 48V 5KW AC motor, hits 25 MPH, and features 4-wheel hydraulic disc brakes. A serious contender for the price.",
    image: "https://placehold.co/600x400/4a4a4a/fff?text=ATS+POWER",
    link: "https://www.amazon.com/gp/product/B0GQBL7S4F?smid=AB36SNM4TKDZC&th=1&linkCode=ll2&tag=techbot00-20&linkId=39fd639c0239f1be767e39085ae97fdb&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 6,
    title: "GO UP Sightseeing/Patrol Golf Cart Review: 48V 105AH Lithium with Touchscreen",
    excerpt: "The GO UP sightseeing vehicle features a 48V 105AH lithium battery, 10.1\" touchscreen, 4+2 seating, and double-wishbone suspension. Versatile for $12,050.",
    image: "https://placehold.co/600x400/4a5a3a/fff?text=GO+UP+Sightseeing",
    link: "https://www.amazon.com/dp/B0GL1RC7L1?psc=1&pd_rd_i=B0GL1RC7L1&pd_rd_w=aKjlR&content-id=amzn1.sym.4a7f44df-467c-45a1-af5f-91661a6df2f9&pf_rd_p=4a7f44df-467c-45a1-af5f-91661a6df2f9&pf_rd_r=XPGKE3XZWN7KKJ4HXR9P&pd_rd_wg=ouear&pd_rd_r=1b985000-01ca-4486-b02f-487217473beb&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWwy&linkCode=ll2&tag=techbot00-20&linkId=fa2d98b93bb7931822096a21ac6de302&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 7,
    title: "GIYI 4-Seater Electric Golf Cart Review: 60V 44-Mile Range for $7,999",
    excerpt: "The GIYI 4-seater boasts a 60V 100Ah battery with 44-mile range, 5KW motor, and a 9-inch IPS display. Fully assembled out of the box.",
    image: "https://placehold.co/600x400/1a1a1a/fff?text=GIYI+4-Seater",
    link: "https://www.amazon.com/gp/product/B0GDFMD6QM?smid=A395BR449SJF5J&psc=1&linkCode=ll2&tag=techbot00-20&linkId=8aa651f3067fe06c62c4fe55c641dcf5&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 8,
    title: "GO UP 2-Seater Electric Golf Cart Review: Insulated Cooler & 48V 105AH Lithium",
    excerpt: "The GOUP 2-seater features a 48V 105AH lithium battery, built-in insulated cooler, and a lightweight design. Perfect for solo riders at $7,700.",
    image: "https://placehold.co/600x400/3a4a2a/fff?text=GO+UP+2-Seater",
    link: "https://www.amazon.com/dp/B0GMGR7FT4?psc=1&pd_rd_i=B0GMGR7FT4&pd_rd_w=ihEQJ&content-id=amzn1.sym.4a7f44df-467c-45a1-af5f-91661a6df2f9&pf_rd_p=4a7f44df-467c-45a1-af5f-91661a6df2f9&pf_rd_r=SKXF13BAWY7QQYNT69MF&pd_rd_wg=qjxFb&pd_rd_r=cf4ae353-67cd-4e1d-ae16-e09b44146149&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWwy&linkCode=ll2&tag=techbot00-20&linkId=2ae1dc850cc59bad0c904e9c3064ffe2&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 9,
    title: "EZGO RXV Elite Electric Golf Cart Review",
    excerpt: "The EZGO RXV Elite offers a smooth ride and impressive range. Here's our full hands-on review after a month of testing.",
    image: "https://placehold.co/600x400/2d5a27/fff?text=EZGO+RXV+Elite",
    link: "#",
    date: "July 5, 2026"
  },
  {
    id: 10,
    title: "Club Car Onward 4-Passenger Review",
    excerpt: "Club Car's Onward series blends luxury with performance. We put the 4-passenger model through its paces.",
    image: "https://placehold.co/600x400/1a3a5c/fff?text=Club+Car+Onward",
    link: "#",
    date: "July 1, 2026"
  },
  {
    id: 11,
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
    title: "PGM NSR V 18-Piece Complete Golf Club Set Review: Premium Performance for $990",
    excerpt: "The PGM NSR V set includes an adjustable loft titanium driver, precision-weighted fairway woods, forged irons, CNC milled putter, and stand bag. A complete bag for serious golfers.",
    image: "https://placehold.co/600x400/2a3a4a/fff?text=PGM+NSR+V+Set",
    link: "https://www.amazon.com/PGM-Piece-Mens-Complete-Golf/dp/B0F5MTZTF9?crid=2VDTOSVX6EUML&dib=eyJ2IjoiMSJ9.jEs3qHHxod3ikOqrpNK9puvKghYNWurcpfbTY2PFTJfrjp5iC-iVrpSvv2asRZ9yV420PFxBxN7Bhq2Kput2YdKvb1asIa5bXRxbvN8s6U8iwWY3Vf9hHjVpKD_LEFLy6Do-67Xe2jhzxaWOHhvjXWKriEKS30Fi6Ppdb_7x_9RdegXDc3-zKqVURIGkqciZRdyEQwQV1img_gN-vF8_msjDlOHQgBaGjB653jdI_aU.Rn9clKSiyHMVMBmmBNpOv84cycNENZZ0KnL7Qy6Oruk&dib_tag=se&keywords=most%2Bexpensive%2Bgolf%2Bclub%2Bset&qid=1783516457&sprefix=most%2Bexpensive%2Bgolf%2Caps%2C219&sr=8-4-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&th=1&linkCode=ll2&tag=techbot00-20&linkId=928ba76ea0b6fa84feefc0357686e983&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 8,
    title: "Callaway Golf 2026 XR Complete Set Review: Premium Performance",
    excerpt: "The Callaway 2026 XR complete golf set delivers pro-level quality with a premium driver, fairway woods, hybrids, irons, wedges, and putter. A top-tier package at $1,599.99.",
    image: "https://placehold.co/600x400/1a3a5c/fff?text=Callaway+2026+XR",
    link: "https://www.amazon.com/CG-PK-XR-Complete-Set/dp/B0FH5VVFVK?crid=2VDTOSVX6EUML&dib=eyJ2IjoiMSJ9.vzetvR-6dr0o5xb3CMIkdFARI8HhdxuquBqInyxyDAbIj25FiRyDU4wGguBo16ocX5PlYqbBG9IDKfJPvq9wNPgchVw8DQoO6glCXDqynvzvaF-C8xehpKOb31oDikfhrFWyVsjIZQ3n1sSfI0VJvY3FDAtbXCSgFAkpCzDkAsb4YwrfHzyCV4KrUDCOqdFp_jUq6ivj9Tyr3DAZzQmzsBz5Trf9aXttTSb_Lg0ZIUA.c-FpD8MkHkKJLdvmVV8sj8jJlUVIuBXUdD0gZPPQs_k&dib_tag=se&keywords=most%2Bexpensive%2Bgolf%2Bclub%2Bset&qid=1783516586&sprefix=most%2Bexpensive%2Bgolf%2Caps%2C219&sr=8-9&th=1&linkCode=ll2&tag=techbot00-20&linkId=9450922e15738663a90ac976788b8961&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 9,
    title: "TaylorMade Qi Max Irons Review: Graphite Regular Left-Hand 5-PW+AW Set",
    excerpt: "The TaylorMade Qi Max irons deliver premium performance with graphite regular shafts in a left-hand 5-PW+AW set. Top-tier feel and forgiveness at $1,199.99.",
    image: "https://placehold.co/600x400/2a4a5a/fff?text=TaylorMade+Qi+Max",
    link: "https://www.amazon.com/dp/B0G2TCMHH3?pd_rd_i=B0G2TCMHH3&pd_rd_w=cnneO&content-id=amzn1.sym.4f5afe61-a551-4f21-a495-c7c4f2997a96&pf_rd_p=4f5afe61-a551-4f21-a495-c7c4f2997a96&pf_rd_r=1CM33SQD9GSAEA3B2EFB&pd_rd_wg=rqEDA&pd_rd_r=64fcb83f-cdac-4c4b-a2b9-b34c06615515&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfdGhlbWF0aWM&th=1&linkCode=ll2&tag=techbot00-20&linkId=6f2e125ab096970d2b66a89a592ee4c6&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 10,
    title: "PGM 27-Piece Complete Golf Set Review: USGA Certified Premium Kit",
    excerpt: "The PGM 27-piece set is R&A and USGA certified with adjustable driver, woods, hybrids, irons, wedges, putter, and stand bag. A pro-level complete bag at $1,999.99.",
    image: "https://placehold.co/600x400/2a2a3a/fff?text=PGM+27-Piece",
    link: "https://www.amazon.com/dp/B0G2PLVT2Z?pd_rd_i=B0G2PLVT2Z&pd_rd_w=PPNNM&content-id=amzn1.sym.4f5afe61-a551-4f21-a495-c7c4f2997a96&pf_rd_p=4f5afe61-a551-4f21-a495-c7c4f2997a96&pf_rd_r=H4MPND4MYNGFP5QFDSAY&pd_rd_wg=PMeyb&pd_rd_r=7e7a20e6-f85c-4632-916e-8221c5f28770&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfdGhlbWF0aWM&th=1&linkCode=ll2&tag=techbot00-20&linkId=0c8b218ad63ba2b90d2f57ee676412cd&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 11,
    title: "Srixon ZXi Iron Set Review: 4-PW Steel Stiff Right Hand",
    excerpt: "The Srixon ZXi 4-PW iron set delivers premium forged performance with steel stiff shafts. A tour-caliber iron set for serious golfers at $1,399.99.",
    image: "https://placehold.co/600x400/3a3a4a/fff?text=Srixon+ZXi",
    link: "https://www.amazon.com/dp/B0DT3GGD4C?sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfcmlnaHRfc2hhcmVk&th=1&linkCode=ll2&tag=techbot00-20&linkId=ead9ab90b25247b723a03a608c5866df&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 12,
    title: "5 Best Golf Cart Upgrades for 2026",
    excerpt: "From lithium batteries to LED lighting, here are the top upgrades to transform your golf cart this year.",
    image: "https://placehold.co/600x400/2d5a27/fff?text=Upgrades",
    link: "#",
    date: "July 3, 2026"
  },
  {
    id: 13,
    title: "Golf Cart Maintenance Guide: Keep Your Cart Running",
    excerpt: "Regular maintenance extends the life of your golf cart. Follow our seasonal checklist.",
    image: "https://placehold.co/600x400/1a3a5c/fff?text=Maintenance",
    link: "#",
    date: "June 25, 2026"
  },
  {
    id: 14,
    title: "Electric vs Gas Golf Carts: Pros and Cons",
    excerpt: "We break down the costs, performance, and environmental impact of each option.",
    image: "https://placehold.co/600x400/3a3a3a/fff?text=Electric+vs+Gas",
    link: "#",
    date: "June 18, 2026"
  },
  {
    id: 15,
    title: "Essential Golf Supplies Every Golfer Needs",
    excerpt: "From premium golf balls to the perfect stand bag, here's what to pack for your next round.",
    image: "https://placehold.co/600x400/5a2a1a/fff?text=Golf+Supplies",
    link: "#",
    date: "June 15, 2026"
  }
];
