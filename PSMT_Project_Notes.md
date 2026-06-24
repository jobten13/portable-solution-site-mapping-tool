# Portable Solution Site Mapping Tool — Project Notes

*Last updated: 2026-05-19 (aligned with app v0.8.8); 2026-06-24 — PSMT overhaul scope added*

Operator-facing documentation: **`README.md`**. Field quickstart: **`Portable Solution Site Mapping Tool - Quickstart.html`**. Spec alignment: **`VENDOR_SPECS_DIGEST.md`**.

---

## Project overview

**Portable Solution Site Mapping Tool** (v**0.8.8**) — Single-file HTML app for emergency field hospital site layout. Leaflet.js map at true scale, vendor `TENT_DB` (five vendors), click-then-place workflow, drag/rotate handles, snap-to-face attachment, two-tier overlap (footprint red / clearance buffer amber), undo/redo (50 steps), role tagging with custom roles, debounced browser autosave with manual **Restore Autosave**, portable **Save Plan** / **Open Plan**, GeoJSON export, PDF export with map snapshot, and print fit.

**Use case:** Field hospital planning and setup — domestic emergency response first; international expansion planned. Primary users: incident commanders and field coordinators.

**Load behavior:** Fresh open each time (default map, empty layout). Autosave writes to `localStorage` but does not auto-restore on load — user chooses **Restore Autosave** or **Open Plan**. Replaces automatic restore from v0.6.8–v0.8.6.

**Calculator suite** (separate HTML tools, not in this repo folder) — planned integration at v2.5+:

| Tool | Purpose |
|------|---------|
| Load Calc Basic / Pro | Deployment load planning |
| Water Calc | Water requirements |
| Consumables Calc | UCD Ward + ICU consumables |
| Medicines Calc | UCD medications (Ward / ICU / Pharma) |

All calculators use per-day / per-bed math and share the same design language. Target flow: map placements → roles → bed counts → calculator inputs.

---

## PSMT Overhaul — Scope (psmt-overhaul branch)

This section defines the scope of work on the **psmt-overhaul** branch (forked from `master` @ `1901484`). The list below is **complete for now** — a working baseline. Items may be **added** or **removed** as work proceeds; it is not frozen. Working method: finalize list → decide implementation order → execute step by step, check then commit then move on, on the `psmt-overhaul` branch. **Implementation order** across all items is deliberately **not yet decided** — to be added after triage (**TBD**).

### Identity / rename

**Decision:** the tool will be renamed from **"VPC Mapping Tool"** to **"Portable Solution Site Mapping Tool"**, across all user-facing and engineer-facing surfaces. The full name **"Portable Solution Site Mapping Tool"** is the authoritative identity.

**"PSMT"** is an **informal working shorthand** for this branch only. It is deliberately **not a literal acronym** — the full name contains "Site," which the shorthand does not represent (a literal acronym would be PSSMT). This mismatch is a conscious, recorded choice, not an error to be "corrected" later. The branch name `psmt-overhaul` uses this shorthand.

**Status:** **DECIDED but NOT YET EXECUTED.** The code, `APP_META`, and docs still say "VPC Mapping Tool" until the rename item is implemented. The rename is itself a work item (item **R** below), not yet applied.

### Confirmed in scope

