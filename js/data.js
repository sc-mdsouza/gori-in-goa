/* =========================================================================
   GORI IN GOA — all the content lives in this one file.
   -------------------------------------------------------------------------
   Everything you see on the site is read from window.GORI below.
   To change a date, a place, a name or a phone number: edit it here, reload.
   Nothing else needs touching.

   Marked with `draft: true` = a placeholder I made up so the page isn't empty.
   Delete the flag once the real details are in.
   ========================================================================= */

window.GORI = {

  meta: {
    name: "Gori in Goa",
    kicker: "An orientation, not a guidebook",
    blurb: "For your first trip to India. Everything I want you to know, eat, see and survive — written by someone who is counting the days.",
    author: "Mitch",
    madeFor: "you",
  },

  /* ---------------------------------------------------------------------
     THE TRIP. Change these two dates first — the countdown reads them.
     --------------------------------------------------------------------- */
  trip: {
    arrivalISO: "2026-12-18T07:00:00+05:30",
    departureISO: "2027-01-04T21:00:00+05:30",
    arrivalPlaceholder: false,     // real date: 18 Dec, landing 7am
    airport: "Dabolim (GOI)",
    base: "South Goa",
    homeVillage: "Colva side",     // shows on the home card and the map
  },

  /* ---------------------------------------------------------------------
     WHO LIVES WHERE ON THE MAP. x/y are positions on the illustrated map
     (0–1000 wide, 0–1240 tall). Nudge them if a pin looks off.
     --------------------------------------------------------------------- */
  homePin: { x: 330, y: 372, label: "Home" },

  /* ---------------------------------------------------------------------
     CALENDAR. Add as many as you like. `cat` picks the colour:
     travel | family | wedding | beach | sunset | trip | celebration | free
     --------------------------------------------------------------------- */
  events: [
    { date: "2026-12-18", time: "07:00", title: "You land", cat: "travel",
      place: "Dabolim Airport (GOI)", note: "I'll be the one holding a sign and pretending I'm not nervous." },

    { date: "2026-12-18", time: "12:30", title: "First lunch at home", cat: "family",
      place: "Home", note: "Nothing ambitious. Rice, fish curry, and a nap with the fan on." },

    { date: "2026-12-19", time: "", title: "Nothing. On purpose.", cat: "free",
      place: "Home", note: "Jet lag is real. Do not book anything before noon." },

    { date: "2026-12-20", time: "10:00", title: "Benaulim beach day", cat: "beach",
      place: "Benaulim", note: "First proper swim. Then lunch at Joecon's." },

    { date: "2026-12-21", time: "19:30", title: "Family dinner", cat: "family",
      place: "Home", note: "Everyone comes over. This is the big one — bring your appetite and your patience." },

    { date: "2026-12-23", time: "16:00", title: "Christmas baking with Mum", cat: "family",
      place: "Home kitchen", note: "You will be given a job. It will be stirring." },

    { date: "2026-12-24", time: "20:00", title: "Christmas Ball", cat: "celebration", draft: true,
      place: "[venue]", note: "The dressy one. Something you can dance in." },

    { date: "2026-12-25", time: "11:00", title: "Melroy & Maria — Roce", cat: "wedding", draft: true,
      place: "[venue]", note: "The ceremony before the wedding. Morning, family, lots of food." },

    { date: "2026-12-25", time: "19:00", title: "Christmas dinner at home", cat: "family",
      place: "Home", note: "Sorpotel, sannas, bebinca. Dress up a little." },

    { date: "2026-12-26", time: "17:00", title: "Melroy & Maria — Wedding", cat: "wedding", draft: true,
      place: "[venue]", note: "The big one. We leave early, it will start late, we stay till the end." },

    { date: "2026-12-27", time: "08:00", title: "North Goa day trip", cat: "trip",
      place: "Panjim · Fontainhas · Miramar", note: "Long day, early start. Pastel houses and a proper bakery stop." },

    { date: "2026-12-28", time: "09:00", title: "Palolem + Agonda overnight", cat: "trip",
      place: "Canacona", note: "One night, two beaches. Bag: swimsuit, sunscreen, nothing else." },

    { date: "2026-12-29", time: "17:00", title: "Sunset at Cabo de Rama", cat: "sunset",
      place: "Cabo de Rama Fort", note: "On the way home from Canacona. Cliffs, sea on both sides." },

    { date: "2026-12-31", time: "20:00", title: "New Year Ball", cat: "celebration", draft: true,
      place: "[venue]", note: "The other dressy one. Pace yourself." },

    { date: "2027-01-02", time: "17:30", title: "Last beach sunset", cat: "beach",
      place: "Colva or Mobor", note: "The one where we get quiet." },

    { date: "2027-01-04", time: "21:00", title: "Fly home", cat: "travel",
      place: "Dabolim Airport (GOI)", note: "We don't talk about this one yet." },
  ],

  /* ---------------------------------------------------------------------
     PLACES. cat: restaurant | cafe | sunset | drive | gaddo
     --------------------------------------------------------------------- */
  places: [
    { id: "country-cafe", name: "Country Cafe", cat: "cafe", area: "Margao", topPick: true,
      blurb: "", tags: [] },

    { id: "minal", name: "Minal", cat: "restaurant", area: "Colva", topPick: true,
      blurb: "", tags: [] },

    { id: "juju", name: "Juju", cat: "restaurant", area: "", topPick: true,
      blurb: "", tags: [] },

    { id: "pentagon", name: "Pentagon", cat: "restaurant", area: "", topPick: true,
      blurb: "", tags: [] },

    { id: "cavatina", name: "Cavatina", cat: "restaurant", area: "", topPick: true,
      blurb: "", tags: [] },

    { id: "cafe-tato", name: "Cafe Tato", cat: "cafe", area: "", topPick: true,
      blurb: "", tags: [] },

    { id: "martins", name: "Martin's Corner", cat: "restaurant", area: "Betalbatim",
      blurb: "The one you take people to. Goan classics done properly, live music most nights, always busier than it looks.",
      tags: ["Goan", "Dinner", "Iconic"], map: { x: 278, y: 330 }, draft: false },

    { id: "zeebop", name: "Zeebop by the Sea", cat: "restaurant", area: "Utorda",
      blurb: "Lunch with your feet almost in the sand. Fish, calamari, cold beer, no rush.",
      tags: ["Seafood", "Lunch", "Beachfront"], map: { x: 268, y: 288 } },

    { id: "joecons", name: "Joecon's", cat: "restaurant", area: "Benaulim",
      blurb: "Garden restaurant minutes from the water. Good first proper Goan meal — the kind of place nobody rushes you out of.",
      tags: ["Garden", "Goan", "Family"], map: { x: 240, y: 400 } },

    { id: "wharf", name: "The Fisherman's Wharf", cat: "restaurant", area: "Cavelossim",
      blurb: "River on one side, sea on the other. Ask for a table outside and order the prawn balchão.",
      tags: ["Riverside", "Goan", "Book ahead"], map: { x: 270, y: 524 } },

    { id: "ritz", topPick: true, name: "Ritz Classic", cat: "restaurant", area: "Panjim",
      blurb: "Fish thali, cheap and legendary. Worth the drive on a Panjim day.",
      tags: ["Thali", "Budget", "Panjim"], map: { x: 470, y: 96 } },

    { id: "dropadi", name: "Dropadi", cat: "restaurant", area: "Palolem",
      blurb: "Beachfront, barefoot, ridiculous sunset. Order too much and stay too long.",
      tags: ["Beachfront", "Palolem", "Sunset"], map: { x: 186, y: 1000 } },

    { id: "cafe-margao", name: "Margao bakery crawl", cat: "cafe", area: "Margao",
      blurb: "Old-school Goan bakeries, poi and bebinca by the box. Three shops, one street, zero regrets.",
      tags: ["Bread", "Sweets", "Add your picks"], draft: true, map: { x: 496, y: 352 } },

    { id: "cafe-palolem", name: "Palolem coffee stop", cat: "cafe", area: "Palolem",
      blurb: "Somewhere to sit with a flat white and watch the beach wake up. Name to be added.",
      tags: ["Coffee", "Add your pick"], draft: true, map: { x: 236, y: 948 } },

    { id: "dessert-margao", name: "Margao sweet shops", cat: "dessert", area: "Margao",
      blurb: "Doce, bebinca, bolinhas, and things you won't recognise. Point at what looks good and buy a box for the house.",
      tags: ["Bebinca", "Doce", "Cash only"], map: { x: 566, y: 372 }, draft: true },

    { id: "dessert-colva", name: "Ice-cream carts, Colva", cat: "dessert", area: "Colva",
      blurb: "Evening carts along the beach road. Kulfi if you're lucky, soft-serve if you're not.",
      tags: ["Evening", "Cheap", "Kid stuff"], map: { x: 300, y: 238 }, draft: true },

    { id: "cocktail-wharf", name: "Sundowners at the Wharf", cat: "cocktail", area: "Cavelossim",
      blurb: "River on one side, sea on the other, and a bar that can make a feni sour without wincing.",
      tags: ["River view", "Feni sour", "Book ahead"], map: { x: 300, y: 540 }, draft: true },

    { id: "cocktail-shack", name: "Beach-shack cocktails", cat: "cocktail", area: "Benaulim",
      blurb: "Plastic chairs, paper umbrellas, a rum punch that is stronger than it has any right to be.",
      tags: ["Beach", "Rum punch", "Sunset"], map: { x: 306, y: 428 }, draft: true },

    { id: "cabo-fort", name: "Cabo de Rama Fort", cat: "sunset", area: "Cabo de Rama",
      blurb: "Cliffs, sea on both sides, nothing between you and the horizon. The best sunset in South Goa, and I will fight about it.",
      tags: ["Fort", "Cliffs", "Sunset"], map: { x: 246, y: 706 } },

    { id: "cola", name: "Cola Beach", cat: "sunset", area: "Near Cabo de Rama",
      blurb: "Palms to the sand, a freshwater lagoon behind you, sea in front. Arrive before five.",
      tags: ["Quiet", "Lagoon", "Hard to park"], map: { x: 224, y: 748 } },

    { id: "mobor", name: "Mobor spit", cat: "sunset", area: "Cavelossim",
      blurb: "Where the Sal river meets the sea. Walk to the point and watch both.",
      tags: ["River mouth", "Walk", "Easy"], map: { x: 242, y: 568 } },

    { id: "agonda-sunset", name: "Agonda", cat: "sunset", area: "Agonda",
      blurb: "Wide, empty, quiet. The beach I'd pick if I had something important to ask you.",
      tags: ["Empty", "Quiet", "Swim with care"], map: { x: 208, y: 904 } },

    { id: "palolem-sunset", name: "Palolem", cat: "sunset", area: "Palolem",
      blurb: "The postcard one. Crowded at golden hour and still worth it.",
      tags: ["Postcard", "Busy", "Sunset"], map: { x: 166, y: 1030 } },

    { id: "drive-coastal", name: "Coastal lane: Colva → Majorda", cat: "drive", area: "South Goa coast",
      blurb: "The slow road behind the beaches. Coconut cover, white churches, stop wherever. Best on a scooter, better in a car with the windows down.",
      tags: ["30 min", "Shaded", "Any time"], map: { x: 318, y: 302 } },

    { id: "drive-cabo", name: "The long way to Cabo de Rama", cat: "drive", area: "Margao → Cabo",
      blurb: "Fields, mango trees, a couple of churches, almost no traffic. Leave at 4, arrive for the light.",
      tags: ["45 min", "Golden hour", "Windows down"], map: { x: 340, y: 620 } },

    { id: "drive-palolem", name: "Palolem → Patnem → Talpona", cat: "drive", area: "Canacona",
      blurb: "Backroad through palms, three beaches in twenty minutes, monkeys if you're lucky.",
      tags: ["20 min", "Monkeys", "Beaches"], map: { x: 204, y: 1066 } },

    { id: "drive-cotigao", name: "Cotigao forest road", cat: "drive", area: "Cotigao",
      blurb: "Cool air, tall trees, the other Goa. Go in the morning and take it slow.",
      tags: ["Forest", "Morning", "Wildlife"], map: { x: 372, y: 1092 } },

    { id: "gaddo-margao", name: "Margao Municipal Market", cat: "gaddo", area: "Margao",
      blurb: "Choris pao, feni, sweets, spice by the scoop. The whole state in one building, and the best ₹100 you'll spend.",
      tags: ["Market", "Choris pao", "Souvenirs"], map: { x: 548, y: 414 } },

    { id: "gaddo-colva", name: "Colva beach road carts", cat: "gaddo", area: "Colva",
      blurb: "Evening carts: cutlet pao, mirchi bhaji, corn, ice cream. Eat standing up, like everyone else.",
      tags: ["Evening", "Cheap", "Crowded"], map: { x: 232, y: 238 } },

    { id: "gaddo-benaulim", name: "Benaulim church square", cat: "gaddo", area: "Benaulim",
      blurb: "Locals' snack stop after mass. Follow the smoke and the queue.",
      tags: ["Evening", "Local", "Snacks"], map: { x: 292, y: 432 } },

    { id: "gaddo-palolem", name: "Palolem main road", cat: "gaddo", area: "Palolem",
      blurb: "Shawarma, momos, doughnuts by the dozen at 11pm. Not Goan, entirely necessary.",
      tags: ["Late night", "Variety", "Cash"], map: { x: 252, y: 1046 } },
  ],

  /* ---------------------------------------------------------------------
     BEACHES. swim: calm | care | caution
     --------------------------------------------------------------------- */
  beaches: [
    { name: "Colva", area: "Colva", vibe: "Busy, families, ice-cream vendors, the Goa people picture.",
      swim: "calm", best: "Morning swim, evening walk", eat: "Colva beach road carts", note: "Our closest proper beach. Loud in the best way." },

    { name: "Benaulim", area: "Benaulim", vibe: "Long, golden, unhurried. Shacks, fishing boats, dogs.",
      swim: "calm", best: "Late afternoon", eat: "Joecon's, then a cart", note: "This is the one I'd call 'our' beach." },

    { name: "Varca", area: "Varca", vibe: "Quieter than its neighbours, resorts on one side, nothing on the other.",
      swim: "care", best: "Sunset", eat: "Shacks along the access road", note: "Good for a walk when you want to talk." },

    { name: "Cavelossim / Mobor", area: "Cavelossim", vibe: "Wide, clean, fancier. River on one side, sea on the other.",
      swim: "calm", best: "Sunset at the spit", eat: "The Fisherman's Wharf", note: "Walk north to where the river cuts in." },

    { name: "Betul", area: "Betul", vibe: "Fishing village, almost no tourists, real Goa.",
      swim: "care", best: "Morning", eat: "Whatever the shack has", note: "Go for the drive and the quiet, not the sunbeds." },

    { name: "Canaguinim", area: "Canaguinim", vibe: "Secluded, rocky in places, you'll have it almost to yourself.",
      swim: "caution", best: "Late afternoon", eat: "Bring water", note: "Beautiful and a little wild. Don't swim alone here." },

    { name: "Agonda", area: "Agonda", vibe: "Three kilometres of nothing. Palms, cows, silence.",
      swim: "care", best: "Sunset", eat: "Beach shacks, book ahead in season", note: "Currents can be strong at the ends. Stay near people." },

    { name: "Palolem", area: "Palolem", vibe: "The bay everyone photographs. Crescent, calm, kayaks, crowds.",
      swim: "calm", best: "Early morning before the boats", eat: "Dropadi", note: "Best swimming bay in the south. Go at 7am." },

    { name: "Patnem", area: "Patnem", vibe: "Palolem's mellow sibling. Yoga, longer walks, fewer people.",
      swim: "care", best: "Sunset", eat: "Beachfront cafés", note: "Walk over the headland from Palolem if you're feeling energetic." },

    { name: "Galgibaga", area: "Canacona", vibe: "Turtle nesting beach. Protected, sparse, almost church-quiet.",
      swim: "caution", best: "Morning", eat: "Nothing — bring snacks", note: "Olive ridley turtles nest here. No lights, no noise, no swimming at night." },

    { name: "Talpona", area: "Canacona", vibe: "River mouth, fishing boats, one shack and a lot of sky.",
      swim: "caution", best: "Late afternoon", eat: "The one shack", note: "Quiet enough to hear yourself think." },
  ],

  /* ---------------------------------------------------------------------
     FAMILY. Replace names + numbers, remove draft: true when real.
     --------------------------------------------------------------------- */
  familyGroups: [
    { name: "The D\u2019Souza\u2019s", note: "Home", members: [
      { name: "Janet", role: "Mom" },
      { name: "Mervin", role: "Dad" },
      { name: "Leena", role: "Grandma", note: "Janet\u2019s mom" },
    ]},

    { name: "The Other D\u2019Souza\u2019s", note: "Mervin\u2019s brother", members: [
      { name: "Joseph", role: "Uncle" },
      { name: "Keerti", role: "Aunt", note: "Joseph\u2019s wife" },
      { name: "Neil", role: "Son" },
      { name: "Meryl", role: "Daughter" },
    ]},

    { name: "The Dias\u2019s", note: "Mervin\u2019s sister, Myola", members: [
      { name: "Myola", role: "Aunt" },
      { name: "Pink", role: "Daughter" },
      { name: "Jovi", role: "Son" },
      { name: "Joel", role: "Son" },
      { name: "Kivy", role: "Jovi\u2019s wife" },
      { name: "Ari", role: "Son", note: "Jovi & Kivy\u2019s boy" },
      { name: "Kennosha", role: "Daughter", note: "Pink\u2019s" },
      { name: "Ella", role: "Daughter", note: "Pink\u2019s" },
      { name: "Victor", role: "Ella\u2019s husband" },
    ]},

    { name: "The Gomes", note: "Mervin\u2019s sister, Reita", members: [
      { name: "Reita", role: "Aunt" },
      { name: "Tony", role: "Reita\u2019s husband" },
      { name: "Luis", role: "Son" },
      { name: "Lizel", role: "Daughter" },
      { name: "Stacy", role: "Luis\u2019s wife" },
    ]},

    { name: "The Fernandes", note: "Janet\u2019s cousin, Jessy", members: [
      { name: "Jessy", role: "Janet\u2019s cousin" },
      { name: "Melvin", role: "Jessy\u2019s husband" },
      { name: "Melroy", role: "Son", note: "the one getting married" },
      { name: "Keith", role: "Son" },
    ]},
  ],

  /* ---------------------------------------------------------------------
     KITCHEN. madeBy: "home" or "out"
     --------------------------------------------------------------------- */
  dishes: [
    { name: "Fish curry rice", madeBy: "home", note: "The state dish. Coconut, kokum, a little heat. Eat it with your hands for the full effect.", tag: "Everyday" },
    { name: "Prawn balchão", madeBy: "home", note: "Fiery, sweet-sour, pickled in vinegar. Ask for less chilli and they'll respect you more.", tag: "The one to fear" },
    { name: "Chicken xacuti", madeBy: "home", note: "Roasted coconut and twenty spices. Dark, rich, the one people remember years later.", tag: "Sunday" },
    { name: "Sorpotel", madeBy: "home", note: "Pork, vinegar, patience. Catholic Christmas in a pot. Better on day three.", tag: "Christmas" },
    { name: "Sannas", madeBy: "home", note: "Steamed rice cakes, faintly sweet, built for soaking up curry.", tag: "Side" },
    { name: "Bebinca", madeBy: "home", note: "Seven layers of coconut and ghee. Christmas in a slice. Take a box home.", tag: "Dessert" },
    { name: "Patoleo", madeBy: "home", note: "Rice, coconut and jaggery steamed in turmeric leaves. Festival food, smells like a holiday.", tag: "Festival" },
    { name: "Choris pao", madeBy: "out", note: "Goan sausage in a crusty pao. The best ₹60 on the planet. Get it from a cart, not a menu.", tag: "Street" },
    { name: "Poi", madeBy: "out", note: "The bread. Slightly sour, pocketed, perfect. Buy it warm at 7am.", tag: "Bakery" },
    { name: "Feni", madeBy: "out", note: "Cashew spirit, 40%, smells like a decision. One sip neat, then decide.", tag: "Drink" },
  ],

  /* ---------------------------------------------------------------------
     BEFORE YOU FLY — checklist. Saved on her phone as she ticks things off.
     --------------------------------------------------------------------- */
  checklist: [
    { text: "Passport valid 6+ months past return", cat: "Paperwork" },
    { text: "India e-Tourist visa approved & printed", cat: "Paperwork" },
    { text: "Flight itinerary + return ticket saved offline", cat: "Paperwork" },
    { text: "Travel insurance (medical + luggage)", cat: "Paperwork" },
    { text: "Photocopy/photo of passport in your phone", cat: "Paperwork" },
    { text: "Card that doesn't charge foreign fees", cat: "Money" },
    { text: "Notify your bank you're travelling", cat: "Money" },
    { text: "Power bank, charged", cat: "Tech" },
    { text: "Download offline maps of South Goa", cat: "Tech" },
    { text: "Prescriptions + a copy of them", cat: "Health" },
    { text: "Mosquito repellent (30%+ DEET or picaridin)", cat: "Health" },
    { text: "Sunscreen SPF 50 — the sun here is personal", cat: "Health" },
    { text: "Sandals you can walk 5km in", cat: "Clothes" },
    { text: "One outfit that covers shoulders + knees", cat: "Clothes" },
    { text: "Four nice outfits — two balls, a wedding, Christmas lunch", cat: "Clothes" },
    { text: "Light cotton everything — it's 32°C in December", cat: "Clothes" },
    { text: "Gifts from home for the family", cat: "Nice" },
    { text: "A book for the 18-hour flight", cat: "Nice" },
  ],

  /* ---------------------------------------------------------------------
     HOW-TOS. Grouped on the guide page.
     --------------------------------------------------------------------- */
  howtos: [
    { group: "Paperwork", title: "The visa, without the panic",
      body: "Apply for the e-Tourist visa online at least a week before you fly — most US passports get it in 3–5 days. Print the approval, don't just screenshot it. Immigration will want the printed copy more often than you'd think." },

    { group: "Money", title: "Cash is still king, but UPI is everywhere",
      body: "Cards work in hotels and nice restaurants; everything else runs on cash or a QR code. Carry ₹5,000–8,000 in small notes. A foreign card can't scan UPI, so cash is your real backup. ATMs are common in Margao and Colva, patchy elsewhere." },

    { group: "Money", title: "What things should cost",
      body: "Beer ₹100–200. Fish thali ₹250–400. Taxi Colva → Palolem ₹1,200–1,500. Beach shack lunch for two with drinks ₹1,200. If a tuk-tuk quotes three times that, smile and walk." },

    { group: "Money", title: "Tipping",
      body: "10% in restaurants if service isn't already added. ₹100–200 for hotel staff, ₹200–500 a day for a driver. Nobody will chase you for it — which is exactly why you should do it." },

    { group: "Staying connected", title: "Getting a SIM",
      body: "A local prepaid SIM (Jio or Airtel) is cheap but needs your passport and a photo, plus a shop that will actually do the paperwork — allow an hour. An eSIM bought before you fly is ten times easier. Do that." },

    { group: "Staying connected", title: "Wi-Fi, mostly",
      body: "Fine at home, patchy everywhere else. If it drops, switch to mobile data — or give up and go for a walk. Nothing here is urgent enough to fight the router over." },

    { group: "Staying well", title: "The first 48 hours of your stomach",
      body: "Go easy: plain rice, dal, grilled fish, no raw salad from a cart. Bring Imodium and rehydration salts. Almost everyone gets a wobbly day; it passes, and it is not a reflection on your character." },

    { group: "Staying well", title: "Sun, mosquitoes, and the 4pm sleep",
      body: "The December sun is milder than summer but still burns — SPF 50, hat, shade at noon. Mosquitoes arrive at dusk, so repellent before sunset, long sleeves in the evening. And do not fight the afternoon nap. Nobody here does." },

    { group: "Getting around", title: "Traffic is a language, not a rulebook",
      body: "We drive on the left, honk to say 'I'm here' rather than 'move', and treat lane markings as decoration. If Mitch offers you the scooter: only say yes if you're genuinely confident. Otherwise, sit behind and hold on." },

    { group: "Getting around", title: "Taxis and apps",
      body: "Goa has no Uber in most of the south; use the local taxi stands, or a driver we know (number on the Family page). Agree the fare before you get in. At night, always the same driver." },

    { group: "Dressing", title: "What to wear where",
      body: "Beach: anything. Town: shorts are fine, but you'll feel less conspicuous in a dress or linen trousers. Church or temple: shoulders and knees covered, shoes off at the door. Wedding: Indian formal if you want to dress up — a saree or lehenga can be borrowed — or a smart dress. Avoid white and black at a Hindu wedding; avoid white at a Goan Catholic one." },

    { group: "Dressing", title: "Weddings, decoded",
      body: "Expect to arrive and wait. Expect to be fed within ten minutes. Expect photographs with strangers. Expect the ceremony to start late and the dancing to start later. Bring a shawl for the evening, cash in an envelope as a gift, and don't photograph the couple during the ceremony unless someone waves you forward." },

    { group: "Out and about", title: "Temples and churches",
      body: "Shoes off, phone away, voice down. Some temples ask men to remove their shirt; most churches ask for covered shoulders. Nobody minds you watching — they mind you filming." },

    { group: "Out and about", title: "Being looked at",
      body: "In the villages you will be noticed, and sometimes stared at, and it is almost never hostile — you're new, and that's interesting. A smile fixes 95% of it. If someone crosses a line, be loud and direct; Goa is used to tourists and people will back you up." },

    { group: "Out and about", title: "Safety, honestly",
      body: "South Goa is calm. Still: don't walk unlit beaches alone at night, don't leave drinks, keep cash split between bag and room, and let someone know where you are. The main risk isn't crime, it's a scooter, a current, or the sun." },

    { group: "Out and about", title: "Photos of people",
      body: "Ask first. Fishermen, market sellers, kids — a nod and a raised phone is enough. If they say no, that's the whole conversation. Also: don't photograph a funeral, ever." },

    { group: "The culture", title: "Indian Standard Time",
      body: "'Coming in ten minutes' means twenty-five. 'We'll leave at 6' means 6:40. This is not disrespect, it's a different relationship with clocks. The sooner you stop bracing for it, the nicer your trip gets." },

    { group: "The culture", title: "Susegad",
      body: "The Goan word for the good life — laid-back, unhurried, content. It's not laziness, it's a philosophy, and it's the actual reason people come here. Try it on. You have permission to do nothing." },

    { group: "The culture", title: "Say yes to the third helping",
      body: "Refusing food once is polite. Refusing twice is a negotiation. Refusing three times is an insult. Take a small portion, eat it slowly, and you'll be loved forever." },
  ],

  /* --------------------------------------------------------------------- */
  phrases: [
    { kn: "Susegad", say: "soo-seh-GAAD", en: "The good life. Laid-back, content, unhurried." },
    { kn: "Dev borem korum", say: "dev bo-rem ko-ROOM", en: "Thank you — literally 'may God do good to you'." },
    { kn: "Borem", say: "BO-rem", en: "Good / fine. The universal safe answer." },
    { kn: "Udak", say: "oo-DUK", en: "Water. The most useful word in the state." },
    { kn: "Cholo", say: "CHO-lo", en: "Let's go." },
    { kn: "Adeus", say: "ah-DAY-oosh", en: "Goodbye. Portuguese, still everywhere." },
  ],

  /* --------------------------------------------------------------------- */
  sections: [
    { href: "guide.html",    num: "01", title: "Guide",      desc: "How to use this site, and everything to know before you land." },
    { href: "home.html",     num: "02", title: "Our Home",       desc: "Where you're staying, and what comes out of that kitchen." },
    { href: "calendar.html", num: "03", title: "Calendar",   desc: "Weddings, dinners, sunsets. Every plan, in order." },
    { href: "map.html",      num: "04", title: "Map",            desc: "Every place pinned, so you always know where you are." },
    { href: "places.html",   num: "05", title: "Places",         desc: "Restaurants, cafés, sunsets, drives and street food." },
    { href: "beaches.html",  num: "06", title: "Beaches",        desc: "Which ones to swim in, which ones to just look at." },
    { href: "family.html",   num: "07", title: "Family",      desc: "Who's who, what to call them, who to call." },
  ],
};
