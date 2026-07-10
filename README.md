# Personal website — setup and automation

A complete static website. No build step, no server. The publications page updates itself from your ORCID record, so once it is live you rarely touch it.

## Files

```
site/
├── index.html          Home
├── research.html       Research statement (past / current / future)
├── publications.html   Auto-updating publication list
├── teaching.html       Teaching and doctoral supervision
├── cv.html             Short CV (+ link to a PDF you add)
├── ai.html             How I use AI in my scientific work
├── contact.html        Contact details
├── style.css           Shared styling
├── pubs.js             Live ORCID feed + fallback list
└── README.md           This file
```

## How the automation works

- **Source of truth:** you deposit a publication once in **HAL** (idHal `lukas-rass-masson`).
- **HAL pushes to ORCID:** enable this once (steps below). New HAL deposits then appear on your ORCID record automatically.
- **The website reads ORCID live:** `publications.html` calls the ORCID public API in the visitor's browser each time the page loads. Verified working: 65 works, loads cross-origin, no build needed.
- **Net result:** add to HAL, and both ORCID and the website follow. Zero manual editing of the site.

If ORCID is ever unreachable, the page shows a short curated list instead of an empty page, then refreshes automatically once the feed is back.

## Part A — Enable HAL to ORCID push (once)

1. Sign in to HAL, open **Mon espace → Mon profil** (AuréHAL).
2. Find the ORCID section and connect your ORCID iD (`0000-0002-6462-7270`), authorising HAL when ORCID asks.
3. Turn on sending / exporting your HAL publications to ORCID.

Exact menu labels change; if you want, I can walk you through it live in Chrome once you are signed in to HAL and ORCID.

## Part B — Enable ORCID auto-update from Crossref (once, optional)

1. Sign in at orcid.org.
2. When ORCID offers to enable **auto-update** (or via **Account settings → Trusted parties**), authorise **Crossref Metadata Search** as a trusted organisation.
3. New articles that Crossref indexes under your ORCID are then proposed to your record automatically.

This is a useful backstop alongside the HAL push.

## Part C — Publish on GitHub Pages (free)

1. Create a free account at github.com (your action; I cannot create accounts or log in for you).
2. Create a new repository named exactly `YOURUSERNAME.github.io`.
3. Upload the contents of this `site/` folder into the repository (the web UI supports drag-and-drop of all files at once).
4. Open **Settings → Pages**, set **Source** to *Deploy from a branch*, branch `main`, folder `/ (root)`, and Save.
5. In about a minute the site is live at `https://YOURUSERNAME.github.io`.

### Optional custom domain

In **Settings → Pages → Custom domain**, enter a domain you own (for example your name), then add the DNS records GitHub shows you at your registrar. GitHub issues an HTTPS certificate automatically.

## Before publishing — quick checklist

- [ ] Swap the placeholder email on `contact.html` for your institutional UT-Capitole address.
- [ ] Add a real photo (replace the placeholder box on `index.html`) or remove it.
- [ ] Drop `CV_Lukas_Rass-Masson.pdf` into the folder if you want the CV download button to work.
- [ ] Read `research.html` and `ai.html` once more; they are written in your voice and make commitments about your practice.
- [ ] Confirm the space law axis on `research.html` (listed as current).

## Maintenance

- Deposit new work in HAL. Everything else follows.
- Revisit the research and AI statements about once a year.
- Update roles and bio when they change (edit the relevant `.html` file).