- **R.** Rename to **Portable Solution Site Mapping Tool** — all user- and engineer-facing surfaces. Decided, not yet executed.
- **1.** Measurement dropdown renders behind / clipped by the map (bug).
- **2.** Top buttons need to be more visible.
- **3.** Snap-to — two distinct problems: **(3a)** click-to-snap interaction is not intuitive; **(3b)** a completed snap triggers a footprint-overlap warning. Needs read-only Cursor investigation before fix.
- **4.** Tooltips. Note: v0.8.8 reported adding title/aria tooltips, but field observation reports none visible — verify actual state before work.
- **5.** General UX/UI refinement (umbrella item).
- **6.** Select-all / group move (move a whole built-out setup together).
- **7.** Mark doors/exits, optionally attached to tents where position is known. Note: touches plan-JSON schema — new geometry, NOT pure UI. Treat as additive, pre-v1 schema.
- **8.** Labels on the structures themselves (e.g. ICU, Triage), supplementing/replacing the hover box.
- **10.** Sidebar overload. Sub-steps: **(10a)** move "How to use" out of the sidebar; **(10b)** reorder sidebar sections to follow workflow — **STATIC** reorder, NOT user-customizable (prior decision: fixed order mirrors data dependencies). Before working this, do a **READ-ONLY** check of `Old/VPC_UX_Refactor.md` and the current built state, because parts of that refactor were already implemented. The old doc informs but does not bind — priorities may have shifted.
- **11.** Top-bar crowding: search field grows to fill space; status/mode hint occupies prime space; frequent vs. rare controls (Undo/Redo vs. Restore Autosave/Measure) carry equal visual weight. Same read-only check of `VPC_UX_Refactor.md` applies before work.
- **12.** Address/search bar: shorter at rest, expanding on focus.
- **13.** MERGED into item **4** (tooltips) — retained here only so the number is not silently dropped.
- **14.** Convert "How to use" to a button with hover preview + click-to-pin. This **IS** step **10a** (same work).
- **15.** Status/mode readout placement: move contextual feedback nearer the map work instead of the top bar. This is a specific symptom of item **11**.
- **16.** Rotate handle and delete button sit too far from the object they control. Needs investigation.
- **17.** Rotation manual-entry fallback — a numeric entry as backup to the drag handle. Framed as a **FRICTION-REDUCER** (lets a stuck user type a value and proceed), NOT a precision feature.
- **18.** Selecting a placed-list row should fly-to **AND** highlight the object on the map (currently only pans). Equals existing backlog item **#2**.
- **20.** Base-map imagery: add **USGS NAIPPlus** as a **SECOND, TOGGLEABLE** base layer alongside the existing Esri World Imagery (not a replacement), for fidelity + currentness + live A/B comparison. **DECIDED** and implementation-ready. Caveats to test at build time: CORS may break the html2canvas PDF export; maxZoom (currently 21) likely needs lowering. Must preserve the invariant that placed objects are independent of the base layer.

### Deferred / sequenced within this branch

- **19.** Zoom/scale presets are buggy. **BLOCKED BY item 20** — do this only **AFTER** the imagery work lands, because the useful preset values depend on what zoom depth/fidelity the new imagery provides.
- **9.** Bed counts per tent + running ward/ICU facility tally. **Sequenced LAST** — revisited only after all other overhaul work is complete. Needs clinical input for bed numbers (rough planning figure noted: a tent rated ~10 ward beds ≈ 6 ICU max). Item **8** (structure labels) lays groundwork via a per-tent clinical-role attribute. Note this is the leading edge of roadmap backlog item **#3** (capacity tracking) / the v2.5 calculator integration.

### Working principles for this branch

- Expect that this overhaul may introduce new bugs: many items touch shared surfaces (header, sidebar, object/handle cluster, overlap geometry). Work incrementally — one item or small group at a time, check, then commit on `psmt-overhaul`, so any regression is traceable and `master` + last-good-commit remain clean fallbacks.
- After any geometry or UI change, regression-check the two easiest-to-break-silently behaviors: **two-tier overlap detection** and **fresh-open autosave semantics**.
- Implementation order across all items: **TBD** (to be decided after triage).

---

## Recently shipped (through v0.8.8)

| Area | Version | Summary |
|------|---------|---------|
| Docs & tooltips sync | 0.8.8 | Tooltip/title/aria aligned with behavior; list delete confirm; README, Project Notes, Quickstart updated |
| Two-tier overlap | 0.8.7 | Footprint (red) vs buffer (amber); **Intentional** checkbox; overlap pill; layer-space geometry |
| Fresh open on load | 0.8.7 | No auto-restore; **Restore Autosave** is explicit |
| PDF map snapshot | 0.8.6 | html2canvas + jsPDF; text-only fallback |
| ZUMRO Interconnect | 0.8.5 | 7.17'×6.92' in `TENT_DB` |
| Snap to face | 0.8.3–0.8.4 | Four-face attachment; rotation match; auto-uncheck |
| Undo/redo, roles, autosave, Save Plan | 0.7.x | Core operational workflow |
| Measure, buffers, GeoJSON, basemap | 0.5.x–0.6.x | Foundation |

---

## Immediate feature backlog (PSMT)

Open work only. Shipped items removed from this list.

