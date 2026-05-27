# Instant Magnets — Marketing Website

Marketing website for **Instant Magnets**, an on-site event photo magnet service.

## Running the site

No build step required. Open `index.html` directly in any browser, or serve the folder over HTTP:

```bash
# Python (built-in, any machine)
python3 -m http.server 8080
# → open http://localhost:8080/instant-magnets/

# Node (if installed)
npx serve instant-magnets
# → open the URL shown in the terminal

# VS Code — install the "Live Server" extension, right-click index.html → Open with Live Server
```

Serving over HTTP (rather than opening the file directly) avoids browser CORS restrictions if you later add local font files or fetch calls.

## File structure

```
instant-magnets/
├── index.html    — all page sections (single-page layout)
├── styles.css    — all styles (variables, components, responsive)
├── main.js       — nav behaviour, form validation, submission stub
└── README.md     — this file
```

## Before going live — TODO checklist

Search the codebase for `TODO` to find every placeholder. Key items:

| # | What | Where |
|---|------|--------|
| 1 | **Real brand logo** | `<nav>`, footer — replace text logo with `<img>` |
| 2 | **Favicon** | `<head>` — add `<link rel="icon">` |
| 3 | **Hero magnet photos** | Hero section — 3 `<img>` placeholders |
| 4 | **Event photos** | 3 event cards (weddings, parties, corporate) |
| 5 | **Gallery magnets** | 8 gallery `<figure>` placeholders |
| 6 | **Testimonial quotes + photos** | 3 testimonial cards |
| 7 | **Contact details** | Email, phone, service area in contact section + footer |
| 8 | **Form submission** | `submitForm()` in `main.js` — wire to Formspree / Netlify / EmailJS |
| 9 | **OG image** | `<meta property="og:image">` in `<head>` |
| 10 | **Social links** | 3 footer social icons |
| 11 | **Privacy Policy / Terms** | Footer links |
| 12 | **Stats copy** | "500+ events" — update with real numbers |
| 13 | **Turnaround time** | "under 3 minutes" in Why Us — verify with actual spec |
| 14 | **Magnet materials** | "dye-sublimated" copy — confirm with actual product spec |

### Wiring up the contact form

The form does client-side validation out of the box. To receive submissions, edit `main.js` and replace the `submitForm()` stub with one of:

- **Formspree** — add your endpoint URL (free tier available at formspree.io)
- **Netlify Forms** — add `netlify` attribute to `<form>` when deploying to Netlify
- **EmailJS** — no server required; add their SDK and call `emailjs.send()`

Instructions for all three are in the `TODO` comment block inside `main.js`.

## Brand alignment

This site follows `instant-magnets-brand-guidelines.html` (kept in the repo root). All colours, fonts, the logo lockup, voice, and the magnet-on-fridge treatment are taken directly from those guidelines.

| Token | Value | Role (per guidelines) |
|-------|-------|-----------------------|
| Signature Blue | `#44A1C3` | Lead colour — fills, accents, the logo magnets panel |
| Charcoal | `#3D3D3D` | The "IM" block, dark surfaces, footer |
| Deep Blue | `#2C7A98` | Hover/pressed + **white-text buttons** (4.8:1 contrast — accessible) |
| Bright Blue | `#3FB0D8` | Highlights, links, accents on dark |
| Blue Mist | `#E3F0F5` | Gentle section fills, cards |
| Cool Paper | `#F6F8F9` | Default page background |
| Warm Ink | `#33312F` | Body text |
| Display font | **Jost** (light, wide tracking) | Headings, the logo, captions |
| Body font | **Outfit** | Paragraphs, UI, labels |

**Colour balance** follows the guideline's 60% neutral / 30% Signature Blue / 10% bright-blue accents — the photos in the magnets are meant to be the colour; the brand frames them.

### Brand signatures reproduced in code
- **Logo lockup** — the charcoal "IM" block + stacked INSTANT (white) / MAGNETS (blue) panels, recreated in pure CSS (`.lockup`), with reversed and on-blue variants. *TODO: swap for the official logo image when available.*
- **Magnets** — each framed with a thin white border, a small charcoal "pin" dot, and an italic Jost caption, exactly as specified. Alternating tilt classes match the brand's scatter.
- **Voice** — warm host, never salesy. Uses the approved phrases ("Snap. Print. Keep.", "Printed & made on-site.", "Pick a frame — we'll handle the rest.").
- **Subtle noise texture** overlay and **reveal-on-scroll** animations, both from the guidelines. Animations respect `prefers-reduced-motion`.

> Accessibility note: the guidelines use white text on Signature Blue for the large decorative logo panels (fine for large display type). For interactive **buttons** with smaller white text, this site uses **Deep Blue `#2C7A98`** instead, which clears the 4.5:1 WCAG AA threshold.
