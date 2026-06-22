# SportNest 🎟️
**Your All-Access Pass to Play** — Sports facility booking platform built with Next.js 15.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

## Project Structure

```
sportnest/
├── app/
│   ├── globals.css              ← Design tokens + animations
│   ├── layout.jsx               ← Root layout (fonts, Navbar)
│   ├── page.jsx                 ← Home page
│   ├── login/page.jsx
│   ├── register/page.jsx
│   ├── facilities/
│   │   ├── page.jsx             ← All facilities + search/filter
│   │   └── [id]/page.jsx        ← Facility detail + booking form
│   ├── my-bookings/page.jsx
│   ├── add-facility/page.jsx
│   ├── manage-facilities/page.jsx
│   └── not-found.jsx            ← Custom 404
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── FeaturedFacilities.jsx
│   ├── HowItWorks.jsx
│   ├── SportCategories.jsx
│   ├── Testimonials.jsx
│   └── Footer.jsx
├── package.json
├── tailwind.config.js
├── next.config.js
└── postcss.config.js
```

## Design System

All tokens live in `app/globals.css`. Reference them anywhere via CSS variables:

| Variable | Value | Usage |
|---|---|---|
| `--color-pine` | `#16332A` | Primary brand color |
| `--color-court` | `#D4E157` | Accent (tennis-ball yellow) |
| `--color-clay` | `#C2502E` | Live/active cues |
| `--color-paper` | `#F1F2EA` | Page background |
| `--font-display` | Instrument Serif | All headings |
| `--font-body` | Hanken Grotesk | Body text |
| `--font-mono` | Space Mono | Prices, times, codes |

## Adding Authentication

This project uses static UI — wire in **Better Auth** for real auth:

```bash
npm install better-auth
```

Replace the login/register form `button onClick` handlers with your auth calls. All private route pages are already marked with `Private Route` labels.

## Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key
```

## Tech Stack

- **Next.js 15** (App Router)
- **React 18**
- **Tailwind CSS 3**
- **Lucide React** (icons)
- **Instrument Serif + Hanken Grotesk + Space Mono** (Google Fonts)
