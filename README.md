# Penofolic website

Static site (HTML + CSS + JS, no build step) for Cloudflare Pages via GitHub.

## Deploy (free)
1. Create a GitHub repository and upload **everything in this folder** to its root (keep the `assets/` folder).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**, pick the repo.
3. Framework preset: **None**. Build command: *leave blank*. Build output directory: `/`.
4. Deploy. Every push to `main` redeploys automatically.
5. Optional: **Custom domains** tab → add `penofolic.com` (or similar).

If your Pages URL is not `penofolic.pages.dev`, update it in `index.html` (canonical tag), `robots.txt` and `sitemap.xml`.

## Before going live
- **Contact form:** create a free form at formspree.io and replace `YOUR_FORM_ID` in `index.html`.
  Until you do, the form opens the visitor's email app addressed to Penofolic@yahoo.com, so nothing is lost.
- **LinkedIn:** replace the `href="#"` on the LinkedIn link in the footer.
- **Insights:** the three insight cards link to the contact form; point them to real reports/PDFs when ready
  (put PDFs in `assets/` and link `assets/your-report.pdf`).
- **Founder photo (optional):** add `assets/founder.webp` and replace the `AK` monogram block.

## Images
All photographs are free-licence Unsplash images served from Unsplash's CDN (`images.unsplash.com`),
resized per device with `srcset`, so the repo stays tiny and pages load fast. Unsplash's licence
allows free commercial use without attribution (a credit is included in the footer anyway).

To swap an image, find the photo on unsplash.com, copy its `photo-XXXXXXXX-XXXXXX` ID and replace it in
`index.html` (each image appears in `src` and `srcset`).

| Section | Photo |
|---|---|
| Hero | Bandra–Worli Sea Link, Mumbai |
| 01 Macro & quant | analytics dashboard |
| 02 Public finance | calculator, coins |
| 03 Trade | container terminal |
| 04 Market research | Indian market street |
| 05 Policy | classical columns |
| 06 AI | circuit-brain |
| 07 MEL | results-framework board |
| 08 Impact | rice-field farmers |
| 09 Investment | industrial robotics |
| 10 PMU | planning wall |

## Files
- `index.html`: all content (solutions grid + detailed solution explorer)
- `style.css`: design system (navy/gold, Cormorant Garamond + Manrope)
- `script.js`: sticky header, mobile menu, solution tabs, scroll reveals, form handling
- `_headers`: Cloudflare caching and security headers
- `404.html`, `robots.txt`, `sitemap.xml`
- `assets/`: logos (cut from the Penofolic brand sheet) and favicons
