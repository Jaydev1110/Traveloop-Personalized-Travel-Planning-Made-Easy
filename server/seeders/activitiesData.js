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
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Kasol",
    name: "Parvati riverside nature walk",
    type: "sightseeing",
    description:
      "Easy riverside trail through pine woods with views of the valley and small cafés — ideal for acclimatising on day one.",
    cost: 0.0,
    duration_hrs: 2.5,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Kasol",
    name: "Israeli street food tasting",
    type: "food",
    description:
      "Sample hummus, shakshuka, and fresh pitas at cafés along the main strip with your guide sharing how the scene grew here.",
    cost: 450.0,
    duration_hrs: 1.5,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Kasol",
    name: "Chalal village & cafe hop",
    type: "culture",
    description:
      "Short forest path to Chalal for wooden cafés, live music on weekends, and slower mountain village energy.",
    cost: 200.0,
    duration_hrs: 3.0,
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Kasol",
    name: "Morning yoga by the river",
    type: "wellness",
    description:
      "Gentle Hatha flow and breathwork session facing the Parvati — mats and tea included at a local studio.",
    cost: 500.0,
    duration_hrs: 1.0,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Kasol",
    name: "Wool shawls & hippie market browse",
    type: "shopping",
    description:
      "Handloom shawls, dreamcatchers, and trek gear stalls — best for souvenirs after you know your route dates.",
    cost: 0.0,
    duration_hrs: 1.5,
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Manali",
    name: "Hadimba Devi temple heritage walk",
    type: "culture",
    description:
      "Wooden temple framed by deodar forest — short stroll with folklore on Hadimba, photography stops, and local prasad.",
    cost: 0.0,
    duration_hrs: 1.0,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Manali",
    name: "Beas River white-water rafting (seasonal)",
    type: "adventure",
    description:
      "Thrilling graded rapids roughly 45–90 minutes on water with safety briefing and helmets/life jackets supplied.",
    cost: 900.0,
    duration_hrs: 3.5,
    image: "https://images.unsplash.com/photo-1530866495561-507c83c57cfa?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Manali",
    name: "Old Manali café crawl",
    type: "food",
    description:
      "Three-stop tasting flight of apple crumble, yak cheese pizzas, and local siddu + chai at iconic cafés.",
    cost: 800.0,
    duration_hrs: 2.0,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Manali",
    name: "Naggar Castle cultural half-day",
    type: "sightseeing",
    description:
      "Drive to Naggar for wood-and-stone castle views, small gallery, and optional hike extension to Jana waterfall.",
    cost: 1500.0,
    duration_hrs: 5.0,
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Manali",
    name: "Mall Road woollens & gear shopping",
    type: "shopping",
    description:
      "Kullu shawls, socks, and rental jackets — compare quality before you commit; bargaining is common.",
    cost: 0.0,
    duration_hrs: 2.0,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1562979314-bee7453e911c?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Goa",
    name: "Sunset beach hop (South)",
    type: "sightseeing",
    description:
      "Driver-guided loop of quieter coves and sunset cliff viewpoints — swim stops where flags allow.",
    cost: 1800.0,
    duration_hrs: 4.0,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Goa",
    name: "Spice plantation lunch & walk",
    type: "food",
    description:
      "Guided farm walk with betel nut trees, pepper vines, and a traditional Goan lunch spread with feni tasting (optional).",
    cost: 1100.0,
    duration_hrs: 3.0,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Goa",
    name: "Kayak in backwater channels",
    type: "adventure",
    description:
      "Calm mangrove-lined paddles at dawn or dusk — great for wildlife spotting and photography.",
    cost: 1600.0,
    duration_hrs: 2.0,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Goa",
    name: "Latin Quarter heritage walk — Fontainhas",
    type: "culture",
    description:
      "Colourful Iberian lanes, art galleries, and cafés — best in late afternoon light before sundowner.",
    cost: 250.0,
    duration_hrs: 2.0,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Goa",
    name: "Mapusa Friday market souvenirs",
    type: "shopping",
    description:
      "Basketware, pickles, sausages, beachwear stalls — chaotic fun; keep small change handy.",
    cost: 0.0,
    duration_hrs: 2.5,
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1530866495561-507c83c57cfa?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Rishikesh",
    name: "Ganga Aarti at Triveni Ghat",
    type: "culture",
    description:
      "Evening lamps, chants, and devotional atmosphere — arrive early for seating on steps.",
    cost: 0.0,
    duration_hrs: 1.0,
    image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Rishikesh",
    name: "Intro Ashtanga yoga workshop",
    type: "wellness",
    description:
      "90-minute foundational class at a reputed ashram-influenced studio; props provided.",
    cost: 600.0,
    duration_hrs: 1.5,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Rishikesh",
    name: "Beatles ashram (Rajaji) heritage visit",
    type: "sightseeing",
    description:
      "Explore abandoned meditation domes and graffiti murals inside the park sector — ticketed entry.",
    cost: 600.0,
    duration_hrs: 2.0,
    image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Rishikesh",
    name: "Café street thali night",
    type: "food",
    description:
      "Guided picks between Laksman Jhula eateries — North Indian thali progression with chai stops.",
    cost: 550.0,
    duration_hrs: 2.0,
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Rishikesh",
    name: "Spiritual bookstores & incense shopping",
    type: "shopping",
    description:
      "Pickup meditation cushions, incense, and texts — supportive for continuing practice back home.",
    cost: 0.0,
    duration_hrs: 1.0,
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Udaipur",
    name: "Sunset boat on Lake Pichola",
    type: "sightseeing",
    description:
      "Shared or private rowing experience as palaces glow gold — timings vary by season.",
    cost: 400.0,
    duration_hrs: 1.0,
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Udaipur",
    name: "Lake-view rooftop Rajasthani dinner",
    type: "food",
    description:
      "Laal maas / safed maas menu choices with live folk optional — bookings essential in high season.",
    cost: 2200.0,
    duration_hrs: 2.0,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Udaipur",
    name: "Sunrise hike to jungle viewpoint",
    type: "adventure",
    description:
      "Short escarpment trail with guide for golden light over the city — moderate fitness.",
    cost: 900.0,
    duration_hrs: 2.5,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Udaipur",
    name: "Ayurvedic abhyanga massage",
    type: "wellness",
    description:
      "Traditional oil massage and steam at a heritage hotel spa — great after flights or long drives.",
    cost: 3500.0,
    duration_hrs: 1.5,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Udaipur",
    name: "Hathi Pol miniatures & gemstone browse",
    type: "shopping",
    description:
      "Paintings on silk, silver toe rings, and ethically sourced gemstones — authenticity varies; ask for workshops.",
    cost: 0.0,
    duration_hrs: 2.0,
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Munnar",
    name: "Eravikulam National Park safari bus",
    type: "sightseeing",
    description:
      "Shola grasslands and chance Nilgiri tahr sightings — park buses run weather-permitting windows.",
    cost: 200.0,
    duration_hrs: 4.0,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Munnar",
    name: "Top Station panorama drive",
    type: "adventure",
    description:
      "Winding jeep or cab route to viewpoint straddling Tamil Nadu border — clouds can steal the view (luck matters).",
    cost: 1800.0,
    duration_hrs: 5.0,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Munnar",
    name: "Kerala sadya lunch experience",
    type: "food",
    description:
      "Plantain leaf service with 20+ vegetarian sides, payasam finish — served mid-day in local restaurants.",
    cost: 350.0,
    duration_hrs: 1.5,
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Munnar",
    name: "Mattupetty Dam picnic & walk",
    type: "sightseeing",
    description:
      "Boating optional; easy lakeside stroll and photo stops with tea gardens as backdrop.",
    cost: 300.0,
    duration_hrs: 2.5,
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80",
  },
  {
    city_name: "Munnar",
    name: "Spice garden shopping stop",
    type: "shopping",
    description:
      "Cardamom, vanilla, and organic oils — short tour then purchase room; negotiate bundles politely.",
    cost: 150.0,
    duration_hrs: 2.0,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80",
  },
];
