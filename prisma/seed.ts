import { config } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

config({ path: ".env.local" });
config();

const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!url) throw new Error("Set DATABASE_URL in .env.local first.");

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });

const categories = [
  { name: "Bougainvillea", slug: "bougainvillea" },
  { name: "Flowering Plants", slug: "flowering-plants" },
  { name: "Indoor Plants", slug: "indoor-plants" },
  { name: "Outdoor Plants", slug: "outdoor-plants" },
  { name: "Seeds", slug: "seeds" },
  { name: "Pots & Planters", slug: "pots-planters" },
  { name: "Soil & Fertilizer", slug: "soil-fertilizer" },
  { name: "Gardening Tools", slug: "gardening-tools" },
  { name: "Plant Care", slug: "plant-care" },
];

const bougainvillea = [
  { colour: "Pink", price: 299, form: "single" },
  { colour: "White", price: 349, form: "single" },
  { colour: "Purple", price: 399, form: "single" },
  { colour: "Double Flower", price: 499, form: "double" },
  { colour: "Multi-colour", price: 599, form: "multi-colour" },
];

async function main() {
  for (const [i, c] of categories.entries()) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, sortOrder: i },
      create: { ...c, sortOrder: i },
    });
  }

  const category = await prisma.category.findUniqueOrThrow({ where: { slug: "bougainvillea" } });

  for (const b of bougainvillea) {
    const slug = `${b.colour.toLowerCase().replace(/\s+/g, "-")}-bougainvillea`;
    await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        name: `${b.colour} Bougainvillea`,
        slug,
        categoryId: category.id,
        status: "PUBLISHED",
        isBestseller: b.price <= 399,
        botanicalName: "Bougainvillea glabra",
        commonName: "Paper flower",
        plantType: "Climber",
        flowerColor: b.colour,
        flowerForm: b.form,
        placement: "outdoor",
        sunlight: "full-sun",
        waterNeed: "low",
        difficulty: "beginner",
        shortDescription: `Healthy ${b.colour.toLowerCase()} bougainvillea, nursery-grown and ready to bloom.`,
        tags: ["bougainvillea", "climber", "balcony", "full sun"],
        variants: {
          create: [
            {
              sku: `BGV-${slug}-M`,
              name: "Medium / 8-inch pot",
              options: { size: "Medium", pot: "8-inch pot" },
              mrp: Math.round(b.price * 1.3),
              price: b.price,
              stock: 25,
            },
          ],
        },
      },
    });
  }

  const settings: Record<string, object> = {
    cod: { enabled: true, minAmount: 199, maxAmount: 5000, fee: 40 },
    shipping: { freeAbove: 999, flatFee: 79 },
  };
  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }

  if ((await prisma.shippingRule.count()) === 0) {
    await prisma.shippingRule.create({ data: { name: "Standard", freeAbove: 999, flatFee: 79 } });
  }

  for (const [pincode, city, state] of [
    ["700001", "Kolkata", "West Bengal"],
    ["110001", "New Delhi", "Delhi"],
    ["400001", "Mumbai", "Maharashtra"],
    ["560001", "Bengaluru", "Karnataka"],
  ]) {
    await prisma.serviceablePincode.upsert({
      where: { pincode },
      update: {},
      create: { pincode, city, state },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
