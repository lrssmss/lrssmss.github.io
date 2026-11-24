# Academic website: setup, reuse and maintenance

Source of [lukas.rass-masson.eu](https://lukas.rass-masson.eu). A static site: no server, no build step, free hosting on GitHub Pages. The Publications page updates itself from ORCID, which is fed by HAL, so once the site is live there is almost nothing left to do.

The site can be reused as a template by colleagues: follow the steps below.

## Files

```
index.html          Home (photo, introduction, profile links)
research.html       Research (past / current / future)
publications.html   Publication list, updated automatically
teaching.html       Teaching and doctoral supervision
cv.html             Short CV + link to the PDF CV
engagement.html     Public engagement
ai.html             How I use AI in my work
contact.html        Contact
style.css           Shared styling
pubs.js             Live ORCID feed + fallback list
fonts/              Self-hosted fonts (OFL, free to reuse)
*.jpg               Photos (portrait, banner)
CV_Lukas_Rass-Masson.pdf
CNAME               Custom domain
```

## Before you start

- An idHal and an ORCID iD (orcid.org, free).
- A GitHub account (github.com, free), created yourself.
- Optional: a domain name (OVH, Gandi...), about €10 a year.

## 1. Get the template

Open https://github.com/lrssmss/lrssmss.github.io, green **Code** button → **Download ZIP**, then unzip.

## 2. Personalise

**Delete** `CNAME` (otherwise the site will try to use my domain), my PDF CV and my photos (`headshot-avatar.jpg`, `hero-toulouse.jpg`, `website-banner.jpg`). Add your own images under the same names, or change the names in `index.html`.

**Replace my identifiers** in every file. Easiest: open the folder in a free editor (VS Code or Notepad++) and use "Find / replace in all files":

| Item | My value to replace |
|---|---|
| ORCID (in `pubs.js` and every page footer) | `0000-0002-6462-7270` |
| idHal | `lukas-rass-masson` |
| Google Scholar | `Xp09ypEAAAAJ` |
| SSRN | `3923731` |
| LinkedIn | `lukas-rass-masson-1001981a2` |
| Name | `Lukas Rass-Masson` |

Remove the link to any profile you do not have rather than leaving it empty.

**Rewrite the texts** on every page: they are written in the first person, for me. An unneeded page (for example `ai.html` or `engagement.html`) can be deleted: then remove its link from the menu at the top of every page.

**Fallback list**: in `pubs.js`, replace the `FALLBACK` list with five or six key publications. It only shows if ORCID is temporarily unreachable.

**Language**: the template is in English. For a French site, change `lang="en"` to `lang="fr"` at the top of every page and translate the menu labels.

Tip: an AI assistant (Claude, for example) handles this personalisation well from a CV, provided every page is reread.

## 3. Automate publications (HAL → ORCID → site)

1. **HAL to ORCID**: in HAL, **Mon espace → Mon profil**, link your ORCID iD, authorise HAL, then turn on sending deposits to ORCID.
2. **Crossref to ORCID** (optional): on orcid.org, **Account settings → Trusted parties**, authorise **Crossref**. New indexed articles are then proposed automatically.
3. **Visibility**: on ORCID, set works to **Everyone**. Otherwise the Publications page stays empty.

Result: one deposit in HAL is enough, ORCID and then the site follow. `publications.html` calls the ORCID public API in the visitor's browser each time the page loads.

## 4. Publish on GitHub Pages

1. On GitHub, create a public repository named exactly `USERNAME.github.io`.
2. **Add file → Upload files**: drag and drop the whole content of the folder (not the folder itself), then **Commit changes**.
3. **Settings → Pages**: *Source* = *Deploy from a branch*, branch `main`, folder `/ (root)`, **Save**.
4. One or two minutes later the site is live at `https://USERNAME.github.io`.

## 5. Custom domain (optional)

My setup: a subdomain (`lukas.rass-masson.eu`) of a domain bought from OVH.

1. At the registrar (OVH: **DNS zone → Add an entry**), create a **CNAME** record: subdomain (e.g. `lukas`) → `USERNAME.github.io.`
2. On GitHub, **Settings → Pages → Custom domain**: enter the full domain and save. GitHub then creates the `CNAME` file in the repository: it is required, without it the domain does not answer.
3. Once the certificate is issued (minutes to a few hours), tick **Enforce HTTPS**.

For a domain without a subdomain (e.g. `name.fr`), GitHub shows on the same page the A records to create.

## Keeping the site up to date

- **Publications**: deposit in HAL, nothing else to do.
- **CV**: upload the new PDF under the same name (**Add file → Upload files** replaces the old one); if the name changes, update the link in `cv.html`.
- **Texts**: on GitHub, open the file, pencil icon, edit, **Commit changes**. Live within a minute.
- Reread the Research and AI pages about once a year.

## Check before announcing the site

- [ ] No trace left of my name or identifiers (search "Rass-Masson" across the folder).
- [ ] `CNAME` deleted, or replaced with your own domain.
- [ ] Photos and PDF CV replaced.
- [ ] Publications page fills up (otherwise check ORCID and its visibility).
- [ ] Every profile link opens the right profile.
