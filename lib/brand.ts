// Single source of truth for brand identity. Rename the store here.
// Runtime-editable values (support phone, address, GST) live in SiteSetting (DB).

export const brand = {
  name: "Bloomora",
  legalName: "Bloomora Nursery & Garden Supplies",
  tagline: "Bring Nature Home",
  description:
    "Healthy plants, beautiful blooms and everything your garden needs — delivered to your doorstep.",
  currency: "INR",
  locale: "en-IN",
  freeShippingBadge: "Free Delivery Above ₹999",
  colors: {
    primary: "#1f4d36", // deep botanical green
    secondary: "#5fa84a", // fresh leaf green
    accent: "#ee6a4f", // bougainvillea coral-pink
    background: "#faf8f4",
    text: "#1d2421",
  },
} as const;

export const primaryNav = [
  { label: "Bougainvillea", slug: "bougainvillea" },
  { label: "Flowering Plants", slug: "flowering-plants" },
  { label: "Indoor Plants", slug: "indoor-plants" },
  { label: "Outdoor Plants", slug: "outdoor-plants" },
  { label: "Seeds", slug: "seeds" },
  { label: "Pots & Planters", slug: "pots-planters" },
  { label: "Soil & Fertilizer", slug: "soil-fertilizer" },
  { label: "Gardening Tools", slug: "gardening-tools" },
  { label: "Plant Care", slug: "plant-care" },
] as const;

export function formatINR(amount: number | string): string {
  return new Intl.NumberFormat(brand.locale, {
    style: "currency",
    currency: brand.currency,
    maximumFractionDigits: 0,
  }).format(Number(amount));
}
