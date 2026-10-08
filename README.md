# 🌿 Bloomora

**Bloomora — Bring Nature Home**

Bloomora is a modern plant nursery and garden-supplies ecommerce platform built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, **Prisma**, **PostgreSQL/Supabase**, and **Razorpay**. The project is designed for selling plants, seeds, pots, planters, soil, fertilizer, gardening tools, and plant-care products.

> **Current status:** The repository is currently the project foundation/scaffold. The database schema, seed data, environment configuration, branding, health endpoint, and core integrations are prepared. The full storefront and customer/admin workflows are intended for subsequent implementation phases.

---

## ✨ Highlights

- Next.js App Router architecture
- React 19 + TypeScript
- Tailwind CSS v4 styling
- PostgreSQL database through Prisma ORM
- Supabase-ready authentication/storage architecture
- Razorpay-ready payment configuration
- Server-side Prisma connection using `@prisma/adapter-pg`
- Product catalog structure with variants, images, stock, reviews, coupons, and SEO fields
- Customer profiles, addresses, cart, wishlist, recently viewed products, and orders in the schema
- Order/payment lifecycle enums for ecommerce workflows
- Shipping rules and serviceable pincode management
- Admin-oriented site settings and content models
- Optional email integration via Resend
- Optional Google Analytics and Meta Pixel configuration
- Health-check API for application/database status
- INR / `en-IN` locale and Indian ecommerce defaults
- Termux testing instructions included

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Database | PostgreSQL |
| ORM | Prisma 7 |
| Database adapter | `@prisma/adapter-pg` |
| Backend/API | Next.js Route Handlers |
| Authentication / backend services | Supabase-ready |
| File storage | Supabase Storage-ready |
| Payments | Razorpay-ready |
| Validation | Zod |
| Notifications | Sonner |
| Icons | Lucide React |
| Deployment target | Vercel |

Node.js **20.9.0 or newer** is required by the project configuration.

---

## 📁 Project Structure

```text
bloomora-main/
├── app/
│   ├── api/
│   │   └── health/
│   │       └── route.ts          # App + database health endpoint
│   ├── globals.css                # Global Tailwind/theme styles
│   ├── layout.tsx                 # Root layout + metadata
│   └── page.tsx                   # Current scaffold homepage
│
├── lib/
│   ├── brand.ts                   # Brand identity, navigation and INR formatter
│   └── db/
│       └── prisma.ts              # Prisma/PostgreSQL client
│
├── prisma/
│   ├── schema.prisma              # Ecommerce database schema
│   ├── seed.ts                    # Initial categories/products/settings
│   └── sql/
│       └── constraints.sql        # CHECK constraints + pg_trgm indexes
│
├── .env.example                   # Environment variable template
├── SETUP-TERMUX.md                # Android/Termux testing guide
├── next.config.ts                 # Next.js configuration
├── prisma.config.ts               # Prisma migration/seed configuration
├── package.json
├── package-lock.json
└── tsconfig.json
```

---

## 🛒 Data Model

The Prisma schema currently includes the foundation for a full ecommerce platform.

### Users & customer data

- `Profile`
- `Address`
- Roles: `CUSTOMER`, `ADMIN`

### Catalog

- `Category`
- `Product`
- `ProductImage`
- `ProductVariant`
- Plant-specific attributes such as botanical name, flower color, sunlight, water requirement, difficulty, climate, growth rate, pet safety, and dimensions

### Shopping

- `Cart`
- `CartItem`
- `WishlistItem`
- `RecentlyViewed`

### Orders & payments

- `Order`
- `OrderItem`
- `OrderStatusHistory`
- `Payment`
- `WebhookEvent`
- Razorpay and COD payment methods are represented in the data model

### Promotions & reviews

- `Coupon`
- `CouponUsage`
- `Review`
- `ReviewImage`

### Operations & content

