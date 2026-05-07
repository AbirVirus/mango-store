export interface MangoVariety {
  name: string;
  description: string;
  basePricePerKg: number;
  category: "Premium" | "Standard";
  images: string[];
  stock: number;
  varieties: { jat: string; description: string }[];
  sizes: { label: string; priceMultiplier: number }[];
}

// Unsplash mango photo IDs (stable, public domain / freely usable)
const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?w=800&q=80&fit=crop`;

export const mangoVarieties: MangoVariety[] = [
  {
    name: "Himsagar (হিমসাগর)",
    description:
      "Often called the 'King of Mangoes', Himsagar is prized for its intoxicating aroma and intensely sweet, fiberless flesh. Grown in the rich alluvial soil of Rajshahi, this mid-season variety melts in your mouth with every bite.",
    basePricePerKg: 320,
    category: "Premium",
    images: [IMG("photo-1553289395-f65f6ca9517b")],
    stock: 250,
    varieties: [
      {
        jat: "Himsagar",
        description: "The classic aromatic king, medium-sized with golden skin",
      },
    ],
    sizes: [
      { label: "Small (2-3 pcs/kg)", priceMultiplier: 0.85 },
      { label: "Medium (1-2 pcs/kg)", priceMultiplier: 1.0 },
      { label: "Premium Large", priceMultiplier: 1.3 },
    ],
  },
  {
    name: "Langra (ল্যাংড়া)",
    description:
      "Langra is famous for its exceptional sweetness and thin skin. Despite its name (meaning 'lame' in Bengali), this variety stands tall with its greenish-yellow color even when fully ripe and excellent keeping quality.",
    basePricePerKg: 280,
    category: "Premium",
    images: [IMG("photo-1591073113125-e46713c829ed")],
    stock: 300,
    varieties: [
      {
        jat: "Langra",
        description: "Thin-skinned, greenish even when ripe, supremely sweet",
      },
    ],
    sizes: [
      { label: "Small (3-4 pcs/kg)", priceMultiplier: 0.8 },
      { label: "Medium (2 pcs/kg)", priceMultiplier: 1.0 },
      { label: "Premium Large", priceMultiplier: 1.25 },
    ],
  },
  {
    name: "Fazli (ফজলি)",
    description:
      "The giant of Bangladeshi mangoes — a single Fazli can weigh over 1 kg! This late-season variety from the Chapai Nawabganj region is mildly sweet with firm flesh, perfect for slicing and sharing with family.",
    basePricePerKg: 200,
    category: "Standard",
    images: [IMG("photo-1601493701812-62bdacca20c6")],
    stock: 400,
    varieties: [
      {
        jat: "Fazli",
        description: "Extra large size, mild sweet, firm flesh, late season",
      },
    ],
    sizes: [
      { label: "Small (1-2 pcs/kg)", priceMultiplier: 0.9 },
      { label: "Medium (0.5-1 pc/kg)", priceMultiplier: 1.0 },
      { label: "Jumbo (1-2 kg/pc)", priceMultiplier: 1.2 },
    ],
  },
  {
    name: "Amrapali (আম্রপালি)",
    description:
      "A high-yielding hybrid variety developed for Bangladeshi orchards. Amrapali is small to medium-sized with deep orange flesh, intense sweetness, and a distinctive flavor that makes it a favorite for juice and desserts.",
    basePricePerKg: 250,
    category: "Standard",
    images: [IMG("photo-1544947950-faf07ca38fa7")],
    stock: 350,
    varieties: [
      {
        jat: "Amrapali",
        description: "Small, intense orange flesh, very sweet, great for juice",
      },
    ],
    sizes: [
      { label: "Small (4-5 pcs/kg)", priceMultiplier: 0.85 },
      { label: "Medium (3-4 pcs/kg)", priceMultiplier: 1.0 },
    ],
  },
  {
    name: "Gopalbhog (গোপালভোগ)",
    description:
      "One of the earliest mangoes to hit the market, Gopalbhog arrives in mid-May to kick off mango season. Medium-sized with golden-yellow skin, it has a rich, sweet flavor and smooth texture that makes the wait worthwhile.",
    basePricePerKg: 350,
    category: "Premium",
    images: [IMG("photo-1490885578174-acda8905c2c6")],
    stock: 150,
    varieties: [
      {
        jat: "Gopalbhog",
        description: "Early season, golden-yellow, rich and sweet, medium size",
      },
    ],
    sizes: [
      { label: "Small (3-4 pcs/kg)", priceMultiplier: 0.85 },
      { label: "Medium (2 pcs/kg)", priceMultiplier: 1.0 },
      { label: "Premium Large", priceMultiplier: 1.3 },
    ],
  },
  {
    name: "Khirsapat (ক্ষীরশাপাত)",
    description:
      "Named for its kheer-like (condensed milk) sweetness, Khirsapat is a beloved early-to-mid-season variety. The fruit is medium-small with thin skin, extremely juicy flesh, and a heavenly aroma that fills the room.",
    basePricePerKg: 300,
    category: "Premium",
    images: [IMG("photo-1568701837445-bb172c0f6e56")],
    stock: 200,
    varieties: [
      {
        jat: "Khirsapat",
        description:
          "Kheer-sweet, thin-skinned, extremely juicy, heavenly aroma",
      },
    ],
    sizes: [
      { label: "Small (4-5 pcs/kg)", priceMultiplier: 0.8 },
      { label: "Medium (3-4 pcs/kg)", priceMultiplier: 1.0 },
    ],
  },
  {
    name: "Mohanbhog (মোহনভোগ)",
    description:
      "A connoisseur's delight, Mohanbhog is a traditional aromatic variety from the Rajshahi region. Medium-sized with a distinct sweet-tangy balance, it has a loyal following among mango enthusiasts who appreciate its complex flavor profile.",
    basePricePerKg: 260,
    category: "Standard",
    images: [IMG("photo-1571771894821-ce9b6d11d08e")],
    stock: 180,
    varieties: [
      {
        jat: "Mohanbhog",
        description:
          "Traditional aromatic, balanced sweet-tangy, complex flavor",
      },
    ],
    sizes: [
      { label: "Small (3-4 pcs/kg)", priceMultiplier: 0.85 },
      { label: "Medium (2 pcs/kg)", priceMultiplier: 1.0 },
      { label: "Large", priceMultiplier: 1.2 },
    ],
  },
  {
    name: "Ashwina (আশ্বিনা)",
    description:
      "The late-season champion — Ashwina mangoes arrive in August-September when all other varieties are gone. Large, fibrous, and distinctly flavored, this variety extends the mango season well into the monsoon. A true treat for die-hard mango lovers.",
    basePricePerKg: 180,
    category: "Standard",
    images: [IMG("photo-1589758438365-8addec266b47")],
    stock: 500,
    varieties: [
      {
        jat: "Ashwina",
        description: "Late season (Aug-Sep), large size, fibrous, unique flavor",
      },
    ],
    sizes: [
      { label: "Small (2-3 pcs/kg)", priceMultiplier: 0.9 },
      { label: "Medium (1-2 pcs/kg)", priceMultiplier: 1.0 },
      { label: "Jumbo", priceMultiplier: 1.2 },
    ],
  },
  {
    name: "BARI Mango-4 (বারি আম-৪)",
    description:
      "Developed by the Bangladesh Agricultural Research Institute, BARI-4 is a modern variety bred for consistent quality and high yield. It produces uniform medium-large fruits with attractive red blush, sweet taste, and good disease resistance — a reliable choice.",
    basePricePerKg: 220,
    category: "Standard",
    images: [IMG("photo-1553279768-865429fa0078")],
    stock: 400,
    varieties: [
      {
        jat: "BARI-4",
        description: "Modern cultivated variety, red blush, consistent quality",
      },
    ],
    sizes: [
      { label: "Small (3-4 pcs/kg)", priceMultiplier: 0.85 },
      { label: "Medium (2 pcs/kg)", priceMultiplier: 1.0 },
      { label: "Premium", priceMultiplier: 1.25 },
    ],
  },
  {
    name: "Laksmanbhog (লক্ষ্মণভোগ)",
    description:
      "A premium early-season variety that rivals Himsagar in aroma and taste. Laksmanbhog mangoes have a beautiful golden-orange skin, velvety smooth texture, and an exceptionally sweet flavor with subtle honey notes. A true Rajshahi treasure.",
    basePricePerKg: 340,
    category: "Premium",
    images: [IMG("photo-1628335737420-e3b2abfc45b0")],
    stock: 120,
    varieties: [
      {
        jat: "Laksmanbhog",
        description:
          "Early premium variety, golden-orange, honey-sweet, velvety texture",
      },
    ],
    sizes: [
      { label: "Small (3-4 pcs/kg)", priceMultiplier: 0.85 },
      { label: "Medium (2 pcs/kg)", priceMultiplier: 1.0 },
      { label: "Premium Large", priceMultiplier: 1.3 },
    ],
  },
  {
    name: "Surmai Fazli (সুরমাই ফজলি)",
    description:
      "A premium Fazli variant known for its superior taste and slightly smaller, more manageable size compared to regular Fazli. Grown in select orchards along the Padma river, Surmai Fazli combines the heft of Fazli with enhanced sweetness and finer flesh texture.",
    basePricePerKg: 280,
    category: "Premium",
    images: [IMG("photo-1553289395-f65f6ca9517b")],
    stock: 200,
    varieties: [
      {
        jat: "Surmai Fazli",
        description:
          "Premium Fazli variant, superior sweetness, finer texture, medium-large",
      },
    ],
    sizes: [
      { label: "Medium (1-2 pcs/kg)", priceMultiplier: 1.0 },
      { label: "Large (0.5-1 pc/kg)", priceMultiplier: 1.15 },
    ],
  },
  {
    name: "Nak Fazli (নাক ফজলি)",
    description:
      "Named for its distinctive 'nose' shape (nak = nose in Bengali), this Fazli sub-variety has a unique elongated form. With firm, less fibrous flesh and a pleasant mild sweetness, Nak Fazli is excellent for fruit salads, pickles, and eating fresh with rice.",
    basePricePerKg: 230,
    category: "Standard",
    images: [IMG("photo-1601493701812-62bdacca20c6")],
    stock: 300,
    varieties: [
      {
        jat: "Nak Fazli",
        description:
          "Elongated shape, firm flesh, mild sweet, versatile for eating and cooking",
      },
    ],
    sizes: [
      { label: "Small (2-3 pcs/kg)", priceMultiplier: 0.9 },
      { label: "Medium (1-2 pcs/kg)", priceMultiplier: 1.0 },
      { label: "Large", priceMultiplier: 1.2 },
    ],
  },
];
