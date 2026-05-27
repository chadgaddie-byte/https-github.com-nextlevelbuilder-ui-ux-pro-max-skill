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

## Design decisions

| Token | Value | Why |
|-------|-------|-----|
| Primary | `#C93058` | Warm rose — festive, celebratory, passes 5.2:1 contrast with white |
| Gold | `#A16207` | Warm amber — premium feel, passes 4.6:1 on cream |
| Background | `#FFF8F4` | Warm cream — friendly, not clinical |
| Heading font | Playfair Display | Elegant serif for a keepsake/memory brand |
| Script font | Dancing Script | Used for tagline only — handwritten, personal |
| Body font | Inter | Maximum readability at all sizes |

The gallery section uses a `#F4F4F5` background to evoke a stainless fridge surface. Each magnet card is styled as a polaroid with a CSS metallic magnet cap (`::before`) and alternating CSS rotation classes.

Animations (`float-a/b/c` keyframes) respect `prefers-reduced-motion` — they collapse to instant via the global reduced-motion rule at the bottom of `styles.css`.
