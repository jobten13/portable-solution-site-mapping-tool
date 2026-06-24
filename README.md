# Portable Solution Site Mapping Tool

Web-based site planning tool for placing field hospital and tent footprints on real-world maps at true scale. Single-file HTML app (v**0.8.8**, `lastUpdated` **2026-05-19** in `APP_META`).

**Primary file:** `Portable Solution Site Mapping Tool.html` — open in any modern browser. Version badge bottom-right reads from `APP_META.version`.

## Current release (0.8.8)

| Area | What you get |
|------|----------------|
| **Map** | Esri satellite (default), street basemap toggle, hybrid place labels, live zoom/scale (`1:n`), cursor coordinates overlay |
| **Catalog** | Five vendors (BLU-MED, Western Shelter, DLX, ZUMRO, HDT) with spec-based footprints — see [Vendor catalog](#vendor-catalog) |
| **Shapes** | Rectangle, octagon, elongated octagon, plus (hub), ellipse — plus **Custom Size** rectangles |
| **Placement** | Click model → click map; drag to move; orange handle rotate (Shift = 5°); red ✕ or Shift+click delete |
| **Snap** | **Snap to selected object** — edge-to-edge on nearest of four faces; matches target rotation (best rect-to-rect) |
| **Spacing** | Per-object clearance buffer (0–30 ft, presets); dashed ring; **footprint** (red) vs **buffer** (amber) advisories; **Intentional** for accepted buffer-only conflicts |
| **Overlap UI** | Status bar counts, sidebar warning, map **pill** (click scrolls to first flagged row) |
| **Roles** | Triage, Ward, ICU, Pharmacy, Support, Morgue + custom roles (browser + plan file) |
| **Measure** | Distance and area (header **Measure ▾**) |
| **Persistence** | Debounced **autosave** to `localStorage`; **Restore Autosave** (manual); **Save Plan** / **Open Plan** (portable JSON) |
| **Export** | GeoJSON; **Export PDF** with map snapshot (html2canvas + jsPDF; text-only fallback if capture fails); **Print Fit** |
| **Undo** | Up to 50 steps (place, move, rotate, delete, role, buffer-to-all, clear all) — Ctrl+Z / Ctrl+Y |
| **Offline** | Banner when offline; `lat, lng` search works without geocoding; layout editing works; tiles may not load |
| **A11y** | Keyboard shortcuts, focus styles, `aria-label` / `title` on controls, overlap pill keyboard support |

**Load behavior:** Each open starts at the default map view (NYC area) with an empty layout. Previous work is **not** applied automatically — use **Restore Autosave** or **Open Plan**. Autosave still runs in the background and updates the **Autosaved …** timestamp when valid data exists in this browser.

**Hover hints (v0.8.8):** Control `title` text and map tooltips match current behavior — including fresh-open/autosave, footprint vs buffer overlap, snap auto-uncheck, and delete confirm on map and placed list.

## Quick Start Card

- Search site (address/place or `lat, lng`). *Most controls show a short **`title`** on hover; the overlap **pill** also has a full explanation via `title` / `aria-label`.*
- Select vendor/model; set label, role, and under **Options ▾** set rotation + **clearance buffer** (feet) as needed. Buffer **> 0** draws the dashed clearance ring and enables **amber (buffer) advisories** when that ring conflicts with another structure.
- Click tent model (auto-enters place mode), then click map location.
- Click a placed object to select it; drag body to move, drag orange handle to rotate, red ✕ to delete (Shift+click also).
- Watch **Overlaps** in the status bar (**footprint** count, and **buffer** count when non-zero); a **pill** on the map (when there are advisories) summarizes counts and scrolls the placed list to the first flagged row when clicked.
- Run **Measure ▾** → Distance or Area (Finish Area and Clear appear when relevant).
- **Undo** / **Redo** in the header (or Ctrl+Z / Ctrl+Y) to step back layout changes.
- **Autosaved …** and **Restore Autosave** in the header for local backup; **Save Plan** for portable JSON; **Export GeoJSON** / **Export PDF** under Export ▾; **Print Fit** for print with metadata.
- Click the mode badge (or press Esc) to return to View mode from place/measure.

## Project files

| File | Purpose |
|------|---------|
| `Portable Solution Site Mapping Tool.html` | Main application |
| `Portable Solution Site Mapping Tool - Quickstart.html` | Field quickstart (sole operator quick reference; open in browser) |
| `VENDOR_SPECS_DIGEST.md` | Spec alignment notes for `TENT_DB` |
| `PSMT_Project_Notes.md` | Roadmap and backlog notes |
| `Initial prompt.txt` | Original build prompt |
| `Old/` | Archived earlier versions |

## Session and autosave

- **Autosave:** After each change, layout + map view are written to `localStorage` (`psmt-session`) after a 500 ms debounce.
- **On open:** Default view only; if autosave data exists, the header shows when it was last saved and enables **Restore Autosave**.
- **Restore Autosave:** Replaces the current layout (confirm if structures are already placed). Use after a refresh or accidental close — not a substitute for **Save Plan** when sharing or archiving.
- **Save Plan / Open Plan:** Portable JSON including objects, map view, operation name, custom roles, and `intentionalBufferOverlap` per object.
- **Undo history** is in-memory only; cleared on **Open Plan** and page refresh.

## Vendor catalog

Dimensions follow `VENDOR_SPECS_DIGEST.md`. Default vendor colors apply on placement and when loading plans (overridable via color swatches).

| Vendor | Models in tool |
|--------|----------------|
| **BLU-MED** | 2032.5, 2039, Vestibule |
| **Western Shelter** | GK1935, GK20, Vestibule, Generator 70 kVA (on trailer) |
| **DLX** | X-24, Quad (X-HUB), X-32 |
| **ZUMRO** | Quad Interface, Model 400, Model 600, Interconnect |
| **HDT** | Base-X 305, Base-X Dome (8D36) |

**Footprint shapes:** `rect`, `octagon`, `elongated-octagon`, `plus` (hubs), `ellipse` (dome).

## Tooltips and map hints

Hover nearly any control for a `title` hint; map objects use Leaflet tooltips. Aligned with behavior as of **v0.8.8**.

| Area | What the hint explains |
|------|-------------------------|
| **Autosave / Restore** | Fresh open each time; autosave is browser-only; restore is manual |
| **Undo / Redo** | Up to 50 steps in-session; cleared on refresh — use Restore Autosave or Save Plan |
| **Clearance buffer** | Amber when clearance conflicts with another **footprint or** clearance ring (not only buffer-to-buffer) |
| **Overlap pill** | Red = footprint intersect; amber = clearance conflict; **Intentional** in list for amber-only; click pill scrolls to first flagged row |
| **Snap to selected** | Select target first; four-face attach; **unchecks after successful snap** |
| **Delete** | Map ✕, list ✕, and Shift+click all **confirm**; Undo restores before refresh |
| **Search results** | First match auto-centered; dropdown picks alternates |
| **Tent catalog** | Vendor tab and tent card `title` show spec notes where available |
| **Placed footprint** | `sticky: false`; closes on drag; dimensions, role, rotation, buffer; Shift+click delete (confirm) |
| **Rotate / delete handles** | Drag to rotate (Shift = 5°); delete confirms; Undo before refresh |

## Overlap and clearance (how it works)

- **Footprint overlap (red):** Solid footprints intersect. Affected objects get a **red** outline on the map, a **red** left border in the placed list, and count toward **footprint** in the status bar. This is independent of clearance buffer.
- **Buffer / clearance advisory (amber):** When **clearance buffer > 0** on at least one object, the **dashed** ring is tested against the other object’s footprint (and buffer–buffer where both have buffers). If footprints do **not** overlap but clearance still conflicts, those objects get an **amber** outline on the map and an **amber** left border in the list. Counts appear as **buffer** in the status bar (suffix `, N buffer`) and in the sidebar warning line.
- **Intentional (buffer only):** Rows that are **amber-only** show an **Intentional** checkbox. Checking it marks that structure so it is omitted from buffer advisories (does **not** change footprint overlap). Stored in plans as `intentionalBufferOverlap` and in undo snapshots as `intentionalBuffer`.
- **Geometry:** Overlap uses layer coordinates in the map projection (same space as Leaflet draws), including after pan/zoom, and supports non-rectangular footprints (plus, elongated octagon, ellipse, etc.).

## Reference docs

- **`VENDOR_SPECS_DIGEST.md`** — Vendor tent specs digest. **Implemented:** `TENT_DB` dimensions and shapes follow this digest; vendor pre-assigned colors on placement and plan load. HDT lineup: Base-X 305 and Base-X Dome (8D36) only.

## Versioning

- Version and date live in `APP_META` inside `Portable Solution Site Mapping Tool.html`.
- Same version appears in the bottom-right badge (`vX.Y.Z`).
- Update this README when bumping `APP_META.version`.

## Change log

| Version | Date       | Notes |
|---------|------------|-------|
| 0.8.8   | 2026-05-19 | Tooltip/title/aria aligned with current behavior; list delete confirm; README, PSMT_Project_Notes, and Quickstart synced. |
| 0.8.7   | 2026-04-01 | Two-tier overlap (footprint red / clearance buffer amber), `intentionalBufferOverlap` in plans, overlap pill + split status bar, layer-space overlap tests, map/list styling + Intentional checkbox, buffer vs footprint intersection logic, tooltip pass, tent tooltip sticky off / close on drag. **Fresh open on load** — use **Restore Autosave** or **Open Plan**. |
| 0.8.6   | 2026-03-27 | Export PDF: map snapshot via html2canvas + jsPDF; tile `crossOrigin`; `waitForTilesIdle`; text-only fallback if capture fails. |
| 0.8.5   | 2026-02-26 | ZUMRO Interconnect added to TENT_DB: 7.17'×6.92' rect (86"×83"). |
| 0.8.4   | 2026-03-10 | Snap face selection (4 faces); ROLES constant; snap hint and auto-uncheck. |
| 0.8.3   | 2026-03-10 | Snap to selected object checkbox in Label & Style. |
| 0.8.2   | 2026-03-10 | v0.8.1 cleanup (mode badge, map border, SAT origin, Export ▾, color placement, coords overlay). |
| 0.8.1   | 2026-02-26 | Tier 4 refactor: named constants; state grouped with comments. |
| 0.8.0   | 2026-02-26 | UX quick wins: contextual status line; How to use ▾; tooltips and aria-labels. |
| 0.7.x   | 2026-02-26 | Undo/redo, sidebar UX refactor, autosave indicator, zone/role tagging, Save Plan / Open Plan, polygon overlap (later refined in 0.8.7). |
| 0.6.x   | 2026-02-26 | Click-then-place, drag-move, rotate handle, session autosave to localStorage (auto-restore on load until removed in 0.8.7), offline banner, VPC naming. |
| 0.5.x–0.1.0 | 2026-02-26 | Measurement, buffers, save/load, accessibility, security, basemap and search upgrades. See HTML header comment for full history. |

## Completed roadmap (shipped)

### Tier 1 — Critical

- Global satellite basemap ✅
- Object/map scale synchronization ✅
- Rotation support ✅
- Search (address/place and lat/lng) ✅
- Scale validation (`1:n` + scale bar) ✅

### Tier 2 — Operational

- Distance and area measurement ✅
- Clearance/setback buffers ✅
- Two-tier overlap detection (footprint + buffer) ✅
- Save/load layouts (plan JSON + autosave) ✅
- GeoJSON and PDF export ✅
- Zone/role tagging and custom roles ✅
- Snap-to-face placement ✅
- Map overlap pill ✅
- PDF with map snapshot (v0.8.6+) ✅

### Tier 3 — Quality

- Accessibility and keyboard shortcuts ✅
- Performance pass (scheduled overlap updates, fragment rendering) ✅
- Label sanitization / color normalization ✅
- In-file constants and structured sections ✅
- Tooltip and aria copy pass (v0.8.7–0.8.8) ✅

## Field operator quick guide

### 1) Start and locate site

- Open `Portable Solution Site Mapping Tool.html` in Chrome, Edge, or Safari (network needed for search and PDF export libraries).
- Search by address/place or paste `lat, lng`.
- Keep **Prefer current map area** checked (Setup ▾) for local precision; uncheck for global search.
- After a browser refresh, use **Restore Autosave** if you had work in progress — the map does not reload your layout automatically.

### 2) Set planning context

- Use satellite + **Place Labels (Hybrid)** (layer control, top-right) for real-world siting.
- Open **Setup ▾** for scale presets (`1:100`, `1:150`, etc.) and **Operation Name** (before print/PDF).

### 3) Place tents/shelters

- Select vendor and model. Use **Label & Style** for custom label, role, color, and **Snap to selected object** when connecting structures.
- Open **Options ▾** for opacity, rotation, and clearance buffer.
- Click a tent model (green highlight), then click the map.
- Drag placed objects on the map; use **Custom Size** when the exact model is not listed.

### 4) Validate fit and spacing

- Watch **Overlaps** in the status bar and the **map pill** when flagged; click the pill to jump to the first affected row.
- Use **Intentional** on amber-only rows when tight buffer placement is deliberate (does not clear red footprint overlap).
- **Measure ▾** for distance or area checks.

### 5) Save, share, and print

- **Undo** / **Redo** (Ctrl+Z / Ctrl+Y) for in-session mistakes.
- **Save Plan** for portable backup; **Restore Autosave** for same-browser recovery.
- **Export ▾** → GeoJSON or PDF.
- **Print Fit** — enable print background graphics so satellite imagery appears.

### Keyboard shortcuts

- `Esc` — return to View mode (or click the mode badge when active).
- `/` — focus search.
- `P` — start placing selected tent.
- `Ctrl+Z` / `Cmd+Z` — Undo; `Ctrl+Y` or `Ctrl+Shift+Z` — Redo.

### Field tips

- Save Plan files frequently; autosave does not sync across devices or browsers.
- Undo history is lost on refresh — rely on autosave + Restore, or Save Plan.
- Export PDF needs network the first time (CDN libraries); map capture may fall back to text-only if tiles fail to load.

---

## Backlog (not yet implemented)

Prioritized items for future releases. See `PSMT_Project_Notes.md` for product roadmap (PWA, calculator suite integration).

| Priority | Item | Notes |
|----------|------|-------|
| High | **Tablet mode / collapsible sidebar** | Toggle in header; auto-detect narrow viewport or touch; persist preference |
| High | **Click placed row → fly-to + highlight** | Pulse map object; brief confirmation |
| High | **Capacity tracking** | Beds/patients per structure; running totals; tie-in to calculator suite |
| Medium | **Layout templates** | Load standard MSF-style starting layouts |
| Medium | **Access corridors** | Pathways between structures |
| Medium | **Utilities overlay** | Power, water, waste lines |
| Medium | **Named zones/sectors** | Grouping beyond role tags |
| Medium | **Coordinate export** | Per-object lat/lng for logistics/aviation |
| Medium | **Metric/imperial toggle** | International deployments |
| Medium | **Deployment phases** | Phase 1/2 markers on structures |
| Long | **Offline tile caching** | MBTiles/PMTiles or “cache this area” workflow |
| Long | **Layer visibility by role** | Filter map/list for review and print |
| Long | **Validation rules** | Minimum clearance gaps, simple access-path checks |

**Not required now:** Backward compatibility with older plan/GeoJSON schemas can change freely until first release.

---

## Notes

- Update this file when `APP_META.version` changes.
- A local restore snapshot HTML may exist on disk for emergencies; it is in `.gitignore` and is not part of the repo.
- Companion **Calculator Suite** tools (load, water, consumables, medicines) are planned for integration per `PSMT_Project_Notes.md`; they are not in this folder.
