# Penofolic Website

A responsive static consulting website designed for deployment through GitHub and Cloudflare Pages.

## Deploy to Cloudflare Pages
1. Upload all files in this folder to the root of a GitHub repository.
2. In Cloudflare, go to **Workers & Pages** and choose **Import a repository / Connect to Git**.
3. Select the repository and `main` branch.
4. Set **Framework preset** to `None`.
5. Leave **Build command** blank.
6. Set **Build output directory** to `/` or leave blank.
7. Deploy.

## Before going live
- Replace `YOUR_FORM_ID` in `index.html` with a Formspree form ID.
- Replace the LinkedIn placeholder link.
- Replace insight placeholders with actual reports and case studies.
- Add your final logo to `assets/` and replace the text-based brand mark if desired.

## Files
- `index.html`: all website content
- `style.css`: responsive visual design
- `script.js`: mobile navigation and footer year
- `assets/logo-placeholder.svg`: editable placeholder logo
Website deployment update
