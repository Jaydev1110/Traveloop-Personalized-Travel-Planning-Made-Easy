/**
 * Activities linked to catalogue cities by readable `city_name`.
 * seed.js will translate `city_name` → numeric `city_id` after cities are inserted.
 *
 * `type` must match the Activity model ENUM (all lowercase).
 */

module.exports = [
  // ----- Kasol (6) -----
  {
    city_name: "Kasol",
    name: "Kheerganga day trek (guided)",
    type: "adventure",
    description:
      "Full-day forest and meadow trek with river crossings; popular first multi-day style hike with hot-spring payoff at the top (pace-friendly groups available).",
    cost: 1200.0,
    duration_hrs: 8.0,
    image: "/uploads/activities/kasol-kheerganga.jpg",
  },
  {
    city_name: "Kasol",
    name: "Parvati riverside nature walk",
    type: "sightseeing",
    description:
      "Easy riverside trail through pine woods with views of the valley and small cafés — ideal for acclimatising on day one.",
    cost: 0.0,
    duration_hrs: 2.5,
    image: "/uploads/activities/kasol-riverside.jpg",
  },
  {
    city_name: "Kasol",
    name: "Israeli street food tasting",
    type: "food",
    description:
      "Sample hummus, shakshuka, and fresh pitas at cafés along the main strip with your guide sharing how the scene grew here.",
    cost: 450.0,
    duration_hrs: 1.5,
    image: "/uploads/activities/kasol-food-walk.jpg",
  },
  {
    city_name: "Kasol",
    name: "Chalal village & cafe hop",
    type: "culture",
    description:
      "Short forest path to Chalal for wooden cafés, live music on weekends, and slower mountain village energy.",
    cost: 200.0,
    duration_hrs: 3.0,
    image: "/uploads/activities/kasol-chalal.jpg",
  },
  {
    city_name: "Kasol",
    name: "Morning yoga by the river",
    type: "wellness",
    description:
      "Gentle Hatha flow and breathwork session facing the Parvati — mats and tea included at a local studio.",
    cost: 500.0,
    duration_hrs: 1.0,
    image: "/uploads/activities/kasol-yoga.jpg",
  },
  {
    city_name: "Kasol",
    name: "Wool shawls & hippie market browse",
    type: "shopping",
    description:
      "Handloom shawls, dreamcatchers, and trek gear stalls — best for souvenirs after you know your route dates.",
    cost: 0.0,
    duration_hrs: 1.5,
    image: "/uploads/activities/kasol-market.jpg",
  },

  // ----- Manali (6) -----
  {
    city_name: "Manali",
    name: "Solang Valley zipline & rope course",
    type: "adventure",
    description:
      "High-altitude rope activities and seasonal snow play — combo tickets often bundle multiple short adventures.",
    cost: 2500.0,
    duration_hrs: 4.0,
    image: "/uploads/activities/manali-solang.jpg",
  },
  {
    city_name: "Manali",
    name: "Hadimba Devi temple heritage walk",
    type: "culture",
    description:
      "Wooden temple framed by deodar forest — short stroll with folklore on Hadimba, photography stops, and local prasad.",
    cost: 0.0,
    duration_hrs: 1.0,
    image: "/uploads/activities/manali-hadimba.jpg",
  },
  {
    city_name: "Manali",
    name: "Beas River white-water rafting (seasonal)",
    type: "adventure",
    description:
      "Thrilling graded rapids roughly 45–90 minutes on water with safety briefing and helmets/life jackets supplied.",
    cost: 900.0,
    duration_hrs: 3.5,
    image: "/uploads/activities/manali-rafting.jpg",
  },
  {
    city_name: "Manali",
    name: "Old Manali café crawl",
    type: "food",
    description:
      "Three-stop tasting flight of apple crumble, yak cheese pizzas, and local siddu + chai at iconic cafés.",
    cost: 800.0,
    duration_hrs: 2.0,
    image: "/uploads/activities/manali-cafes.jpg",
  },
  {
    city_name: "Manali",
    name: "Naggar Castle cultural half-day",
    type: "sightseeing",
    description:
      "Drive to Naggar for wood-and-stone castle views, small gallery, and optional hike extension to Jana waterfall.",
    cost: 1500.0,
    duration_hrs: 5.0,
    image: "/uploads/activities/manali-naggar.jpg",
  },
  {
    city_name: "Manali",
    name: "Mall Road woollens & gear shopping",
    type: "shopping",
    description:
      "Kullu shawls, socks, and rental jackets — compare quality before you commit; bargaining is common.",
    cost: 0.0,
    duration_hrs: 2.0,
    image: "/uploads/activities/manali-mall-road.jpg",
  },

  // ----- Goa (6) -----
  {
    city_name: "Goa",
    name: "Old Goa churches audio tour",
    type: "culture",
    description:
      "UNESCO-era churches including Basilica of Bom Jesus — history of Portuguese Goa with flexible pacing.",
    cost: 350.0,
    duration_hrs: 2.5,
    image: "/uploads/activities/goa-churches.jpg",
  },
  {
    city_name: "Goa",
    name: "Sunset beach hop (South)",
    type: "sightseeing",
    description:
      "Driver-guided loop of quieter coves and sunset cliff viewpoints — swim stops where flags allow.",
    cost: 1800.0,
    duration_hrs: 4.0,
    image: "/uploads/activities/goa-beaches.jpg",
  },
  {
    city_name: "Goa",
    name: "Spice plantation lunch & walk",
    type: "food",
    description:
      "Guided farm walk with betel nut trees, pepper vines, and a traditional Goan lunch spread with feni tasting (optional).",
    cost: 1100.0,
    duration_hrs: 3.0,
    image: "/uploads/activities/goa-spice.jpg",
  },
  {
    city_name: "Goa",
    name: "Kayak in backwater channels",
    type: "adventure",
    description:
      "Calm mangrove-lined paddles at dawn or dusk — great for wildlife spotting and photography.",
    cost: 1600.0,
    duration_hrs: 2.0,
    image: "/uploads/activities/goa-kayak.jpg",
  },
  {
    city_name: "Goa",
    name: "Latin Quarter heritage walk — Fontainhas",
    type: "culture",
    description:
      "Colourful Iberian lanes, art galleries, and cafés — best in late afternoon light before sundowner.",
    cost: 250.0,
    duration_hrs: 2.0,
    image: "/uploads/activities/goa-fontainhas.jpg",
  },
  {
    city_name: "Goa",
    name: "Mapusa Friday market souvenirs",
    type: "shopping",
    description:
      "Basketware, pickles, sausages, beachwear stalls — chaotic fun; keep small change handy.",
    cost: 0.0,
    duration_hrs: 2.5,
    image: "/uploads/activities/goa-mapusa.jpg",
  },

  // ----- Rishikesh (6) -----
  {
    city_name: "Rishikesh",
    name: "16 km rafting stretch (classic)",
    type: "adventure",
    description:
      "Grade II–III rapids with swims in safe sections — full safety crew and helmets; season-dependent flow.",
    cost: 1400.0,
    duration_hrs: 3.0,
    image: "/uploads/activities/rishikesh-rafting.jpg",
  },
  {
    city_name: "Rishikesh",
    name: "Ganga Aarti at Triveni Ghat",
    type: "culture",
    description:
      "Evening lamps, chants, and devotional atmosphere — arrive early for seating on steps.",
    cost: 0.0,
    duration_hrs: 1.0,
    image: "/uploads/activities/rishikesh-aarti.jpg",
  },
  {
    city_name: "Rishikesh",
    name: "Intro Ashtanga yoga workshop",
    type: "wellness",
    description:
      "90-minute foundational class at a reputed ashram-influenced studio; props provided.",
    cost: 600.0,
    duration_hrs: 1.5,
    image: "/uploads/activities/rishikesh-yoga.jpg",
  },
  {
    city_name: "Rishikesh",
    name: "Beatles ashram (Rajaji) heritage visit",
    type: "sightseeing",
    description:
      "Explore abandoned meditation domes and graffiti murals inside the park sector — ticketed entry.",
    cost: 600.0,
    duration_hrs: 2.0,
    image: "/uploads/activities/rishikesh-beatles.jpg",
  },
  {
    city_name: "Rishikesh",
    name: "Café street thali night",
    type: "food",
    description:
      "Guided picks between Laksman Jhula eateries — North Indian thali progression with chai stops.",
    cost: 550.0,
    duration_hrs: 2.0,
    image: "/uploads/activities/rishikesh-thali.jpg",
  },
  {
    city_name: "Rishikesh",
    name: "Spiritual bookstores & incense shopping",
    type: "shopping",
    description:
      "Pickup meditation cushions, incense, and texts — supportive for continuing practice back home.",
    cost: 0.0,
    duration_hrs: 1.0,
    image: "/uploads/activities/rishikesh-books.jpg",
  },

  // ----- Udaipur (6) -----
  {
    city_name: "Udaipur",
    name: "City Palace guided interiors",
    type: "culture",
    description:
      "Courtyards, mirrored rooms, armoury displays, and balconies over the lake — history-rich deep dive.",
    cost: 800.0,
    duration_hrs: 3.0,
    image: "/uploads/activities/udaipur-palace.jpg",
  },
  {
    city_name: "Udaipur",
    name: "Sunset boat on Lake Pichola",
    type: "sightseeing",
    description:
      "Shared or private rowing experience as palaces glow gold — timings vary by season.",
    cost: 400.0,
    duration_hrs: 1.0,
    image: "/uploads/activities/udaipur-boat.jpg",
  },
  {
    city_name: "Udaipur",
    name: "Lake-view rooftop Rajasthani dinner",
    type: "food",
    description:
      "Laal maas / safed maas menu choices with live folk optional — bookings essential in high season.",
    cost: 2200.0,
    duration_hrs: 2.0,
    image: "/uploads/activities/udaipur-dinner.jpg",
  },
  {
    city_name: "Udaipur",
    name: "Sunrise hike to jungle viewpoint",
    type: "adventure",
    description:
      "Short escarpment trail with guide for golden light over the city — moderate fitness.",
    cost: 900.0,
    duration_hrs: 2.5,
    image: "/uploads/activities/udaipur-hike.jpg",
  },
  {
    city_name: "Udaipur",
    name: "Ayurvedic abhyanga massage",
    type: "wellness",
    description:
      "Traditional oil massage and steam at a heritage hotel spa — great after flights or long drives.",
    cost: 3500.0,
    duration_hrs: 1.5,
    image: "/uploads/activities/udaipur-spa.jpg",
  },
  {
    city_name: "Udaipur",
    name: "Hathi Pol miniatures & gemstone browse",
    type: "shopping",
    description:
      "Paintings on silk, silver toe rings, and ethically sourced gemstones — authenticity varies; ask for workshops.",
    cost: 0.0,
    duration_hrs: 2.0,
    image: "/uploads/activities/udaipur-art.jpg",
  },

  // ----- Munnar (6) -----
  {
    city_name: "Munnar",
    name: "Tea factory & tasting tour",
    type: "culture",
    description:
      "Walk withering to rolling floors, inhale malt notes, steep your own orthodox cup — souvenir shop optional.",
    cost: 450.0,
    duration_hrs: 2.0,
    image: "/uploads/activities/munnar-tea.jpg",
  },
  {
    city_name: "Munnar",
    name: "Eravikulam National Park safari bus",
    type: "sightseeing",
    description:
      "Shola grasslands and chance Nilgiri tahr sightings — park buses run weather-permitting windows.",
    cost: 200.0,
    duration_hrs: 4.0,
    image: "/uploads/activities/munnar-eravikulam.jpg",
  },
  {
    city_name: "Munnar",
    name: "Top Station panorama drive",
    type: "adventure",
    description:
      "Winding jeep or cab route to viewpoint straddling Tamil Nadu border — clouds can steal the view (luck matters).",
    cost: 1800.0,
    duration_hrs: 5.0,
    image: "/uploads/activities/munnar-top-station.jpg",
  },
  {
    city_name: "Munnar",
    name: "Kerala sadya lunch experience",
    type: "food",
    description:
      "Plantain leaf service with 20+ vegetarian sides, payasam finish — served mid-day in local restaurants.",
    cost: 350.0,
    duration_hrs: 1.5,
    image: "/uploads/activities/munnar-sadya.jpg",
  },
  {
    city_name: "Munnar",
    name: "Mattupetty Dam picnic & walk",
    type: "sightseeing",
    description:
      "Boating optional; easy lakeside stroll and photo stops with tea gardens as backdrop.",
    cost: 300.0,
    duration_hrs: 2.5,
    image: "/uploads/activities/munnar-dam.jpg",
  },
  {
    city_name: "Munnar",
    name: "Spice garden shopping stop",
    type: "shopping",
    description:
      "Cardamom, vanilla, and organic oils — short tour then purchase room; negotiate bundles politely.",
    cost: 150.0,
    duration_hrs: 2.0,
    image: "/uploads/activities/munnar-spice-shop.jpg",
  },
];
