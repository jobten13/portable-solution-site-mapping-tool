# VPC Mapping Tool

Web-based site planning tool for placing field hospital/tent footprints on real-world maps at true scale.

## Quick Start Card

- Search site (address/place or `lat, lng`). *Most controls show a short **`title`** on hover; the overlap **pill** also has a full explanation via `title` / `aria-label`.*
- Select vendor/model; set label, role, and under **Options ▾** set rotation + **clearance buffer** (feet) as needed. Buffer **&gt; 0** draws the dashed clearance ring and enables **amber (buffer) advisories** when that ring conflicts with another structure.
- Click tent model (auto-enters place mode), then click map location.
- Click a placed object to select it; drag body to move, drag orange handle to rotate, red ✕ to delete (Shift+click also).
- Watch **Overlaps** in the status bar (**footprint** count, and **buffer** count when non-zero); a **pill** on the map (when there are advisories) summarizes counts and scrolls the placed list to the first flagged row when clicked.
- Run **Measure Distance** / **Measure Area** (Finish Area and Clear appear when relevant).
- **Undo** / **Redo** in the header (or Ctrl+Z / Ctrl+Y) to step back layout changes.
- **Autosaved …** and **Restore Autosave** in the header for local backup; `Save Plan` for a portable JSON handoff; `Export GeoJSON` / **Export PDF** under Export ▾; `Print Fit` for print with metadata.
- Click the mode badge (or press Esc) to return to View mode from place/measure.

## Working File

- `VPC Mapping Tool.html` (single-file app; version badge bottom-right reads from `APP_META.version`).

## Tooltips and map hints

- **Sidebar / header / buttons:** `title` attributes describe what each control does, typical shortcuts (e.g. Undo/Redo), and caveats (autosave is browser-only; Save Plan for portable files). Length is kept practical for hover; critical actions (Clear All, Apply Buffer to All) mention confirm + Undo + refresh limits where relevant.
- **Placed footprint (Leaflet):** Hover tooltip uses **`sticky: false`** so it does not follow the cursor along the polygon edge; it closes when you **start dragging** the footprint or buffer ring (both layers). Content includes dimensions, role, rotation, clearance, and a **Shift+click to delete** line.
- **Rotate / delete handles:** Small Leaflet tooltips on the orange rotate dot (above) and red ✕ (below) explain drag-to-rotate (Shift = 5°) and delete behavior.
- **Overlap pill:** When visible, hover (or screen reader) explains red vs amber meaning and that **click** scrolls the placed list to the first flagged structure.
- **Color swatches:** Describe choosing footprint color for the **next** placement and that picking from the vendor catalog still applies vendor color by default until changed.

## Overlap and clearance (how it works)

- **Footprint overlap (red):** Solid footprints intersect. Affected objects get a **red** outline on the map, a **red** left border in the placed list, and count toward **footprint** in the status bar. This is independent of clearance buffer.
- **Buffer / clearance advisory (amber):** When **clearance buffer &gt; 0** on at least one object, the **dashed** ring is tested against the other object’s footprint (and buffer–buffer where both have buffers). If footprints do **not** overlap but clearance still conflicts, those objects get an **amber** outline on the map and an **amber** left border in the list. Counts appear as **buffer** in the status bar (suffix `, N buffer`) and in the sidebar warning line.
- **Intentional (buffer only):** Rows that are **amber-only** show an **Intentional** checkbox. Checking it marks that structure so it is omitted from buffer advisories (does **not** change footprint overlap). Stored in plans as `intentionalBufferOverlap` and in undo snapshots as `intentionalBuffer`.
- **Geometry:** Overlap uses the same map projection as Leaflet (layer coordinates), including after pan/zoom, and supports non-rectangular footprints (e.g. plus, elongated octagon).

## Reference Docs

- **`VENDOR_SPECS_DIGEST.md`** — Vendor tent specs digest (PoP 2 Vendors 1–5). **Implemented:** Tool `TENT_DB` dimensions and shapes follow this digest; vendor pre-assigned colors are applied on placement and when loading plans. HDT lineup in tool: Base-X 305 and Base-X Dome (8D36) only.

## Versioning Approach

- This project uses lightweight in-file versioning while we iterate.
- Current app version is defined in `APP_META` inside `VPC Mapping Tool.html`.
- The same version is shown in a subtle bottom-right badge as `vX.Y.Z`.

## Current Version

