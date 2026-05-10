/**
 * Starter cities for Traveloop (read-only catalogue in production).
 * Each object matches Sequelize field names used by the City model.
 *
 * Highlights / eateries / tips are stored as JSON in MySQL.
 */

module.exports = [
  {
    name: "Kasol",
    state: "Himachal Pradesh",
    region: "North",
    cost_index: "budget",
    description:
      "A laid-back Himalayan village beside the Parvati River — known as a gateway to trekking routes, trout cafés, and pine-forested trails. Kasol mixes backpacker vibes with postcard views and cool mountain air year-round.",
    hero_image: "/uploads/cities/kasol-hero.jpg",
    highlights: ["Parvati River walks", "Kheerganga trekking", "Israeli bakeries & cafés", "Hot springs nearby", "Stargazing in clear skies"],
    eateries: [
      { name: "Evergreen Café", type: "Café" },
      { name: "Moon Dancing", type: "Multi-cuisine" },
      { name: "Bhoj Restaurant", type: "North Indian" },
    ],
    tips: [
      "Best visited Mar–Jun and Sep–Nov for comfortable trekking weather.",
      "Carry cash — ATMs can be unreliable in peak season.",
      "Respect local villages; avoid loud music near residential areas.",
    ],
  },
  {
    name: "Manali",
    state: "Himachal Pradesh",
    region: "North",
    cost_index: "mid",
    description:
      "A classic hill station on the Beas River with apple orchards, adventure sports, and easy access to Solang Valley and Rohtang-style snow views. Great for road trippers, honeymooners, and winter sports fans alike.",
    hero_image: "/uploads/cities/manali-hero.jpg",
    highlights: ["Solang Valley activities", "Old Manali cafés", "Hadimba Devi Temple", "River rafting", "Snow points (seasonal)"],
    eateries: [
      { name: "Johnson’s Café", type: "Continental / Indian" },
      { name: "Casa Bella Vista", type: "Pizza / Italian" },
      { name: "Drifter’s Café", type: "Café" },
    ],
    tips: [
      "Book Rohtang / Atal Tunnel permits in advance when required.",
      "Layer clothing — mornings and evenings cool even in summer.",
      "Altitude + winding roads — plan rest days if you’re new to hills.",
    ],
  },
  {
    name: "Goa",
    state: "Goa",
    region: "West",
    cost_index: "mid",
    description:
      "Sun-soaked beaches, Portuguese-era churches, seafood shacks, and night markets — Goa mixes coastal chill with colourful heritage in Old Goa and lively strips along the Arabian Sea.",
    hero_image: "/uploads/cities/goa-hero.jpg",
    highlights: ["Beach sunsets", "Churches of Old Goa", "Spice plantations", "Dudhsagar (monsoon greens)", "Latin Quarter walks"],
    eateries: [
      { name: "Martin’s Corner", type: "Goan Seafood" },
      { name: "Vinayak Family Restaurant", type: "Fish thali" },
      { name: "Burger House", type: "Casual eats" },
    ],
    tips: [
      "Monsoon Jun–Sep is lush but seas can be rough — check beach flags.",
      "Rent scooters with helmets; police checks are common.",
      "Sunday markets in Arpora are fun but arrive early.",
    ],
  },
  {
    name: "Rishikesh",
    state: "Uttarakhand",
    region: "North",
    cost_index: "budget",
    description:
      "The ‘Yoga Capital of the World’ on the banks of the Ganga — famous for ashrams, white-water rafting, evening Ganga aarti at Triveni Ghat, and forested trails toward waterfalls and viewpoints.",
    hero_image: "/uploads/cities/rishikesh-hero.jpg",
    highlights: ["River rafting", "Laxman & Ram Jhula", "Beatles ashram ruins", "Ganga aarti", "Neer Garh waterfall"],
    eateries: [
      { name: "Chatsang Café", type: "Café / vegan" },
      { name: "Little Buddha Café", type: "Multi-cuisine" },
      { name: "Mohit’s Fast Food", type: "North Indian snacks" },
    ],
    tips: [
      "Respect rituals at ghats — dress modestly for temple visits.",
      "Avoid rafting in extreme monsoon flows; guides will advise.",
      "Carry mosquito repellent for evenings near the river.",
    ],
  },
  {
    name: "Udaipur",
    state: "Rajasthan",
    region: "West",
    cost_index: "premium",
    description:
      "The City of Lakes — palaces mirrored in Pichola, rooftop dinners, puppet shows, and marble courtyards. Udaipur feels romantic at sunset when lights shimmer on the water and temples ring softly across the ridges.",
    hero_image: "/uploads/cities/udaipur-hero.jpg",
    highlights: ["City Palace tour", "Boat rides on Lake Pichola", "Jagmandir sunset", "Vintage car museum", "Monsoon palace views"],
    eateries: [
      { name: "Ambrai Restaurant", type: "Lake-view dining" },
      { name: "Natraj Dining Hall", type: "Thali / vegetarian" },
      { name: "Millets of Mewar", type: "Organic / Rajasthani" },
    ],
    tips: [
      "Book palace / boat tickets ahead in peak tourist season.",
      "Summers are hot Apr–Jun — plan outings for early mornings.",
      "Comfortable footwear for palace ramps and uneven stone steps.",
    ],
  },
  {
    name: "Munnar",
    state: "Kerala",
    region: "South",
    cost_index: "mid",
    description:
      "Rolling tea estates, misty viewpoints, and cool breezes across the Western Ghats. Munnar is ideal for plantation walks, endemic wildlife sightings, and slow drives through emerald hills patterned with tea bushes.",
    hero_image: "/uploads/cities/munnar-hero.jpg",
    highlights: ["Tea estate walks", "Eravikulam (Nilgiri tahr)", "Top Station views", "Mattupetty Dam", "Spice garden tours"],
    eateries: [
      { name: "Saravana Bhavan", type: "South Indian" },
      { name: "Rapsy Restaurant", type: "Multi-cuisine" },
      { name: "Tea county buffets", type: "Resort dining" },
    ],
    tips: [
      "Carry light rainwear — clouds can surprise even in dry months.",
      "Nilgiri tahr sightings depend on sanctuary timings and weather.",
      "Book homestays early during long weekends and flower season.",
    ],
  },
];
