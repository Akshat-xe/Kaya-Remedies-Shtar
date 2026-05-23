export interface Herb {
  id: string;
  name: string;
  latin: string;
  categories: string[];
  benefit: string;
  description: string;
  image: string;
  images: string[];
  dziImages: string[];
  tag: string;
  tagColor: string;
  featured: boolean;
  origin: string;
  partUsed: string;
  form: string;
  appearance: string;
  uses: string;
  consume: string;
  verified: boolean;
}

export const herbs: Herb[] = [
  {
    id: "med1",
    name: "Solanum virginianum (syn. Solanum surattense) / Kantakari / Chhoti Kateli / Bhatkataiya",
    latin: "Solanum virginianum",
    categories: ["immunity", "seasonal", "featured"],
    benefit: "Acts as a powerful natural expectorant and bronchodilator",
    description:
      "Botanical Appearance: A low-growing, spreading herb heavily armed with prominent, sharp yellow thorns on its stems and deeply lobed leaves. It features vibrant purple, star-shaped flowers with distinctive, protruding yellow centers (anthers), and bears small, round berries that ripen from green to yellow.",
    image: "/thumbnails/med1_pasted_image.jpg",
    images: [
      "/thumbnails/med1_pasted_image.jpg",
      "/thumbnails/med1_pasted_image__2_.jpg",
      "/thumbnails/med1_pasted_image__3_.jpg",
      "/thumbnails/med1_pasted_image__4_.jpg",
      "/thumbnails/med1_pasted_image__7_.jpg"
    ],
    dziImages: [
      "/deepzoom/med1_pasted_image.dzi",
      "/deepzoom/med1_pasted_image__2_.dzi",
      "/deepzoom/med1_pasted_image__3_.dzi",
      "/deepzoom/med1_pasted_image__4_.dzi",
      "/deepzoom/med1_pasted_image__7_.dzi"
    ],
    tag: "Verified",
    tagColor: "oklch(0.71 0.09 130)",
    featured: true,
    origin: "Ayurvedic Practice",
    partUsed: "In your specific recipe, the yellow anthers (the pollen-bearing center of the flower) are used. In broader Ayurvedic practice, the whole plant (Panchang), roots, and fruits are also utilized.",
    form: "A fine herbal powder (Churna) that becomes a medicinal paste (Lehya) once mixed with honey.",
    appearance:
      "A low-growing, spreading herb heavily armed with prominent, sharp yellow thorns on its stems and deeply lobed leaves. It features vibrant purple, star-shaped flowers with distinctive, protruding yellow centers (anthers), and bears small, round berries that ripen from green to yellow.",
    uses:
      "It acts as a powerful natural expectorant (thins and clears mucus) and bronchodilator (widens the respiratory airways). It is primarily used to relieve heavy chest congestion, chronic cough, asthma, and wheezing by reducing airway inflammation.",
    consume:
      "The harvested yellow flower parts (along with accompanying herbs like Pippali) are ground into a fine powder and dried in the shade to protect the delicate essential oils from the sun. The powder is then mixed with honey and taken orally—usually three times a day—so the honey can carry the medicine while naturally soothing the throat.",
    verified: true,
  },
  {
    id: "med3",
    name: "Scoparia dulcis (Sweet Broomweed) / Jethimal / Mithi Patti / Ban Tulsi",
    latin: "Scoparia dulcis",
    categories: ["calming", "daily-wellness", "featured"],
    benefit: "Acts as a powerful cooling agent, anti-inflammatory, and natural astringent",
    description:
      "Botanical Appearance: A small, green herbaceous weed. It features leaves with distinctly toothed (serrated) edges. Its most recognizable trait is the tiny, round, green buds and seed capsules hanging from very thin stalks directly at the leaf joints (axils).",
    image: "/thumbnails/med3_pasted_image.jpg",
    images: [
      "/thumbnails/med3_pasted_image.jpg",
      "/thumbnails/med3_pasted_image__3_.jpg",
      "/thumbnails/med3_pasted_image__4_.jpg"
    ],
    dziImages: [
      "/deepzoom/med3_pasted_image.dzi",
      "/deepzoom/med3_pasted_image__3_.dzi",
      "/deepzoom/med3_pasted_image__4_.dzi"
    ],
    tag: "Verified",
    tagColor: "oklch(0.71 0.09 130)",
    featured: true,
    origin: "Local/Folk Tradition",
    partUsed: "The whole plant (Panchang)—meaning the roots, stems, leaves, and buds are all utilized together.",
    form: "A fresh herbal paste infused into a cold liquid.",
    appearance:
      "A small, green herbaceous weed. It features leaves with distinctly toothed (serrated) edges. Its most recognizable trait is the tiny, round, green buds and seed capsules hanging from very thin stalks directly at the leaf joints (axils).",
    uses:
      "Acts as a powerful cooling agent, anti-inflammatory, and natural astringent. It reduces excessive body heat (Pitta), strengthens the reproductive mucous membranes, and effectively stops Shveta Pradar (white discharge).",
    consume:
      "The whole freshly uprooted plant is washed thoroughly. It is then ground directly into raw rice water (water in which uncooked rice has been soaked). This cloudy, medicinal liquid is consumed on an empty stomach early in the morning for 7 consecutive days to deeply cool the internal system and halt the discharge.",
    verified: true,
  },
  {
    id: "med2",
    name: "Cissus quadrangularis / Harjor / Bone Setter",
    latin: "Cissus quadrangularis",
    categories: ["daily-wellness"],
    benefit: "Relieves deep bone pain and facilitates bone recovery",
    description:
      "Appearance: very small in size in each branch only three leaves",
    image: "/thumbnails/med2_pasted_image.jpg",
    images: [
      "/thumbnails/med2_pasted_image.jpg",
      "/thumbnails/med2_pasted_image__2_.jpg",
      "/thumbnails/med2_pasted_image__3_.jpg",
      "/thumbnails/med2_pasted_image__4_.jpg",
      "/thumbnails/med2_pasted_image__5_.jpg"
    ],
    dziImages: [
      "/deepzoom/med2_pasted_image.dzi",
      "/deepzoom/med2_pasted_image__2_.dzi",
      "/deepzoom/med2_pasted_image__3_.dzi",
      "/deepzoom/med2_pasted_image__4_.dzi",
      "/deepzoom/med2_pasted_image__5_.dzi"
    ],
    tag: "not Verified",
    tagColor: "oklch(0.65 0.2 25)",
    featured: false,
    origin: "Traditional Sourcing",
    partUsed: "Root",
    form: "Grind root and drink",
    appearance:
      "very small in size in each branch only three leaves",
    uses:
      "When a bone brakes and the pain remains it will remove the pain",
    consume:
      "Grind root and drink",
    verified: false,
  },
];

