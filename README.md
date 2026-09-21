# Aether Store

A small digital store you can deploy by filling in environment variables and pushing to Vercel.

This is **Day 1** of the autonomous AI commerce system: the public storefront and paywall. Later modules (email, accounting, agents) plug into the APIs this app already exposes.

## What customers see

- Home page that explains the store in plain language
- Catalog of three one-time packs + a $9/month library membership
- Product pages with contents and price
- Stripe Checkout (cards, Apple Pay, Link — Stripe hosts the form)
- Success / cancel pages
- A locked library that opens after payment

## What you do

1. Open this repo.
2. Copy `.env.example` values into Vercel → Settings → Environment Variables.
3. Import the repo in [Vercel](https://vercel.com/new).
4. Deploy.

You are the legal owner and emergency override. You are not the cashier.

Repo: https://github.com/CreigT/aether-store

## Environment variables

See `.env.example`. Required for live checkout:

- `NEXT_PUBLIC_APP_URL` — your Vercel URL
- `NEXT_PUBLIC_SUPPORT_EMAIL`
- `NEXT_PUBLIC_OWNER_NAME`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `ACCESS_TOKEN_SECRET` — `openssl rand -hex 32`
- `STRIPE_WEBHOOK_SECRET` — after you add `https://YOUR_DOMAIN/api/webhook`

## Local run

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Agent endpoints

- `GET /api/health`
- `POST /api/checkout` with `{ "slug": "starter-pack" }`
- `GET /api/session?session_id=`
- `POST /api/webhook`

Full architecture notes: `MODULE.md`