- `Banner`
- `ShippingRule`
- `ServiceablePincode`
- `SiteSetting`
- `BlogPost`
- `StockMovement`

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd bloomora-main
```

Or download/extract the project ZIP and enter the project directory.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file:

```bash
cp .env.example .env.local
```

Then fill in the required values.

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🔐 Environment Variables

The project reads configuration from `.env.local`.

### Application

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

`NEXT_PUBLIC_*` variables are exposed to the browser, so never place secrets in them.

### PostgreSQL / Supabase

```env
DATABASE_URL=
DIRECT_URL=
```

Recommended Supabase setup:

- `DATABASE_URL` → pooled/runtime connection, typically port `6543`
- `DIRECT_URL` → direct/migration connection, typically port `5432`

The runtime Prisma client uses `DATABASE_URL`, while Prisma migrations and seeding prefer `DIRECT_URL` when available.

### Supabase

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_STORAGE_BUCKET=product-images
```

`SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be exposed to the client.

### Razorpay

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
```

Only the public Razorpay key belongs in a `NEXT_PUBLIC_*` variable. Keep the secret and webhook secret private.

### Optional email

```env
EMAIL_PROVIDER=console
RESEND_API_KEY=
EMAIL_FROM="Bloomora <orders@example.com>"
```

Supported provider values currently documented by the scaffold:

```text
console
resend
```

### Optional analytics

```env
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

---

## 🗄️ Database Setup

Bloomora uses Prisma with PostgreSQL.

### Generate Prisma client

This normally happens automatically during `npm install`, but you can run it manually:

```bash
npx prisma generate
```

### Create the initial migration

The repository includes SQL constraints that Prisma's schema cannot express directly.

First create a migration without applying it:

```bash
npx prisma migrate dev --create-only --name init
```

Then append the contents of:

```text
prisma/sql/constraints.sql
```

to the generated `prisma/migrations/<migration>/migration.sql`.

Apply the migration:

```bash
npm run db:migrate
```

### Seed the database

```bash
npm run db:seed
```

The seed script creates initial categories, Bougainvillea products/variants, site settings, shipping configuration, and a few sample serviceable pincodes.

### Open Prisma Studio

```bash
npm run db:studio
```

---

## 🌺 Seeded Catalog

The seed script currently creates these categories:

- Bougainvillea
- Flowering Plants
- Indoor Plants
- Outdoor Plants
- Seeds
- Pots & Planters
- Soil & Fertilizer
- Gardening Tools
- Plant Care

It also creates sample Bougainvillea products for multiple colours/forms, including:

- Pink
- White
- Purple
- Double Flower
- Multi-colour

Sample settings include:

- COD enabled
- COD minimum/maximum order limits
- COD fee
- Free shipping threshold
- Standard shipping fee
- Example serviceable pincodes

---

## 🩺 Health Check

The project includes:

```text
GET /api/health
```

Example response when the database is unavailable or not configured:

```json
{
  "app": "ok",
  "database": "not configured"
}
```

When a configured database is reachable:

```json
{
  "app": "ok",
  "database": "ok"
}
```

If the database connection is configured but cannot be reached, the endpoint reports:

```json
{
  "app": "ok",
  "database": "unreachable"
}
```

This is useful for local testing and deployment diagnostics.

---

## 📜 Available NPM Scripts

```bash
npm run dev          # Start development server
npm run build        # Generate Prisma client and build Next.js app
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
npm run db:migrate   # Run Prisma migrations in development
npm run db:deploy    # Apply existing migrations in deployment environments
npm run db:seed      # Seed the database
npm run db:studio    # Open Prisma Studio
```

---

## ☁️ Deploying to Vercel

Bloomora is structured for Vercel deployment.

### 1. Push the project to GitHub

Create a Git repository and push the project:

```bash
git init
git add .
git commit -m "Initial Bloomora project"
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

### 2. Import into Vercel