- **`0.8.7`** (see `APP_META` in `VPC Mapping Tool.html`; `lastUpdated` there is the in-file stamp). README behavior and UX copy match this release.

## Change Log

| Version | Date       | Notes |
|---------|------------|-------|
| 0.8.7   | 2026-04-01 | Two-tier overlap (footprint red / clearance buffer amber), `intentionalBufferOverlap` in plans, overlap pill + split status bar, layer-space overlap tests, map/list styling + Intentional checkbox, buffer vs footprint intersection logic, full tooltip/title/aria pass, tent tooltip behavior (sticky off, close on drag), handle spacing, header nowrap, README. |
| 0.8.6   | 2026-03-27 | Export PDF: map snapshot via html2canvas + jsPDF; tile `crossOrigin`; `waitForTilesIdle`; text-only fallback if capture fails. |
| 0.8.5   | 2026-02-26 | ZUMRO Interconnect added to TENT_DB: 7.17'×6.92' rect (86"×83"); dimensions from Vendor Specs and Manuals/ZUMRO/ZUMRO_Interconnect_Dimensions.md. |
| 0.8.4   | 2026-03-10 | Snap face selection: click near any of target's 4 faces (2 length ends, 2 width ends); offset uses correct half-dimension per axis. ROLES constant; snap hint and auto-uncheck; postMode order. Snap is most accurate for rect-to-rect; non-rectangular targets use bounding-box face midpoints. |
| 0.8.3   | 2026-03-10 | Snap to selected object: checkbox in Label & Style; next placement matches target rotation and attaches to end nearest click (e.g. Vestibule to GK1935). |
| 0.8.2   | 2026-03-10 | v0.8.1 cleanup: mode badge click fix (B1), map border clear (B2), SAT origin fallback (B3); PDF caveat, Export ▾, color out of Options, How to use step 3, coords on map (U1–U5); changelog trim, #obj-list-items CSS (C1–C2). |
| 0.8.1   | 2026-02-26 | Tier 4 refactor: named constants; state grouped with comments; architecture note. Deferred by design: single-file; state as separate variables. |
| 0.8.0   | 2026-02-26 | UX quick wins: contextual status line; How to use ▾ panel; tooltips and aria-labels; Undo hint after Clear/Delete. |
| 0.7.9   | 2026-02-26 | Tier 3: remove .place-btn and elongated-hexagon; version single source; dragEndedAt + single mouseup; makeCollapsible for Options/Setup. |
| 0.7.8   | 2026-02-26 | Export PDF: operation name, scale, zones, object list (no map image). |
| 0.7.7   | 2026-02-26 | Search results dropdown positioned under search (no header layout shift); Placed list pinned at bottom of sidebar with internal scroll. |
| 0.7.6   | 2026-02-26 | Tier 2: Custom label scope hint ("Applied to next placement"); map mode indicator (green/orange border); Clear All confirm text; scale ratio after session restore. |
| 0.7.5   | 2026-02-26 | Tier 1: polygon-level overlap detection; editable label in Placed list; distance measure start-point marker; role set once in placeObject. (Later releases refined overlap to footprint vs buffer tiers and non–SAT geometry tests.) |
| 0.7.4   | 2026-02-26 | Sidebar UX refactor: removed Place on Map / Cancel and Back to View; Undo/Redo moved to header; Label & Style **Options ▾** (color, opacity, rotation, buffer); contextual Measure buttons (Finish Area / Clear when relevant); **Setup ▾** (scale presets + Operation Name, collapsed by default); section reorder; Apply Buffer to All confirm dialog; tooltips on key controls (Quick Start–aligned); Custom Size section and copy. |
| 0.7.3   | 2026-02-26 | Undo/redo for object placement, moves, rotation, delete, role change, buffer-to-all, and clear all (Ctrl+Z / Ctrl+Y; up to 50 steps). |
| 0.7.2   | 2026-02-26 | Tier 2 #10: Rotate handle direction fixed (clockwise drag = clockwise rotation). Optional: Save Plan / Open Plan UI. |
| 0.7.1   | 2026-02-26 | Tier 2 #5: Zone/role tagging (Triage, Ward, ICU, Pharmacy, Support, Morgue); list + tooltips + zone summary in print and GeoJSON. |
| 0.7.0   | 2026-02-26 | Tier 2 #4: Autosave/local backup — "Last saved at" indicator in status bar; updates on save and when restoring/loading. |
| 0.6.9   | 2026-02-26 | Tier 1 #2: Offline banner; Go to coordinates (lat,lng in search) without network. |
| 0.6.8   | 2026-02-26 | Session restore (Tier 1 #1): persist map view + objects to localStorage; restore on load. |
| 0.6.7   | 2026-02-26 | Page title and header renamed to "VPC Mapping Tool." |
| 0.6.6   | 2026-02-26 | GK20 dimensions updated from SW-20 spec: 18'7"×18'7", 286 sq ft. |
| 0.6.5   | 2026-02-26 | Non-rectangular shapes from spec docs: ellipse for 8D36 dome footprint; GK1935 elongated-octagon confirmed per SW-1935. |
| 0.6.4   | 2026-02-26 | TENT_DB updated from vendor spec docs: Blu-Med 7×8 vestibule; DLX X-24/X-32 21.5' width; Zumro 400/600 exterior dims; HDT 8D36 added. |
| 0.6.3   | 2026-02-26 | Added on-map rotate handle for placed objects; click to select, drag object body to move, drag handle to rotate (Shift for 5° snap). |
| 0.6.2   | 2026-02-26 | Switched to click-then-place workflow and added true drag-to-move for placed objects on the map. |
| 0.6.1   | 2026-02-26 | Added drag-and-drop tent placement from sidebar to map for faster field workflow. |
| 0.6.0   | 2026-02-26 | Completed Tier 3 with performance and modular refactor pass (fragment-based rendering, scheduled overlap updates, and refactored scenario/object builders). |
| 0.5.2   | 2026-02-26 | Tier 3 accessibility pass: keyboard-operable vendor/tent selection, stronger focus visibility, status live region, and global shortcuts (`Esc`, `/`, `P`). |
| 0.5.1   | 2026-02-26 | Tier 3 security hardening pass: sanitized user labels and normalized loaded/rendered colors to reduce HTML injection risk. |
| 0.5.0   | 2026-02-26 | Completed Tier 2 tooling: added area measurement workflow and GeoJSON export for coordination/GIS handoff. |
| 0.4.0   | 2026-02-26 | Added scenario save/load JSON workflow, including map view restore, object restoration, and key settings persistence. |
| 0.3.2   | 2026-02-26 | Added clearance presets (`None`, `Std 5 ft`, `High 10 ft`) and `Apply Buffer to All Placed` for bulk setback updates. |
| 0.3.1   | 2026-02-26 | Added configurable per-object clearance buffers, buffered footprint rendering, and overlap checks based on buffered extents. |
| 0.3.0   | 2026-02-26 | Tier 2 start: added map distance measurement tool and overlap count warning in status bar. |
| 0.2.7   | 2026-02-26 | QA hardening pass: improved search request resilience, antimeridian-safe local bias behavior, and print restore fallback safety. |
| 0.2.6   | 2026-02-26 | Added `Prefer current map area` search mode with automatic fallback to global results when local extent has no match. |
| 0.2.5   | 2026-02-26 | Added `Operation Name` print metadata field and optional hybrid place-label overlay on satellite basemap for better site orientation. |
| 0.2.4   | 2026-02-26 | Added print footer metadata (printed timestamp, scale, and map center coordinates). |
| 0.2.3   | 2026-02-26 | Added `Back to View` action and `Print Fit` button to frame placed objects before printing, then restore original view after print. |
| 0.2.2   | 2026-02-26 | Added fixed-scale preset buttons (`1:100`, `1:150`, `1:200`, `1:500`) that set scale once and keep normal manual zoom enabled. |
| 0.2.1   | 2026-02-26 | Added search match picker UI for multi-result geocode lookups so exact locations can be selected. |
| 0.2.0   | 2026-02-26 | Tier 1 first pass: satellite default basemap, basemap toggle, rotation control for placements, and live `1:n` scale readout. |
| 0.1.0   | 2026-02-26 | Initial versioned baseline cloned from `emergency-tent-placer.html`. |

## Priority Roadmap (Tiered)

### Tier 1 - Critical Must-Haves

- Global satellite basemap suitable for parking lot/lawn siting.
- Keep object/map scale synchronized at all zoom levels and locations.
- Rotation support for tent footprints.
- Robust global place search (address/place name and lat/lng).
- Visible scale validation (`1:n` readout and scale bar).

### Tier 2 - High-Value Operational

- Measurement tools (distance/area).
- Clearance/setback buffers.
- Overlap/collision detection.
- Save/load layouts.
- Export for coordination (GeoJSON/JSON).

### Tier 3 - Quality and Maintainability

- Accessibility and keyboard improvements. ✅
- Performance improvements for large object counts. ✅
- Security hardening for user-entered labels. ✅
- Modular code structure refactor. ✅

## Optional Upgrades (Post-Tier)

- ~~Simplify scenario workflow for field use: rename `Save Scenario`/`Load Scenario` to `Save Plan`/`Open Plan`.~~ **Done.**
- ~~Add lightweight autosave/local backup~~ **Done:** debounced `localStorage` session; header shows last autosave time and **Restore Autosave**.

## Field Operator Quick Guide

### 1) Start and locate site

- Open `VPC Mapping Tool.html`.
- Search by address/place or paste `lat, lng`.
- Keep `Prefer current map area` checked for local precision, uncheck for fully global search.

### 2) Set planning context

- Use satellite + hybrid labels for real-world siting.
- Open **Setup ▾** for scale presets (`1:100`, `1:150`, etc.) and **Operation Name** (enter before printing/exporting).

### 3) Place tents/shelters

- Select vendor and model. Use **Label & Style** for custom label and role; open **Options ▾** for color, opacity, rotation, and clearance buffer.
- Click a tent model (green highlight), then click map location.
- Drag placed objects directly on the map to fine-tune position.
- Use **Custom Size** (enter dimensions, then click map) when exact tent model is not listed.

### 4) Validate fit and spacing

- Watch **Overlaps** in the status bar: **footprint** (solid shapes intersecting) and, when shown, **buffer** (clearance rings conflicting while footprints may still be separate). Use **Options ▾** clearance buffer and **Apply Buffer to All Placed** if your SOP uses setbacks.
- Read the **sidebar warning** under Placed and the **map pill** (top-right) when anything is flagged; click the pill to jump to the first affected row in the list.
- For **amber-only** rows, use **Intentional** if a tight buffer placement is accepted on purpose (does not clear red footprint overlap).
- Use **Measure Distance** for lane/setback checks.
- Use **Measure Area** for lot or lawn capacity checks.

### 5) Save, share, and print

- **Undo** / **Redo** in the header (or Ctrl+Z / Ctrl+Y) to revert placement, moves, rotation, deletes, role or buffer changes.
- `Save Plan` for full working state backup/reload.
- `Export GeoJSON` for GIS/coordination workflows.
- `Print Fit` to frame objects for print output with metadata footer.

### Tooltips

- Hover nearly any **button**, **slider**, **search field**, or **sidebar control** for a context-specific hint (browser `title`).
- **Map:** Structure tooltip stays anchored (does not track the edge while you move the mouse); **Shift+click** on the footprint also deletes. **Pill:** Explains red vs amber and click-to-scroll.
- Full **aria-label**s are present where controls are icon-only or need a longer description for assistive tech; visible buttons keep short labels plus `title` for extra detail.

### Keyboard Shortcuts

- `Esc`: return to View mode (or click the mode badge when it is clickable).
- `/`: focus search input.
- `P`: start placing selected tent.
- `Ctrl+Z` (or Cmd+Z): Undo. `Ctrl+Y` or `Ctrl+Shift+Z`: Redo.

### Field Tips

- Use Undo/Redo to try layout changes without losing work (history clears when you Open Plan or on new session).
- Save plan snapshots frequently during fast-moving operations.
- Use a consistent clearance preset across teams before final layout handoff.
- Confirm final print/export after applying any scale preset or map move.

---

## Suggested Next Steps (Field Hospital Planning)

Deep-dive recommendations to evolve the tool into a full **field hospital planning** workflow. Ordered by tier: critical → high-value → quality → optional.

**Note:** The tool has not been released yet. **Backward compatibility with older scenario/GeoJSON files is not required** for now; schema and format can change freely.

### Tier 1 – Critical for field use

| # | Item | Rationale |
|---|------|-----------|
| 1 | **Session restore (no NYC reset)** | ~~Map reset to NYC on reload.~~ **Done (v0.6.8):** Last map center/zoom and placed objects saved to `localStorage`; restored on load. Status shows "Session restored" when applied. |
| 2 | **Graceful degradation when offline** | **Done in part (v0.6.9):** Offline banner (“Using local data”); lat/lng in search to jump without geocoding; editing and layout work offline. Cached tiles or blank/grid fallback not implemented. |
| 3 | **Align naming with “field hospital”** | ~~UI said “Emergency Tent Site Planner.”~~ **Done:** Page title and header now “VPC Mapping Tool.” |

### Tier 2 – High-value operational

| # | Item | Rationale |
|---|------|-----------|
| 4 | **Autosave / local backup** | **Done (v0.7.0+):** Layout + view auto-save to `localStorage` on debounce (500 ms after changes). Header shows **Autosaved …** / status text and **Restore Autosave**; manual **Save Plan** / **Open Plan** remains for portable JSON. |
| 5 | **Zone / role tagging** | **Done (v0.7.1):** Role dropdown (—, Triage, Ward, ICU, Pharmacy, Support, Morgue); custom roles; stored on object and in scenario/GeoJSON; list + tooltips + zone summary in print and GeoJSON. |
| 6 | **Layout templates** | Allow loading a **standard layout template** (e.g. minimal MSF-style: triage + wards + support) as a starting point. Templates define object types, sizes, and relative positions; user places the template’s origin on the map and optionally scales or adjusts. |
| 7 | **Go-to coordinates (no search)** | **Done (v0.6.9):** Enter lat, lng in search bar and Search (or Enter) to jump; no Nominatim call. Works offline. |
| 8 | **Vendor pre-assigned colors** | **Done:** Each vendor has a default color (BLU-MED, Western Shelter, DLX, ZUMRO, HDT); placed objects get that color automatically. User can change via color swatches. |
| 9 | **Clear delete affordance** | **Done:** Red ✕ delete button when an object is selected (on map, next to rotate handle); confirm before delete. Shift+click and list ✕ also available. |
| 10 | **Fix rotate handle direction** | **Done (v0.7.2):** Rotate handle direction aligned so clockwise drag rotates the footprint clockwise. |
| 11 | **Overlap: footprint vs clearance** | **Done (in-tree 2026-03):** Separate **footprint** (red) and **buffer/clearance** (amber) advisories; map + list styling; optional **Intentional** on buffer-only rows; plan field `intentionalBufferOverlap`; overlap pill and split status counts. |

### Tier 3 – Quality and maintainability

| # | Item | Rationale |
|---|------|-----------|
| 12 | **Structured template data** | Define templates as JSON (or in-app config): list of objects with relative offsets, dimensions, roles, labels. Single code path for “place template” and future template editor. |
| 13 | **Validation rules** | Beyond two-tier overlap: optional **minimum clearance** rule (warn if any gap &lt; X ft), and/or simple **access path** check (e.g. ensure no fully enclosed footprint). Configurable so different missions can enforce different standards. |
| 14 | **Export enhancements** | **Done in part:** Zone summary (count by role) in GeoJSON metadata, print footer, and PDF (v0.8.6 snapshot). Optional legend (color/role) and schema version for downstream GIS not yet added. |
| 15 | **Accessibility for new UI** | Any new controls (zone dropdown, template picker, coordinate input) should stay keyboard-operable and screen-reader friendly, consistent with existing Tier 3 accessibility. |
| 16 | **Tooltip / hint copy** | **Done (in-tree 2026-04):** Broad pass on `title`, `aria-label`, and Leaflet `bindTooltip` strings; see **Tooltips and map hints** above. |

### Optional (post-tier)

- ~~Rename Save Scenario / Load Scenario to Save Plan / Open Plan~~ **Done (v0.7.2).**
- **Offline tile package**: preload AOI tiles (e.g. MBTiles/PMTiles) for true offline basemap; larger implementation.
- ~~**Undo/redo** for object placement and moves~~ **Done (v0.7.3):** Undo/Redo buttons and Ctrl+Z / Ctrl+Y; up to 50 steps; applies to place, move, rotate, delete, role change, Apply Buffer to All, and Clear All.
- **Layer visibility**: toggle object groups by role (e.g. show only Triage + Ward) for clearer prints or review.
- ~~**Snap connecting tents to rotation (and position)**~~ **Done (v0.8.3, refined v0.8.4):** Check "Snap to selected object" in Label & Style; select the target, pick the tent, click near the face to attach to (nearest of 4 faces: 2 length ends, 2 width ends). New tent matches rotation and is placed edge-to-edge. Most accurate for rect-to-rect; non-rectangular targets use bounding-box face midpoints. 
---

## Notes

- We will update this file as features are added, priorities change, and versions are bumped.
- A local **restore snapshot** HTML file may exist on disk for emergencies; it is listed in `.gitignore` and is not part of the repo.
