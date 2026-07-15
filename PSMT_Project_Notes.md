# Portable Solution Site Mapping Tool — Project Notes

*Last updated: 2026-07-07 — version bump to **1.1.0-dev** (`APP_META`, README, Quickstart, PROJECT_MAP synced); shape-fidelity audit **COMPLETE** (GK20, GK1935, ZUMRO Quad, X-HUB, 8D36); bump reflects fidelity audit + snap phase 1 — **psmt-overhaul** backlog still open; 2026-07-06 — ZUMRO Quad Interface shape-fidelity VERIFIED (render faithful — exterior footprint 29.4'×19.5'; 454 sq ft is interior floor, air-beam; note/digest wording synced); third shape-audit item complete; GK1935 shape-fidelity fix shipped (symmetric corner cut, 7'8" exterior face, ~570 sq ft); second shape-audit item complete; GK1935 true-face snap now unblocked; GK20 shape-fidelity fix shipped (regular octagon, exterior footprint 18'7" across / 7'8" faces); first shape-audit item complete; GK20 true-face snap now unblocked; stickiness-on-break parked (improved as side-effect of the engage-threshold change; revisit post-fidelity); ambient drag-snap engage threshold made size-proportional + clamped (entry-jump fix); long-face capture follow-up logged, tied to shape-fidelity audit; autosave empty-overwrite fix (8b46241) and ambient drag-snap phase 1 (07fa119) shipped; snap tuning backlog added; #6 amended with bulk-delete confirm; search-picker-clipping, Nominatim-email, and autosave-Part-2 parked.*

Operator-facing documentation: **`README.md`**. Field quickstart: **`Portable Solution Site Mapping Tool - Quickstart.html`**. Spec alignment: **`VENDOR_SPECS_DIGEST.md`**.

---

## Project overview

**Portable Solution Site Mapping Tool** (released/field-tested **v1.0**; current working build **v1.1.0-dev** on `psmt-overhaul`) — Single-file HTML app for emergency field hospital site layout. Leaflet.js map at true scale, vendor `TENT_DB` (five vendors), click-then-place workflow, drag/rotate handles, snap-to-face attachment, two-tier overlap (footprint red / clearance buffer amber), undo/redo (50 steps), role tagging with custom roles, debounced browser autosave with manual **Restore Autosave**, portable **Save Plan** / **Open Plan**, GeoJSON export, PDF export with map snapshot, and print fit.

**Version note:** `APP_META`, README, Quickstart, and PROJECT_MAP now read **1.1.0-dev** as of 2026-07-07 — the doc-vs-code gap is **closed**. This bump reflects shape-fidelity audit completion (all five non-rect catalog footprints certified) and snap phase 1 (ambient drag-snap, size-proportional engage threshold); **psmt-overhaul** backlog items (header rework, capacity, imagery, etc.) remain open.

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

**Status:** **EXECUTED** in commit 9dfa7dc — APP_META, page title, filenames, schema string (`psmt-scenario-v1`), localStorage keys (`psmt-*`), and all docs renamed to "Portable Solution Site Mapping Tool."

### Confirmed in scope

