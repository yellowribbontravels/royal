import { PrismaClient } from "@/src/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding ...");

  // Clean up potentially conflicting data
  try {
    await prisma.inventory.deleteMany();
    await prisma.product.deleteMany();
    console.log("Cleared existing products and inventory.");
  } catch (e) {
    console.warn(
      "Warning: Could not clear data, might be new DB or constraint issue.",
      e
    );
  }

  // --- 1. PURPOSES ---
  const purposes = [
    { id: "bonding", name: "Bonding & Assembly" },
    { id: "sealing", name: "Sealing & Gasketing" },
    { id: "lubrication", name: "Lubrication & Anti-Seize" },
    { id: "cleaning", name: "Cleaning & Degreasing" },
    { id: "protection", name: "Corrosion Protection" },
    { id: "waterproofing", name: "Waterproofing" },
    { id: "taping", name: "Taping & Masking" },
    { id: "repair", name: "Repair & Rebuilding" },
  ];

  for (const p of purposes) {
    await prisma.purpose.upsert({
      where: { id: p.id },
      update: { name: p.name },
      create: p,
    });
  }

  // --- 2. BRANDS ---
  const brands = [
    {
      id: "bosch",
      name: "Bosch",
      imageUrl: "https://placehold.co/400x200/000/FFF?text=Bosch",
    },
    {
      id: "oks",
      name: "OKS",
      imageUrl: "https://placehold.co/400x200/ff6600/FFF?text=OKS",
    },
    {
      id: "anabond",
      name: "Anabond",
      imageUrl: "https://placehold.co/400x200/000/FFF?text=Anabond",
    },
  ];

  for (const b of brands) {
    await prisma.brand.upsert({
      where: { id: b.id },
      update: { name: b.name, imageUrl: b.imageUrl },
      create: b,
    });
  }

  // --- 3. CATEGORIES ---
  const categories = [
    { id: "adhesives", name: "Adhesives" },
    { id: "sealants", name: "Sealants" },
    { id: "sprays", name: "Industrial Sprays" },
    { id: "lubricants", name: "Lubricants & Greases" },
    { id: "tapes", name: "Industrial Tapes" },
    { id: "waterproofing", name: "Waterproofing Chemicals" },
    { id: "tools", name: "Tools & Hardware" },
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { id: c.id },
      update: { name: c.name },
      create: c,
    });
  }

  // --- 4. PRODUCTS (Generating 200+ entries) ---
  const products = [
    // === LOCTITE: Threadlockers ===
    {
      id: "loctite-222",
      name: "Loctite 222 Low Strength",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
      images: {
        create: [
          {
            url: "https://dm.henkel-dam.com/is/image/henkel/loctite-222-threadlocker-purple-50ml-bottle-en?wid=1000&fit=crop%2C1&qlt=90&align=0%2C0",
            publicId: "loctite-222",
          },
        ],
      },
    },
    {
      id: "loctite-242",
      name: "Loctite 242 Medium Strength",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-243",
      name: "Loctite 243 Oil Tolerant",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
      images: {
        create: [
          {
            url: "https://dm.henkel-dam.com/is/image/henkel/loctite-243-threadlocker-blue-50ml-bottle-en?wid=1000&fit=crop%2C1&qlt=90&align=0%2C0",
            publicId: "loctite-243",
          },
        ],
      },
    },
    {
      id: "loctite-262",
      name: "Loctite 262 High Strength",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-263",
      name: "Loctite 263 Primerless High Strength",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
      images: {
        create: [
          {
            url: "https://dm.henkel-dam.com/is/image/henkel/loctite-263-threadlocker-red-50ml-bottle-en?wid=1000&fit=crop%2C1&qlt=90&align=0%2C0",
            publicId: "loctite-263",
          },
        ],
      },
    },
    {
      id: "loctite-270",
      name: "Loctite 270 High Strength Studlocker",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-271",
      name: "Loctite 271 High Strength Red",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-272",
      name: "Loctite 272 High Temp Threadlocker",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-277",
      name: "Loctite 277 Large Bolt Threadlocker",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-290",
      name: "Loctite 290 Wicking Grade",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },

    // === LOCTITE: Instant Adhesives ===
    {
      id: "loctite-401",
      name: "Loctite 401 General Purpose",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
      images: {
        create: [
          {
            url: "https://dm.henkel-dam.com/is/image/henkel/loctite-401-instant-adhesive-20g-bottle-en?wid=1000&fit=crop%2C1&qlt=90&align=0%2C0",
            publicId: "loctite-401",
          },
        ],
      },
    },
    {
      id: "loctite-403",
      name: "Loctite 403 Low Odor/Bloom",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-406",
      name: "Loctite 406 Plastic & Rubber",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-408",
      name: "Loctite 408 Low Odor Wicking",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-410",
      name: "Loctite 410 Black Toughened",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-411",
      name: "Loctite 411 Clear Toughened",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-414",
      name: "Loctite 414 Plastic Bonder",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-415",
      name: "Loctite 415 Metal Bonder",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-416",
      name: "Loctite 416 Gap Filling",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-420",
      name: "Loctite 420 Wicking Grade",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-422",
      name: "Loctite 422 High Temp",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-424",
      name: "Loctite 424 General Purpose",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-425",
      name: "Loctite 425 Plastic Threadlocker",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-431",
      name: "Loctite 431 Medium Viscosity",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-435",
      name: "Loctite 435 Clear Toughened",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-438",
      name: "Loctite 438 Black Toughened",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-444",
      name: "Loctite 444 Tak Pak",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-454",
      name: "Loctite 454 Gel Original",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-460",
      name: "Loctite 460 Low Odor/Bloom",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-480",
      name: "Loctite 480 Black Toughened",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-495",
      name: "Loctite 495 General Purpose",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-496",
      name: "Loctite 496 Metal Bonder",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },

    // === LOCTITE: Retaining Compounds ===
    {
      id: "loctite-601",
      name: "Loctite 601 Retaining Compound",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-603",
      name: "Loctite 603 Oil Tolerant",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-609",
      name: "Loctite 609 General Purpose",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-620",
      name: "Loctite 620 High Temp",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-638",
      name: "Loctite 638 High Strength",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-640",
      name: "Loctite 640 High Strength",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-641",
      name: "Loctite 641 Medium Strength",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-648",
      name: "Loctite 648 High Strength",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "loctite-660",
      name: "Loctite 660 Quick Metal",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "repair",
    },
    {
      id: "loctite-680",
      name: "Loctite 680 High Strength",
      brandId: "loctite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },

    // === LOCTITE: Gasketing & Sealing ===
    {
      id: "loctite-510",
      name: "Loctite 510 High Temp Gasket",
      brandId: "loctite",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "loctite-515",
      name: "Loctite 515 Flexible Gasket",
      brandId: "loctite",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "loctite-518",
      name: "Loctite 518 Gasket Eliminator",
      brandId: "loctite",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "loctite-542",
      name: "Loctite 542 Hydraulic Sealant",
      brandId: "loctite",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "loctite-545",
      name: "Loctite 545 Pneumatic Sealant",
      brandId: "loctite",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "loctite-565",
      name: "Loctite 565 Thread Sealant",
      brandId: "loctite",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "loctite-567",
      name: "Loctite 567 High Temp Sealant",
      brandId: "loctite",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "loctite-569",
      name: "Loctite 569 Hydraulic Sealant",
      brandId: "loctite",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "loctite-572",
      name: "Loctite 572 Low Strength",
      brandId: "loctite",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "loctite-574",
      name: "Loctite 574 Flange Sealant",
      brandId: "loctite",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "loctite-577",
      name: "Loctite 577 Universal Sealant",
      brandId: "loctite",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "loctite-592",
      name: "Loctite 592 High Temp PST",
      brandId: "loctite",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "loctite-5699",
      name: "Loctite SI 5699 Grey Gasket",
      brandId: "loctite",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "loctite-5900",
      name: "Loctite SI 5900 Black Gasket",
      brandId: "loctite",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "loctite-5910",
      name: "Loctite SI 5910 Black Gasket",
      brandId: "loctite",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "loctite-5920",
      name: "Loctite SI 5920 Copper Gasket",
      brandId: "loctite",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "loctite-596",
      name: "Loctite SI 596 Red High Temp",
      brandId: "loctite",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "loctite-598",
      name: "Loctite SI 598 Black Gasket",
      brandId: "loctite",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "loctite-55",
      name: "Loctite 55 Pipe Sealing Cord",
      brandId: "loctite",
      categoryId: "sealants",
      purposeId: "sealing",
    },

    // === LOCTITE: Anti-Seize & Cleaners ===
    {
      id: "loctite-7063",
      name: "Loctite SF 7063 Cleaner",
      brandId: "loctite",
      categoryId: "sprays",
      purposeId: "cleaning",
    },
    {
      id: "loctite-7070",
      name: "Loctite SF 7070 ODC-Free Cleaner",
      brandId: "loctite",
      categoryId: "sprays",
      purposeId: "cleaning",
    },
    {
      id: "loctite-8008",
      name: "Loctite LB 8008 Copper Anti-Seize",
      brandId: "loctite",
      categoryId: "lubricants",
      purposeId: "lubrication",
    },
    {
      id: "loctite-8009",
      name: "Loctite LB 8009 Heavy Duty Anti-Seize",
      brandId: "loctite",
      categoryId: "lubricants",
      purposeId: "lubrication",
    },
    {
      id: "loctite-8012",
      name: "Loctite LB 8012 Moly Paste",
      brandId: "loctite",
      categoryId: "lubricants",
      purposeId: "lubrication",
    },
    {
      id: "loctite-8150",
      name: "Loctite LB 8150 Silver Anti-Seize",
      brandId: "loctite",
      categoryId: "lubricants",
      purposeId: "lubrication",
    },
    {
      id: "loctite-8023",
      name: "Loctite LB 8023 Marine Anti-Seize",
      brandId: "loctite",
      categoryId: "lubricants",
      purposeId: "lubrication",
    },

    // === CRC: Cleaners & Degreasers ===
    {
      id: "crc-co-contact",
      name: "CRC CO Contact Cleaner",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "cleaning",
    },
    {
      id: "crc-qd-contact",
      name: "CRC QD Contact Cleaner",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "cleaning",
    },
    {
      id: "crc-lectra-clean",
      name: "CRC Lectra Clean",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "cleaning",
    },
    {
      id: "crc-heavy-duty",
      name: "CRC Heavy Duty Degreaser",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "cleaning",
    },
    {
      id: "crc-citrus-degreaser",
      name: "CRC Citrus Degreaser",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "cleaning",
    },
    {
      id: "crc-brakleen",
      name: "CRC Brakleen",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "cleaning",
    },
    {
      id: "crc-gasket-remover",
      name: "CRC Gasket Remover",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "cleaning",
    },
    {
      id: "crc-carb-cleaner",
      name: "CRC Carb & Choke Cleaner",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "cleaning",
    },

    // === CRC: Lubricants & Protection ===
    {
      id: "crc-2-26",
      name: "CRC 2-26 Electro",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "lubrication",
      images: {
        create: [
          {
            url: "https://cdn11.bigcommerce.com/s-scmrv6kkrz/images/stencil/original/products/197472/171901/crc-2-26-lubricant-as29__21109.1568390576.jpg",
            publicId: "crc-2-26",
          },
        ],
      },
    },
    {
      id: "crc-3-36",
      name: "CRC 3-36 Multi-Purpose",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "protection",
    },
    {
      id: "crc-5-56",
      name: "CRC 5-56 Universal",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "lubrication",
      images: {
        create: [
          {
            url: "https://m.media-amazon.com/images/I/61b7b7v6ZWL._AC_SL1500_.jpg",
            publicId: "crc-5-56",
          },
        ],
      },
    },
    {
      id: "crc-6-66",
      name: "CRC 6-66 Marine",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "protection",
    },
    {
      id: "crc-zinc-it",
      name: "CRC Zinc-It Instant Galvanize",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "protection",
    },
    {
      id: "crc-bright-zinc",
      name: "CRC Bright Zinc",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "protection",
    },
    {
      id: "crc-rust-off",
      name: "CRC Rust Off Penetrant",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "lubrication",
    },
    {
      id: "crc-white-lithium",
      name: "CRC White Lithium Grease",
      brandId: "crc",
      categoryId: "lubricants",
      purposeId: "lubrication",
    },
    {
      id: "crc-silicone",
      name: "CRC Heavy Duty Silicone",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "lubrication",
    },
    {
      id: "crc-chain-lube",
      name: "CRC Chain & Wire Lube",
      brandId: "crc",
      categoryId: "lubricants",
      purposeId: "lubrication",
    },
    {
      id: "crc-belt-dressing",
      name: "CRC Belt Dressing",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "lubrication",
    },
    {
      id: "crc-dry-ptfe",
      name: "CRC Dry PTFE Lube",
      brandId: "crc",
      categoryId: "lubricants",
      purposeId: "lubrication",
    },
    {
      id: "crc-copper-paste",
      name: "CRC Copper Paste",
      brandId: "crc",
      categoryId: "lubricants",
      purposeId: "lubrication",
    },
    {
      id: "crc-leak-detector",
      name: "CRC Leak Detector",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "repair",
    },
    {
      id: "crc-urethane-seal-coat",
      name: "CRC Red Urethane Seal Coat",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "protection",
    },
    {
      id: "crc-clear-urethane",
      name: "CRC Clear Urethane Seal Coat",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "protection",
    },
    {
      id: "crc-battery-terminal",
      name: "CRC Battery Terminal Protector",
      brandId: "crc",
      categoryId: "sprays",
      purposeId: "protection",
    },

    // === PIDILITE / FEVICOL ===
    {
      id: "fevicol-sh",
      name: "Fevicol SH",
      brandId: "fevicol",
      categoryId: "adhesives",
      purposeId: "bonding",
      images: {
        create: [
          {
            url: "https://m.media-amazon.com/images/I/61i3+Uj0GfL._AC_SS450_.jpg",
            publicId: "fevicol-sh",
          },
        ],
      },
    },
    {
      id: "fevicol-sr-998",
      name: "Fevicol SR 998",
      brandId: "fevicol",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "fevicol-sr-505",
      name: "Fevicol SR 505",
      brandId: "fevicol",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "fevicol-marine",
      name: "Fevicol Marine",
      brandId: "fevicol",
      categoryId: "adhesives",
      purposeId: "waterproofing",
    },
    {
      id: "fevicol-heatx",
      name: "Fevicol HeatX",
      brandId: "fevicol",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "fevicol-hi-per",
      name: "Fevicol Hi-Per",
      brandId: "fevicol",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "fevicol-probond",
      name: "Fevicol Probond",
      brandId: "fevicol",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "fevicol-speedx",
      name: "Fevicol Speedx",
      brandId: "fevicol",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "fevicol-foamfix",
      name: "Fevicol Foamfix",
      brandId: "fevicol",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "fevicol-1k-pur",
      name: "Fevicol 1K PUR",
      brandId: "fevicol",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "fevicol-ac-duct-king",
      name: "Fevicol AC Duct King",
      brandId: "fevicol",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "fevikwik-203",
      name: "Fevikwik 203",
      brandId: "pidilite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "fevikwik-101",
      name: "Fevikwik 101",
      brandId: "pidilite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "fevikwik-gel",
      name: "Fevikwik Gel",
      brandId: "pidilite",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "m-seal-regular",
      name: "M-Seal Regular Epoxy",
      brandId: "m-seal",
      categoryId: "adhesives",
      purposeId: "repair",
    },
    {
      id: "m-seal-phataphat",
      name: "M-Seal Phataphat",
      brandId: "m-seal",
      categoryId: "adhesives",
      purposeId: "repair",
    },
    {
      id: "m-seal-sanitary",
      name: "M-Seal Sanitary",
      brandId: "m-seal",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "m-seal-gap-fill",
      name: "M-Seal Gap Fill",
      brandId: "m-seal",
      categoryId: "sealants",
      purposeId: "sealing",
    },

    // === DR. FIXIT ===
    {
      id: "dr-fixit-101",
      name: "Dr. Fixit 101 LW+",
      brandId: "dr-fixit",
      categoryId: "waterproofing",
      purposeId: "waterproofing",
    },
    {
      id: "dr-fixit-301",
      name: "Dr. Fixit 301 Pidicrete URP",
      brandId: "dr-fixit",
      categoryId: "waterproofing",
      purposeId: "repair",
    },
    {
      id: "dr-fixit-112",
      name: "Dr. Fixit 112 Pidifin 2K",
      brandId: "dr-fixit",
      categoryId: "waterproofing",
      purposeId: "waterproofing",
    },
    {
      id: "dr-fixit-113",
      name: "Dr. Fixit 113 Fastflex",
      brandId: "dr-fixit",
      categoryId: "waterproofing",
      purposeId: "waterproofing",
    },
    {
      id: "dr-fixit-roofseal",
      name: "Dr. Fixit Roofseal Classic",
      brandId: "dr-fixit",
      categoryId: "waterproofing",
      purposeId: "waterproofing",
    },
    {
      id: "dr-fixit-roofseal-flex",
      name: "Dr. Fixit Roofseal Flex",
      brandId: "dr-fixit",
      categoryId: "waterproofing",
      purposeId: "waterproofing",
    },
    {
      id: "dr-fixit-raincoat",
      name: "Dr. Fixit Raincoat",
      brandId: "dr-fixit",
      categoryId: "waterproofing",
      purposeId: "waterproofing",
    },
    {
      id: "dr-fixit-crack-x",
      name: "Dr. Fixit Crack-X Shrinkfree",
      brandId: "dr-fixit",
      categoryId: "sealants",
      purposeId: "repair",
    },
    {
      id: "dr-fixit-silicone",
      name: "Dr. Fixit Silicone Sealant GP",
      brandId: "dr-fixit",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "dr-fixit-pu-foam",
      name: "Dr. Fixit PU Foam",
      brandId: "dr-fixit",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "dr-fixit-bitufix",
      name: "Dr. Fixit Bitufix",
      brandId: "dr-fixit",
      categoryId: "waterproofing",
      purposeId: "waterproofing",
    },
    {
      id: "dr-fixit-torch-shield",
      name: "Dr. Fixit Torch Shield",
      brandId: "dr-fixit",
      categoryId: "waterproofing",
      purposeId: "waterproofing",
    },
    {
      id: "dr-fixit-prime-seal",
      name: "Dr. Fixit Primeseal",
      brandId: "dr-fixit",
      categoryId: "waterproofing",
      purposeId: "waterproofing",
    },

    // === 3M ===
    {
      id: "3m-vhb-4910",
      name: "3M VHB Tape 4910 Clear",
      brandId: "3m",
      categoryId: "tapes",
      purposeId: "bonding",
    },
    {
      id: "3m-vhb-4941",
      name: "3M VHB Tape 4941 Grey",
      brandId: "3m",
      categoryId: "tapes",
      purposeId: "bonding",
    },
    {
      id: "3m-vhb-4950",
      name: "3M VHB Tape 4950 White",
      brandId: "3m",
      categoryId: "tapes",
      purposeId: "bonding",
    },
    {
      id: "3m-vhb-5915",
      name: "3M VHB Tape 5915 Black",
      brandId: "3m",
      categoryId: "tapes",
      purposeId: "bonding",
    },
    {
      id: "3m-vhb-5952",
      name: "3M VHB Tape 5952 Black",
      brandId: "3m",
      categoryId: "tapes",
      purposeId: "bonding",
    },
    {
      id: "3m-vhb-rp45",
      name: "3M VHB Tape RP45",
      brandId: "3m",
      categoryId: "tapes",
      purposeId: "bonding",
    },
    {
      id: "3m-masking-201",
      name: "3M Masking Tape 201+",
      brandId: "3m",
      categoryId: "tapes",
      purposeId: "taping",
    },
    {
      id: "3m-masking-233",
      name: "3M Masking Tape 233+ Green",
      brandId: "3m",
      categoryId: "tapes",
      purposeId: "taping",
    },
    {
      id: "3m-masking-301",
      name: "3M Masking Tape 301+",
      brandId: "3m",
      categoryId: "tapes",
      purposeId: "taping",
    },
    {
      id: "3m-masking-401",
      name: "3M Masking Tape 401+",
      brandId: "3m",
      categoryId: "tapes",
      purposeId: "taping",
    },
    {
      id: "3m-duct-3903",
      name: "3M Vinyl Duct Tape 3903",
      brandId: "3m",
      categoryId: "tapes",
      purposeId: "repair",
    },
    {
      id: "3m-duct-3939",
      name: "3M Heavy Duty Duct Tape 3939",
      brandId: "3m",
      categoryId: "tapes",
      purposeId: "repair",
    },
    {
      id: "3m-duct-6969",
      name: "3M Extra Heavy Duty Duct Tape 6969",
      brandId: "3m",
      categoryId: "tapes",
      purposeId: "repair",
    },
    {
      id: "3m-electrical-33",
      name: "3M Super 33+ Vinyl Electrical Tape",
      brandId: "3m",
      categoryId: "tapes",
      purposeId: "taping",
    },
    {
      id: "3m-electrical-35",
      name: "3M Vinyl Color Coding Tape 35",
      brandId: "3m",
      categoryId: "tapes",
      purposeId: "taping",
    },
    {
      id: "3m-electrical-88",
      name: "3M Super 88 Vinyl Electrical Tape",
      brandId: "3m",
      categoryId: "tapes",
      purposeId: "taping",
    },
    {
      id: "3m-spray-77",
      name: "3M Super 77 Multipurpose Spray",
      brandId: "3m",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "3m-spray-90",
      name: "3M Hi-Strength 90 Spray",
      brandId: "3m",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "3m-spray-74",
      name: "3M Foam Fast 74 Spray",
      brandId: "3m",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "3m-spray-75",
      name: "3M Repositionable 75 Spray",
      brandId: "3m",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "3m-dual-lock",
      name: "3M Dual Lock Reclosable Fastener",
      brandId: "3m",
      categoryId: "tapes",
      purposeId: "bonding",
    },
    {
      id: "3m-safety-walk",
      name: "3M Safety-Walk Anti-Slip Tape",
      brandId: "3m",
      categoryId: "tapes",
      purposeId: "protection",
    },

    // === ABRO ===
    {
      id: "abro-masking",
      name: "ABRO Masking Tape",
      brandId: "abro",
      categoryId: "tapes",
      purposeId: "taping",
    },
    {
      id: "abro-pvc-tape",
      name: "ABRO PVC Electrical Tape",
      brandId: "abro",
      categoryId: "tapes",
      purposeId: "taping",
    },
    {
      id: "abro-spray-paint-black",
      name: "ABRO Spray Paint Black",
      brandId: "abro",
      categoryId: "sprays",
      purposeId: "repair",
    },
    {
      id: "abro-spray-paint-white",
      name: "ABRO Spray Paint White",
      brandId: "abro",
      categoryId: "sprays",
      purposeId: "repair",
    },
    {
      id: "abro-spray-paint-silver",
      name: "ABRO Spray Paint Silver",
      brandId: "abro",
      categoryId: "sprays",
      purposeId: "repair",
    },
    {
      id: "abro-spray-paint-clear",
      name: "ABRO Spray Paint Clear",
      brandId: "abro",
      categoryId: "sprays",
      purposeId: "repair",
    },
    {
      id: "abro-spray-paint-gold",
      name: "ABRO Spray Paint Gold",
      brandId: "abro",
      categoryId: "sprays",
      purposeId: "repair",
    },
    {
      id: "abro-gasket-red",
      name: "ABRO RTV Silicone Red",
      brandId: "abro",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "abro-gasket-black",
      name: "ABRO RTV Silicone Black",
      brandId: "abro",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "abro-gasket-grey",
      name: "ABRO RTV Silicone Grey",
      brandId: "abro",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "abro-gasket-clear",
      name: "ABRO RTV Silicone Clear",
      brandId: "abro",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "abro-gasket-blue",
      name: "ABRO RTV Silicone Blue",
      brandId: "abro",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "abro-carb-cleaner",
      name: "ABRO Carb & Choke Cleaner",
      brandId: "abro",
      categoryId: "sprays",
      purposeId: "cleaning",
    },
    {
      id: "abro-penetrating-oil",
      name: "ABRO AB-80 Penetrating Oil",
      brandId: "abro",
      categoryId: "sprays",
      purposeId: "lubrication",
    },
    {
      id: "abro-starting-fluid",
      name: "ABRO Starting Fluid",
      brandId: "abro",
      categoryId: "sprays",
      purposeId: "repair",
    },
    {
      id: "abro-degreaser",
      name: "ABRO Heavy Duty Degreaser",
      brandId: "abro",
      categoryId: "sprays",
      purposeId: "cleaning",
    },
    {
      id: "abro-silicone-spray",
      name: "ABRO Silicone Spray Lubricant",
      brandId: "abro",
      categoryId: "sprays",
      purposeId: "lubrication",
    },

    // === OKS ===
    {
      id: "oks-1110",
      name: "OKS 1110 Multi-Silicone Grease",
      brandId: "oks",
      categoryId: "lubricants",
      purposeId: "lubrication",
    },
    {
      id: "oks-470",
      name: "OKS 470 White Chain Lube",
      brandId: "oks",
      categoryId: "lubricants",
      purposeId: "lubrication",
    },
    {
      id: "oks-2601",
      name: "OKS 2601 Contact Cleaner",
      brandId: "oks",
      categoryId: "sprays",
      purposeId: "cleaning",
    },
    {
      id: "oks-600",
      name: "OKS 600 Multi Oil",
      brandId: "oks",
      categoryId: "sprays",
      purposeId: "lubrication",
    },
    {
      id: "oks-200",
      name: "OKS 200 MoS2 Assembly Paste",
      brandId: "oks",
      categoryId: "lubricants",
      purposeId: "lubrication",
    },
    {
      id: "oks-250",
      name: "OKS 250 White Allround Paste",
      brandId: "oks",
      categoryId: "lubricants",
      purposeId: "lubrication",
    },
    {
      id: "oks-451",
      name: "OKS 451 Chain & Adhesive Lube",
      brandId: "oks",
      categoryId: "sprays",
      purposeId: "lubrication",
    },
    {
      id: "oks-2650",
      name: "OKS 2650 Bio Rust Remover",
      brandId: "oks",
      categoryId: "sprays",
      purposeId: "cleaning",
    },
    {
      id: "oks-2711",
      name: "OKS 2711 Refrigerant Spray",
      brandId: "oks",
      categoryId: "sprays",
      purposeId: "repair",
    },
    {
      id: "oks-2901",
      name: "OKS 2901 Belt Tuning",
      brandId: "oks",
      categoryId: "sprays",
      purposeId: "lubrication",
    },

    // === ANABOND ===
    {
      id: "anabond-666",
      name: "Anabond 666 RTV Silicone",
      brandId: "anabond",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "anabond-111",
      name: "Anabond 111 Anaerobic Adhesive",
      brandId: "anabond",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "anabond-202",
      name: "Anabond 202 Cyanoacrylate",
      brandId: "anabond",
      categoryId: "adhesives",
      purposeId: "bonding",
    },
    {
      id: "anabond-679",
      name: "Anabond 679 PU Sealant",
      brandId: "anabond",
      categoryId: "sealants",
      purposeId: "sealing",
    },
    {
      id: "anabond-gasket-maker",
      name: "Anabond Gasket Maker",
      brandId: "anabond",
      categoryId: "sealants",
      purposeId: "sealing",
    },

    // === BOSCH ===
    {
      id: "bosch-drill-gbm",
      name: "Bosch GBM 350 Professional Drill",
      brandId: "bosch",
      categoryId: "tools",
      purposeId: "repair",
    },
    {
      id: "bosch-angle-grinder",
      name: "Bosch GWS 600 Angle Grinder",
      brandId: "bosch",
      categoryId: "tools",
      purposeId: "repair",
    },
    {
      id: "bosch-impact-drill",
      name: "Bosch GSB 500 RE Impact Drill",
      brandId: "bosch",
      categoryId: "tools",
      purposeId: "repair",
    },
    {
      id: "bosch-circular-saw",
      name: "Bosch GKS 140 Circular Saw",
      brandId: "bosch",
      categoryId: "tools",
      purposeId: "repair",
    },
    {
      id: "bosch-blower",
      name: "Bosch GBL 620 Air Blower",
      brandId: "bosch",
      categoryId: "tools",
      purposeId: "cleaning",
    },
    {
      id: "bosch-screwdriver-set",
      name: "Bosch 46 Pcs Screwdriver Set",
      brandId: "bosch",
      categoryId: "tools",
      purposeId: "repair",
    },
    {
      id: "bosch-drill-bit-set",
      name: "Bosch X-Line Drill Bit Set",
      brandId: "bosch",
      categoryId: "tools",
      purposeId: "repair",
    },
    {
      id: "bosch-laser-measure",
      name: "Bosch GLM 40 Laser Measure",
      brandId: "bosch",
      categoryId: "tools",
      purposeId: "repair",
    },
    {
      id: "bosch-jigsaw",
      name: "Bosch GST 650 Jigsaw",
      brandId: "bosch",
      categoryId: "tools",
      purposeId: "repair",
    },
    {
      id: "bosch-sander",
      name: "Bosch GSS 2300 Orbital Sander",
      brandId: "bosch",
      categoryId: "tools",
      purposeId: "repair",
    },
  ];

  /* 
    Loop through products to Upsert. 
    We add:
    - random price (100 - 5000)
    - status: PUBLISHED
    - priority: Random 0-100 to simulate "random" featured items
  */
  for (const p of products) {
    const randomPriority = Math.floor(Math.random() * 100);

    await prisma.product.upsert({
      where: { id: p.id },
      update: {
        name: p.name,
        brandId: p.brandId,
        categoryId: p.categoryId,
        purposeId: p.purposeId,
        status: "PUBLISHED",
        priority: randomPriority,
      },
      create: {
        ...p,
        price: Math.floor(Math.random() * 4900) + 100,
        status: "PUBLISHED",
        priority: randomPriority,
      },
    });
  }

  console.log(`Seeding finished. Seeded ${products.length} products.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
