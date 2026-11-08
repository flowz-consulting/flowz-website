# Flowz Consulting

Marketing site for Flowz Consulting. One page, written for a lead who opens the link from an email.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Change the words

All copy and the contact address live in [`content/site.ts`](content/site.ts). The address on the site is `info@flowz.dk`.

## Savings review form

The form posts a review request to a private Discord channel. It shows a success message only after Discord accepts the webhook. Until `DISCORD_WEBHOOK_URL` is set, the form shows an error and asks the visitor to email `info@flowz.dk`.

Create the webhook in Discord: open the channel, then **Edit Channel → Integrations → Webhooks → New Webhook**, and copy the webhook URL. Add it in Vercel under **Settings → Environment Variables** for Production and Preview, and mark it Sensitive. It is server-only. Do not prefix it with `NEXT_PUBLIC_`.

```
DISCORD_WEBHOOK_URL=
```

The value must be an `https://discord.com/api/webhooks/...` URL, or the older `discordapp.com` host. A forum thread can use `?thread_id=` on that same URL. For local checks, put the same name in `.env.local` and restart `npm run dev`. See [`.env.example`](.env.example).

## Deploy on Vercel

This repo is ready to import. Deploy from the Vercel dashboard when you want it live.

1. Sign in at [vercel.com](https://vercel.com) and choose **Add New → Project**.
2. Import the GitHub repository `flowz-consulting/flowz-website`.
3. Leave the framework preset on Next.js. No environment variables are required to launch. Deploy.
4. When you have the custom domain, open the project, go to **Settings → Domains**, and add it.
5. At your domain registrar, add the DNS records Vercel shows for that domain. Vercel prints the exact records (typically an A record and a CNAME for `www`).

## Google Analytics

The cookie banner is already on the site. Analytics does not load until a visitor presses Accept.

When you have a measurement ID, add it in the Vercel project under **Settings → Environment Variables**:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX
```

Redeploy after saving it. Visitors who already rejected stay unmeasured. Visitors who have not chosen yet see the banner again only if they have no saved choice.