- **R.** Rename to **Portable Solution Site Mapping Tool** — all user- and engineer-facing surfaces. **DONE** (commit 9dfa7dc).
- **1.** Measurement dropdown renders behind / clipped by the map (bug). **DONE** (commit 27855d8).
- **1b.** Measure area-clear button reachable after Finish Area; area-measure start-point dot; measure-strip sync on Esc/mode-exit. **DONE** (commit 2d76ff1).
- **2.** Top buttons need to be more visible.
- **3.** Snap-to — two distinct problems: **(3a)** click-to-snap interaction is not intuitive — **SUPERSEDED** — absorbed into the unified Snap feature design, which is folded into the #11/#15 header rework (see Decisions, 2026-06-26 — Snap unified). Reorganized, not completed. The original checkbox-based snap and its silent-failure bugs (nothing-selected skip, snap-failed silent fallback, armed-state surviving Esc/undo/load) are replaced — not patched — by the new unified design. **(3b)** footprint overlap false-positive on touch — **DONE** (commits f14e8e3, 87f294f): footprint overlap now requires positive intersection area; touching no longer false-flags on the primary path. Triangulation fallback (87f294f): when triangulation fails, reverts to the conservative touch-or-overlap test — which over-warns (can flag touching as overlap on that failure path) rather than computing a wrong area; this failure path has not been observed to trigger in testing of current catalog shapes (tested-to-date observation, not a guarantee in the code).
- **4.** Tooltips. Note: v0.8.8 reported adding title/aria tooltips, but field observation reports none visible — verify actual state before work.
- **5.** General UX/UI refinement (umbrella item).
- **6.** Select-all / group move (move a whole built-out setup together). Decided 2026-06-29: bulk delete via a future select-all/group action gets a confirmation dialog ('Delete N structures?'); undo remains the backup. Group-move covers moving a selected group together (all or a subset — narrow down when built).
- **7.** Mark doors/exits, optionally attached to tents where position is known. Note: touches plan-JSON schema — new geometry, NOT pure UI. Treat as additive, pre-v1 schema.
- **8.** Labels on the structures themselves (e.g. ICU, Triage), supplementing/replacing the hover box.
- **10.** Sidebar overload. Sub-steps: **(10a)** move "How to use" out of the sidebar; **(10b)** reorder sidebar sections to follow workflow — **STATIC** reorder, NOT user-customizable (prior decision: fixed order mirrors data dependencies). Before working this, do a **READ-ONLY** check of `Old/VPC_UX_Refactor.md` and the current built state, because parts of that refactor were already implemented. The old doc informs but does not bind — priorities may have shifted.
- **11.** Top-bar crowding: search field grows to fill space; status/mode hint occupies prime space; frequent vs. rare controls (Undo/Redo vs. Restore Autosave/Measure) carry equal visual weight. Same read-only check of `VPC_UX_Refactor.md` applies before work. Note: the unified Snap feature is folded into this header rework — see Decisions, 2026-06-26 (Snap feature unified).
- **12.** Address/search bar: shorter at rest, expanding on focus.
- **13.** MERGED into item **4** (tooltips) — retained here only so the number is not silently dropped.
- **14.** Convert "How to use" to a button with hover preview + click-to-pin. This **IS** step **10a** (same work).
- **15.** Status/mode readout placement: move contextual feedback nearer the map work instead of the top bar. This is a specific symptom of item **11**. Note: the unified Snap feature is folded into this header rework — see Decisions, 2026-06-26 (Snap feature unified).
- **16.** Rotate handle and delete button sit too far from the object they control. Needs investigation.
- **17.** Rotation manual-entry fallback — a numeric entry as backup to the drag handle. Framed as a **FRICTION-REDUCER** (lets a stuck user type a value and proceed), NOT a precision feature.
- **18.** Selecting a placed-list row should fly-to **AND** highlight the object on the map (currently only pans). Equals existing backlog item **#2**.
- **Object/shape fidelity review** — audit `TENT_DB` shapes and dimensions against real-world structures. Touches the provenance-gated vendor catalog.

  **GK20 — DONE (first shape-fidelity item):** GK20 octagon corrected from a halved corner inset (unequal sides) to a true regular octagon: **18'7" across flats** (authoritative — exterior footprint is what must fit), **7'8" equal facets** (SW-20; the 7'6" spec figure is interior clear-span, not the footprint edge), **~286 sq ft**. Fix confined to the `createGeoPolygon` octagon branch; GK1935 and all other shapes untouched. GK20 remains the sole `shape:"octagon"` entry. Labels corrected on three octagon surfaces (tooltip, placed-list, catalog card) from misleading "Ø" diameter wording to the across/facet spec; hardcoded literals, acceptable while GK20 is the only octagon. `VENDOR_SPECS_DIGEST.md` GK20 rows synced. **Known remaining:** snap still uses bbox faces for GK20 — true-face snapping (snap backlog **#6**) is the next item and is now unblocked for GK20 by this geometry certification.

  **GK1935 — DONE (second shape-fidelity item):** Corner cut corrected from asymmetric (`cornerCutW` 5.303, `cornerCutL` 9.333 — rendered **10.73'** corner faces, **~531 ft²**, visibly wrong vs the SW-1935 top-down diagram) to **symmetric**: both legs **5.421 ft**, **7'8"** exterior corner face, **~571.5 ft²** (spec **~570**; tilde = planning tolerance). **Decision on record:** **7'8"** is the exterior footprint corner face; the sheet's **7'6"** is interior clear-span (same convention as GK20). Corner read as symmetric from the top-down diagram (developer visual confirmation). Data-only change to the one GK1935 `TENT_DB` entry (corner cuts); geometry function `createGeoCutCornerRectangle` and vertex logic unchanged. **Shape type renamed** from `elongated-octagon` to **`cut-corner-rectangle`** (rename-only; same `cornerCutW`/`cornerCutL` footprint). GK1935 shares `shape:"cut-corner-rectangle"` with HDT 8D36 (added fifth fidelity item). `VENDOR_SPECS_DIGEST.md` GK1935 rows synced. Render visually confirmed against the diagram post-fix. **Known remaining:** snap still uses bbox faces for GK1935 — true-face snapping (snap backlog **#6**) is the next item and is now unblocked for GK1935 by this geometry certification. Corner faces must be snappable surfaces (developer requirement) when **#6** is built.

  **ZUMRO Quad Interface — DONE (third shape-fidelity item):** Render verified **FAITHFUL** — no geometry change. Exterior footprint **29.4' × 19.5'** (what the tool maps) is correct; bbox and stub projections match the spec. The spec's **454 sq ft** is **interior** floor space (measured to interior width **15.7'**), not the exterior footprint; rendered exterior footprint is **~521 sq ft**. The two differ because this is an **air-beam** structure — inflated beams reduce usable interior below the exterior footprint. This is consistent, not an error. Four connection faces (Quad confirmed by field knowledge). Side connectors project **~1.9'** (E/W); end connectors **~6.85'** (N/S) — developer confirmed side stubs do not project far enough to read as a true plus, and the render matches this. Change was note/comment wording only (`TENT_DB`) + `VENDOR_SPECS_DIGEST.md` sync (table, summary, verification row, reconciliation). No dimensional or geometry change. ZUMRO Quad Interface is the **sole** `shape:"plus"` entry. **Snap:** the rendered 12-vertex polygon gives every arm face as a known segment, so true-face snapping (snap backlog **#6**) has sufficient geometry for the Quad's short arm sides when **#6** is built.

  **DLX X-HUB — DONE (fourth shape-fidelity item):** Wrong shape class corrected from `shape:"plus"` (12-vertex cross via `createGeoPlusSign`) to **`cut-corner-square`** — chamfered **22'×22'** square with four long door faces and four short corner faces. **Nominal symmetric chamfer:** both **`cornerCutW`** and **`cornerCutL`** set to **1.0 ft** — **unconfirmed** (no published DLX corner dimension; overall 22'×22' bbox confirmed from tech sheet). Reuses existing **`createGeoCutCornerRectangle`** (8 vertices); no new geometry function. **`armWidthFt` removed** from the X-HUB catalog entry. ZUMRO Quad Interface and the `plus` dispatch branch **unchanged**. DLX X-HUB is the sole `shape:"cut-corner-square"` entry. `VENDOR_SPECS_DIGEST.md` X-HUB row synced. **Known remaining:** snap still uses bbox faces for X-HUB — true-face snapping (snap backlog **#6**) is unblocked for X-HUB by this geometry certification when **#6** is built.

  **HDT Base-X Dome (8D36) — DONE (fifth and final shape-fidelity item):** Wrong shape class corrected from `shape:"ellipse"` (36-vertex smooth oval via `createGeoEllipse`) to **`cut-corner-rectangle`** — asymmetric chamfered **31'×37'** bbox. **`cornerCutW` 8.4 ft** (width/E–W axis), **`cornerCutL` 13.2 ft** (length/N–S axis) — **unconfirmed** (not stated on vendor sheet). **Derivation:** pixel-measurement of **HDT_8D36Shelter** top-down diagram this session; **cross-check:** 31×37 bbox (1147 ft²) minus spec area (935 ft²) implies **~212 ft²** corner-cut area; measured legs imply **~221 ft²** (2×8.4×13.2) — close agreement, supporting but not vendor-confirmed. Rendered footprint **~925 ft²**. Reuses existing **`createGeoCutCornerRectangle`** and existing **`cut-corner-rectangle`** dispatch branch; no new geometry function. **`createGeoEllipse` / `ellipse` dispatch retained** for legacy saved plans. GK1935 entry untouched. `VENDOR_SPECS_DIGEST.md` 8D36 row synced. **Known remaining:** snap still uses bbox faces for 8D36 — true-face snapping (snap backlog **#6**) unblocked when **#6** is built.

  **Shape-fidelity audit — COMPLETE:** All non-rect catalog footprints certified (GK20, GK1935, ZUMRO Quad Interface, DLX X-HUB, HDT 8D36).
- **Per-object square footage + running facility-area total** — tool currently shows no area for placed objects and no facility total. Derive area from original `TENT_DB` square-footage/feet values (NOT reconstructed from stored meters — avoids conversion drift); requires storing the catalog feet/sq-ft value on the placed object at placement (currently discarded). Catalog note strings already carry true sq ft for irregular shapes, avoiding polygon-area math for display. Group with items **8** and **9** (capacity family).
- **20.** Base-map imagery: add **USGS NAIPPlus** as a **SECOND, TOGGLEABLE** base layer alongside the existing Esri World Imagery (not a replacement), for fidelity + currentness + live A/B comparison. **CLOSED** (evaluated and rejected) — see **2026-06-26 Decisions** entry for authoritative record. Consequence: item **19** (zoom presets) is **NO LONGER blocked by 20** — its imagery-depth dependency is gone; **19** is now standalone whenever scheduled.

### Deferred / sequenced within this branch

- **19.** Zoom/scale presets are buggy. **Standalone** — no longer blocked by item 20 (imagery-depth dependency removed when item 20 closed). Schedule whenever prioritized.
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

## psmt-overhaul — shipped (toward 1.1)

| Area | Commit | Summary |
|------|--------|---------|
| Rename | 9dfa7dc | VPC Mapping Tool → Portable Solution Site Mapping Tool across all surfaces |
| Measure dropdown | 27855d8 | Fixed dropdown clipped by header overflow-y (position:fixed + getBoundingClientRect) |
| Measure clear/dot/strip | 2d76ff1 | Area-clear reachable after Finish Area; area start dot; strip sync on Esc/mode-exit |
| Overlap positive-area | f14e8e3, 87f294f | Footprint overlap requires positive intersection area (touching no longer false-flags on primary path); triangulation fallback reverts to touch-or-overlap when triangulation fails — over-warns vs wrong area; failure path not observed to trigger in testing of current catalog shapes (tested to date, not a code guarantee) |
| Autosave empty-overwrite guard | 8b46241 | Prevent autosave from overwriting saved work with an empty session. Root cause: on reload the map loads empty by design (no auto-restore); panning/zooming/searching then triggered scheduleSaveSession→saveSession, writing objects:[] over a good stored psmt-session and destroying work. Fix: saveSession refuses to write an empty objects array over a stored session that has objects, UNLESS intentional (allowEmptyOverwrite:true, passed by clearAll, delete-to-zero, and open-empty-plan via loadScenarioFromData); new getStoredSessionObjectCount() helper fails open (returns 0 on null/parse-error, never blocks a real save). Debounce race fix: scheduleSaveSession OR-merges the flag across the 500ms window, and the timer callback snapshots options then resets pendingSessionSaveOptions before saveSession, so the flag can't leak into a later accidental empty save and a plain pan can't drop an intentional clear's flag. Part 2 (beforeunload/pagehide flush) DEFERRED. |
| Ambient drag-snap (phase 1) | 07fa119 | First working build of the ambient drag-snap direction. Header "Snap" toggle (#btn-snap-mode, off by default, aria-pressed); snapModeEnabled state (session-only, not persisted); SNAP_PROXIMITY_DEFAULT_M = 4m; findNearestSnapCandidate(mover, freeLatLng) (argmin gap under threshold, excludes mover); mousemove drag path does free-center → suppress-check (Ctrl/Cmd via originalEvent) → snap-scan → on-match set latlng+angle to anchor else free+startAngleDeg → drawObject; startObjectDrag tracks startAngleDeg/snapAnchorId/snapFace; endObjectDrag reports "Snapped to X (face)" vs "Moved" (falls back if anchor deleted); resetViewMode/Esc clears snap; old #snap-to-selected checkbox hidden (display:none, not removed); reuses getSnapAttachLatLng; angle restored on every non-snap frame to guard sticky rotation. Known at ship: snap feel needs tuning; irregular shapes snap to bbox faces. |

---

## Snap tuning backlog

Open snap feel/geometry work following phase 1 ship (07fa119). None omitted.

1. **Entry jump** — **ADDRESSED** (this commit): entry-jump feel improved by the size-proportional clamped engage threshold shipped here — `SNAP_PROXIMITY_K=0.4`, `FLOOR=0.75m`, `CEILING=4m`; engage = clamp(K × max(widthM, lengthM), FLOOR, CEILING), replacing the flat 4m threshold. Remaining feel work on long-face capture is superseded by backlog item 2 below.
2. **Long-face capture** — tight: on a long tent side the engage zone is a small ball around the face **midpoint**, so a small mover (e.g. vestibule) must be dragged near center before snap engages. Side-effect of the size-proportional threshold (capture radius = max jump = the same number, by design of the engage test). **REVISIT AFTER** the object/shape-fidelity audit — corrected shapes change which faces exist (cut-corner rectangle, plus-hub) and may change the right fix. Candidate directions: a visible guide line to the intended snap point (makes a small capture zone acceptable under stress) and/or along-face attach instead of midpoint-only. Tie to true-face snapping (backlog item 6).
3. **Stickiness on break** — must currently turn snap off to drag a snapped object away. Hysteresis was tried and was wrong (see 2026-06-29 update); explore making the break EASIER. PARKED (2026-06-29): observed easier to break a snap after the size-proportional clamped engage threshold shipped (1178f3a) — stickiness improved as an apparent side-effect of the smaller engage zone (not separately verified in code). Revisit AFTER the object/shape-fidelity audit only if stickiness creeps back in once shapes/faces change. -- CLOSED FOR NOW (2026-07-07): no longer observed as an issue; reopen if stickiness recurs.
4. **Map blur/pan during drag** — observed (real: full map blurred/panned) but NOT reproducible. Diagnostic for next occurrence: check whether the map CENTER COORDINATES actually change (true pan — likely a premature mouseup re-enabling map drag during fast/jerky dragging) vs the object merely jumping (perceptual). Likely chain: fighting sticky snap → thrash → premature mouseup → map grab. -- CLOSED FOR NOW (2026-07-07): not currently observed; reopen if reproducible.
5. **1935 short-end won't attach** — the WS GK1935 attaches its long wall to a neighbor's long side (e.g. 2032.5) rather than its short end. Triage needed: is this a bbox-face limitation, or an independent face-selection bug? Needs a read-only geometry classification.
6. **True-face snapping for irregular shapes** — GK1935 **elongated-octagon vs cut-corner-rectangle** naming question **RESOLVED** (shape type renamed to `cut-corner-rectangle`; geometry unchanged). Remaining work: implement true-face snap (backlog **#6**) for irregular shapes using certified footprints — bbox snap remains interim for GK1935, GK20, cut-corner-square, plus, etc. (`ellipse` legacy plans only).
7. **How-to / help text still references the now-hidden #snap-to-selected checkbox** — fold this doc-sync into the next snap commit.
8. **Snap strength presets** — 2-3 named, task-framed (loose/tight) presets — as a fast-follow once the default threshold is tuned (already partly recorded in the 2026-06-28 entry). -- CLOSED FOR NOW (2026-07-07): not currently needed; reopen if requested.

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

**Overlap geometry (v0.8.7+):** Tests run in Leaflet layer coordinates (map projection), not SAT-only. Supports rects, plus hubs, cut-corner rectangle, ellipse, etc.

**Persistence:**

| Mechanism | Scope | Shareable |
|-----------|--------|-----------|
| Autosave (`psmt-session`) | Same browser | No |
| Save Plan JSON | File / email | Yes |
| Undo stack | Session memory | No — lost on refresh |

**Medicines/consumables data:** UCD lists today. International use needs a decision: WHO/MSF-standard rates (shareable) vs hospital-specific (user-configurable).

**Single-file vs multi-file:** PSMT stays single-file for distribution until v2.5+. Combined app should be multi-file PWA with service worker.

**Schema:** Plan/GeoJSON schema is still pre-stable on `psmt-overhaul` and may change freely — independent of the 1.0/1.1 release labeling (field-tested build treated as 1.0; working branch toward 1.1).

### Known minor issues

- **PDF export conversion constant** — PDF export uses conversion constant 3.28084 while tooltip/list use 1/FT_TO_M (0.3048) — same intent, two constants, minor rounding inconsistency. Cosmetic.
- **Display feet from stored meters** — Display feet are reconstructed from stored meters (`widthM / FT_TO_M`), not read from original catalog feet. Investigated and confirmed a clean ONE-WAY derivation (display dead-end, never re-saved into geometry) — no round-trip drift. Resolved, no action needed.

---

## Deferred / discussed

- **Collapsible placed list** — Low priority; list already pinned (~220px) with internal scroll. More valuable once tablet mode exists.
- **Drag-and-drop from sidebar** — Removed from current workflow; click-then-place is standard (v0.6.2+).
- **Automatic session restore on load** — Removed v0.8.7; intentional to avoid surprising overwrites; use Restore Autosave.
- **PWA** — deferred, not abandoned. Gated on field-test device/connectivity data and DHA/MHS service-worker policy. Stale-cache safety hazard: a service-worker cache could silently serve superseded application/calculation logic — dangerous for a medical tool. Caching imagery is low-risk; caching the app/logic is the hazard.
- **Offline tile caching** — wanted, high-value (field tool needs imagery offline), but **BLOCKED** on the distribution-architecture decision: requires serving over HTTPS on a fixed origin; incompatible with the current `file://` open-anywhere model (service workers can't register under `file://`; IndexedDB needs a stable origin; CDN bootstrap fails cold-offline). Viable path once hosting settled: IndexedDB tile cache, satellite-only, zoom 18–20, ~500m bbox, explicit storage/eviction UX, Esri ToS review. Blocked-by-dependency, not deferred-by-preference. Separately: current offline detection is `navigator.onLine`-only (coarse, often wrong) — a contained issue needing no hosting decision.
- **Search multi-match picker** — a change to show a placeholder picker dropdown for multi-result searches (instead of auto-flying to result[0]) was built, audited clean, then REVERTED: the picker is invisible because `#search-results` (a `<select>` positioned top:100% below the search bar) is CLIPPED by `#header overflow-y:hidden` (pre-existing bug since ~v0.7.7). Multi-match needs the picker, so it's BLOCKED until the clipping is fixed (reposition like the Measure menu's position:fixed, or replace the native select). Related search findings: facility-name searches (e.g. "UC Davis Medical Center") land on the building centroid — a better future fix is fit-to-bounding-box, not centroid; coordinate-jump works offline; no tile caching offline.
- **Nominatim User-Agent / email param** — Nominatim currently sends no User-Agent (browsers forbid setting it). Fix is to append an `email=` param. PARKED until an ops/project email exists (must NOT be user-entered or user-gated).
- **Autosave Part 2** — unload-flush via beforeunload/pagehide — DEFERRED (Part 1 shipped in 8b46241).
- **Distance vs area measure 'finished' state asymmetry** — observed during the 2026-07-07 measure/placement fix (9371c9e) audit, pre-existing, not caused by that fix. Completing a distance measurement leaves measureMode true (never cleared on finish), so a later place-arm will clear the finished polyline via the new measure-exit guard. Completing an area measurement (Finish Area) sets both measureMode and areaMeasureMode false, so the finished result survives a later place-arm untouched. The two measurement types are inconsistent in whether their finished result is protected from being cleared. Not fixed -- logged for future parity decision (should distance results also survive placement-arm the way area results do, or should area results also clear the way distance results do).

---

## Decisions

- **2026-06-28 — Snap direction revised to ambient drag-snap (leading candidate); market/analog survey; custom-object handling; survey-first rule.**

  **CONTEXT:** This entry follows and partially revises the 2026-06-26 unified-snap decision (committed a44f3c3). After surveying how existing products handle this, the leading snap DIRECTION changed. The 2026-06-26 dropdown design is NOT erased — it remains the committed fallback and the thing the new direction is evaluated against before any snap is built.

  **DECISION A — Snap direction revised to user-toggled AMBIENT DRAG-SNAP (leading candidate, not yet locked):** Instead of the Measure-style dropdown with explicit pick-anchor/pick-mover/commit, the leading direction is the consumer-standard ambient model:
  - Snap mode is OFF by default (normal dragging, no magnet). The user turns snap mode ON via a control.
  - While ON: dragging an object near another object's face makes it PULL flush to that face, with rotation matched, and a live alignment guide shown during the drag. Release commits.
  - The dragged object is the mover; whatever it approaches is the anchor — assigned automatically by the drag. This DISSOLVES the explicit anchor/mover assignment problem and the two-entry-point open sub-question (drag a new catalog object near an existing one, or drag an existing object near another — same mechanism).
  - Ctrl (or equivalent) temporarily SUPPRESSES the magnet mid-drag for free placement.
  - Still one-time positioning, NO parent/child relationship (unchanged from 2026-06-26). A wrong snap is fixed by dragging again or undo.

  This is the pattern used by Figma, Canva, Google Slides, PowerPoint, and the furniture/room planners (IKEA et al.) — near-zero learning curve, the right call for stressed users.

  **SNAP STRENGTH:** start with ONE well-tuned default proximity threshold. Evaluate a small 2-3 NAMED-PRESET control (not a continuous slider — avoids pushing a meaningless number onto the user) as a fast-follow once the default is felt on real layouts. Presets cover the real range (loose/far-reaching magnet for rough field layout vs. tight/short-reach for fine alignment in clusters). Label by task-feel (e.g. "Loose/Tight") rather than mechanism ("Strong/Weak") — final wording TBD when built. The default IS the calibration the presets would center on, so it must come first.

  **COSTS TO RESPECT (why this is not a trivial swap):** it hooks into the DRAG path — the most-used, most safety-sensitive interaction — rather than a self-contained mode; proximity-threshold tuning is a prototype-and-feel problem, not a spec; live-guide rendering needs clean teardown on release/cancel; regression-check BOTH safety invariants (two-tier overlap, fresh-open autosave) after touching drag.

  **STATUS:** leading candidate to EVALUATE AGAINST the committed 2026-06-26 dropdown design before building snap. Not a locked reversal. To be decided with fresh eyes (and ideally a prototype) when snap is built inside #11/#15.

  **UPDATE 2026-06-29:** ambient drag-snap PHASE 1 SHIPPED (commit 07fa119) — the toggle, state, proximity model, suppress key, and drag-path snap are built and working ('basically working well' on feel-test). The feature is no longer a candidate to evaluate — it is the chosen direction, now in tuning. A hysteresis (two-threshold engage/release) experiment was built and reverted the same session: it made stickiness WORSE (held the snap until the larger release distance), confirming hysteresis is the WRONG direction; the fix for stickiness is likely the OPPOSITE — make breaking a snap EASIER, not harder. Remaining tuning work is logged in the new Snap tuning backlog below.

  **DECISION B — Custom (user-added) objects are a first-class snap case:** The tool lets users add their own dimensioned objects (Custom Size workflow, vendor 'Custom', always rect) — not just TENT_DB catalog entries. This is an advantage over the closed-catalog furniture planners. Implications to carry into the snap build and the area-total work:
  - Snap (ambient or otherwise) must work for custom objects as both mover AND anchor, not just catalog-to-catalog. Custom is always rect (simplest case for getSnapAttachLatLng) — must be an explicit test case.
  - The parked per-object-area / facility-total feature must derive area from entered dimensions for custom objects (which carry no catalog sq-ft), not only from catalog values.

  **SURVEY FINDINGS (survey-first; recorded so they are not re-run):** A market / open-source / analog survey was done before committing further snap work. No adoptable existing tool was found; PSMT occupies a real gap. Summary:
  - **FIELD-HOSPITAL / HUMANITARIAN GIS:** vendors (BLU-MED, Western Shelter) offer layout as a CONSULTING SERVICE, not software. Humanitarian GIS (UNHCR/Azraq shelter-allocation, CartONG/HOT OSM mapping, RefuGIS/ArcGIS, UNHCR+GitHub AI) is camp MANAGEMENT / record-keeping of existing sites, requires GIS expertise — the opposite of PSMT's no-expertise goal. UNHCR standards work is doctrine/indicators (e.g. 30 sqm/person), not software. No self-serve, vendor-catalog, satellite-imagery placement tool exists.
  - **INTERIOR / ROOM PLANNERS (closest analog):** IKEA room planner is structurally PSMT-for-furniture — a product-driven planner whose goal is confirming whether catalog items fit a specific space, fixed-dimension catalog objects, place + rotate only. This VALIDATES PSMT's constrained-catalog model (proven at retail scale). Category-standard features: drag-drop-instant-fit-check (PSMT has via overlap); 2D top-down / 3D toggle (PSMT is 2D satellite — 3D likely unnecessary for a logistics tool, noted not chased); PDF export with measurements + shopping list (PSMT has PDF; "what's placed → manifest" maps to the parked per-object-area item); snapping + measurement guides are table stakes (reinforces ambient-snap direction). PSMT's advantage: real satellite imagery as ground truth instead of manual wall entry; lightweight custom-object add instead of OBJ/FBX import. AR / "see it in my room" branch (IKEA Kreativ, photo-AI): not applicable — PSMT plans a site the user is NOT standing in, remotely; ruled out.
  - **ROADMAP POINTERS (v2+, not now):** area-per-person / space-adequacy checks (standards-informed); site-suitability checklist (drainage/access/hazards); OpenStreetMap/HOT as openly-licensed tile data (relevant to the parked offline-tile-caching problem, where Esri licensing is a constraint).

  **NEW WORKING RULE — SURVEY-FIRST:** Record that a standing rule was adopted and added to `.cursor/rules/behavior.mdc`: when taking up any new feature or function, the FIRST step is a survey of existing consumer/market/open-source products that have it — how they work, what's become the de facto standard — before designing PSMT's version. It is a starting input, not a mandate to copy (diverge deliberately when warranted). For PSMT-specific things with no analog, an empty result is valid and noted. Do the survey at the **start** of the feature, not after a design is drafted.

- **2026-06-26 — Snap feature unified and folded into header rework (#11/#15).**

  **DECISION 1 — Snap is ONE unified feature.** It covers both:
  - **(a) place-and-attach** — a NEW structure from the catalog snaps onto an existing one, and
  - **(b) reposition-and-attach** — an ALREADY-PLACED object moves flush against another.

  These were treated as one feature, not split, because to the user they are a single concept ("snap things together"); splitting them into two UIs/paths would create confusion.

  **Mechanics:** one-time positioning, NO parent/child relationship (after snapping, both objects are fully independent; a wrong snap is fixed by repositioning the mover and snapping again, or by undo). Anchor stays put; mover moves (or is placed). The snap face is chosen by the mover's coarse position relative to the anchor (user drags/aims roughly near the target face; snap aligns flush + matches rotation). Both paths reuse the existing `getSnapAttachLatLng(target, newLengthM, newWidthM, clickLatlng)` geometry — passing the anchor as target, the mover's dimensions as newLengthM/newWidthM, and a reference point as clickLatlng. For reposition, the reference point is the mover's current center; for place-and-attach, it is the map click/cursor point (the mover does not yet exist). Resolving this reference-point difference cleanly across both entry points is part of the open sub-question below.

  **UI:** a Measure-style header DROPDOWN ("Snap together"), mirroring the `#btn-measure-menu` pattern (fixed-position menu anchored via `getBoundingClientRect`; document-click to close), plus a fixed strip when a snap session is armed (mirroring `#measure-strip`), floating over the map so it costs no header-row width. The `#mode-display` status badge is RETAINED (it carries snap feedback: pick-anchor, snap-failed, attached). Left-click object selection must remain completely untouched when snap is disarmed. No per-row controls in the placed list (rows are already full).

  **OPEN SUB-QUESTION (to resolve when building):** the two entry points differ — place-and-attach begins from the catalog (tent on cursor), reposition begins from an object already on the map. The unified design must handle both entry points gracefully. Also still to design: exact anchor/mover assignment mechanism and commit location.

  **DECISION 2 — Snap is NOT a standalone task.** It is folded into the #11/#15 header rework, because snap needs header space and the header needs decluttering regardless. They are to be designed and built together. This is why former item 3a is superseded rather than scheduled on its own.

  **DECISION 3 — DEFERRED, open question for the header work: save-state indicator honesty.** When the header save-state chrome (currently "Restore Autosave" button + "Autosaved <timestamp>" text) is regrouped/collapsed during #11/#15, the labeling must not overclaim — concern on record that a bare "Saved" label could mislead (autosave writes to localStorage only and is weaker than Save Plan; and a debounced write is pending for up to 500ms after an edit). NOT decided — parked to be settled when the header is designed, because it dovetails with the save-state grouping. Reference: `SESSION_DEBOUNCE_MS = 500` (line 561).

  **REJECTED / SET-ASIDE ALTERNATIVES (record so they are not relitigated):**
  - **Sidebar pair-picker** (assign anchor/mover via sidebar controls): REJECTED — placed-list rows are full; splits user attention between sidebar assignment and on-map aiming; adds chrome.
  - **Right-click to assign anchor/mover:** REJECTED AS PRIMARY mechanism — right-click is second-class on a trackpad, is invisible/undiscoverable, and there is no context-menu infrastructure today. May be added later as a mouse-only accelerator, but not as the foundation.
  - **On-map "pill" button** (commit control pinned near the anchor): NOT rejected — SET ASIDE for reassessment when the dropdown is actually designed. It may earn a role later (e.g. an on-map commit control), or be revisited if the dropdown design gets stuck. Not to be relitigated as the primary mechanism, but it remains available.

- **2026-06-26 — USGS NAIPPlus base-layer evaluation closed (item 20).** USGS NAIPPlus was evaluated as a toggleable second base layer and A/B tested against Esri World Imagery at two real hospital sites (UC Davis Medical Center; BAMC San Antonio) at working placement zoom. NAIP was visibly lower resolution at the zoom that matters for placement, despite deeper max zoom. The esri-leaflet dependency and dynamic-service performance cost were not justified. The evaluation branch state was reverted; Esri World Imagery retained as the sole base layer. *(No git commit records the eval — reverted — this Decisions entry is the authoritative record.)* Future paths if revisited: premium Esri/Maxar imagery via DHA ArcGIS authentication, or Mapbox/commercial sources if FedRAMP and licensing clear.
- **2026-06-10 — Quickstart PDF retired permanently.** `VPC Mapping Tool - Quickstart.pdf` has been removed from the project. **`Portable Solution Site Mapping Tool - Quickstart.html`** is the sole quickstart source going forward; no PDF will be regenerated.

- **2026-07-07 — Item 15 (#mode-display) reconsidered; header/sidebar UX discussion (Tier C planning)**

  Developer questioned whether `#mode-display` earns its central header real estate, given it is prone to truncation (ellipsis) and sits in the most contested part of the header row. Investigation (Cursor read-only report) pulled every `setMode()` call site (~35 distinct messages) and grouped them into three categories with different needs:

  1. **Ongoing state** (placement-armed "Click to place {tent}", Measure/Area Measure Mode, selection "Selected {label}...") — needs to persist while true.
  2. **One-off confirmations** (~24 messages: Moved/Snapped/Attached/Rotation updated, Undo/Redo, Plan saved/loaded, exports, buffer/scale presets, delete/clear, search fallback, autosave failures) — describe something that already happened, irrelevant a moment later.
  3. **Idle/instructional** (1 message: "Select a tent from the sidebar, then click the map to place.") — shown when nothing is happening; this is the one visibly breaking (truncated) in field screenshots.

  **Leaning direction (NOT YET DECIDED, NOT BUILT):**
  - Idle/instructional message → move to a dismissible full-screen onboarding popup shown on first open, which the user can permanently clear. Persistent mode-display would then stay minimal/blank when idle rather than repeating onboarding text forever.
  - Ongoing state → **OPEN SUB-QUESTION:** floating near the map (next to zoom control) vs. sticky-pinned section in the sidebar above Setup (mirroring the existing pinned Placed-list pattern at the bottom of the sidebar). Tradeoff: map placement is semantically closer to the mostly map-interaction instructions it carries, but real-estate/collision with existing map overlays (layers control, overlap pill, cursor-position readout) not yet checked. Sidebar placement keeps the map visually clean and reuses an existing pin mechanism.
  - One-off confirmations → split into two toast treatments rather than one bar: spatial confirmations (Snapped/Attached/Moved) anchored near the object/snap face on the map, fading; action-triggered confirmations (Save/Undo/Print Fit/exports/etc.) anchored near the triggering button, fading (possibly a brief button color-flash).

  **New finding:** Measure Mode / Area Measure Mode already have a dedicated point-of-action strip (`#measure-strip`, header-anchored under `#btn-measure-menu` via `getBoundingClientRect`) showing live step instructions — this duplicates the "Measure Mode"/"Area Measure Mode" string simultaneously shown in `#mode-display`. Open question raised: does Measure Mode need `#mode-display` representation at all, given `#measure-strip` already covers it?

  **Investigated and confirmed NOT a drop-in reuse:** `#measure-strip`'s positioning technique (fixed + `getBoundingClientRect` under a stable header button) does not generalize to placement-armed (would need to anchor to a scrolling sidebar catalog item) or selection (would need latlng-to-pixel conversion tracking pan/zoom/drag on the map). Extending point-of-action messaging to those two categories is real new positioning work, not a copy of Measure's implementation.

  **Related, also discussed (item 10a/14 direction, NOT YET BUILT):** "How to use" trigger leaning toward a small icon (not a header button) given stated real-estate constraints, opening a full-screen semi-translucent modal on hover-preview + click-to-pin. Placement leaning toward map-corner (near zoom/layers controls) rather than header, specifically to avoid adding to the header crowding that this same Tier C work is trying to reduce. Open question: does this supersede item 4 (point-of-action tooltips) or coexist with it — **NOT DECIDED**.

  **Status:** Entirely open design discussion. No implementation, no code changes, no final decisions from this entry. Bug found and fixed during this investigation (measure mode not exiting on placement-arm) shipped separately as commit `9371c9e` and is logged under "Deferred / discussed" as its own item (finished-state asymmetry), not part of this entry.

---

## Doc maintenance

- Bump *Last updated* and version when `APP_META.version` changes in `Portable Solution Site Mapping Tool.html`.
- When `APP_META.version` changes, sync README, Quickstart, and this file together in the same commit.
- Keep **README.md**, **PSMT_Project_Notes.md**, **Portable Solution Site Mapping Tool - Quickstart.html**, and in-app tooltips in sync on each release.
- Shipped features: document in README changelog; remove from backlog here.
