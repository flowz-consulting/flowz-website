# Flowz Consulting

Marketing site for Flowz Consulting. One page, written for a lead who opens the link from an email.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Change the words

All copy and the contact address live in [`content/site.ts`](content/site.ts).

The email is a placeholder: `hello@flowzconsulting.com`. Replace it before you send the link to anyone.

## Deploy on Vercel

This repo is ready to import. Deploy from the Vercel dashboard when you want it live.

1. Sign in at [vercel.com](https://vercel.com) and choose **Add New → Project**.
2. Import the GitHub repository `flowz-consulting/flowz-website`.
3. Leave the framework preset on Next.js. No environment variables are required. Deploy.
4. When you have the custom domain, open the project, go to **Settings → Domains**, and add it.
5. At your domain registrar, add the DNS records Vercel shows for that domain. Vercel prints the exact records (typically an A record and a CNAME for `www`).
