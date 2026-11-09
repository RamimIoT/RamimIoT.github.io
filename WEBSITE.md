# IoTWithRamim · Portfolio

Personal portfolio of **Sakiul Mowla Ramim**, Lead IoT Engineer (brand: IoTWithRamim).
It covers edge hardware, FreeRTOS firmware, industrial protocols and multi-tenant IoT platforms
across aquaculture, utilities, energy, agriculture and industry.

**Live site:** https://ramimiot.github.io/

It is a plain static site (HTML, CSS and vanilla JavaScript, no build step), hosted on GitHub Pages.

> The live telemetry console in the hero section is a **simulation**. It generates plausible
> sensor readings in the browser and is not connected to any real device or broker.

## File structure

```
Portfolio/
├── index.html                      # Home page: all sections and the project cards
├── projects/<slug>/index.html      # One case-study page per project (20 pages)
├── 404.html                        # Standalone "Page not found" page (served by GitHub Pages)
├── robots.txt                      # Allows all crawlers (AI crawlers listed explicitly), points to the sitemap
├── sitemap.xml                     # Home page plus every project page, with image entries
├── llms.txt                        # Short profile and project index for AI assistants
├── llms-full.txt                   # Text of every page as markdown, for AI assistants
├── .nojekyll                       # Tells GitHub Pages to serve files as-is (no Jekyll)
├── WEBSITE.md                      # This guide (README.md is the CV)
└── assets/
    ├── Sakiul_Mowla_Ramim_CV.pdf   # Downloadable CV
    ├── css/
    │   ├── style.css               # All styles; theme colours are CSS variables at the top
    │   └── project.css             # Extra styles for the project pages
    ├── js/
    │   ├── main.js                 # Theme toggle, nav, project filters, simulated telemetry
    │   ├── project.js              # Project pages: theme toggle, image zoom
    │   └── analytics.js            # Google Analytics 4 (set GA_ID at the top) and click events
    └── img/
        ├── logo-256.png            # IoTWithRamim logo (header, 404 page)
        ├── favicon-64.png          # browser-tab icon
        ├── apple-touch-icon.png    # home-screen icon (iOS)
        └── og-image.png            # 1200x630 social preview image
```

## Preview locally

From the project folder:

```bash
python -m http.server
```

Then open http://localhost:8000 in your browser. (Opening `index.html` directly also works,
but a local server behaves more like GitHub Pages.)

## Publish to GitHub Pages

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/RamimIoT/RamimIoT.github.io.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
choose branch **`main`** and folder **`/ (root)`**, and save.
The site appears at https://ramimiot.github.io/ within a minute or two.
Later updates go live automatically after each `git push`.

Keep asset links in `index.html`
**relative** (for example `assets/css/style.css`, not `/assets/css/style.css`).

## Google Analytics

`assets/js/analytics.js` loads Google Analytics 4 on every page. Put the Measurement ID
(`G-XXXXXXXXXX`, from analytics.google.com → Admin → Data streams → Web) in `GA_ID` at the top
of the file and push. While `GA_ID` is empty, or the site is opened locally, nothing is loaded.

Besides page views, it sends these events:

- `contact` with `method` = email, phone, whatsapp, linkedin or copy_email
- `filter_projects` with `filter`, when a project filter is used
- `select_content` with `item_id`, when a project page is opened from a card or the Next/Previous links
- `ai_referral` with `ai_source`, when a visit comes from ChatGPT, Perplexity, Claude, Gemini, Copilot
  and similar AI tools (by referrer or `utm_source`)

CV downloads and outbound links are recorded by GA4's built-in enhanced measurement.

## Search engines and AI assistants

- Every page has a canonical URL, Open Graph/Twitter tags and schema.org structured data:
  `Person`, `WebSite`, `ProfilePage` and a project list on the home page; `CreativeWork` and
  `BreadcrumbList` on each project page.
- `llms.txt` and `llms-full.txt` give AI assistants a plain-text summary and the full site text.
  After changing page text, regenerate `llms-full.txt` (or edit it by hand) so it stays in sync.
- When you add a project page, add it to `sitemap.xml` and `llms.txt` as well.

## Editing content

- **Text and sections:** all copy lives in `index.html`. Edit it directly; there is no CMS or build step.
- **CV:** replace `assets/Sakiul_Mowla_Ramim_CV.pdf` with a new PDF of the same name and the
  download buttons keep working.
- **Theme colours:** the palette is defined as CSS variables at the top of `assets/css/style.css`
  (`:root[data-theme="dark"]` and `:root[data-theme="light"]`), for example `--accent`, `--accent-2`, `--bg`.
- **Social preview / favicon:** `assets/img/og-image.png` (1200x630), `assets/img/favicon-64.png` and `assets/img/apple-touch-icon.png`.
- **Project pages:** each card links to `projects/<slug>/index.html`, a plain HTML page you can edit
  directly. Photos sit next to it in `projects/<slug>/img/`. To add a page, copy an existing project
  folder, edit the text, link a new card to it, and add its URL to `sitemap.xml`.
- **Old address:** `Portfolio/index.html` redirects https://ramimiot.github.io/Portfolio/ to the root, and `404.html` forwards any other old `/Portfolio/...` link.

### Adding a project card

In `index.html`, find the `<ul class="project-grid" id="project-grid">` list, copy an existing
`<li class="project" data-cat="...">` block and edit it:

```html
<li class="project" data-cat="industry">
  <a href="https://example.com/case-study" target="_blank" rel="noopener">
    <span class="p-cat">Industrial</span>
    <h3>Project title</h3>
    <p>One or two sentences on what it does and your role.</p>
    <ul class="p-tags"><li>ESP32</li><li>Modbus</li><li>MQTT</li></ul>
    <span class="p-link">Case study <svg class="ico"><use href="#i-external"/></svg></span>
  </a>
</li>
```

`data-cat` controls which filter button shows the card. Available categories:

| `data-cat` | Filter button      |
|------------|--------------------|
| `aqua`     | Aquaculture        |
| `industry` | Industrial         |
| `city`     | Utilities & City   |
| `agri`     | Agriculture        |
| `safety`   | Health & Safety    |

A card can belong to several categories by separating them with a space, e.g. `data-cat="city safety"`.

## Repository name and URL

The repo is named `RamimIoT.github.io`, so GitHub Pages serves it from the root URL
`https://ramimiot.github.io/`. If the repo is ever renamed again, update every absolute URL:

- `index.html`: canonical link, `og:url`, `og:image` and the JSON-LD `url`
- `404.html`: home links and favicon URL
- `robots.txt`: sitemap URL
- `sitemap.xml`: `<loc>`