1. Sign in to Vercel.
2. Import the GitHub repository.
3. Select the project.
4. Use the default Next.js build settings.
5. Add the required environment variables in **Project Settings → Environment Variables**.

### 3. Configure the database

Before or during deployment, make sure your Supabase/PostgreSQL database has the required migrations applied.

For a deployment environment, use:

```bash
npm run db:deploy
```

Do not rely on `npm run build` to run database migrations automatically. The project's build script currently runs Prisma generation followed by the Next.js build.

### 4. Verify deployment

Open:

```text
https://YOUR-DOMAIN/api/health
```

You should see an `app: "ok"` response and, once configured, `database: "ok"`.

---

## 📱 Running in Termux

The repository contains a dedicated guide at:

```text
SETUP-TERMUX.md
```

Basic flow:

```bash
pkg update && pkg upgrade -y
pkg install -y nodejs-lts unzip nano
termux-setup-storage
```

Then configure the project and run:

```bash
npm install
npm run dev -- --webpack -H 0.0.0.0
```

Open:

```text
http://localhost:3000
```

### Android/Termux note

Some Prisma, Tailwind, or SWC native binaries may not work correctly in Android/Termux. The included guide recommends using a Linux userspace through `proot-distro` when native binaries are incompatible.

Termux is intended for testing/development, not as the production hosting environment.

---

## 🔒 Security Notes

- Never commit `.env.local` or real credentials.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.
- Never expose `RAZORPAY_KEY_SECRET` or `RAZORPAY_WEBHOOK_SECRET` publicly.
- Only variables intentionally prefixed with `NEXT_PUBLIC_` should be considered browser-visible.
- Keep payment webhook endpoints authenticated/verified when implemented.
- Use Supabase Row Level Security where appropriate when customer-facing data is stored there.
- Review database permissions before moving to production.

The repository's `.gitignore` already excludes local environment files, generated folders, build output, and common editor/OS files.

---

## 🎨 Brand

Bloomora's brand configuration is centralized in:

```text
lib/brand.ts
```

Current identity:

```text
Name: Bloomora
Legal name: Bloomora Nursery & Garden Supplies
Tagline: Bring Nature Home
Locale: en-IN
Currency: INR
Free delivery badge: Free Delivery Above ₹999
```

Brand colours are defined centrally so the application can use one source of truth for the visual identity.

---

## 🧭 Project Roadmap

The current codebase is a foundation for a complete ecommerce experience. Natural next phases include:

### Phase 1 — Storefront

- Home page
- Product listing/grid pages
- Category pages
- Product detail pages
- Search and filters
- Responsive navigation

### Phase 2 — Customer experience

- Supabase authentication
- Customer profile
- Address management
- Cart
- Wishlist
- Recently viewed products
- Checkout

### Phase 3 — Payments & fulfillment

- Razorpay checkout
- Payment verification
- Razorpay webhook handling
- COD validation
- Shipping calculations
- Order tracking
- Returns/refunds

### Phase 4 — Admin

- Product management
- Inventory management
- Order management
- Coupon management
- Reviews moderation
- Banner/content management
- Site settings
- Pincode/serviceability management

### Phase 5 — Growth & SEO

- Product/category SEO pages
- Blog
- Analytics
- Meta Pixel
- Search improvements using PostgreSQL trigram indexes
- Performance and caching optimization

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/my-feature
```

3. Install dependencies and configure `.env.local`.
4. Make your changes.
5. Run checks:

```bash
npm run lint
npm run typecheck
npm run build
```

6. Commit and push your branch.
7. Open a pull request.

---

## 📄 License

No open-source license is currently declared in this repository. Unless a license is added, normal copyright restrictions apply.

---

## 🌱 About Bloomora

Bloomora is designed as an India-focused online nursery and gardening store with a strong emphasis on plants, blooms, gardening essentials, and a simple modern shopping experience.

**Bloomora — Bring Nature Home.**
