# Project: Nutri Salad Marketing Website

## Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS (custom palette: parrot-*, earth-*, emerald-*, espresso-*, citrus-*, cream-*)
- Framer Motion (animations)
- React Router v6 (lazy-loaded routes)
- React Helmet Async (SEO)
- jspdf + html2canvas (PDF reports)
- Context API (CartContext, AuthContext, ToastContext)

## Brand Rules
- All cards/boxes = `rounded-none` (sharp rectangles, no rounding)
- Brand green = parrot-*, dark = earth-900

## Routes
| Path | Component | Layout |
|------|-----------|--------|
| `/` | Home | MainLayout |
| `/menu` | Menu | MainLayout |
| `/menu/:slug` | ProductDetail | MainLayout |
| `/subscriptions` | Subscriptions | MainLayout |
| `/corporate` | Corporate | MainLayout |
| `/reviews` | Reviews | MainLayout |
| `/contact` | Contact | MainLayout |
| `/faq` | FAQ | MainLayout |
| `/ai-advisor` | AiAdvisor | MainLayout |
| `/checkout` | Checkout | MainLayout |
| `/login` | Login (GuestRoute) | MainLayout |
| `/register` | Register (GuestRoute) | MainLayout |
| `/account` | MyAccount (ProtectedRoute) | MainLayout |
| `/admin` | AdminDashboard (ProtectedRoute+adminOnly) | AdminLayout |
| `/admin/products` | AdminProducts | AdminLayout |
| `/admin/reports` | AdminReports | AdminLayout |

## Admin Panel
- **AdminLayout**: sidebar + header + footer wrapper
- **Dashboard** (`/admin`): 6 stat cards (Today Orders, Total Revenue, Active Subscriptions, Pending Deliveries, Today Available Menu, Low Stock Items) + category breakdown
- **Products** (`/admin/products`): Product table (search, edit, delete) + full add/edit form (images, pricing, nutrition, ingredients, tags, delivery, status, category, days, toggles, secondary categories)
- **Reports** (`/admin/reports`): Clean placeholder with PDF download
- **Sidebar**: Dashboard, Products, Reports, Orders, Customers, Content, Settings, Back to Site
- **Product form fields**: name (max 60), slug (auto-generated), short description (max 150), long description, price, discountedPrice, nutrition (cal/protein/carbs/fat/fiber), ingredients, tags, deliveryInfo, images (file OR URL per row, at least 1 required), status (Active/Inactive/Draft), category (dynamic from localStorage), secondary categories, available days, toggles (isNew, isBestseller, isCustomizable, availableForSubscription)

## Key Features Implemented
- Homepage split into 11 modular sections (FeaturedProducts removed)
- Framer Motion animations throughout
- Image fallbacks with emoji placeholders
- Out of Stock: When product.status === 'Inactive', shows overlay badge on cards, replaces Add to Cart with "Out of Stock" on detail page, disables WhatsApp/Schedule buttons
- Character limits with live counters (60 name, 150 short desc)
- Auto-generated product descriptions (falls back when longDescription is empty)
- Dynamic categories stored in localStorage (admins can create/manage via modal)
- Add to Cart button uses bg-earth-900 (black) instead of green gradient
- Mobile responsive sidebar overlay drawer
- Compact admin layout (reduced padding, font sizes, gaps)

## Product Type (`src/types/product.ts`)
- `Product` interface includes `status?: 'Active' | 'Inactive' | 'Draft'`

## API (`src/utils/api.ts`)
- `ProductData` interface includes `status: string`
- Methods: `getProducts()`, `createProduct()`, `updateProduct(id)`, `deleteProduct(id)`, `getOrders()`, `createOrder()`

## Utilities
- `src/utils/categories.ts` — manages categories in localStorage with 9 defaults, supports add/remove/reset
- `src/utils/cn.ts` — className utility
- `src/utils/availability.ts` — getAvailabilityStatus for weekday availability

## Build
- `npm run build` passes with zero TS errors
- `npm run dev` for development

## Backend (server/)
- **Stack**: Node.js + Express.js (ESM)
- **Database**: PostgreSQL with raw SQL (via `pg`), Drizzle ORM schema definitions
- **Auth**: JWT (httpOnly cookies) + Passport Google OAuth2
- **Key files**:
  - `app.js` — Express app (exported for testing)
  - `index.js` — Entry point (connects DB, seeds, starts server)
  - `config/database.js` — pg.Pool connection manager
  - `config/passport.js` — Google OAuth2 strategy
  - `middleware/authMiddleware.js` — `protect` (JWT) + `adminOnly` (role)
  - `models/` — User, Product, Order (raw SQL CRUD)
  - `controllers/` — auth, product, order, user logic
  - `routes/` — RESTful route definitions
- **Tests**: Vitest + supertest (14 tests across auth + products)
- **Docker**: Multi-service setup (postgres + server + client via nginx)
- **CI/CD**: GitHub Actions (lint → test → build → Docker push)

## What Was Done Last Session
- [x] Removed DeliveryChecker section from homepage (PremiumHomepage.tsx + deleted file)
- [x] Polished HeroSection: React state-based image fallback, floating decorative food icons, smoother animations
- [x] Standardized all homepage sections to use SectionHeading (WhyChooseUs, HowItWorks, NutritionTips, SuccessStories, SubscriptionPlans, FAQSection, ReviewsCarousel)
- [x] Added RevealOnScroll animations to WhyChooseUs, NutritionTips, SuccessStories cards
- [x] Converted image onError handlers from DOM manipulation to React state (ReviewsCarousel, SuccessStories, DailyMenuShowcase, HeroSection)
- [x] Removed dead duplicate components (Hero.tsx, WhyUs.tsx, PopularItems.tsx)
- [x] FeaturedProductsGrid: replaced framer-motion CSS loop with rAF scrollLeft (auto-scroll + user scroll), added arrow buttons + keyboard navigation
- [x] Redesigned Checkout page: official payment page style with brand theme (rounded-none, parrot-*/earth-* palette), two-column layout, secure header
- [x] Admin Products: Made Edit/Delete buttons always visible (removed group-hover opacity)
- [x] Category name display: auto-capitalizes first letter of each word; addCategory() auto-capitalizes