export const categories = [
  { id: "all", label: "All Herbs" },
  { id: "featured", label: "Featured" },
  { id: "immunity", label: "Immunity" },
  { id: "calming", label: "Calming" },
  { id: "digestion", label: "Digestion" },
  { id: "daily-wellness", label: "Daily Wellness" },
  { id: "rare", label: "Rare Herbs" },
  { id: "seasonal", label: "Seasonal" },
];

export const reviews = [
  {
    name: "Aisha M.",
    role: "Yoga instructor, London",
    text: "Ashwagandha changed the texture of my mornings. Three months in and the fog that used to greet me is simply… gone.",
    rating: 5,
    herb: "Ashwagandha Root",
    avatar: "🌿",
  },
  {
    name: "Dr. Ravi K.",
    role: "Integrative medicine, Delhi",
    text: "As someone who recommends botanicals professionally, I hold these to an extremely high standard. The sourcing transparency alone earns my respect.",
    rating: 5,
    herb: "Reishi & Turmeric blend",
    avatar: "🌾",
  },
  {
    name: "Celeste B.",
    role: "Designer & wellness advocate",
    text: "Kaya is simply in another class — the philosophy, the potency, the depth of knowledge. It's the first reference I genuinely recommend.",
    rating: 5,
    herb: "Lavender & Chamomile",
    avatar: "🍃",
  },
  {
    name: "James O.",
    role: "Athlete & nutrition coach",
    text: "The Moringa knowledge here is extraordinary. After six weeks my recovery times improved noticeably — pure quality wisdom.",
    rating: 5,
    herb: "Moringa Leaf",
    avatar: "🌱",
  },
];
