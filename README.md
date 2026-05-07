# Rajshahi Mangoes 🥭

Premium mango e-commerce store. Order authentic Rajshahi varieties, build custom mixed boxes, and get them delivered across Bangladesh.

**[Live Demo](https://mango-store.vercel.app)** _(coming soon)_

## Features

- **12 authentic Rajshahi varieties** — Himsagar, Langra, Fazli, Amrapali, Gopalbhog, Khirsapat, and more
- **Custom box builder** — mix & match varieties to build your perfect mango box
- **Full cart + checkout** — add to cart, customer details, address (64 districts), payment method
- **Email notifications** — order confirmation to customer + alert to admin (via Resend)
- **Admin dashboard** — manage products, view & update order status, track payments
- **Mobile responsive** — works on phones, tablets, and desktop

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript (strict mode) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Database | [MongoDB](https://mongodb.com) + [Mongoose](https://mongoosejs.com) |
| Email | [Resend](https://resend.com) |
| Icons | [Lucide React](https://lucide.dev) |
| Hosting | [Vercel](https://vercel.com) |

## Prerequisites

- **Node.js** 20.9+ (required by Next.js 16)
- **MongoDB** database — local (`mongodb://localhost:27017`) or [MongoDB Atlas](https://mongodb.com/atlas) (for production)
- **Resend** account — for transactional emails (optional for local dev)

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/Dohasse/mango-store.git
cd mango-store

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Fill in .env.local with your values
#    - MONGODB_URI (required)
#    - RESEND_API_KEY (optional, skip emails if blank)
#    - ADMIN_EMAIL (optional)

# 5. Start dev server
npm run dev

# 6. Seed the database (MongoDB must be running)
curl -X POST http://localhost:3000/api/seed
# Or: npm run seed
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB connection string |
| `RESEND_API_KEY` | No | Resend API key for emails. Emails silently skipped if blank. |
| `ADMIN_EMAIL` | No | Email to receive new order alerts |
| `NEXT_PUBLIC_SITE_URL` | No | Site URL for email links. Defaults to `http://localhost:3000` |

For Vercel deployment, set these in the Vercel dashboard → Settings → Environment Variables.

## Project Structure

```
mango-store/
├── app/
│   ├── layout.tsx              # Root layout (Providers + Geist font)
│   ├── page.tsx                # Home page (Hero + Features)
│   ├── globals.css             # Tailwind v4 + theme
│   ├── shop/
│   │   ├── page.tsx            # Product listing
│   │   └── [id]/page.tsx       # Single product detail
│   ├── customize/page.tsx      # Custom box builder
│   ├── cart/page.tsx            # Shopping cart
│   ├── checkout/page.tsx        # Checkout form
│   ├── order-confirmation/[id]/page.tsx  # Order success
│   ├── admin/
│   │   ├── page.tsx            # Dashboard
│   │   └── orders/[id]/page.tsx # Order detail
│   └── api/
│       ├── products/route.ts   # GET/POST all products
│       ├── products/[id]/route.ts  # GET single product
│       ├── orders/route.ts     # GET/POST all orders
│       ├── orders/[id]/route.ts    # GET/PATCH single order
│       ├── checkout/route.ts   # POST create order + send emails
│       └── seed/route.ts       # POST seed 12 mango varieties
├── components/
│   ├── Navbar.tsx              # Site header + cart badge
│   ├── Hero.tsx                # Homepage banner
│   ├── Features.tsx            # Feature cards
│   └── Providers.tsx           # Client wrapper (CartProvider)
├── lib/
│   ├── db.ts                   # MongoDB connection (Mongoose)
│   ├── CartContext.tsx          # Cart state (Context + localStorage)
│   ├── email.ts                # Resend email helper
│   ├── seed-data.ts            # 12 mango varieties
│   └── models/
│       ├── Product.ts          # Mongoose Product schema
│       └── Order.ts            # Mongoose Order schema
└── public/                     # Static assets
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Lint code |
| `npm run seed` | Seed database (requires running dev server) |

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com/new)
3. Set **Environment Variables** (see above)
4. Deploy!
5. After deployment, seed the database:
   ```bash
   curl -X POST https://your-domain.vercel.app/api/seed
   ```

### MongoDB Atlas Setup

1. Create a [free M0 cluster](https://cloud.mongodb.com)
2. Create a database user (Database Access)
3. Add IP `0.0.0.0/0` (Network Access) — Vercel uses dynamic IPs
4. Copy the connection string → set as `MONGODB_URI`
5. Replace `<password>` in the URI with your database user password

### Resend Setup

1. Create a [Resend](https://resend.com) account
2. Add & verify your sending domain
3. Generate an API key with "Sending" permission
4. Set as `RESEND_API_KEY`

## License

MIT — built for the love of Rajshahi mangoes. 🥭
