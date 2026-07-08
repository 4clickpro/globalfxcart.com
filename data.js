const reviews = [
  {
    id: 1,
    title: "GOUP 4-Seater Electric Golf Cart Review: Is It Worth $9,900?",
    excerpt: "The GOUP 4-seater electric golf cart delivers impressive performance with a 48V motor and starry sky roof. Here's our full review.",
    image: "https://m.media-amazon.com/images/I/61qCr9L5gRL._AC_SL1500_.jpg",
    link: "https://www.amazon.com/gp/product/B0H395JDLD?smid=A1R8ULCM2PHGT&psc=1&linkCode=ll2&tag=techbot00-20&linkId=95036c0df6df729424f403081afc6ff8&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 6,
    title: "SDLANCH 45-Mile Long Range 60V Golf Cart Review: Heavy Duty 4-Seater",
    excerpt: "The SDLANCH 4-seater offers a 60V system with 45-mile range, 800 lbs capacity, LED lights, and quick charging. A heavy-duty workhorse at $9,800.",
    image: "https://m.media-amazon.com/images/I/713n8DxUNxL._AC_SL1500_.jpg",
    link: "https://www.amazon.com/SDLANCH-45-Mile-Long-Range-Electric/dp/B0G2LXSLTP?pd_rd_w=sbFa5&content-id=amzn1.sym.6640a844-ab24-4352-ac9b-78899e683a5e&pf_rd_p=6640a844-ab24-4352-ac9b-78899e683a5e&pf_rd_r=JQBE1W9ESDPG9RSV70CE&pd_rd_wg=05TOR&pd_rd_r=82762e49-ee25-4f3c-8151-91dcc12ae8e6&pd_rd_i=B0G2LXSLTP&psc=1&linkCode=ll2&tag=techbot00-20&linkId=2d1a7cfee9e6a556c077de01bf859192&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 7,
    title: "GIYI 4-Seater Electric Golf Cart Review: 60V 44-Mile Range for $7,999",
    excerpt: "The GIYI 4-seater boasts a 60V 100Ah battery with 44-mile range, 5KW motor, and a 9-inch IPS display. Fully assembled out of the box.",
    image: "https://m.media-amazon.com/images/I/81PZzvLNxtL._AC_SL1500_.jpg",
    link: "https://www.amazon.com/gp/product/B0GDFMD6QM?smid=A395BR449SJF5J&psc=1&linkCode=ll2&tag=techbot00-20&linkId=8aa651f3067fe06c62c4fe55c641dcf5&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 8,
    title: "GO UP 2-Seater Electric Golf Cart Review: Insulated Cooler & 48V 105AH Lithium",
    excerpt: "The GOUP 2-seater features a 48V 105AH lithium battery, built-in insulated cooler, and a lightweight design. Perfect for solo riders at $7,700.",
    image: "https://m.media-amazon.com/images/I/91lDTE1lBUL._AC_SL1500_.jpg",
    link: "https://www.amazon.com/dp/B0GMGR7FT4?psc=1&pd_rd_i=B0GMGR7FT4&pd_rd_w=ihEQJ&content-id=amzn1.sym.4a7f44df-467c-45a1-af5f-91661a6df2f9&pf_rd_p=4a7f44df-467c-45a1-af5f-91661a6df2f9&pf_rd_r=SKXF13BAWY7QQYNT69MF&pd_rd_wg=qjxFb&pd_rd_r=cf4ae353-67cd-4e1d-ae16-e09b44146149&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWwy&linkCode=ll2&tag=techbot00-20&linkId=2ae1dc850cc59bad0c904e9c3064ffe2&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 9,
    title: "EZGO RXV Elite Electric Golf Cart Review",
    excerpt: "The EZGO RXV Elite offers a smooth ride and impressive range. Here's our full hands-on review after a month of testing.",
    image: "https://picsum.photos/seed/golfcart5/600/400",
    link: "#",
    date: "July 5, 2026"
  },
  {
    id: 10,
    title: "Club Car Onward 4-Passenger Review",
    excerpt: "Club Car's Onward series blends luxury with performance. We put the 4-passenger model through its paces.",
    image: "https://picsum.photos/seed/golfcart6/600/400",
    link: "#",
    date: "July 1, 2026"
  },
  {
    id: 11,
    title: "Yamaha Drive2 PTV Gas vs Electric Comparison",
    excerpt: "Can't decide between gas and electric? We compare the Yamaha Drive2 PTV in both configurations.",
    image: "https://picsum.photos/seed/golfcart7/600/400",
    link: "#",
    date: "June 28, 2026"
  },
  {
    id: 12,
    title: "X-ARK 4-Seater Electric All-Terrain Golf Cart Review: High-Power Beast",
    excerpt: "The X-ARK 4-seater is an all-terrain electric golf cart with high-power motor and rugged design. Built for off-road adventures at a premium price point.",
    image: "https://m.media-amazon.com/images/I/710pbDN5OoL._AC_SL1500_.jpg",
    link: "https://www.amazon.com/X-ARK-4-Seater-Electric-All-Terrain-High-Power/dp/B0DSZY626D?crid=BMET4VGSPW27&dib=eyJ2IjoiMSJ9.KXLGWdc9NO9-sBb3O8NS_8lw2U4D69pGVpy5x0qWcAk41s42-t2euJhInM3InYZCj-oYaOiXG_LFOlETwylBOOsxFGPsu5rpvGkdaEOBxdTVc3Vot_oGd1GrjIgAkhIHcdynA4QIIAykWXo89VKwDQKMDPmyls1N-dZ_e-h1LR8yYDBW3tDXJf_nty2AIcCCkg_-_EIfDFnT4APvs5d_vEDz1awMnVjuW7Jy-0sSa4vohPVX_J1QNP33PqNRDG48y9dOnDK2LUEVux-GJXK3NENlAuINpimrxngENWnmsWc.8FsapR0XQ0rbs3d2t4Lg2JG1YIK7kjz8taPeGOzdRNU&dib_tag=se&keywords=most+expensive+golf+cart&qid=1783517017&s=sporting-goods&sprefix=most+expensive+golf+cart%2Csporting%2C218&sr=1-4&linkCode=ll2&tag=techbot00-20&linkId=8f2430ec94b9a632da8e0734272dad1e&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 13,
    title: "ATS POWER 4-Seater Electric Golf Cart Review: Waterproof Beast",
    excerpt: "The ATS POWER 4-seater is a waterproof electric golf cart built for all-weather performance. A rugged option for serious off-road golf cart enthusiasts.",
    image: "https://picsum.photos/seed/golfcart9/600/400",
    link: "https://www.amazon.com/ATS-POWER-4-Seater-Electric-Waterproof/dp/B0GXKK7PSY?dib=eyJ2IjoiMSJ9.KXLGWdc9NO9-sBb3O8NS_8lw2U4D69pGVpy5x0qWcAk41s42-t2euJhInM3InYZCj-oYaOiXG_LFOlETwylBOOsxFGPsu5rpvGkdaEOBxdTVc3Vot_oGd1GrjIgAkhIHcdynA4QIIAykWXo89VKwDQKMDPmyls1N-dZ_e-h1LR8yYDBW3tDXJf_nty2AIcCCkg_-_EIfDFnT4APvs5d_vEDz1awMnVjuW7Jy-0sSa4vohPVX_J1QNP33PqNRDG48y9dOnDK2LUEVux-GJXK3NENlAuINpimrxngENWnmsWc.8FsapR0XQ0rbs3d2t4Lg2JG1YIK7kjz8taPeGOzdRNU&dib_tag=se&keywords=most%2Bexpensive%2Bgolf%2Bcart&qid=1783517141&s=sporting-goods&sr=1-12&th=1&linkCode=ll2&tag=techbot00-20&linkId=d8199c61944c15160998f1278a31e1fd&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  }
];

const blogPosts = [
  {
    id: 6,
    title: "GO UP Stylish & Lightweight Electric Golf Caddie Review: Dual System",
    excerpt: "The GOUP dual golf cart system includes two lithium-powered electric caddies with LED displays and insulated coolers. Lightweight and professional-grade at $7,500.",
    image: "https://picsum.photos/seed/golfcaddie/600/400",
    link: "https://www.amazon.com/dp/B0GR9JYP7M?psc=1&pd_rd_i=B0GR9JYP7M&pd_rd_w=aKjlR&content-id=amzn1.sym.4a7f44df-467c-45a1-af5f-91661a6df2f9&pf_rd_p=4a7f44df-467c-45a1-af5f-91661a6df2f9&pf_rd_r=XPGKE3XZWN7KKJ4HXR9P&pd_rd_wg=ouear&pd_rd_r=1b985000-01ca-4486-b02f-487217473beb&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWwy&linkCode=ll2&tag=techbot00-20&linkId=db9edcabe550b970e76e67602ec757b4&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 7,
    title: "PGM NSR V 18-Piece Complete Golf Club Set Review: Premium Performance for $990",
    excerpt: "The PGM NSR V set includes an adjustable loft titanium driver, precision-weighted fairway woods, forged irons, CNC milled putter, and stand bag. A complete bag for serious golfers.",
    image: "https://picsum.photos/seed/golfclubs1/600/400",
    link: "https://www.amazon.com/PGM-Piece-Mens-Complete-Golf/dp/B0F5MTZTF9?crid=2VDTOSVX6EUML&dib=eyJ2IjoiMSJ9.jEs3qHHxod3ikOqrpNK9puvKghYNWurcpfbTY2PFTJfrjp5iC-iVrpSvv2asRZ9yV420PFxBxN7Bhq2Kput2YdKvb1asIa5bXRxbvN8s6U8iwWY3Vf9hHjVpKD_LEFLy6Do-67Xe2jhzxaWOHhvjXWKriEKS30Fi6Ppdb_7x_9RdegXDc3-zKqVURIGkqciZRdyEQwQV1img_gN-vF8_msjDlOHQgBaGjB653jdI_aU.Rn9clKSiyHMVMBmmBNpOv84cycNENZZ0KnL7Qy6Oruk&dib_tag=se&keywords=most%2Bexpensive%2Bgolf%2Bclub%2Bset&qid=1783516457&sprefix=most%2Bexpensive%2Bgolf%2Caps%2C219&sr=8-4-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&th=1&linkCode=ll2&tag=techbot00-20&linkId=928ba76ea0b6fa84feefc0357686e983&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 8,
    title: "Callaway Golf 2026 XR Complete Set Review: Premium Performance",
    excerpt: "The Callaway 2026 XR complete golf set delivers pro-level quality with a premium driver, fairway woods, hybrids, irons, wedges, and putter. A top-tier package at $1,599.99.",
    image: "https://picsum.photos/seed/golfclubs2/600/400",
    link: "https://www.amazon.com/CG-PK-XR-Complete-Set/dp/B0FH5VVFVK?crid=2VDTOSVX6EUML&dib=eyJ2IjoiMSJ9.vzetvR-6dr0o5xb3CMIkdFARI8HhdxuquBqInyxyDAbIj25FiRyDU4wGguBo16ocX5PlYqbBG9IDKfJPvq9wNPgchVw8DQoO6glCXDqynvzvaF-C8xehpKOb31oDikfhrFWyVsjIZQ3n1sSfI0VJvY3FDAtbXCSgFAkpCzDkAsb4YwrfHzyCV4KrUDCOqdFp_jUq6ivj9Tyr3DAZzQmzsBz5Trf9aXttTSb_Lg0ZIUA.c-FpD8MkHkKJLdvmVV8sj8jJlUVIuBXUdD0gZPPQs_k&dib_tag=se&keywords=most%2Bexpensive%2Bgolf%2Bclub%2Bset&qid=1783516586&sprefix=most%2Bexpensive%2Bgolf%2Caps%2C219&sr=8-9&th=1&linkCode=ll2&tag=techbot00-20&linkId=9450922e15738663a90ac976788b8961&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 9,
    title: "TaylorMade Qi Max Irons Review: Graphite Regular Left-Hand 5-PW+AW Set",
    excerpt: "The TaylorMade Qi Max irons deliver premium performance with graphite regular shafts in a left-hand 5-PW+AW set. Top-tier feel and forgiveness at $1,199.99.",
    image: "https://picsum.photos/seed/golfclubs3/600/400",
    link: "https://www.amazon.com/dp/B0G2TCMHH3?pd_rd_i=B0G2TCMHH3&pd_rd_w=cnneO&content-id=amzn1.sym.4f5afe61-a551-4f21-a495-c7c4f2997a96&pf_rd_p=4f5afe61-a551-4f21-a495-c7c4f2997a96&pf_rd_r=1CM33SQD9GSAEA3B2EFB&pd_rd_wg=rqEDA&pd_rd_r=64fcb83f-cdac-4c4b-a2b9-b34c06615515&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfdGhlbWF0aWM&th=1&linkCode=ll2&tag=techbot00-20&linkId=6f2e125ab096970d2b66a89a592ee4c6&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 10,
    title: "PGM 27-Piece Complete Golf Set Review: USGA Certified Premium Kit",
    excerpt: "The PGM 27-piece set is R&A and USGA certified with adjustable driver, woods, hybrids, irons, wedges, putter, and stand bag. A pro-level complete bag at $1,999.99.",
    image: "https://picsum.photos/seed/golfclubs4/600/400",
    link: "https://www.amazon.com/dp/B0G2PLVT2Z?pd_rd_i=B0G2PLVT2Z&pd_rd_w=PPNNM&content-id=amzn1.sym.4f5afe61-a551-4f21-a495-c7c4f2997a96&pf_rd_p=4f5afe61-a551-4f21-a495-c7c4f2997a96&pf_rd_r=H4MPND4MYNGFP5QFDSAY&pd_rd_wg=PMeyb&pd_rd_r=7e7a20e6-f85c-4632-916e-8221c5f28770&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfdGhlbWF0aWM&th=1&linkCode=ll2&tag=techbot00-20&linkId=0c8b218ad63ba2b90d2f57ee676412cd&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 11,
    title: "Srixon ZXi Iron Set Review: 4-PW Steel Stiff Right Hand",
    excerpt: "The Srixon ZXi 4-PW iron set delivers premium forged performance with steel stiff shafts. A tour-caliber iron set for serious golfers at $1,399.99.",
    image: "https://picsum.photos/seed/golfclubs5/600/400",
    link: "https://www.amazon.com/dp/B0DT3GGD4C?sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfcmlnaHRfc2hhcmVk&th=1&linkCode=ll2&tag=techbot00-20&linkId=ead9ab90b25247b723a03a608c5866df&language=en_US&ref_=as_li_ss_tl",
    date: "July 8, 2026"
  },
  {
    id: 12,
    title: "5 Best Golf Cart Upgrades for 2026",
    excerpt: "From lithium batteries to LED lighting, here are the top upgrades to transform your golf cart this year.",
    image: "https://picsum.photos/seed/golfupgrade/600/400",
    link: "#",
    date: "July 3, 2026"
  },
  {
    id: 13,
    title: "Golf Cart Maintenance Guide: Keep Your Cart Running",
    excerpt: "Regular maintenance extends the life of your golf cart. Follow our seasonal checklist.",
    image: "https://picsum.photos/seed/golfmaintenance/600/400",
    link: "#",
    date: "June 25, 2026"
  },
  {
    id: 14,
    title: "Electric vs Gas Golf Carts: Pros and Cons",
    excerpt: "We break down the costs, performance, and environmental impact of each option.",
    image: "https://picsum.photos/seed/golfcompare/600/400",
    link: "#",
    date: "June 18, 2026"
  },
  {
    id: 15,
    title: "Essential Golf Supplies Every Golfer Needs",
    excerpt: "From premium golf balls to the perfect stand bag, here's what to pack for your next round.",
    image: "https://picsum.photos/seed/golfsupplies/600/400",
    link: "#",
    date: "June 15, 2026"
  }
];
