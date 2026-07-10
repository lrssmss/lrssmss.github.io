/* Live publications feed.
   Primary source: ORCID public API (client-side, CORS-enabled).
   If ORCID is unreachable, falls back to the curated list below so the
   page is never empty. HAL can be added as a secondary source later. */

const ORCID_ID = "0000-0002-6462-7270";

/* Curated fallback: shown only if the live feed cannot load. Keep in sync
   occasionally, but the live feed is the real source of truth. */
const FALLBACK = [
  { year: 2025, type: "Book", title: "Cours de droit international et européen", meta: "7e édition (updated annually since 2019)" },
  { year: 2024, type: "Journal article", title: "The Economic Attractiveness of Southeast Asian States", meta: "Revue de droit des affaires internationales (RDAI)" },
  { year: 2024, type: "Journal article", title: "Chronique de droit international privé de l'Union européenne", meta: "Journal du droit international (JDI), annual chronicle" },
  { year: 2023, type: "Book chapter", title: "La multilatéralisation des sources du droit international privé", meta: "SFDI, Éditions Pedone" },
  { year: 2022, type: "Journal article", title: "La place du juge dans la construction européenne", meta: "Les Cahiers de la Justice" },
  { year: 2021, type: "Book", title: "La politique environnementale de l'Union européenne", meta: "Bruylant (contribution)" }
];

const TYPE_LABELS = {
  "journal-article": "Journal article",
  "book": "Book",
  "book-chapter": "Book chapter",
  "edited-book": "Edited book",
  "conference-paper": "Conference paper",
  "report": "Report",
  "dissertation-thesis": "Thesis",
  "other": "Other"
};

function esc(s) {
  return (s || "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function niceType(t) {
  if (!t) return "";
  const key = t.toLowerCase().replace(/_/g, "-");
  return TYPE_LABELS[key] || t.replace(/[-_]/g, " ").replace(/\b\w/g, m => m.toUpperCase());
}

function render(items, note) {
  const root = document.getElementById("pub-list");
  const status = document.getElementById("pub-status");
  if (!items.length) { status.textContent = "No publications found."; return; }

  items.sort((a, b) => (b.year || 0) - (a.year || 0));
  let html = "";
  let lastYear = null;
  for (const it of items) {
    const y = it.year || "Undated";
    if (y !== lastYear) { html += `<div class="pub-year">${esc(String(y))}</div>`; lastYear = y; }
    const link = it.url ? ` &nbsp;<a href="${esc(it.url)}" target="_blank" rel="noopener">link</a>` : "";
    const meta = it.meta ? `<div class="meta">${esc(it.meta)}</div>` : "";
    html += `<div class="pub"><div class="t"><span class="type-tag">${esc(niceType(it.type))}</span>${esc(it.title)}${link}</div>${meta}</div>`;
  }
  root.innerHTML = html;
  status.innerHTML = note || "";
}

async function loadFromOrcid() {
  const url = `https://pub.orcid.org/v3.0/${ORCID_ID}/works`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("ORCID HTTP " + res.status);
  const data = await res.json();
  const groups = (data && data.group) || [];
  const items = groups.map(g => {
    const s = (g["work-summary"] && g["work-summary"][0]) || {};
    const title = s.title && s.title.title ? s.title.title.value : "(untitled)";
    const year = s["publication-date"] && s["publication-date"].year ? parseInt(s["publication-date"].year.value, 10) : null;
    const journal = s["journal-title"] ? s["journal-title"].value : "";
    let link = s.url ? s.url.value : "";
    const ids = s["external-ids"] && s["external-ids"]["external-id"] ? s["external-ids"]["external-id"] : [];
    const doi = ids.find(x => (x["external-id-type"] || "").toLowerCase() === "doi");
    if (doi) link = (doi["external-id-url"] && doi["external-id-url"].value) || ("https://doi.org/" + doi["external-id-value"]);
    return { title, year, type: s.type, meta: journal, url: link };
  });
  return items;
}

(async function () {
  const status = document.getElementById("pub-status");
  status.textContent = "Loading publications from ORCID…";
  try {
    const items = await loadFromOrcid();
    if (!items.length) throw new Error("empty");
    render(items, `Live feed from <a href="https://orcid.org/${ORCID_ID}" target="_blank" rel="noopener">ORCID</a>. Updates automatically when a new work is added.`);
  } catch (e) {
    render(FALLBACK, `Live ORCID feed unavailable right now; showing a curated list. It will refresh automatically once the feed is reachable.`);
  }
})();
