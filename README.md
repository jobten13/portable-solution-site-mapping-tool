# Portable Solution Site Mapping Tool

Web-based site planning tool for placing field hospital and tent footprints on real-world maps at true scale. Single-file HTML app (v**1.5.0-dev**, `lastUpdated` **2026-08-31** in `APP_META`).

**Primary file:** `Portable-Solution-Site-Mapping-Tool.html` — open in any modern browser. Version badge bottom-right reads from `APP_META.version`.

## Current release (1.5.0-dev)

| Area | What you get |
|------|----------------|
| **Map** | Esri satellite (default), street basemap toggle, hybrid place labels, live zoom/scale (`1:n`), cursor coordinates overlay |
| **Catalog** | **Nine** tabs — eight vendors (BLU-MED, Western Shelter, DLX, ZUMRO, HDT, Craftsmen, FORTS, WillScot) plus **Power** (Generator 70 kVA on trailer — MQ Power card identity; planning tab grouping, not procurement). Spec-based footprints; **20** standard-visible models (**16** extended-hidden in data layer). Catalog bed counts show an explicit **beds** unit. See [Vendor catalog](#vendor-catalog) |
| **Cards / roles** | Two-line catalog cards (model + sticky per-card role); **Custom…** create-anywhere; **Manage roles…** in the role dropdown when custom roles exist (catalog ⚙ retired). Catalog labels are locked (vendor + model). Label & Style is style-only (color, Options) |
| **Shapes** | Rectangle, octagon, cut-corner rectangle, cut-corner square, plus (hub) — plus **Custom Size** rectangles |
| **Placement** | Catalog: click model → click map; **stays armed** for another of the same model. Disarm: readout **✕**, **Esc**, re-click armed card, or click a placed object. **Custom Size** remains one-shot |
| **On-map role text** | At high zoom (`z ≥ 20`), role-only labels on footprints when a role is set (rotates; runs along long axis). Roleless / "—" = none. Hover tooltip unchanged |
| **Selection** | Click to select; **Shift**, **Ctrl**, or **Cmd**+click toggles membership; **Ctrl/Cmd+A** selects all. Selected footprint(s) show a **double-outline** blue underlay. Readout: identity (N=1), both names (N=2), or count (N≥3). **Esc** or empty-map click clears selection (also leaves place/measure/door modes and turns Snap off) |
| **Group edit** | **Rigid group move** (N>1): drag any member; spacing preserved; one undo step. **Rigid group rotate**: shared **↻** handle pivots about centroid; Shift = 5° steps; one undo step. **Group delete**: shared map **✕** for N>1 ("Delete N structures?"); **Delete** / **Backspace** key. **List ✕** always deletes **that row's structure only** (identity confirm), even when it is part of a multi-selection |
| **Handles** | Rotate **↻** and delete **✕** seats use zoom-derived padding (~40 px edge→center at all zooms, floor 1.0 m) |
| **Snap** | Header **Snap** toggle (off by default): while on, dragging a **single** structure near another pulls **true faces** flush (including chamfers/facets/arm faces); intent angle (pre-drag) quantized to nearest 0°/90° relative to the anchor — not forced co-rotation. Hold **Ctrl/Cmd** while dragging to suppress; **Esc** turns Snap off. **Snap is off during multi-selection moves** (N>1); to join a group, snap a connector piece first, then rejoin |
| **Doors / ramps** | Header **Door** mode: click near any footprint edge for an entry mark (drag along wall to adjust). **Ramp** is a role (usually **Custom Size**); hatch marks it. Hard-sided models may show a placement callout to add a Ramp |
| **Spacing** | Per-object clearance buffer (0–30 ft, presets); dashed ring; **Apply to Selected** and **Apply to All**; **footprint** (red) vs **buffer** (amber) advisories; **Intentional** for accepted buffer-only conflicts |
| **Overlap UI** | Status bar counts, sidebar warning, map **pill** (click **cycles** flagged structures; appearance pulse). Advisories **recompute live during drag and rotate** |
| **Placed totals** | Under Placed: bed total (toggle **All** / **Ward·ICU**), uncounted line when needed, `N sq ft (M w/ buffer)`. Header **ⓘ** opens the combined totals caveat (utilities excluded; bed figures are manufacturer recommendations — actual capacity varies with site-specific use). **▾** focuses the Placed list (other sidebar panels hide until **▴**) |
| **Custom Size** | Width / length; optional **Beds** (single value or min/max range); optional label; Place Custom → click map |
| **Start Here** | Header button opens searchable essential help anytime (lead-in + seven get-going topics; not a one-time popup) |
| **Feedback** | Map-floating ongoing-state readout (place / measure / door / selection); toast confirmations for one-offs |
| **Measure** | Distance and area (header **Measure ▾**); readout strip centered under the button; measurement labels offset off the geometry |
| **Persistence** | Debounced **autosave** to `localStorage`; **Restore Autosave** (manual; restores saved map view, with fit-to-placed-bounds fallback only when no structure is visible); **Save Plan** / **Open Plan** (portable JSON) |
| **Export / print** | GeoJSON; header **Print** or **Ctrl/Cmd+P** (current map view + print header: plan, date, coordinates, beds, sq ft, zones, disclaimer; SVG symbol legend for Entry/Exit, Ramp, footprint/buffer). Enable background graphics for satellite |
| **Undo** | Up to 50 steps (place, move, rotate, delete, role, buffer-to-selected, buffer-to-all, clear all, group move/rotate/delete) — Ctrl+Z / Ctrl+Y |
| **Offline** | Banner warns when connection is lost; the tool requires internet to function |
| **A11y** | Keyboard shortcuts, focus styles, `aria-label` / `title` on controls, overlap pill keyboard support |

**Load behavior:** Each open starts at the default map view (NYC area) with an empty layout. Previous work is **not** applied automatically — use **Restore Autosave** or **Open Plan**. Autosave still runs in the background and updates the **Autosaved …** timestamp when valid data exists in this browser.

**Hover hints (v1.5.0-dev):** Control `title` text and map tooltips match current behavior — including fresh-open/autosave, footprint vs buffer overlap, ambient Snap, multi-select, Door mode, and delete confirm on map and placed list.

## Quick Start Card

- **Start Here** (header) for searchable essential help anytime.
- Search site (address/place or `lat, lng` — **press Enter to search**). Results prefer the current map area; when several matches exist, the first is centered and a **picker** appears to refine. *Most controls show a short **`title`** on hover; the overlap **pill** also has a full explanation via `title` / `aria-label`.*
- Open a **Catalog** tab; set the role on the card if needed; under **Options ▾** set rotation + **clearance buffer** (feet) as needed. Buffer **> 0** draws the dashed clearance ring and enables **amber (buffer) advisories** when that ring conflicts with another structure. Use **Apply to Selected** to set the buffer on placed structure(s).
- Click a tent model (stays in place mode), then click the map. Place more of the same model, or disarm with readout **✕** / **Esc** / re-click the card.
- Click a placed object to select it; **Shift/Ctrl/Cmd+click** to add or remove from the selection; **Ctrl/Cmd+A** to select all. Drag body to move (group moves as a rigid unit when N>1). Drag the **↻** handle to rotate (**Shift** = 5°). Red map **✕** deletes the selection (identity confirm at N=1, count confirm at N≥2). List **✕** deletes that row's structure only.
- Watch **Placed** totals (beds + sq ft) and the header **ⓘ** caveat; watch **Overlaps** in the status bar and the map **pill**.
- Run **Measure ▾** → Distance or Area (Finish Area and Clear appear when relevant).
- **Undo** / **Redo** in the header (or Ctrl+Z / Ctrl+Y) to step back layout changes.
- **Autosaved …** and **Restore Autosave** in the header for local backup; **Save Plan** / **Open Plan** under **Plan**; **Export GeoJSON** under Plan; **Print** or **Ctrl/Cmd+P** to print the current view (header details + SVG legend on paper).
- Header **Door** for entry marks; set role **Ramp** (often via Custom Size) for ramp hatch.
- Press **Esc** to leave place/measure/door modes, clear selection, and turn Snap off.

## Project files

| File | Purpose |
|------|---------|
| `Portable-Solution-Site-Mapping-Tool.html` | Main application |
| `Portable-Solution-Site-Mapping-Tool-Quickstart.html` | Field quickstart (sole operator quick reference; open in browser) |
| `VENDOR_SPECS_DIGEST.md` | Spec alignment notes for `TENT_DB` |
| `PSMT_Project_Notes.md` | Roadmap and backlog notes |
| `Initial prompt.txt` | Original build prompt |
| `Old/` | Archived earlier versions |

## Session and autosave

- **Autosave:** After each change, layout + map view are written to `localStorage` (`psmt-session`) after a 500 ms debounce.
- **On open:** Default view only; if autosave data exists, the header shows when it was last saved and enables **Restore Autosave**.
- **Restore Autosave:** Replaces the current layout (confirm if structures are already placed). Restores the saved map center and zoom; if structures exist but none are visible in the viewport, fits to their combined bounds (max zoom 18). Use after a refresh or accidental close — not a substitute for **Save Plan** when sharing or archiving.
- **Save Plan / Open Plan:** Portable JSON including objects, map view, plan name, custom roles, and `intentionalBufferOverlap` per object.
- **Undo history** is in-memory only; cleared on **Open Plan** and page refresh.

## Vendor catalog

Dimensions follow `VENDOR_SPECS_DIGEST.md`. Default vendor colors apply on placement and when loading plans (overridable via color swatches). Sidebar section is **Catalog** (nine tabs).

| Tab | Models in tool (standard-visible) |
|-----|-----------------------------------|
| **BLU-MED** | 2032.5, 2039, Vestibule |
| **Western Shelter** | GK1935, GK20, Vestibule |
| **DLX** | X-24, Quad (X-HUB), X-32 |
| **ZUMRO** | Quad Interface, Model 400, Model 600, Interconnect |
| **HDT** | Base-X 305, Base-X Dome (8D36) |
| **Craftsmen** | 8-Bed ICU Trailer |
| **FORTS** | Model 38 |
| **WillScot** | Patient Unit, Staff Unit |
| **Power** | Generator 70 kVA (on trailer) |

**Data layer:** **36** catalog records total — **20** standard-visible, **16** extended-hidden (toggle not yet activated in the UI).

**Footprint shapes:** `rect`, `octagon`, `cut-corner-rectangle`, `cut-corner-square`, `plus` (hubs).

## Tooltips and map hints

Hover nearly any control for a `title` hint; map objects use Leaflet tooltips. Aligned with behavior as of **v1.5.0-dev**.

| Area | What the hint explains |
|------|-------------------------|
| **Autosave / Restore** | Fresh open each time; autosave is browser-only; restore is manual; drift guard on restore |
| **Undo / Redo** | Up to 50 steps in-session; cleared on refresh — use Restore Autosave or Save Plan |
| **Clearance buffer** | Amber when clearance conflicts with another **footprint or** clearance ring (not only buffer-to-buffer); Apply to Selected / Apply to All |
| **Overlap pill** | Red = footprint intersect; amber = clearance conflict; **Intentional** in list for amber-only; click pill **cycles** flagged structures (pulse); live during drag/rotate |
| **Snap** | Header toggle; true-face pull-to-face while dragging a singleton; rotation-as-intent (0/90 vs anchor); Ctrl/Cmd suppress while dragging; Esc turns Snap off; off for group moves |
| **Door** | Place/adjust entry marks on footprint edges; Esc exits Door mode |
| **Delete** | Map ✕ (singleton identity or group count confirm); list ✕ per-row identity confirm; Delete/Backspace for current selection; Undo restores before refresh |
| **Search results** | First match auto-centered; multi-match picker when N>1; Esc or outside-click dismisses picker |
| **Tent catalog** | Catalog tab and tent card `title` show spec notes where available |
| **Placed footprint** | `sticky: false`; closes on drag; dimensions, role, rotation, buffer; Shift/Ctrl/Cmd+click toggles selection |
| **Rotate / delete handles** | ↻ drag to rotate (Shift = 5°); map ✕ delete confirms; Undo before refresh; zoom-derived seat padding |
| **Placed totals ⓘ** | Combined caveat: utilities (water, hygiene, waste) excluded from footprint totals; bed figures are manufacturer recommendations — actual capacity varies with site-specific use |

## Overlap and clearance (how it works)

- **Footprint overlap (red):** Solid footprints intersect (positive intersection area in **pair-local meter space** — same frame as snap placement). Affected objects get a **red** outline on the map, a **red** left border in the placed list, and count toward **footprint** in the status bar. This is independent of clearance buffer.
- **Buffer / clearance advisory (amber):** When **clearance buffer > 0** on at least one object, the **dashed** ring is tested in **layer pixel space** against the other object's footprint (and buffer–buffer where both have buffers). If footprints do **not** overlap but clearance still conflicts, those objects get an **amber** outline on the map and an **amber** left border in the list. Counts appear as **buffer** in the status bar (suffix `, N buffer`) and in the sidebar warning line.
- **Intentional (buffer only):** Rows that are **amber-only** show an **Intentional** checkbox. Checking it marks that structure so it is omitted from buffer advisories (does **not** change footprint overlap). Stored in plans as `intentionalBufferOverlap` and in undo snapshots as `intentionalBuffer`.
- **Live advisory:** Overlap counts and styling update during **drag and rotate** gestures (rAF-coalesced), not only on release.
- **Geometry:** Footprint tier uses meter rings derived from layer geometry; buffer tier uses layer-pixel rings. Supports non-rectangular footprints (plus, cut-corner rectangle, cut-corner square, etc.).

## Reference docs

- **`VENDOR_SPECS_DIGEST.md`** — Vendor tent specs digest. **Implemented:** `TENT_DB` dimensions and shapes follow this digest; vendor pre-assigned colors on placement and plan load.

## Versioning

- Version and date live in `APP_META` inside `Portable-Solution-Site-Mapping-Tool.html`.
- Same version appears in the bottom-right badge (`vX.Y.Z`).
- Update this README when bumping `APP_META.version`.

## Change log

| Version | Date       | Notes |
|---------|------------|-------|
| 1.5.0-dev | 2026-08-31 | Start Here searchable essential help (#3); docs sync through post-cf2dae9 ships (#26 focus mode, #27 pill cycle, #29 doors/ramps, #31/#34 true-face snap, #32 Manage roles…, #33 print legend, #35 handle padding, #12 ellipse removal). README/Quickstart/PROJECT_MAP/Notes synced. |
| 1.4.0-dev | 2026-08-25 | Post-1.3.0 ships: search picker + Enter placeholder; Plan naming; MQ Power generator card; placed-list expand + row cleanup; Custom bed ranges; on-map role labels zoom-only; Restore Autosave drift guard; selection exit; Apply to Selected; header Print; overlap meter-space + live advisory; selection underlay; rotation-as-intent snap. Multi-select (#21): toggle selection; rigid group move/rotate/delete; buffer-to-set; Ctrl/Cmd+A; Delete/Backspace; ↻ handle; snap off for groups. README/Quickstart/PROJECT_MAP/Notes synced. |
| 1.3.0-dev | 2026-08-12 | Catalog import (8 vendors + Power; 36/20/16) + catalog/card redesign (cards, sticky roles, continuous placement, on-map role text, Placed totals + Ward/ICU toggle + Custom beds, totals caveat ⓘ on Placed header) + Setup dissolve (renamed Scenario Name → Plan Name; search always map-biased; scale presets removed). README/Quickstart/PROJECT_MAP/Notes synced. |
| 1.2.0-dev | 2026-08-10 | Tier C complete — toast feedback system (b1fb43b), map-floating ongoing-state readout (b66ee21), Start Here modal + sidebar How-to removal (802c1b3), #mode-display removal (77762fb). |
| 1.1.0-dev | 2026-07-07 | Object/shape-fidelity audit complete — all five non-rect TENT_DB shapes verified: GK20 (regular octagon), GK1935 (cut-corner-rectangle), ZUMRO Quad (faithful), DLX X-HUB (cut-corner-square), HDT 8D36 (asymmetric cut-corner-rectangle). True-face snap (#6) unblocked. |
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
- GeoJSON export ✅
- Zone/role tagging and custom roles ✅
- Snap-to-face placement ✅
- Map overlap pill ✅
- Catalog import + catalog/card redesign (v1.3.0-dev) ✅
- Multi-select + group move/rotate/delete (v1.4.0-dev) ✅

### Tier 3 — Quality

- Accessibility and keyboard shortcuts ✅
- Performance pass (scheduled overlap updates, fragment rendering) ✅
- Label sanitization / color normalization ✅
- In-file constants and structured sections ✅
- Tooltip and aria copy pass (v0.8.7–0.8.8) ✅
- Selected footprint highlight (v1.4.0-dev) ✅

## Field operator quick guide

### 1) Start and locate site

- Open `Portable-Solution-Site-Mapping-Tool.html` in Chrome, Edge, or Safari (internet connection required).
- Use **Start Here** in the header for searchable essential help anytime.
- Search by address/place or paste `lat, lng` (press **Enter**). Address search prefers the current map area; use the picker when several matches appear.
- After a browser refresh, use **Restore Autosave** if you had work in progress — the map does not reload your layout automatically.

### 2) Set planning context

- Use satellite + **Place Labels (Hybrid)** (layer control, top-right) for real-world siting.
- Under **Plan**, set **Plan Name** (Save Plan / print).

### 3) Place tents/shelters

- Open a **Catalog** tab and click a model (green highlight). Set role on the card if needed.
- Click the map to place. Catalog placement **stays armed** — click again for another of the same model. Disarm with readout **✕**, **Esc**, re-click the armed card, or click a placed object.
- Select with click; **Shift/Ctrl/Cmd+click** toggles; **Ctrl/Cmd+A** selects all. Drag to move (groups move together). **↻** handle to rotate (**Shift** = 5°). Turn on header **Snap** to pull **true faces** flush while dragging singletons (including chamfers/irregular shapes; **Ctrl/Cmd** suppresses snap).
- Header **Door** mode: click near any footprint edge for an entry mark (drag along the wall to adjust); **Esc** exits Door mode.
- Use **Custom Size** for non-catalog footprints (optional beds min/max + label). Custom place is one-shot. Set role to **Ramp** where a doorway sits above grade — the hatch marks it.
- **Label & Style** → **Options ▾** for opacity, starting rotation, and clearance buffer; **Apply to Selected** updates placed structure(s).

### 4) Validate fit and spacing

- Watch **Placed** running totals (beds toggle All / Ward·ICU; sq ft). Use the Placed header **ⓘ** for the combined totals caveat (utilities excluded; manufacturer bed figures). **▾** on the Placed header gives the list the whole sidebar; **▴** shows the full sidebar.
- Watch **Overlaps** in the status bar and the **map pill** when flagged; advisories update while you drag or rotate. Click the pill to cycle through flagged structures (with pulse).
- Use **Intentional** on amber-only rows when tight buffer placement is deliberate (does not clear red footprint overlap).
- **Measure ▾** for distance or area checks.

### 5) Save, share, and print

- **Undo** / **Redo** (Ctrl+Z / Ctrl+Y) for in-session mistakes.
- **Save Plan** for portable backup; **Restore Autosave** for same-browser recovery.
- **Export GeoJSON** — GIS handoff.
- **Print** or **Ctrl/Cmd+P** — prints the **current** map view with the plan-details header (plan name, date stamp, coordinates, beds, sq ft, zones) and SVG symbol legend; if the satellite image is missing from the print, enable *Print background graphics* in the browser's print settings.

### Keyboard shortcuts

- `Esc` — leave place/measure/door modes; clear selection; turn Snap off.
- `/` — focus search.
- `Ctrl/Cmd+A` — select all placed structures.
- `Delete` / `Backspace` — delete current selection (confirm).
- `Ctrl+Z` / `Cmd+Z` — Undo; `Ctrl+Y` or `Ctrl+Shift+Z` — Redo.
- Hold `Ctrl/Cmd` while dragging — suppress Snap.

### Field tips

- Save Plan files frequently; autosave does not sync across devices or browsers.
- Undo history is lost on refresh — rely on autosave + Restore, or Save Plan.
- List **✕** deletes one structure; map **✕** or Delete key follows the current selection (group delete when N≥2).

---

## Backlog (not yet implemented)

Prioritized items for future releases. See `PSMT_Project_Notes.md` for the full engineer backlog.

| Priority | Item | Notes |
|----------|------|-------|
| High | **Capacity tracking (remaining)** | **Shipped:** Placed running totals; All / Ward·ICU bed toggle (exact match; Triage excluded pending clinical input); Custom Size optional beds + ranges; manufacturer-spec bed sources with totals caveat ⓘ on the Placed header (`14d6a3c`). **Open (clinical):** whether Triage counts as bed space; whether the Ward/ICU exact-match list needs broadening (e.g. Pre-Op / Post-Op); bed numbers remain manufacturer recommendations vs site-specific use |
| Medium | **Layout templates** | Load standard MSF-style starting layouts |
| Medium | **Access corridors** | Pathways between structures |
| Medium | **Named zones/sectors** | Grouping beyond role tags |
| Medium | **Coordinate export** | Per-object lat/lng for logistics/aviation |
| Medium | **Metric/imperial toggle** | International deployments |
| Medium | **Deployment phases** | Phase 1/2 markers on structures |
| Long | **Offline tile caching** | MBTiles/PMTiles or “cache this area” workflow |
| Long | **Layer visibility by role** | Filter map/list for review and print |
| Long | **Validation rules** | Minimum clearance gaps, simple access-path checks |

**Closed / rejected (not scheduled):** Tablet mode / sidebar hide; Utilities overlay (map drawing layer).

**Not required now:** Backward compatibility with older plan/GeoJSON schemas can change freely until first release.

---

## Notes

- Update this file when `APP_META.version` changes.
- A local restore snapshot HTML may exist on disk for emergencies; it is in `.gitignore` and is not part of the repo.
