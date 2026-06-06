# Afya Capital — Website (Production-Ready Static Site)

This is a **complete, production-ready static website**. There is no build step, no framework, and no dependencies — just HTML, one CSS file, one JS file, and image assets. It can be deployed to any static host as-is.

> **For Claude Code:** The task is to **deploy** these files. They are finished production assets, not design references to recreate. Do not rewrite them into a framework unless the user explicitly asks. Pick one deployment path below based on what the user wants.

---

## Contents

```
.
├── index.html        # Home
├── about.html        # About
├── services.html     # Services
├── contact.html      # Contact (front-end-only inquiry form)
├── css/
│   └── styles.css    # All styles (design system + pages)
├── js/
│   └── main.js       # Nav, scroll reveals, animated counters, interactive markets, form
└── images/
    ├── logo-light-no-tagline.png   # Navy wordmark (for light backgrounds)
    ├── logo-dark-no-tagline.png    # Light wordmark (for dark backgrounds)
    ├── symbol-on-transparent.png   # Favicon / leaf "A" mark
    ├── logo-afya-wordmark.svg
    └── logo-afya-wordmark-dark.svg
```

All paths are **relative**, so the site works from any subdirectory or domain root. Just keep the folder structure intact.

---

## Deployment options

### Option A — Push to the existing GitHub repo + GitHub Pages
The original repo is **`wefola/afyacapital-website`** (default branch `main`).

```bash
# from inside this folder, with the repo cloned alongside
git clone https://github.com/wefola/afyacapital-website.git
cd afyacapital-website

# replace the old files with the new build
cp -R ../index.html ../about.html ../services.html ../contact.html ./
cp -R ../css ../js ../images ./

git add -A
git commit -m "Redesign: premium multi-page site (home, about, services, contact)"
git push origin main
```

Then enable **GitHub Pages**: repo → Settings → Pages → Source = `main` / root. Site goes live at `https://wefola.github.io/afyacapital-website/` (or the custom domain if configured).

### Option B — Netlify (drag-and-drop or CLI)
```bash
npm i -g netlify-cli
netlify deploy --prod --dir .
```
Or drag this folder onto https://app.netlify.com/drop.

### Option C — Vercel
```bash
npm i -g vercel
vercel --prod
```
Framework preset: **Other** (static). Output dir: project root.

### Option D — Any web server / S3 / cPanel
Upload the entire folder (keeping `css/`, `js/`, `images/` intact). `index.html` is the entry point. No server-side runtime required.

---

## Notes / things the user may want next

- **Contact form is front-end only.** It shows a confirmation but does not send email. To make it live, wire `form.cform` (in `contact.html`) to a backend or a service like Formspree / Netlify Forms. For Netlify Forms, add `netlify` and `name="contact"` attributes to the `<form>` and a hidden `form-name` field.
- **Market & feature images** are loaded from Unsplash URLs (in `index.html` and `about.html`). Swap these for the client's own hospital photography for a fully bespoke result — search for `images.unsplash.com` to find them.
- **Fonts** load from Google Fonts (Cormorant Garamond + Public Sans). No action needed; self-host if an offline build is required.
- **Brand:** Navy `#082048`, Gold `#C09858`, Bone `#F4EFE6`. Tokens are defined at the top of `css/styles.css`.

The site is fully responsive (desktop → mobile, with a slide-in mobile menu) and has no console errors.