| # | Item | Notes |
|---|------|-------|
| 1 | **Tablet mode / sidebar hide** | Header toggle; auto-detect viewport &lt;1024px or touch; manual override; `localStorage` |
| 2 | **Click placed row → fly-to + highlight** | Pulse map object; brief toast |
| 3 | **Capacity tracking** | Beds/patients per structure; optional default per tent type; running totals for ICs |
| 4 | **Access corridors** | Ambulance, staff, evacuation paths between structures |
| 5 | **Utilities overlay** | Rough power, water, waste lines; long-term merge with calculator suite |
| 6 | **Named zones/sectors** | Grouping beyond role dropdown |
| 7 | **Offline-first tile caching** | MBTiles/PMTiles or “cache this area” before deployment |
| 8 | **Coordinate export** | Per-object lat/lng for logistics / aviation |
| 9 | **Metric/imperial toggle** | Required for international use |
| 10 | **Deployment phases** | Phase 1/2 markers on structures |
| 11 | **Layout templates** | MSF-style starter layouts (JSON config + place-at-origin) |
| 12 | **Layer visibility by role** | Filter map/list for review and print |
| 13 | **Validation rules** | Min clearance gap, simple access-path checks (configurable) |

### Design notes (backlog)

**Capacity (#3):** Bed counts vary by hospital and acuity — user input per placement is right; optional default per tent type speeds entry. Ward/ICU roles already map to calculator consumption profiles.

**Utilities (#5):** Full vision is map + calculator suite in one shell. Calculators use days/beds/buffer; capacity on the map becomes the input form.

**Offline tiles (#7):** Hardest PWA piece — pre-cache known AOIs or user-initiated cache workflow before going to the field.

---

## Product roadmap

### v1 — PSMT standalone PWA

Map tool with backlog above implemented; offline-capable; installable on tablet/desktop. Single-file app is nearly PWA-ready — **manifest + service worker** (especially tile caching) are the main additions.

**Gap vs v1:** Items 1–13 in backlog; true offline basemap; tablet UX.

### v2 — Calcs shell

Five calculators in a tabbed shell. Shared deployment header (days/beds/buffer once → all tabs). No map. Standalone logistics tool for teams that do not need spatial layout.

### v2.5 — PSMT + calcs combined (non-PWA)

Map and calculators in one shell. Beds/roles (and eventually capacity) on the map propagate to calc tabs. Multi-file architecture; no install requirement. **Key integration milestone.**

**Integration data flow:**

```
Placed structures → role (Ward/ICU/…) → bed capacity per structure
  → running totals → auto-fill days/beds/role split in calculator tabs
```

### v3 — Unified PWA

v2.5 packaged as installable offline PWA. Tile caching for expected deployment areas. Multi-file + service worker required at this scale.

---

## Architecture notes

**Overlap geometry (v0.8.7+):** Tests run in Leaflet layer coordinates (map projection), not SAT-only. Supports rects, plus hubs, elongated octagon, ellipse, etc.

**Persistence:**

| Mechanism | Scope | Shareable |
|-----------|--------|-----------|
| Autosave (`psmt-session`) | Same browser | No |
| Save Plan JSON | File / email | Yes |
| Undo stack | Session memory | No — lost on refresh |

**Medicines/consumables data:** UCD lists today. International use needs a decision: WHO/MSF-standard rates (shareable) vs hospital-specific (user-configurable).

**Single-file vs multi-file:** PSMT stays single-file for distribution until v2.5+. Combined app should be multi-file PWA with service worker.

**Schema:** Not released yet — plan/GeoJSON schema may change freely until v1.

---

## Deferred / discussed

- **Collapsible placed list** — Low priority; list already pinned (~220px) with internal scroll. More valuable once tablet mode exists.
- **Drag-and-drop from sidebar** — Removed from current workflow; click-then-place is standard (v0.6.2+).
- **Automatic session restore on load** — Removed v0.8.7; intentional to avoid surprising overwrites; use Restore Autosave.
---

## Decisions

- **2026-06-10 — Quickstart PDF retired permanently.** `VPC Mapping Tool - Quickstart.pdf` has been removed from the project. **`Portable Solution Site Mapping Tool - Quickstart.html`** is the sole quickstart source going forward; no PDF will be regenerated.

---

## Doc maintenance

- Bump *Last updated* and version when `APP_META.version` changes in `Portable Solution Site Mapping Tool.html`.
- Keep **README.md**, **PSMT_Project_Notes.md**, **Portable Solution Site Mapping Tool - Quickstart.html**, and in-app tooltips in sync on each release.
- Shipped features: document in README changelog; remove from backlog here.