## Current Session Work (June 2026)

### Homepage Redesign (PremiumHomepage.tsx)
Complete rewrite of homepage with 11 sections:

| # | Section | Background | Status |
|---|---------|-----------|--------|
| 1 | Hero | Image bg + white/80 overlay | ✅ |
| 2 | About NutriSalad | `bg-parrot-50/30` (green tint) | ✅ |
| 3 | What We Serve (5 categories) | `bg-white` | ✅ |
| 4 | How It Works (5 steps) | `bg-gray-50/50` | ✅ |
| 5 | Dietary Preferences | `bg-parrot-50/40` | ✅ |
| 6 | Featured Products | `bg-parrot-50/20` (preserved component) | ✅ |
| 7 | Why Customers Love Our Salads | `bg-parrot-50/30` | ✅ |
| 8 | Freshness & Hygiene Promise | `bg-gray-50/50` | ✅ |
| 9 | Nutritional Calculator | `bg-parrot-50/20` | ✅ |
| 10 | Testimonials (Google Reviews style) | `bg-white` | ✅ |
| 11 | Pre-Footer CTA | `bg-parrot-600` (solid green) | ✅ |

**Sections Removed:**
- ❌ Nutrition Benefits + Perfect For Everyone (was Section 8)
- ❌ Weekly Menu (removed per user request)
- ❌ Nutritional Calculator (removed per user request)
- ❌ Testimonials / What Our Customers Say (removed per user request)
- ❌ How It Works (removed per user request)

**Key Design Decisions:**
- All cards/boxes = `rounded-none` (brand rule)
- Why Customers Love cards: `#0A472E` dark green bg, `#C9D909` lime accents, starburst number badges
- Testimonials: Google Reviews style with left sidebar (4.5 rating, 101 reviews) + right carousel
- Nutritional Calculator: 3 overlapping circular food bowl images + CTA to `/ai-advisor`
- Gujarati people names for testimonials (Priya Patel, Rajesh Sharma, etc.)

### Page Hero Banners
Created reusable `src/components/ui/PageHero.tsx` component:
- Background image with `bg-white/80` overlay
- Animated title + subtitle with Framer Motion
- Consistent `pt-32 pb-16 md:pt-40 md:pb-20` padding

**Pages Updated with PageHero:**

| Page | Path | Title |
|------|------|-------|
| About | `/about` | "Our Mission is Simple: Make Healthy Easy." |
| Menu | `/menu` | "This Week's Menu" |
| Corporate | `/corporate` | "Corporate Meal Solutions" |
| Contact | `/contact` | "Get In Touch" |
| Reviews | `/reviews` | "Loved By Thousands" |
| FAQ | `/faq` | "Frequently Asked Questions" |

**Pages with Custom Heroes (kept as-is):**
- Home `/` — PremiumHomepage Section 1 (custom hero)
- Subscriptions `/subscriptions` — Full-viewport gradient hero with parallax

### Image Paths Used
- Hero bg: `/images/hero/hero_greenery_bg.png`
- Salad bowls: `/images/salad/salad_bowl_1.jpg`, `salad_bowl_2.jpg`, `salad_bowl_3.jpg`

### File Changes Summary
- `src/features/home/PremiumHomepage.tsx` — Complete rewrite (11 sections)
- `src/components/ui/PageHero.tsx` — New reusable component
- `src/pages/About.tsx` — Added PageHero, removed inline hero
- `src/pages/Menu.tsx` — Added PageHero, removed inline hero
- `src/pages/Corporate.tsx` — Added PageHero, removed inline hero
- `src/pages/Contact.tsx` — Added PageHero, removed inline hero
- `src/pages/Reviews.tsx` — Added PageHero, removed inline hero
- `src/pages/FAQ.tsx` — Added PageHero, removed inline hero

### Lint & Build Status
- `npm run lint` — 0 errors ✅
- `npm run build` — 0 TS errors ✅

## Manage Addresses Feature
- [x] Server: `server/db/schema.js` — addresses table (Drizzle schema)
- [x] Server: `server/migrate.js` — CREATE TABLE addresses
- [x] Server: `server/models/Address.js` — CRUD model (findByUserId, create, update, delete)
- [x] Server: `server/controllers/addressController.js` — validation, auth checks, CRUD handlers
- [x] Server: `server/routes/addressRoutes.js` — GET/POST/PUT/DELETE /api/addresses (all protected)
- [x] Frontend: `src/utils/api.ts` — get/create/update/delete address methods
- [x] Frontend: `src/pages/ManageAddresses.tsx` — full PRD spec: two-column sidebar layout, address cards with HOME/WORK tags + three-dot menu (edit/set default/delete), add/edit form modal, delete confirmation modal, mobile drawer sidebar
- [x] Frontend: `src/App.tsx` — route `/account/addresses` (protected)
- [x] Frontend: `src/pages/MyAccount.tsx` — link to Manage Addresses page

## Build Status
- `npm run lint` — 0 errors
- `npm run build` — 0 TS errors
- `cd server && npm test` — 14/14 passing
