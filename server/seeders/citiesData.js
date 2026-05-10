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
    hero_image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
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
    name: "Mcleodganj",
    state: "Himachal Pradesh",
    region: "North",
    cost_index: "budget",
    description:
      "A hillside town near Dharamshala — home of the Dalai Lama, Tibetan monasteries, and panoramic Dhauladhar views. Great for momos, meditation, and mountain walks.",
    hero_image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    highlights: ["Tsuglagkhang Complex", "Triund trek", "Bhagsunag waterfall", "Tibetan market", "Namgyal Monastery"],
    eateries: [
      { name: "Illiterati Café", type: "Books & coffee" },
      { name: "Tibet Kitchen", type: "Tibetan" },
      { name: "Nick's Italian", type: "Italian / Pizza" },
    ],
    tips: [
      "Triund permits are needed in peak season — book ahead.",
      "Respect monastery silence and dress modestly.",
      "Monsoons bring landslides — check road conditions Jul–Sep.",
    ],
  },
  {
    name: "Bir Billing",
    state: "Himachal Pradesh",
    region: "North",
    cost_index: "budget",
    description:
      "India's paragliding capital set in the Kangra valley — tandem flights, Tibetan colonies, and laid-back cafés surrounded by tea gardens and pine-covered ridges.",
    hero_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    highlights: ["Tandem paragliding", "Bir Tibetan Colony", "Chokling Monastery", "Sunset at landing site", "Mountain biking trails"],
    eateries: [
      { name: "June 16 Café", type: "Café" },
      { name: "Garden Café", type: "Multi-cuisine" },
      { name: "Vairagi Café", type: "Organic / Vegan" },
    ],
    tips: [
      "Oct–Nov is peak paragliding season with best thermals.",
      "Book flights with certified operators only.",
      "Carry warm layers — evenings cool fast at altitude.",
    ],
  },
  {
    name: "Spiti Valley",
    state: "Himachal Pradesh",
    region: "North",
    cost_index: "budget",
    description:
      "A cold desert at 12,000+ feet — monasteries perched on barren ridges, fossil-rich beds, and roads that challenge even seasoned travelers. Spiti rewards with silence and scale.",
    hero_image: "https://images.unsplash.com/photo-1585302378878-2fa1a4973e4a?auto=format&fit=crop&w=800&q=80",
    highlights: ["Key Monastery", "Chandratal Lake", "Fossil hunting in Langza", "Pin Valley", "Stargazing at Komic"],
    eateries: [
      { name: "Sol Café, Kaza", type: "Café / Bakery" },
      { name: "Local dhabas", type: "Himachali thali" },
    ],
    tips: [
      "Roads open Jun–Oct only; plan around weather.",
      "Carry altitude sickness medication and acclimatise slowly.",
      "Fuel up in Kaza — next station is hours away.",
    ],
  },
  {
    name: "Manali",
    state: "Himachal Pradesh",
    region: "North",
    cost_index: "mid",
    description:
      "A classic hill station on the Beas River with apple orchards, adventure sports, and easy access to Solang Valley and Rohtang-style snow views. Great for road trippers, honeymooners, and winter sports fans alike.",
    hero_image: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=800&q=80",
    highlights: ["Solang Valley activities", "Old Manali cafés", "Hadimba Devi Temple", "River rafting", "Snow points (seasonal)"],
    eateries: [
      { name: "Johnson's Café", type: "Continental / Indian" },
      { name: "Casa Bella Vista", type: "Pizza / Italian" },
      { name: "Drifter's Café", type: "Café" },
    ],
    tips: [
      "Book Rohtang / Atal Tunnel permits in advance when required.",
      "Layer clothing — mornings and evenings cool even in summer.",
      "Altitude + winding roads — plan rest days if you're new to hills.",
    ],
  },
  {
    name: "Rishikesh",
    state: "Uttarakhand",
    region: "North",
    cost_index: "budget",
    description:
      "The 'Yoga Capital of the World' on the banks of the Ganga — famous for ashrams, white-water rafting, evening Ganga aarti at Triveni Ghat, and forested trails toward waterfalls and viewpoints.",
    hero_image: "https://images.unsplash.com/photo-1600100397608-e5e54cac4c24?auto=format&fit=crop&w=800&q=80",
    highlights: ["River rafting", "Laxman & Ram Jhula", "Beatles ashram ruins", "Ganga aarti", "Neer Garh waterfall"],
    eateries: [
      { name: "Chatsang Café", type: "Café / vegan" },
      { name: "Little Buddha Café", type: "Multi-cuisine" },
      { name: "Mohit's Fast Food", type: "North Indian snacks" },
    ],
    tips: [
      "Respect rituals at ghats — dress modestly for temple visits.",
      "Avoid rafting in extreme monsoon flows; guides will advise.",
      "Carry mosquito repellent for evenings near the river.",
    ],
  },
  {
    name: "Kedarnath",
    state: "Uttarakhand",
    region: "North",
    cost_index: "mid",
    description:
      "One of the holiest Hindu shrines at 11,755 ft — a challenging 16 km trek through dramatic Himalayan terrain to an ancient Shiva temple backed by snow peaks.",
    hero_image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80",
    highlights: ["Kedarnath Temple", "Gandhi Sarovar", "Bhairavnath Temple", "Helicopter darshan", "Alpine meadows"],
    eateries: [
      { name: "Chai stalls on trek", type: "Tea & snacks" },
      { name: "Gaurikund eateries", type: "North Indian" },
    ],
    tips: [
      "Season is May–Jun and Sep–Oct; temple closes in winter.",
      "Physical fitness is essential for the 16 km trek.",
      "Book helicopter tickets well in advance if needed.",
    ],
  },
  {
    name: "Auli",
    state: "Uttarakhand",
    region: "North",
    cost_index: "mid",
    description:
      "India's premier skiing destination with panoramic views of Nanda Devi and surrounding peaks. In summer, Auli transforms into lush green meadows perfect for trekking.",
    hero_image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=800&q=80",
    highlights: ["Skiing slopes", "Auli ropeway", "Gorson Bugyal", "Nanda Devi views", "Artificial lake"],
    eateries: [
      { name: "GMVN Cafeteria", type: "North Indian" },
      { name: "Local dhabas", type: "Garhwali cuisine" },
    ],
    tips: [
      "Skiing season is Jan–Mar; summer trekking Jun–Sep.",
      "Cable car to Gurson is a must-do for panoramic views.",
      "Carry thermals and snow gear in winter.",
    ],
  },
  {
    name: "Jaisalmer",
    state: "Rajasthan",
    region: "West",
    cost_index: "mid",
    description:
      "The 'Golden City' rising from the Thar Desert — a living fort, camel safaris at sunset, and golden sandstone havelis that glow amber in the evening light.",
    hero_image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
    highlights: ["Jaisalmer Fort (living fort)", "Sam sand dunes", "Patwon ki Haveli", "Desert camping", "Gadisar Lake"],
    eateries: [
      { name: "Desert Boy's Dhani", type: "Rajasthani" },
      { name: "Free Tibet", type: "Café / Tibetan" },
      { name: "1st Gate Home Fusion", type: "Fusion" },
    ],
    tips: [
      "Oct–Mar is best; summers are extremely hot.",
      "Book desert camp with reputable operators.",
      "Carry sun protection and plenty of water.",
    ],
  },
  {
    name: "Udaipur",
    state: "Rajasthan",
    region: "West",
    cost_index: "premium",
    description:
      "The City of Lakes — palaces mirrored in Pichola, rooftop dinners, puppet shows, and marble courtyards. Udaipur feels romantic at sunset when lights shimmer on the water and temples ring softly across the ridges.",
    hero_image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
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
    name: "Jodhpur",
    state: "Rajasthan",
    region: "West",
    cost_index: "mid",
    description:
      "The 'Blue City' crowned by Mehrangarh Fort — vivid indigo houses, bustling markets, spicy mirchi vada, and desert heritage that spans centuries of Marwar history.",
    hero_image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    highlights: ["Mehrangarh Fort", "Blue City walks", "Clock Tower market", "Umaid Bhawan Palace", "Mandore Gardens"],
    eateries: [
      { name: "Jhankar Choti Haveli", type: "Rajasthani" },
      { name: "Shri Mishrilal Hotel", type: "Makhaniya lassi" },
      { name: "Indique", type: "Rooftop dining" },
    ],
    tips: [
      "Visit Mehrangarh early morning for fewer crowds and cooler temps.",
      "The zipline at the fort is worth doing.",
      "Best season is Oct–Mar; summers are punishing.",
    ],
  },
  {
    name: "Pushkar",
    state: "Rajasthan",
    region: "West",
    cost_index: "budget",
    description:
      "A sacred lakeside town with the only Brahma temple in the world. Famous for its annual camel fair, ghats, and relaxed bohemian café culture.",
    hero_image: "https://images.unsplash.com/photo-1586612438666-ffd032e8d608?auto=format&fit=crop&w=800&q=80",
    highlights: ["Pushkar Lake & ghats", "Brahma Temple", "Camel Fair (Nov)", "Sunset from Savitri Temple", "Café culture"],
    eateries: [
      { name: "Sunset Café", type: "Café / Rooftop" },
      { name: "Out of the Blue", type: "Multi-cuisine" },
      { name: "Honey & Spice", type: "Organic bakery" },
    ],
    tips: [
      "Pushkar is vegetarian and alcohol-free in most areas.",
      "Beware of 'Pushkar passport' scam at the ghats.",
      "The camel fair in Nov is magical — book months ahead.",
    ],
  },
  {
    name: "Goa",
    state: "Goa",
    region: "West",
    cost_index: "mid",
    description:
      "Sun-soaked beaches, Portuguese-era churches, seafood shacks, and night markets — Goa mixes coastal chill with colourful heritage in Old Goa and lively strips along the Arabian Sea.",
    hero_image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    highlights: ["Beach sunsets", "Churches of Old Goa", "Spice plantations", "Dudhsagar (monsoon greens)", "Latin Quarter walks"],
    eateries: [
      { name: "Martin's Corner", type: "Goan Seafood" },
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
    name: "Coorg",
    state: "Karnataka",
    region: "South",
    cost_index: "mid",
    description:
      "The 'Scotland of India' — misty coffee plantations, waterfalls, spice estates, and Kodava heritage. Perfect for slow weekends and nature lovers.",
    hero_image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
    highlights: ["Abbey Falls", "Raja's Seat", "Coffee plantation tours", "Dubare Elephant Camp", "Talacauvery"],
    eateries: [
      { name: "Raintree", type: "Kodava cuisine" },
      { name: "Big Cup Café", type: "Coffee / snacks" },
      { name: "East End Hotel", type: "South Indian" },
    ],
    tips: [
      "Oct–Mar is ideal; monsoons are heavy but beautiful.",
      "Own transport is recommended — public transit is limited.",
      "Try the local pandi curry and akki rotti.",
    ],
  },
  {
    name: "Hampi",
    state: "Karnataka",
    region: "South",
    cost_index: "budget",
    description:
      "A UNESCO World Heritage Site — boulder-strewn landscapes hiding Vijayanagara ruins, ornate temples, and a creative backpacker culture on the 'hippie island' side.",
    hero_image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
    highlights: ["Virupaksha Temple", "Vittala Temple & stone chariot", "Matanga Hill sunrise", "Coracle rides", "Boulder climbing"],
    eateries: [
      { name: "Mango Tree", type: "Riverside / Multi-cuisine" },
      { name: "Tarana Café", type: "Café / Israeli" },
      { name: "Laughing Buddha", type: "Hippie café" },
    ],
    tips: [
      "Rent a bicycle or moped to cover ruins spread over a large area.",
      "Oct–Feb is best; summers exceed 40°C.",
      "Respect the heritage — don't climb restricted monuments.",
    ],
  },
  {
    name: "Munnar",
    state: "Kerala",
    region: "South",
    cost_index: "mid",
    description:
      "Rolling tea estates, misty viewpoints, and cool breezes across the Western Ghats. Munnar is ideal for plantation walks, endemic wildlife sightings, and slow drives through emerald hills patterned with tea bushes.",
    hero_image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
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
  {
    name: "Alleppey",
    state: "Kerala",
    region: "South",
    cost_index: "mid",
    description:
      "The 'Venice of the East' — palm-fringed backwater canals, houseboat cruises, coir villages, and golden sunsets over Vembanad Lake.",
    hero_image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    highlights: ["Houseboat overnight", "Alleppey Beach", "Backwater canoe rides", "Coir village visits", "Nehru Trophy boat race (Aug)"],
    eateries: [
      { name: "Dreamers Café", type: "Café / Bakery" },
      { name: "Thaff Delicacy", type: "Kerala seafood" },
      { name: "Houseboat meals", type: "Traditional Kerala" },
    ],
    tips: [
      "Book houseboats on weekdays for better rates.",
      "Aug–Mar is best; monsoon has charm but can be wet.",
      "Try karimeen pollichathu (pearl spot fish) — a local speciality.",
    ],
  },
  {
    name: "Ooty",
    state: "Tamil Nadu",
    region: "South",
    cost_index: "mid",
    description:
      "The 'Queen of Hill Stations' in the Nilgiri Hills — toy train rides, botanical gardens, eucalyptus forests, and misty lake mornings.",
    hero_image: "https://images.unsplash.com/photo-1573495804664-b1c0812e846b?auto=format&fit=crop&w=800&q=80",
    highlights: ["Nilgiri Mountain Railway", "Ooty Lake", "Botanical Gardens", "Doddabetta Peak", "Tea factory visits"],
    eateries: [
      { name: "Adyar Ananda Bhavan", type: "South Indian" },
      { name: "Earl's Secret", type: "Continental" },
      { name: "Sidewalk Café", type: "Café" },
    ],
    tips: [
      "Book toy train tickets well in advance — they sell out fast.",
      "Apr–Jun and Sep–Nov are best; winters are cold but clear.",
      "Carry woolens even in summer — evenings are chilly.",
    ],
  },
  {
    name: "Varanasi",
    state: "Uttar Pradesh",
    region: "East",
    cost_index: "budget",
    description:
      "One of the world's oldest living cities on the banks of the Ganges — ghats for morning rituals, silk weaving, chaotic lanes, and the eternal flame of Manikarnika.",
    hero_image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=800&q=80",
    highlights: ["Ganga Aarti at Dashashwamedh", "Boat ride at sunrise", "Kashi Vishwanath Temple", "Silk weaving", "Street food walks"],
    eateries: [
      { name: "Blue Lassi", type: "Lassi shop" },
      { name: "Kashi Chat Bhandar", type: "Chaat / Snacks" },
      { name: "Pizzeria Vaatika", type: "Rooftop café" },
    ],
    tips: [
      "Sunrise boat rides are unmissable — book through your ghat.",
      "Dress modestly for temple visits.",
      "Get lost in the lanes — it's half the experience.",
    ],
  },
  {
    name: "Darjeeling",
    state: "West Bengal",
    region: "East",
    cost_index: "mid",
    description:
      "Colonial hill town with the world's best tea, Kanchenjunga sunrise views from Tiger Hill, the iconic toy train, and Tibetan monasteries amidst cloud-wrapped ridges.",
    hero_image: "https://images.unsplash.com/photo-1544634076-a90160ddf44e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Tiger Hill sunrise", "Darjeeling Himalayan Railway", "Happy Valley Tea Estate", "Peace Pagoda", "Mall Road"],
    eateries: [
      { name: "Glenary's", type: "Bakery / Restaurant" },
      { name: "Kunga Restaurant", type: "Tibetan" },
      { name: "Keventers", type: "Colonial café" },
    ],
    tips: [
      "Wake before dawn for Tiger Hill — clear skies reveal Kanchenjunga.",
      "Mar–May and Oct–Dec are best; monsoon is misty and wet.",
      "Buy tea from estates, not Mall Road shops, for better quality.",
    ],
  },
  {
    name: "Gangtok",
    state: "Sikkim",
    region: "Northeast",
    cost_index: "mid",
    description:
      "Capital of Sikkim with monastery-dotted hills, orchid gardens, and sweeping views of Kanchenjunga. Gateway to Nathula Pass and Tsomgo Lake.",
    hero_image: "https://images.unsplash.com/photo-1622308804463-bc6fa5603083?auto=format&fit=crop&w=800&q=80",
    highlights: ["MG Marg promenade", "Rumtek Monastery", "Tsomgo Lake", "Nathula Pass (permit)", "Ropeway rides"],
    eateries: [
      { name: "The Dragon Wok", type: "Sikkimese / Chinese" },
      { name: "Roll House", type: "Street rolls" },
      { name: "Taste of Tibet", type: "Tibetan" },
    ],
    tips: [
      "Inner Line Permits needed for Nathula and north Sikkim.",
      "Mar–Jun and Oct–Dec are best for clear mountain views.",
      "Carry warm clothing — temperatures drop fast at altitude.",
    ],
  },
  {
    name: "Cherrapunji",
    state: "Meghalaya",
    region: "Northeast",
    cost_index: "budget",
    description:
      "One of the wettest places on Earth — living root bridges, dramatic waterfalls, deep limestone caves, and misty cliffs that drop into Bangladesh.",
    hero_image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?auto=format&fit=crop&w=800&q=80",
    highlights: ["Living root bridges", "Nohkalikai Falls", "Mawsmai Caves", "Seven Sisters Falls", "Double-decker root bridge"],
    eateries: [
      { name: "Orange Roots", type: "Café / Khasi cuisine" },
      { name: "Local home-stays", type: "Traditional Khasi meals" },
    ],
    tips: [
      "Root bridge treks require good fitness — 3,500 steps each way.",
      "Oct–May is drier; monsoon is spectacular but treacherous.",
      "Waterproof everything — rain comes without warning.",
    ],
  },
  {
    name: "Ziro",
    state: "Arunachal Pradesh",
    region: "Northeast",
    cost_index: "budget",
    description:
      "A peaceful valley of rice paddies and Apatani tribal heritage. Host of the annual Ziro Music Festival — one of India's finest outdoor music events.",
    hero_image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    highlights: ["Apatani tribal villages", "Ziro Music Festival (Sep)", "Rice paddy walks", "Pine grove treks", "Tarin Fish Farm"],
    eateries: [
      { name: "Ziro Café", type: "Café" },
      { name: "Local homestays", type: "Apatani cuisine" },
    ],
    tips: [
      "Inner Line Permit is mandatory for Arunachal Pradesh.",
      "The music festival in Sep is worth planning your trip around.",
      "Respect tribal customs — always ask before photographing elders.",
    ],
  },
  {
    name: "Rann of Kutch",
    state: "Gujarat",
    region: "West",
    cost_index: "mid",
    description:
      "A surreal white salt desert that stretches to the horizon — especially magical on full moon nights when the salt flats glow silver. The Rann Utsav festival (Nov–Feb) brings culture, crafts, and desert camping.",
    hero_image: "https://images.unsplash.com/photo-1583309219338-a582f1f9ca6b?auto=format&fit=crop&w=800&q=80",
    highlights: ["White Rann moonlight", "Rann Utsav festival", "Kala Dungar viewpoint", "Kutchi handicrafts", "Dholavira ruins"],
    eateries: [
      { name: "Rann Utsav tent dining", type: "Gujarati thali" },
      { name: "Local dhabas, Bhuj", type: "Gujarati snacks" },
    ],
    tips: [
      "Nov–Feb is the only season to visit (rest is flooded).",
      "Full moon nights are the most spectacular.",
      "Book Rann Utsav packages early — they sell out fast.",
    ],
  },
  {
    name: "Andaman Islands",
    state: "Andaman & Nicobar",
    region: "South",
    cost_index: "premium",
    description:
      "Turquoise waters, white sand beaches, coral reefs, and rainforest-covered islands. Havelock and Neil islands offer world-class snorkeling and diving, while Port Blair holds colonial history at Cellular Jail.",
    hero_image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    highlights: ["Radhanagar Beach", "Scuba diving at Havelock", "Cellular Jail light show", "Neil Island coral walks", "Mangrove kayaking"],
    eateries: [
      { name: "New Lighthouse", type: "Seafood" },
      { name: "Full Moon Café", type: "Beach café" },
      { name: "Barefoot Bar", type: "Resort dining" },
    ],
    tips: [
      "Oct–May is best; monsoon closes many island activities.",
      "Book inter-island ferries well in advance.",
      "Carry reef-safe sunscreen — coral conservation matters.",
    ],
  },
];
