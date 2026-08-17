# Portable Solution Site Mapping Tool — Project Notes

*Last updated: 2026-08-17 — print consolidation commit 2 shipped (8c048a8): Fit View removed, single print path via Ctrl/Cmd+P, @page letter-landscape rule added; 2026-08-13 — filenames hyphenated for web hosting (`Portable-Solution-Site-Mapping-Tool.html`, `Portable-Solution-Site-Mapping-Tool-Quickstart.html`; spaces break URLs); 2026-08-12 — version bump to **1.3.0-dev** (APP_META/README/Quickstart/PROJECT_MAP/Notes synced; catalog import + card redesign + Setup dissolve + batched operator docs); 2026-08-12 — Placed totals ⓘ on Placed header (utilities + bed-figures caveat); 2026-08-12 — catalog/card redesign COMPLETE (Steps 1–5b shipped: e9e25c4, 3f11f3e/64d354f, 8bc0549+c39083a, d2667a5, 48bf376, 3e4dedd; docs close-out this commit); 2026-08-12 — catalog/card redesign Step 5b-2 (Custom Size customBeds + totals; rollback `48bf376`); 2026-08-12 — catalog/card redesign Step 5b-1 (Beds all/Ward·ICU session toggle; rollback `d2667a5`); 2026-08-12 — catalog/card redesign Step 5 (Placed running totals: beds + sq ft + ⓘ + uncounted; layout A; rollback `c39083a`); 2026-08-12 — catalog/card redesign Step 4 (on-map role text: z≥20, min-edge 48px, rotates with footprint, runs along long axis; rollback `3fa2b7d`); 2026-08-12 — catalog/card redesign Step 3 (continuous catalog placement + readout ✕ disarm; rollback `3f11f3e`); 2026-08-12 — catalog/card redesign Step 2 (two-line cards, sticky per-card roles, Custom…, ⚙ manage popover, Label & Style role chrome removed; rollback `e9e25c4`); 2026-08-12 — catalog/card redesign Step 1 (Catalog header + Power chip + Generator relocation; rollback `6e28b2b`); 2026-08-11 — catalog import COMPLETE (Step 6 Notes close-out; Steps 0–5 shipped e97b900…2844ec5; 36 records / 20 visible / 16 extended-hidden); 2026-08-11 — catalog import Step 5 (16 extended-tier soft-sided models added, hidden behind fail-closed filter; minimum-valid rect bbox; fidelity deferred); 2026-08-11 — catalog import Step 0 (doctrine + locked decisions in Decisions; Overhaul item 7 ramp note; Capacity #3 pointer; `.gitignore` for PSMT Reference Materials/; transfer JSON staged); 2026-08-10 — version bump to **1.2.0-dev** (Tier C complete; APP_META/README/Quickstart/PROJECT_MAP synced); 2026-08-10 — TIER C COMPLETE (77762fb): full header/sidebar/mode-display rework shipped across 4 commits; new items logged (Esc-doesn't-clear-selection, legacy Attached-to message for future dead-code sweep); 2026-08-10 — Tier C Step 4 (Start Here modal, How-to removal) shipped, 802c1b3; only Step 5 remains; 2026-08-10 — Tier C Step 3 (map-floating readout) shipped, b66ee21; mode-list idea and #measure-strip/layer-icon crowding bug logged; 2026-08-10 — Tier C Step 1 (toast system) shipped, b1fb43b, scope refined during build; Save Plan location picker logged as new backlog item; 2026-08-08 — Tier C header/sidebar/mode-display UX fully decided (not yet built); 2026-07-07 — version bump to **1.1.0-dev** (`APP_META`, README, Quickstart, PROJECT_MAP synced); shape-fidelity audit **COMPLETE** (GK20, GK1935, ZUMRO Quad, X-HUB, 8D36); bump reflects fidelity audit + snap phase 1 — **psmt-overhaul** backlog still open; 2026-07-06 — ZUMRO Quad Interface shape-fidelity VERIFIED (render faithful — exterior footprint 29.4'×19.5'; 454 sq ft is interior floor, air-beam; note/digest wording synced); third shape-audit item complete; GK1935 shape-fidelity fix shipped (symmetric corner cut, 7'8" exterior face, ~570 sq ft); second shape-audit item complete; GK1935 true-face snap now unblocked; GK20 shape-fidelity fix shipped (regular octagon, exterior footprint 18'7" across / 7'8" faces); first shape-audit item complete; GK20 true-face snap now unblocked; stickiness-on-break parked (improved as side-effect of the engage-threshold change; revisit post-fidelity); ambient drag-snap engage threshold made size-proportional + clamped (entry-jump fix); long-face capture follow-up logged, tied to shape-fidelity audit; autosave empty-overwrite fix (8b46241) and ambient drag-snap phase 1 (07fa119) shipped; snap tuning backlog added; #6 amended with bulk-delete confirm; search-picker-clipping, Nominatim-email, and autosave-Part-2 parked.*

Operator-facing documentation: **`README.md`**. Field quickstart: **`Portable-Solution-Site-Mapping-Tool-Quickstart.html`**. Spec alignment: **`VENDOR_SPECS_DIGEST.md`**.

---

## Project overview

**Portable Solution Site Mapping Tool** (released/field-tested **v1.0**; current working build **v1.3.0-dev** on `psmt-overhaul`) — Single-file HTML app for emergency field hospital site layout. Leaflet.js map at true scale, vendor `TENT_DB` (**eight** vendors — BLU-MED, Western Shelter, DLX, ZUMRO, HDT, Craftsmen, FORTS, WillScot — plus a ninth catalog tab **Power** pseudo-vendor holding the WS Generator; **20** standard-visible models, **16** extended-hidden, **36** total), click-then-place workflow, drag/rotate handles, snap-to-face attachment, two-tier overlap (footprint red / clearance buffer amber), undo/redo (50 steps), role tagging with custom roles, debounced browser autosave with manual **Restore Autosave**, portable **Save Plan** / **Open Plan**, GeoJSON export, PDF export with map snapshot, and print fit.

**Version note:** `APP_META`, README, Quickstart, and PROJECT_MAP now read **1.3.0-dev** as of 2026-08-12. This bump syncs the batched operator docs after catalog import + catalog/card redesign + Setup dissolve (`487c777`). Prior **1.2.0-dev** (2026-08-10) covered Tier C completion; **1.1.0-dev** (2026-07-07) covered shape-fidelity audit + snap phase 1; **psmt-overhaul** backlog items remain open.

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
- **6.** Select-all / group move (move a whole built-out setup together). Decided 2026-06-29: bulk delete via a future select-all/group action gets a confirmation dialog ('Delete N structures?'); undo remains the backup. Group-move covers moving a selected group together (all or a subset — narrow down when built). **WillScot Patient/Staff pair recorded as the driving use case for Overhaul item 6 (select-all / group move).**
- **7.** Mark doors/exits, optionally attached to tents where position is known. Note: touches plan-JSON schema — new geometry, NOT pure UI. Treat as additive, pre-v1 schema. **Ramp geometry (logged 2026-08-11):** ramps are directional, entrance-attached, and grade-dependent; a future ramp object likely wants grade-dependent run, not a fixed catalog footprint — see Decisions, 2026-08-11 (catalog import); not designed. **Ramp = Custom Size path — a ramp is placed today via the Custom Size workflow; closes the ramp side-note on Overhaul item 7.**
- **8.** Labels on the structures themselves (e.g. ICU, Triage), supplementing/replacing the hover box.
- **10.** Sidebar overload. Sub-steps: **(10a)** move "How to use" out of the sidebar — **SUPERSEDED** by the persistent **Start Here** button design; **SHIPPED (802c1b3)** — see Decisions, 2026-08-10; **(10b)** reorder sidebar sections to follow workflow — **STATIC** reorder, NOT user-customizable (prior decision: fixed order mirrors data dependencies). Before working this, do a **READ-ONLY** check of `Old/VPC_UX_Refactor.md` and the current built state, because parts of that refactor were already implemented. The old doc informs but does not bind — priorities may have shifted. See Decisions, 2026-08-10 (Setup dissolved) — reorder must account for Setup's removal as a section, not just reordering existing sections.
- **11.** Top-bar crowding: search field grows to fill space; status/mode hint occupies prime space; frequent vs. rare controls (Undo/Redo vs. Restore Autosave/Measure) carry equal visual weight. Same read-only check of `VPC_UX_Refactor.md` applies before work. Note: the unified Snap feature is folded into this header rework — see Decisions, 2026-06-26 (Snap feature unified). **SHIPPED** — see Decisions, 2026-08-10 (Tier C complete).
- **12.** Address/search bar: shorter at rest, expanding on focus. **OPEN** — search bar reflows for Start Here (see Decisions, 2026-08-10) but expand-on-focus itself not yet built; not part of Tier C's locked scope.
- **13.** MERGED into item **4** (tooltips) — retained here only so the number is not silently dropped.
- **14.** **SUPERSEDED** by the persistent **Start Here** button design (same work as step **10a**); **SHIPPED (802c1b3)** — see Decisions, 2026-08-10.
- **15.** Status/mode readout — map-floating ongoing-state readout **SHIPPED (b66ee21)**; toast one-offs **SHIPPED (b1fb43b)**; Start Here / idle instructional **SHIPPED (802c1b3)**; `#mode-display` removal **SHIPPED (77762fb)**. **SHIPPED** — see Decisions, 2026-08-10 (Tier C complete).
- **16.** Rotate handle and delete button sit too far from the object they control. Needs investigation.
- **17.** Rotation manual-entry fallback — a numeric entry as backup to the drag handle. Framed as a **FRICTION-REDUCER** (lets a stuck user type a value and proceed), NOT a precision feature.
- **18.** Selecting a placed-list row should fly-to **AND** highlight the object on the map. Equals existing backlog item **#2**. **NOT fully closed.** **NAVIGATION half done:** list-row → `map.panTo` (pre-existing); map-click → placed-list `scrollIntoView` **SHIPPED** with Role/Label Step 1 (see Decisions 2026-08-10 point 11). **HIGHLIGHT half still open** — selected object has no visual highlight on its footprint (only rotate/delete handles); tracked separately under Immediate feature backlog **Selected object footprint highlight** (unnumbered row).
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

- **19.** Zoom/scale presets are buggy. **Standalone** — no longer blocked by item 20 (imagery-depth dependency removed when item 20 closed). Schedule whenever prioritized. Developer testing (2026-08-10): only the 1:500 preset works; 1:100 / 1:150 / 1:200 exceed the tile provider's available zoom and produce a blank map ("Map data not yet available") rather than failing silently or being disabled; no active/selected visual state shows on any preset once clicked (working or not). Future direction after fix (stated, not authorized design): relocate as a small dropdown near the map zoom control with a corrected set of presets actually reachable at the tile provider's max zoom — see Decisions, 2026-08-10 (Setup dissolved). Scale-to-zoom formula from the removed `applyScalePreset()` (commit 487c777), preserved for the eventual rebuild: given a target scale denominator (e.g. 500 for 1:500), `metersPerPixelTarget = targetDenominator * 0.000264583` (meters per CSS pixel at 96 dpi), then `zoom = log2(40075016.686 * cos(latitude_radians) / (metersPerPixelTarget * 256))`, clamped to [0, 21]. Confirmed 1:500 was the one working preset before removal; 1:100/1:150/1:200 exceeded the tile provider's max zoom and produced a blank map ("Map data not yet available") rather than failing gracefully. Scale Presets section (buttons + function) was removed entirely in 487c777, not just relocated — rebuild from scratch when item 19 is worked, using this preserved formula as the starting point.
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
| Toast feedback system | b1fb43b | Adds toast layer for one-off confirmations, replacing #mode-display for that category. New: .psmt-toast CSS, #action-toast/#spatial-toast DOM, showActionToast/showSpatialToast/clearToasts helpers, getNearestFaceMidpointLatLng (toast-only, read-only face-midpoint lookup). ACTION_TOAST_DURATION_MS=2800, SPATIAL_TOAST_DURATION_MS=2200. Migrated to action toast: clearance preset/apply/empty, GeoJSON export, PDF export (success/fail/network), autosave failed, no-autosave (x5), object deleted, clear all, area-measure <3pts, search/coord/offline, scale presets, print fit. Migrated to spatial toast: "Snapped to X (face)". Silenced entirely (redundant with visible feedback, no toast/no setMode): "Moved X", "Rotation updated", Undo, Redo, "Plan saved", "Plan loaded" (non-restore). Ongoing-state setMode calls, #mode-display, #measure-strip, overlap detection, and autosave empty-overwrite guard unchanged. Toast duration split (2800 action / 2200 spatial) flagged for future review — remaining action-toast durations not yet tuned. |
| Map-floating ongoing-state readout | b66ee21 | Tier C Step 3. Adds #map-state-readout, non-interactive status pill positioned right of the Leaflet zoom control (top:10px; left:54px; pointer-events:none), dual-write alongside existing #mode-display (unchanged, still operating in parallel — removal is a later, separate step). Shows for ongoing-state messages: place/custom-place armed, Measure Mode, Area Measure Mode, object selection. Hides on return to View Mode/idle. Unifies the two previously-divergent "Selected..." strings (map-click vs list-row select) into one wording: "Selected {label} — drag to move". No click handler — Esc/existing exit paths remain the only way to leave a mode. Audited and developer visually smoke-tested (5/5 checks pass). |
| Start Here modal, sidebar How-to removed | 802c1b3 | Tier C Step 4. Adds #btn-start-here in header, immediately left of #search-wrap (reflows via existing flex:1 1 140px, no hardcoded width). Opens #start-here-modal — new independent centered overlay, three provisional orientation steps (placeholder copy, marked for future content pass), closes via X/Esc/backdrop. Esc closes only the modal, confirmed does not call resetViewMode() or affect an active place/measure/select mode. No don't-show-again state — opens fully every click, not a one-time popup. Removes sidebar "How to use" section entirely (collapsible panel, toggle, STORAGE_KEY_HOWTO). Supersedes original item 10a/14 icon+hover-preview design; merges idle-instructional message into this persistent button per 2026-08-08 Tier C decisions. Audited and developer visually smoke-tested (6/6 checks pass). |
| #mode-display removed entirely | 77762fb | Tier C Step 5, FINAL step. Deletions only (-51 lines). Removes #mode-display DOM/CSS (.mode-badge, .mode-badge-action), initModeBadgeClick (click-to-exit affordance, already decided against rebuilding — developer was unaware it existed), getDefaultModeMessage() (only fed #mode-display's idle text), and initHeaderTruncateTitles (existed solely to sync #mode-display's title, confirmed no other logic bundled in). setMode() stripped to its two remaining jobs: map-mode-place/map-mode-measure classes and syncMapStateReadout(txt) — confirmed via read-only check these were never data-coupled to the #mode-display write, no behavior change across ~13 call sites. Audited and developer visually smoke-tested (5/5 checks pass). This completes Tier C: Steps 1 (toasts), 3 (map-floating readout), 4 (Start Here), 5 (mode-display removal) all shipped and verified. |
| Catalog import (Steps 0–5) | e97b900…2844ec5 | Doctrine + decisions; schema metadata on existing 16; fail-closed tier filter + hidden extended toggle; 4 hard-sided + 3 vendors; 16 extended-hidden soft-sided models. Data layer: **36** records / **20** standard-visible / **16** extended-hidden. Docs close-out Step 6. |

---

## Snap tuning backlog

Open snap feel/geometry work following phase 1 ship (07fa119). None omitted.

1. **Entry jump** — **ADDRESSED** (this commit): entry-jump feel improved by the size-proportional clamped engage threshold shipped here — `SNAP_PROXIMITY_K=0.4`, `FLOOR=0.75m`, `CEILING=4m`; engage = clamp(K × max(widthM, lengthM), FLOOR, CEILING), replacing the flat 4m threshold. Remaining feel work on long-face capture is superseded by backlog item 2 below.
2. **Long-face capture** — tight: on a long tent side the engage zone is a small ball around the face **midpoint**, so a small mover (e.g. vestibule) must be dragged near center before snap engages. Side-effect of the size-proportional threshold (capture radius = max jump = the same number, by design of the engage test). **REVISIT AFTER** the object/shape-fidelity audit — corrected shapes change which faces exist (cut-corner rectangle, plus-hub) and may change the right fix. Candidate directions: a visible guide line to the intended snap point (makes a small capture zone acceptable under stress) and/or along-face attach instead of midpoint-only. Tie to true-face snapping (backlog item 6).
3. **Stickiness on break** — must currently turn snap off to drag a snapped object away. Hysteresis was tried and was wrong (see 2026-06-29 update); explore making the break EASIER. PARKED (2026-06-29): observed easier to break a snap after the size-proportional clamped engage threshold shipped (1178f3a) — stickiness improved as an apparent side-effect of the smaller engage zone (not separately verified in code). Revisit AFTER the object/shape-fidelity audit only if stickiness creeps back in once shapes/faces change. -- CLOSED FOR NOW (2026-07-07): no longer observed as an issue; reopen if stickiness recurs.
4. **Map blur/pan during drag** — observed (real: full map blurred/panned) but NOT reproducible. Diagnostic for next occurrence: check whether the map CENTER COORDINATES actually change (true pan — likely a premature mouseup re-enabling map drag during fast/jerky dragging) vs the object merely jumping (perceptual). Likely chain: fighting sticky snap → thrash → premature mouseup → map grab. -- **REOPENED 2026-08-11 — HIGH priority** (catalog-import Step 4 visual test): intermittent recurrence — whole map shifts and blurs during object drag, then self-resolves. Prior CLOSED FOR NOW (2026-07-07) withdrawn. When taken up: proper **read-only** investigation first (intermittent + drag-path); keep prior diagnostic. High on the investigation list; not fixed in import.
5. **1935 short-end won't attach** — the WS GK1935 attaches its long wall to a neighbor's long side (e.g. 2032.5) rather than its short end. Triage needed: is this a bbox-face limitation, or an independent face-selection bug? Needs a read-only geometry classification. **Reconfirmed 2026-08-11** (catalog-import Step 3 visual test): BLU-MED short-end **cannot** snap to GK1935 long side; failure involves the cut-corner model's faces **bidirectionally** (not only GK1935-as-mover short-end). Still needs a read-only geometry classification when taken up — do not duplicate as a new backlog item.
6. **True-face snapping for irregular shapes** — GK1935 **elongated-octagon vs cut-corner-rectangle** naming question **RESOLVED** (shape type renamed to `cut-corner-rectangle`; geometry unchanged). Remaining work: implement true-face snap (backlog **#6**) for irregular shapes using certified footprints — bbox snap remains interim for GK1935, GK20, cut-corner-square, plus, etc. (`ellipse` legacy plans only).
7. **How-to / help text still references the now-hidden #snap-to-selected checkbox** — fold this doc-sync into the next snap commit.
8. **Snap strength presets** — 2-3 named, task-framed (loose/tight) presets — as a fast-follow once the default threshold is tuned (already partly recorded in the 2026-06-28 entry). -- CLOSED FOR NOW (2026-07-07): not currently needed; reopen if requested.

---

## Immediate feature backlog (PSMT)

Open work only. Shipped items removed from this list.

| # | Item | Notes |
|---|------|-------|
| 1 | **Tablet mode / sidebar hide** | **CLOSED/rejected** (2026-08-12 redesign close-out). Tablet target dropped; sidebar is a dense precision UI; walk-the-site served by PDF export. Revisit only as possible view-only mode if field testing demands it. |
| 2 | **Click placed row → fly-to + highlight** | Pulse map object; brief toast. Navigation half largely shipped (list↔map); **highlight half** still open — priority rationale strengthened by field-observed confusion locating objects in dense layouts. |
| 3 | **Capacity tracking** | **SHIPPED:** Placed running totals; All / Ward·ICU bed toggle (exact match; Triage excluded pending clinical input); Custom Size optional beds; manufacturer-spec bed sources + totals caveat ⓘ on the Placed header. **OPEN (clinical):** whether Triage counts as bed space; whether the Ward/ICU exact-match list needs broadening (e.g. Pre-Op / Post-Op). See Decisions 2026-08-11 (BED-TALLY CONVENTION) and 2026-08-12 redesign COMPLETE (d). |
| 4 | **Access corridors** | Ambulance, staff, evacuation paths between structures |
| 5 | **Utilities overlay** | **CLOSED/rejected** (2026-08-12 redesign close-out). Utilities are load-dependent calculated quantities, not fixed-footprint objects; Water/Power calculators must answer first; likely never this tool's map-overlay scope. Calculator-suite integration (v2.5+) remains the path — at suite level, not as a map overlay. |
| 6 | **Named zones/sectors** | Grouping beyond role dropdown |
| 7 | **Offline-first tile caching** | MBTiles/PMTiles or “cache this area” before deployment |
| 8 | **Coordinate export** | Per-object lat/lng for logistics / aviation |
| 9 | **Metric/imperial toggle** | Required for international use |
| 10 | **Deployment phases** | Phase 1/2 markers on structures |
| 11 | **Layout templates** | MSF-style starter layouts (JSON config + place-at-origin) |
| 12 | **Layer visibility by role** | Filter map/list for review and print |
| 13 | **Validation rules** | Min clearance gap, simple access-path checks (configurable) |
| — | **Selected object footprint highlight** | Selected object has no visual highlight on its footprint — only the rotate/delete handles indicate what's currently selected, and the map-floating readout (upper-left) is text-only, not spatially tied to the object. In a dense layout this makes it hard to visually locate the selected object at a glance. Developer's suggested starting point: a short glow effect on the selected object's footprint outline, similar in spirit to existing overlap red/amber styling. Not designed in detail, not built, not scheduled. |

### Design notes (backlog)

**Capacity (#3):** Core facility tally **SHIPPED** (running totals, Ward/ICU toggle, Custom beds, manufacturer-spec sources + totals caveat ⓘ). Remaining open work is clinical (Triage / role-list breadth) — see Decisions 2026-08-12 redesign COMPLETE (d). Facility-total arithmetic: Decisions 2026-08-11 (BED-TALLY CONVENTION).

**Utilities (#5):** **CLOSED/rejected** as a map overlay (2026-08-12). Path forward is calculator-suite integration (v2.5+): Water/Power calcs answer load-dependent quantities; map capacity totals feed the suite — not a utilities drawing layer on the map.

**Offline tiles (#7):** Hardest PWA piece — pre-cache known AOIs or user-initiated cache workflow before going to the field.

---

## Product roadmap

### v1 — PSMT standalone PWA

Map tool with backlog above implemented; offline-capable; installable on **desktop**. Single-file app is nearly PWA-ready — **manifest + service worker** (especially tile caching) are the main additions. Tablet target **dropped** (2026-08-12).

**Gap vs v1:** Remaining open items in backlog (excl. #1/#5 closed); true offline basemap. Tablet UX removed from the gap list.

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

- **Collapsible placed list** — **SUPERSEDED** by **Placed-list two-state snap expand** (Deferred/discussed, 2026-08-12 redesign close-out). Do not design a free-drag height slider.
- **Drag-and-drop from sidebar** — Removed from current workflow; click-then-place is standard (v0.6.2+).
- **Automatic session restore on load** — Removed v0.8.7; intentional to avoid surprising overwrites; use Restore Autosave.
- **PWA** — deferred, not abandoned. Gated on field-test device/connectivity data and DHA/MHS service-worker policy. Stale-cache safety hazard: a service-worker cache could silently serve superseded application/calculation logic — dangerous for a medical tool. Caching imagery is low-risk; caching the app/logic is the hazard.
- **Offline tile caching** — wanted, high-value (field tool needs imagery offline), but **BLOCKED** on the distribution-architecture decision: requires serving over HTTPS on a fixed origin; incompatible with the current `file://` open-anywhere model (service workers can't register under `file://`; IndexedDB needs a stable origin; CDN bootstrap fails cold-offline). Viable path once hosting settled: IndexedDB tile cache, satellite-only, zoom 18–20, ~500m bbox, explicit storage/eviction UX, Esri ToS review. Blocked-by-dependency, not deferred-by-preference. Separately: current offline detection is `navigator.onLine`-only (coarse, often wrong) — a contained issue needing no hosting decision.
- **Search multi-match picker** — a change to show a placeholder picker dropdown for multi-result searches (instead of auto-flying to result[0]) was built, audited clean, then REVERTED: the picker is invisible because `#search-results` (a `<select>` positioned top:100% below the search bar) is CLIPPED by `#header overflow-y:hidden` (pre-existing bug since ~v0.7.7). Multi-match needs the picker, so it's BLOCKED until the clipping is fixed (reposition like the Measure menu's position:fixed, or replace the native select). Related search findings: facility-name searches (e.g. "UC Davis Medical Center") land on the building centroid — a better future fix is fit-to-bounding-box, not centroid; coordinate-jump works offline; no tile caching offline.
- **Nominatim User-Agent / email param** — Nominatim currently sends no User-Agent (browsers forbid setting it). Fix is to append an `email=` param. PARKED until an ops/project email exists (must NOT be user-entered or user-gated).
- **Autosave Part 2** — unload-flush via beforeunload/pagehide — DEFERRED (Part 1 shipped in 8b46241).
- **Distance vs area measure 'finished' state asymmetry** — observed during the 2026-07-07 measure/placement fix (9371c9e) audit, pre-existing, not caused by that fix. Completing a distance measurement leaves measureMode true (never cleared on finish), so a later place-arm will clear the finished polyline via the new measure-exit guard. Completing an area measurement (Finish Area) sets both measureMode and areaMeasureMode false, so the finished result survives a later place-arm untouched. The two measurement types are inconsistent in whether their finished result is protected from being cleared. Not fixed -- logged for future parity decision (should distance results also survive placement-arm the way area results do, or should area results also clear the way distance results do).
- **Measure result box obscures short lines** — The distance/area measurement result tooltip is positioned directly on top of the measured line/shape. On a short line, the box can fully obscure the line it's describing. Needs repositioning logic (e.g. offset from the line rather than centered on it). Not fixed, logged only.
- **Object info tooltip clips at top of viewport** — The floating info box shown when clicking/hovering a placed object always renders above the object with no viewport-awareness. Near the top of the screen this causes it to get cut off, forcing the user to pan the map to read it. Needs positional logic that adjusts placement (e.g. flips below the object) based on available space, similar in spirit to the existing `#measure-strip`/menu `getBoundingClientRect` flip-if-needed pattern already used elsewhere in the file. Not fixed, logged only.
- **Reconsider GeoJSON export's value** — GeoJSON export (shipped early, v0.5.x-0.6.x era) exports full footprint polygons via Leaflet's toGeoJSON() plus catalog properties (id, label, shape, vendor, role, dimensions, rotation, buffer, color, intentional_buffer_overlap). Confirmed via read-only check: this does NOT satisfy backlog item #8 (Coordinate export — per-object lat/lng for logistics/aviation) — GeoJSON gives polygon vertices, not a per-object center coordinate; a consumer would need to derive a centroid themselves. The tool already tracks each object's center internally as o.latlng (used in Save Plan) but does not currently expose it via GeoJSON export. Origin unclear: no specific developer request for GeoJSON export was found in this project's session history; it appears to have shipped as a default 'mapping tools should support an open interchange format' addition rather than from a stated user need. Worth reconsidering whether GeoJSON export earns its place as a real deliverable, or whether it should be replaced/merged with a proper implementation of item #8. Not fixed here, not scheduled.
- **Native dialog wording — CONFIRM:/NOTICE: prefixes, may revise** — All native `confirm()`/`alert()` dialogs now show a `CONFIRM:`/`NOTICE:` prefix (shipped **be54a46**) since the browser's own dialog chrome ("This page says") cannot be styled by the app. Developer flagged this as a first pass, may want different wording later. If dialog styling control becomes a priority, the real fix is replacing native `confirm()`/`alert()` with a custom-built app dialog (same category of work as the Start Here modal) — not scheduled, logged for reference only.
- **Map click with nothing armed gives no feedback + repeat-click placement question** — Testing surfaced that clicking the empty map while no tent is armed currently does nothing silently (`placingMode` false → early return in the map click handler) rather than showing any message. Confirmed via read-only check that the existing `NOTICE: Select a tent model first` alert inside `startPlacing()` is **UNREACHABLE** via any current UI path (tent card click and the `P` shortcut both only call `startPlacing()` when a tent is already selected) — this is pre-existing dead code, not something this session broke. **Repeat-click half — RESOLVED/superseded** by continuous catalog placement (redesign Step 3, `64d354f`); the history/blame investigation is moot. (Record of the earlier investigation: developer stated from direct memory that repeat-click placement worked in the past; a then-current read-only check found one-shot disarm after each place, covering only that session's diffs, not prior history; the `P` shortcut re-armed without reselecting the card.) Nothing-armed-no-feedback half and the unreachable NOTICE dead-code observation stand unchanged. Not scheduled.
- **Role selector redesign — mimic Placed-list row styling, not just relocate** — Step 3's original plan only relocated the existing role block (label, full-width dropdown, add-custom-role input+button, manage-roles panel) as-is into the Vendor section. Developer clarified mid-session that the actual intent is a full visual redesign to match the compact, inline style of a Placed-list row (color dot, name, dimensions, single small dropdown — no separate label line, no persistent add/manage chrome), not a stacked full-width block. Open questions not yet resolved: whether Add-custom-role becomes a small '+' revealing an inline input, whether Manage Roles becomes an icon/popover rather than a persistent expandable panel, and whether the whole block sits below the tent list or directly on/with the currently-armed tent card. **PARKED — pick up next session.** Step 3's original DOM-relocation-only plan (armed-window visibility risk noted, reset-after-place + stale-sync-removal ordering already worked out) remains valid groundwork but is insufficient on its own; this redesign work sits on top of it, not instead of it.
- **Structure bucket for equipment — name TBD ('utility' vs 'equipment')** — Step 2 tagged the WS Generator `structure:'soft-sided'` as a documented compromise (see its provenance string, commit **49df1b9**). A third structure bucket for non-shelter gear is the likely eventual fix; candidate names `'utility'` or `'equipment'`, exact name deliberately undecided. Water/hygiene systems would also fit this bucket but are excluded from tool scope entirely. Not scheduled.
- **Utilities-exclusion disclaimer** — **SHIPPED** with redesign Step 5 (ⓘ on Placed totals). Wording now: utilities (water, hygiene, waste) excluded — account separately. The earlier locked **"for now"** phrasing is **SUPERSEDED** (2026-08-12 redesign close-out): backlog **#5** Utilities overlay is **CLOSED/rejected**; calculator-suite integration remains the path for utilities logistics. (Power omitted from the exclusion list because the Generator is a placeable Power-tab footprint that counts in totals.)
- **Generator relocation out of Western Shelter grouping** — **SHIPPED** (redesign Step 1, `e9e25c4`; Generator now under the **Power** tab). Rationale on record: the 70 kVA Generator sat under Western Shelter because that's how it was purchased — procurement trivia, wrong for a planning tool; it serves any vendor's shelters. Relocation to an equipment/utility grouping (likely a pseudo-vendor tab or equivalent) was a UI/structure change, sequenced with the vendor-area redesign (tabs-vs-dropdown, card work) where vendor grouping was already being reshaped. Cross-reference: Structure bucket for equipment — name TBD (above).
- **Vendor tabs (9) wrap** — Catalog tabs are **nine** (eight vendors + **Power** pseudo-vendor). Two-line wrap is the **accepted interim** per locked redesign decision A (tabs stay; wrapped rows OK). Not scheduled for further change unless a future vendor-area redesign revisits tabs-vs-dropdown.
- **Extended-catalog toggle activation** — Control `#extended-catalog-wrap` / `#chk-extended-catalog` ships hidden (`display:none` by design; intentional, not dead code — Decisions 2026-08-11). Session-only state (`showExtendedCatalog`, not localStorage). **No runtime activation** (no URL param). To reveal: a controlled future commit that removes `display:none` on `#extended-catalog-wrap`, through the full plan/build/audit/visual workflow. Not scheduled.

- **Placed-list two-state snap expand** — Chevron on the Placed header toggling default **220px** ↔ expanded (~**60%** of sidebar) for post-build refinement. **ABSORBS/supersedes** the old "Collapsible placed list" entry. Free-drag height slider considered and **rejected** (precision-drag failure modes for stressed users). Not designed, not scheduled.
- **Card display labeling pass** — Catalog cards show bed numbers with no unit label (e.g. `20'×32.5' · 10` — 10 of what?); Custom objects' placed-row shows Role positioned like Vendor, unlabeled. One future pass covers both. Not scheduled.
- **Buffer-edit gap** — No visible way to add/edit a clearance buffer on an already-placed object. Logged as a bug/needed fix. Not scheduled.
- **Catalog snap-attach feedback loss** — Since continuous placement (redesign Step 3), the transient "Attached to…" message no longer fires on catalog snap-assisted placements (`postMode` path is Custom-only). Minor feedback loss, audit-flagged (informational). Not scheduled.
- **Custom beds is single-value** — Catalog-style ranges ("6 to 10") are not supported in the Custom Size beds field; revisit if field use demands (additive). Not scheduled.
- **Role-label 48px min-edge gate** — Gate measures the **shorter** footprint edge, but on-map role text now runs along the **long** axis (Step 4 amendment); may hide labels on narrow-but-long objects where text would fit lengthwise. Watch item from Step 4. Not scheduled.
- **PSMT_Session_Handoff.md** — Committed `3fa2b7d` as a point-in-time Overseer continuity document. **Superseded by these Notes wherever they conflict** — Notes are authoritative for current decisions and backlog.


---

## Decisions

- **2026-08-17 — Fit View removed; fit-for-print question CLOSED as answered; @page landscape adopted (commit 8c048a8, print consolidation commit 2).**

  **CONTEXT:** Commit 2 of the approved 3-commit print/export consolidation. Mid-pass, the developer reopened the Fit View question (his call, overriding the prior do-not-relitigate note). A rework was built and audited: paper-frame fit (Letter-derived constants), meters/pixel zoom math, no zoom-20 floor per developer decision (full site visibility wins over labels; zoom out only as far as site size requires), header relocation after Measure. It failed in developer testing twice: portrait constants printed clipped (browser UA margins made the real print box narrower than the assumed 796px); landscape constants then clipped the SCREEN vertically (wider frame raised zoom; screen map is shorter than the paper frame).

  **DIAGNOSIS (on record so it is not re-derived):** one zoom cannot serve two differently-shaped viewports. A paper-correct fit can overflow the screen and vice versa. Candidate fixes existed (dual constraint min(zoom_paper, zoom_screen); screen-only fit; paper-shaped WYSIWYG map) but all add complexity to a button that manual framing demonstrably beats.

  **DECISION:** Fit View REMOVED entirely (button, printFitToPage, getPlacedBounds, fit helpers, FIT_VIEW_* constants, toasts, zoomSnap handling — all grepped to zero). The fit-for-print open design question (logged in the 2026-08-14 handoff §6) is CLOSED AS ANSWERED, not deferred: the screen-vs-paper mismatch is structural. Do not relitigate without new information (e.g. a product-rule change to a paper-shaped on-screen map).

  **KEPT:** @page rule — size letter LANDSCAPE, margin 6px 10px — making the print page box deterministic; browser-default margins previously caused unpredictable print clipping. Landscape chosen as the default because map layouts are typically wide ("printing a map in landscape is logical"); the print dialog can still override. Known limitation: Safari honors @page size only from 18.2+. Also kept: global beforeprint/afterprint hooks (scale/strip refresh, invalidateSize, rotate-handle clear/restore gated on print media ending with 2s fallback), delete-handle print CSS, commit-1 strip/totals.

  **AUDIT TRAIL:** three independent audits this pass — first FAILED (out-of-scope #operation-name title rewrite; zoomSnap restore not exception-safe; stale meta measure) and was fixed by amendment; second passed the fit build; third passed the removal. Developer visual test 5/5 (header clean, Plan section clean, landscape print correct, no handles on paper with restore after dialog, Esri attribution + scale visible).

  **STATUS:** Commit 2 COMPLETE (8c048a8). Commit 3 (Export PDF removal + Export GeoJSON button + docs wrap) is next per the approved plan.

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
- **2026-06-10 — Quickstart PDF retired permanently.** `VPC Mapping Tool - Quickstart.pdf` has been removed from the project. **`Portable-Solution-Site-Mapping-Tool-Quickstart.html`** is the sole quickstart source going forward; no PDF will be regenerated.

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

- **2026-08-08 — Tier C — header/sidebar/mode-display UX: decided and locked.**

  **RECONCILIATION:** The 2026-06-26 decision to retain `#mode-display` "for snap feedback (pick-anchor, snap-failed, attached)" was written for the dropdown-based snap design, superseded three days later by ambient drag-snap. Verified this session (read-only Cursor check): ambient snap's actual shipped messages are "Snapped to X (face)" and "Moved X" (`endObjectDrag`) — these are one-off confirmations, not ongoing state. "pick-anchor" and "snap-failed" do not exist in the shipped design. A legacy "Attached to X (face)" message still exists in code but only behind the `#snap-to-selected` checkbox, which is `display:none` with no code path to check it — confirmed fully inert (dead code, not user-reachable). No conflict between the 2026-06-26 rationale and removing `#mode-display`.

  **FOUR DECISIONS LOCKED THIS SESSION (design only — NOT YET BUILT):**

  1. **Ongoing state** (placement-armed, Measure Mode, selection) moves to a map-floating readout, top-left, near the Leaflet zoom control. Confirmed via read-only space audit: top-left is the only open map corner (top-right has the layer control; bottom-right is already crowded with cursor-position readout, overlap pill, attribution, version badge; bottom-left has the scale control).

  2. **Idle/instructional message and item 10a/14 ("How to use" icon+modal) are MERGED** into a single persistent **Start Here** button (not a one-time popup) — always available, not just on first open. Content: succinct, top 2-3 tasks only, oriented around getting a user productive fast (design principle: "people don't read"). This supersedes the original 10a/14 hover-preview-modal leaning.

  3. **Start Here explicitly COEXISTS with item 4 (point-of-action tooltips)** — different jobs: Start Here is upfront orientation, item 4 is in-the-moment guidance during a task.

  4. **Start Here is placed in the HEADER**, immediately left of the address/search bar (search shifts right to accommodate). `#mode-display` is **REMOVED ENTIRELY** (not just decluttered) — once decisions 1, 2, and the one-off-confirmation toast split (below) are all built, nothing remains for it to display.

  5. **One-off confirmations** (Snapped/Attached/Moved/Undo/Redo/Save/exports/buffer-scale-presets/delete-clear/search-fallback/autosave-failures) split into two toast treatments: spatial ones (Snapped/Attached/Moved) anchored near the object/snap face on the map, fading; action-triggered ones (Save/Undo/Print Fit/exports/etc.) anchored near the triggering button, fading.

  **STATUS:** All four leaning directions from the 2026-07-07 entry are now **DECIDED** by the developer. Nothing has been built. Next step per project workflow is an implementation plan (read-only investigation → plan → developer authorization → build → audit → visual test → commit) — not yet started.

  **PARKED ITEMS** (not part of Tier C, logged for later, not scheduled):
  - Legacy `#snap-to-selected` checkbox (line ~427) and its associated dead "Attached to X (face)" message (map-click handler, ~line 2061) — confirmed inert this session. Eventual removal intent (checkbox, hint text, and the dead message code path) noted per developer recollection but **NOT scheduled**.
  - Animated "how to use" video, Cursor-generated, dual-purpose for in-app onboarding and in-person demos — new scope, not designed, not scheduled.
  - Tablet mode (feature backlog #1) reconfirmed **OUT of scope** for the current work — not being addressed at this time.

- **2026-08-10 — Tier C Step 1 — toast system shipped; scope refined during build (b1fb43b).**

  Step 1 of the 2026-08-08 Tier C decisions (toast infrastructure, one-off confirmation migration) is SHIPPED and COMMITTED (b1fb43b). During build, scope was refined beyond the original plan based on developer review of visual/UX testing:

  - Rotation angle is already visible in the object's persistent info tooltip (confirmed via screenshot review) — the planned "Rotation updated" toast was dropped as redundant, per original Decision 5 intent (visible feedback needs no additional text).
  - "Moved X" dropped as redundant with visible motion (as originally planned).
  - Undo, Redo, "Plan saved" (Save Plan), and "Plan loaded" (Open Plan, non-restore path) toasts were ALSO dropped after developer review: Undo/Redo toasts just repeated the button's own label; Open Plan already has an overwrite-warning dialog carrying the weight of the action; Save Plan's toast redundancy is a symptom of a separate, larger gap (no save-location control — logged below).
  - "Snapped to X (face)" KEPT as a spatial toast (not dropped) — confirmed via read-only Cursor check that the current ambient snap engine only supports single-anchor/single-face snapping (findNearestSnapCandidate returns one best candidate, not a list), so multi-anchor tight-spaces ambiguity does not currently exist, but the toast still adds real info (which object/face) not always obvious by eye in a cluster.
  - Spatial toast duration set to 2200ms (down from initial 2800ms) per developer visual test. Action toast duration (2800ms) left UNCHANGED — explicitly flagged by developer for a future review pass across all remaining action toasts, not decided now.

  **NEW BACKLOG ITEM LOGGED (not scheduled):** Save Plan location picker — let the user choose where a plan saves instead of automatic Downloads-folder behavior. Raised because it would resolve the Save Plan toast redundancy at the root rather than needing a toast workaround. Separate scope from Tier C; not designed, not scheduled.

  Audited (read-only, separate Auditor session, Ask mode): scope, overlap invariant, autosave invariant (specifically confirmed deleteObj/clearAll fire the toast strictly after existing save/mutation logic), no stray state, no unrequested features. All pass. Developer visual-tested before commit.

  **REMAINING TIER C STEPS NOT STARTED:** Step 3 (map-floating ongoing-state readout), Step 4 (Start Here button + sidebar How-to removal), Step 5 (remove #mode-display entirely).

- **2026-08-10 — Tier C Step 3 — map-floating readout shipped (b66ee21); new items logged.**

  Step 3 of the 2026-08-08 Tier C decisions (map-floating ongoing-state readout) is SHIPPED and COMMITTED (b66ee21). Design sub-decisions made during this step:

  - Position: right of zoom control (top:10px; left:54px), not below — developer preference to avoid the readout getting visually lost.
  - Measure Mode duplication: ACCEPTED for now. The readout shows "Measure Mode"/"Area Measure Mode" even though #measure-strip already carries live step detail. Developer rationale: one reliable place for a tired/stressed user to check what's happening; easy to trim later if it feels redundant in practice.
  - Mode-badge click-to-exit: NOT rebuilt. The old #mode-display had an undiscovered click-to-exit affordance (clicking the status text called resetViewMode(), same as Esc) — developer was unaware it existed, confirming it wasn't a relied-upon feature. Esc remains the only way to exit a mode; the new readout has no click handler.
  - Selected-object wording unified to "Selected {label} — drag to move" (previously two slightly different strings for map-click vs list-row select).

  **NEW IDEA LOGGED (not designed, not scheduled):** a click-to-see-a-list-of-modes-and-choose interaction, raised by developer during the click-to-exit discussion. Explicitly framed as part of the larger intent behind this whole overhaul — simplifying UX/UI and making the tool more intuitive — not a small tweak. Worth revisiting as its own design discussion, separate from Tier C.

  **NEW BUG LOGGED (not fixed here, pre-existing, found during Step 3 visual test):** #measure-strip (the "Area points: N. Click Finish Area to calculate." panel with Finish Area/Clear, shown during Area Measure Mode) visually crowds/partially obscures the map layer-stack icon. Not caused by Step 3. Needs repositioning (developer suggestion: center more under the Measure button). Flag for a discrete future fix, not bundled into Tier C.

  Audited (read-only, separate Auditor session, Ask mode): scope, trigger coverage, wording unification, non-interactivity, no map interference, toast/overlap/autosave/snap surfaces untouched. All pass. Developer visual-tested: 5/5 smoke-test items pass (readout placement clear of zoom control at tested zoom levels, unified Selected text confirmed both paths, Measure/Area Measure Mode show correctly, Esc clears readout, clicking readout does nothing).

  **REMAINING TIER C STEPS NOT STARTED:** Step 4 (Start Here button + sidebar How-to removal + search-bar reflow), Step 5 (remove #mode-display entirely).

- **2026-08-10 — Tier C Step 4 — Start Here modal shipped (802c1b3).**

  Step 4 of the 2026-08-08 Tier C decisions (Start Here button + sidebar How-to removal + search-bar reflow) is SHIPPED and COMMITTED (802c1b3). Design sub-decisions made during this step:

  - Panel UX: MODAL, not popover. Developer rationale: a modal forces a clean break (nothing else visible/competing), better suited to "people don't read" — a popover is too easy to dismiss accidentally and competes for attention with what's behind it.
  - Content: three provisional steps (pick a structure → arrange it → check for overlap), explicitly marked placeholder in code — developer expects this copy to be revised once the rest of the tool's revisions are complete. Do not treat this copy as final.
  - Persistence: none. Opens fully every click — not a one-time onboarding popup, consistent with the original Tier C Decision 2 (idle-instructional message merged into persistent Start Here, not a first-open-only popover).

  Audited (read-only, separate Auditor session, Ask mode): scope, modal independence (not a reuse of any existing dialog), modal behavior (all three close paths work, Esc isolated from resetViewMode), content placeholder present and marked, sidebar removal completeness (no orphaned STORAGE_KEY_HOWTO or IDs), all other surfaces (#mode-display, #map-state-readout, toasts, item 4 tooltips, overlap, autosave, snap-drag) untouched. All pass. Developer visual-tested: 6/6 smoke-test items pass (header reflow clean, modal opens with 3 steps, all three close paths work, active mode survives modal open/close via Esc, sidebar How-to fully gone, modal reopens on repeat clicks — not one-time).

  **REMAINING TIER C STEPS NOT STARTED:** Step 5 (remove #mode-display entirely) — this is the final step; Steps 1, 3, and 4 are complete and verified as its prerequisites.

- **2026-08-10 — Tier C COMPLETE — Step 5 shipped (77762fb); full header/sidebar/mode-display rework closed out.**

  Step 5 of the 2026-08-08 Tier C decisions (#mode-display removal) is SHIPPED and COMMITTED (77762fb) — the final step. This closes out the entire Tier C effort: all five original decisions (map-floating ongoing state, Start Here merge, Start Here coexists with item 4, header placement + #mode-display removal, toast split) are now fully built, audited, and developer-verified across four commits (b1fb43b, b66ee21, 802c1b3, 77762fb).

  One medium audit finding, resolved by decision not code: the legacy "Attached to X (face)" message (dead code behind the already-inert #snap-to-selected checkbox) now has no UI surface if ever reached. Developer decided to leave as-is rather than patch — will be addressed in an upcoming dead-code sweep instead.

  **NEW BUG LOGGED (not fixed here, pre-existing, confirmed via read-only check that resetViewMode() is byte-identical before/after this diff — not introduced by Step 5):** Esc clears the active mode but does NOT clear object selection. selectedObjectId, the rotate/delete handles (syncRotateHandle), and the placed-list row highlight all persist after Esc. Today, selection only clears via: deleting the selected object, Clear All, Undo/Redo, loading a plan, or selecting a different object. A blank map click does NOT deselect either. Flagged as a usability inconsistency worth a future fix, not scheduled.

  **SIBLING (logged 2026-08-12, catalog/card redesign Step 1 docs):** Click-away deselect — blank map click does not deselect; log as a sibling item of the existing Esc-doesn't-clear-selection entry.

  Audited (read-only, separate Auditor session, Ask mode): scope (deletions only), setMode integrity across all ~13 call sites, initHeaderTruncateTitles removal verified single-purpose (no other logic lost), CSS cleanup confirmed (.mode-badge classes had no other consumer), zero orphaned references across four grepped identifiers. All pass. Developer visual-tested: 5/5 smoke-test items pass (map border classes still correct for place/measure modes, floating readout still shows correct text for all ongoing states, Esc clears mode/border/readout, header layout clean with no trace of old status bar).

- **2026-08-10 — Setup section dissolved — contents relocated (design decided, not yet built).**

  Following a read-only comparison of `Old/VPC_UX_Refactor.md` against the current build (see prior 2026-08-10 entries), and a discussion of Setup's three unrelated functions, the developer decided Setup does NOT survive as a named sidebar section. Its three contents are redistributed:

  1. **OPERATION NAME** → reframed as **"SCENARIO NAME"** (or similar; exact wording TBD). Developer's actual use case: naming/switching between different what-if layouts for the same site (e.g. "West Lawn, 40 bed, BlueMed-WS" vs. a parking-lot alternative), not print metadata. Groups with SAVE/OPEN in the Plan section — not a standalone field — because naming a scenario and saving/loading it are the same activity. The "Print Metadata" framing is dropped entirely; it never communicated anything meaningful to the user.

  2. **PREFER CURRENT MAP AREA** → relocates to sit near the address/search bar, since it's a search-behavior toggle (biases geocoding results toward the current map view) and has no relationship to Setup's other former contents.

  3. **SCALE PRESETS** → **CONFIRMED BROKEN**, more severely than previously recorded. Developer testing found only the 1:500 preset works; 1:100/1:150/1:200 exceed the tile provider's available zoom and produce a BLANK MAP ("Map data not yet available") rather than failing silently or being disabled. No active/selected visual state shows on any preset once clicked, working or not. This sharpens existing backlog item **19** (zoom/scale presets buggy) — item 19's note in the Deferred/sequenced table updated to include this specific failure mode. **NOT fixed now.** Developer's intended future direction (once item 19 is fixed, not before): relocate as a small dropdown near the map zoom control, with a corrected set of presets that are actually reachable at the tile provider's max zoom. This is a stated future direction, not an authorized design — placement/exact presets to be finalized when item 19 is actually worked.

  **RELATED — Save/Open vs. Export, discussed same session:** developer confirmed Save/Open (JSON) stays a distinct round-trip pair (the working file you load back into PSMT) and is NOT merged with Export. Export (GeoJSON/PDF, already a single dropdown with format choice) remains separate — one-way outputs, not round-trippable. GeoJSON export's own value is separately logged for reconsideration (see Deferred/discussed entry, this session, commit d51fbeb) — unrelated to this grouping decision.

  **STATUS:** Design decided. Nothing built. This informs the upcoming item **10b** reorder (sidebar section order) — Setup no longer exists as a section to place; Plan gains a scenario-name field; search bar gains a new checkbox; scale presets remain physically where they are (unmoved) pending item 19.

- **2026-08-10 — Role/Label consolidation + Vendor-section role relocation (design decided, not yet built).**

  Following an extended discussion (including a read-only Cursor design review that raised valid technical objections, addressed below), the developer settled on the following design for role and label handling. Nothing built yet.

  **BACKGROUND / WHAT WAS CONSIDERED AND REJECTED:** The developer initially wanted to reduce UI clutter by merging label and role into a single free-text field per object. Cursor's design review correctly flagged that this would break zone/capacity tallying, since a single free-text field cannot both group same-function objects together (e.g. multiple "ICU" tents counting as one category) AND give each object a unique, distinguishable name (e.g. "ICU West" vs "ICU East") — those are mutually exclusive outcomes for one plain-text value, not a technical limitation to solve, but a real tradeoff. This was clarified through discussion and the true merge was **ABANDONED**.

  **FINAL DECISION** — label and role remain two separate stored properties, **UNCHANGED IN MECHANISM**, but role becomes the sole user-facing customization point:

  1. **LABEL** — becomes **LOCKED / NON-EDITABLE** in the UI. Always the vendor/model default string (e.g. "BLU-MED 2032.5"). The stored property and its existing behavior are unchanged; only the editable text input is removed from the UI. This is reversible — re-adding an editable label field later is normal UI work, not a schema reversal, if ever wanted. **SHIPPED (Step 2):** `#obj-label` + note removed; catalog place always `` `${vendor} ${selectedTent.name}` ``; placed-list name is read-only `formatObjectIdentity` text (no blur-edit). `#custom-label` unchanged (point 9 still open).

  2. **ROLE** — mechanically **UNCHANGED** from today (same dropdown, same built-in options: Triage/Ward/ICU/Pharmacy/Support/Morgue, same Custom free-text option, same shared-list/localStorage persistence via `psmt-custom-roles`). Custom role text can serve as either a reusable shared category (type "ICU" on multiple tents to group them) or a unique instance name (type "ICU West" for one specific tent) — this is the user's choice per-tent, not a system distinction; the tool has no way to detect that "ICU West" is "a kind of ICU" without exact string match.

  3. **ROLE SELECTOR RELOCATES** from Label & Style into the **VENDOR** section — physically in the box where a tent model is chosen, so role is decided at the moment of placement, not as a separate pre-set-elsewhere step. Selector is **OPTIONAL** (defaults to "—") and **RESETS** after each placement (does not persist as a sticky default across multiple placements of the same or different models).

  4. **CUSTOM ROLE CREATE + MANAGE/DELETE** relocate together (not split) from Label & Style's "Manage roles" panel into the same Vendor-section selector. Built-in roles remain protected from deletion; an object using a since-deleted custom role keeps that role string unchanged (orphaned, not broken) — same as today.

  5. **IDENTITY TEXT SHOWN AS "LABEL — ROLE"** (combined), everywhere the app currently shows label alone, **WHEN** role is set to something other than "—": delete confirmations, "Selected X — drag to move" readout, snap toasts, hover tooltip, placed-list row, PDF object lines. Example: "Delete BLU-MED 2032.5 — Triage?" instead of just "Delete BLU-MED 2032.5?". When role is still "—", these surfaces show label alone (unchanged from today). This resolves the earlier concern about role-only messages being ambiguous across multiple same-role objects (e.g. "Delete Triage?" not knowing which Triage tent) — vendor/model in the combined string always disambiguates which physical object. **SHIPPED (Step 2) for identity surfaces via `formatObjectIdentity`:** delete confirms (map ✕ / Shift+click / list), Selected readout (map + list), snap toast, placed-list name, delete/role `aria-label`s, PDF object lines (role segment conditional). **Hover tooltip intentionally unchanged** this step (point 7 — kept as bold label + separate Role line). Legacy "Attached to…" path untouched (dead-code sweep). Role UI still in Label & Style (Step 3 relocates).

  6. **PERMANENT ROLE/LABEL TEXT ON MAP FOOTPRINT** (item **#8**) — the combined "Label — Role" string (or Label alone if role is "—") displays permanently on the object's footprint on the map, not just in the hover tooltip. **CONFIRMED NEW WORK** (no permanent-tooltip-on-structure pattern exists today). Open technical questions flagged by Cursor's design review, **NOT YET ANSWERED**, to resolve when this is actually built: rotation (a normal divIcon/tooltip does not rotate with the polygon — misalignment likely without extra handling), sizing/truncation on small footprints (e.g. Vestibule) with longer role strings, visual density when adjacent tents both have permanent labels, z-index vs existing handles/tooltips/measure permanent tooltips, and lifecycle sync on every `drawObject` call (place, drag, rotate, undo, load) matching the existing handle-sync pattern.

  7. **HOVER TOOLTIP ON MAP OBJECTS STAYS AS-IS** — kept deliberately even though the combined "Label — Role" text (once #6 is built) will duplicate much of it. Developer's stated reasoning: being able to roll over any object and immediately see role, dimensions, and vendor without hunting through the placed list is a genuine, separate convenience — not just leftover redundancy.

  8. **LABEL & STYLE SECTION** becomes **STYLE-ONLY** once role/label editing and role management both leave — narrows to Options (color, opacity, rotation, clearance buffer + presets, apply-to-all). Its name is likely misleading once labels leave but renaming/redesign is explicitly **DEFERRED** to later, not decided tonight.

  9. **CUSTOM SIZE'S SEPARATE LABEL FIELD** (`#custom-label`) — flagged by Cursor's design review as an inconsistency (catalog path loses its editable label; Custom Size still has one) but **NOT YET DECIDED** — open question for a future session, not resolved tonight.

  10. **`setSelectedObject`'s EXISTING SYNC BEHAVIOR** (copying `obj.role` into the Label & Style role dropdown on selection) is **OBSOLETE** once role moves to the Vendor section and resets-after-placement — this old sync must be removed, not carried over, when built. This was identified as a technical snag during design discussion and resolved via decision #11 below rather than by patching the old sync.

  11. **NEW: MAP-CLICK SELECTION NOW SCROLLS THE PLACED LIST** to the selected object's row (new work — confirmed via read-only check that no such scroll-to-selection exists today in either direction). This closes the **NAVIGATION half** of backlog item **2/18** ("Selecting a placed-list row should fly-to AND highlight the object on the map"): list-row click → `map.panTo` was **CONFIRMED ALREADY BUILT**; map-click → list-scroll was the missing reverse. **Does NOT close 2/18 fully** — the **HIGHLIGHT half** (visual highlight on the selected object's footprint) remains open and is tracked separately under Immediate feature backlog **Selected object footprint highlight**. No reordering of the underlying `objects` array occurs — purely a scroll-position change, chosen specifically over an earlier "move selected row to top" idea after a read-only check surfaced real side effects that idea would have caused: undo/redo snapshot ambiguity (would every selection become an undo step or not), and unintended changes to Save Plan/GeoJSON/PDF export ordering and map z-order, all of which currently follow strict `objects` array order. Scrolling-only avoids all of those. **SHIPPED (Step 1 of Role/Label build — navigation only):** `scrollPlacedListToObject(id)` mirrors overlap-pill `[data-obj-id]` + `scrollIntoView({ block: 'nearest', behavior: 'smooth' })`; called after `updateList()` from map `bindSelect` and from `placeObject` (new placement also scrolls into view). List-row `panTo` unchanged. No `objects[]` reorder.

  **STATUS (refreshed 2026-08-12 — catalog/card redesign COMPLETE):** Points **1**, **5**, **11** shipped (Role/Label Steps 1–2). Point **3**'s reset-after-place **SUPERSEDED** by sticky per-card roles (redesign Step 2). Points **2–4**'s relocate-to-Vendor block **SUPERSEDED** by locked redesign decisions **A/B** as built (per-card dropdowns + Catalog ⚙ manage; Label & Style role chrome removed). Point **6** (on-map text) **SHIPPED** as redesign Step 4 — **role-only** (not "Label — Role"); deliberate divergence per locked decision **D**. Point **7** (hover tooltip as-is) stands. Point **8** (Label & Style rename) remains deferred. Point **9** (`#custom-label`) remains **OPEN**. Point **10** obsolete sync removed with shared `#obj-role`. Schema still `label`/`role` separate; additive `customBeds` arrived later (Step 5b-2), unrelated to this entry's original scope.

- **2026-08-10 — README/Quickstart doc sync deliberately batched, not per-change.**

  Multiple sidebar redesign changes are landing in quick succession tonight (Setup dissolution shipped in 487c777; Role/Label consolidation and a Prefer-current-map-area-related multi-match search picker rebuild both still pending). Developer decided **NOT** to update `README.md` and `Portable-Solution-Site-Mapping-Tool-Quickstart.html` after each individual change, since the sidebar's shape is still actively moving and updating operator-facing docs piecemeal would mean rewriting the same sections multiple times as things keep shifting.

  **DECISION:** README/Quickstart sync happens as **ONE batched pass**, done once the sidebar redesign work has settled — treated as a hard requirement before the **NEXT** version bump (same discipline as the 1.1.0-dev and 1.2.0-dev bumps, which required README/Quickstart/PROJECT_MAP sync in the same commit). This does **not** apply to `PSMT_Project_Notes.md` itself, which continues to be updated in the same commit as each code change, per existing project convention — only the operator-facing docs are being batched.

  Known stale references as of this entry: README/Quickstart still describe the Setup section (removed in 487c777) and will need that section's content removed/rewritten as part of the eventual batch.

  **STATUS (updated 2026-08-12 / 1.3.0-dev bump):** Batch **CLOSED** by the **1.3.0-dev** version bump — README, Quickstart, PROJECT_MAP, and Notes synced in that bump. The Setup-section and redesign operator-doc drift recorded above is cleared by that sync.

- **2026-08-11 — Catalog import from PSMT Data Transfer.json: doctrine and locked decisions (Step 0).**

  **CONTEXT:** Multi-step catalog import from repo-root `PSMT Data Transfer.json` into PSMT, following an approved master plan. Coder builds each step; a separate Auditor reviews each diff; then commit. This Step 0 entry locks import doctrine and decisions **before** any `TENT_DB` / digest / UI code changes. The transfer file's schema reflects the Comparison Tool (interior-focused); PSMT's emphasis is the opposite. Overview vendor/model counts corrected in Step 6 close-out (eight vendors; 20 standard-visible / 16 extended-hidden / 36 total).

  **1. DOCTRINE — Exterior-focused.** PSMT's job is "does it fit": the exterior footprint is the figure that must be exactly right. Interior space is secondary. This is the opposite emphasis from the Comparison Tool, whose schema the transfer file reflects.

  **2. IMPORT SCOPE.** All **32** transfer products enter the data layer, tier-tagged. **STANDARD** (visible) = the then-current **16** `TENT_DB` models + **4** hard-sided newcomers (Craftsmen 8-Bed ICU Trailer, FORTS Model 38, WillScot Patient Unit, WillScot Staff Unit) — now **20** standard-visible. **EXTENDED** (hidden) = **16** transfer-only soft-sided products. Architecture is flag-not-branch: a working but hidden extended-catalog toggle **was built** in Step 3 (`f68a276`; intentional, documented — not dead code); remains `display:none` pending controlled activation.

  **3. GEOMETRY AUTHORITY.** Existing `TENT_DB` footprints remain authoritative for all **12** matched models. Transfer dimensions never overwrite certified geometry.

  **4. RESOLVED CONFLICTS.**
  - **(a) HDT Base-X Dome (8D36):** **31'×37'** bbox stands. "Clear span" applies to the **31'** width only. No separate exterior published for this model. Flop-out is buffer territory.
  - **(b) HDT 305:** **20.5'×25'** stands. **20'6"** is cover/exterior width on the sides where the liner/cover gap exists; end walls have no gap. **25'** confirmed by diagram side view.

  **5. HARD-SIDED DECISIONS.**
  - **(a) Craftsmen 8-Bed ICU Trailer:** maps **EXPANDED** **53'×22.5'**. Closed **53'×8.5'** preserved in record for reference (unusable closed).
  - **(b) FORTS Model 38 beds:** ship as **"~2 to 3"** (derived/unconfirmed). Vendor designs units as grouped assemblies and does not break out single-unit capacity.
  - **(c) WillScot beds:** Patient Unit = **RANGE 6 to 10** (6 critical / 10 medical surge — both vendor-stated per PSC p.134; acuity-dependent capacity is a range, not an adjudication). Staff Unit = **null** beds (flex/support space).
  - **(d) WillScot placeable form:** ships as **TWO** placeable units, not one merged assembly. PSC states two separate buildings "intended to connect through a central hallway." Pairing intent is recorded in both units' notes; the planner arranges them (supports mixed deployments, e.g. hard-sided ICU + tented staff).
  - **(e) Elevated / ramp note (all three hard-sided vendors):** "elevated structure; ramp entrance required; ramp run is grade-dependent" — no ADA math or ratios in records.
  - **(f) Provenance (all four hard-sided models):** "Source: PSC, specs provided by another performer team; no OEM sheet or independent corroboration as of import." Fidelity: **unconfirmed**; STANDARD-visible accepted on that basis.

  **6. BED-TALLY CONVENTION** (for the future running-totals feature). Per-unit displays keep their markers (e.g. FORTS `"~2 to 3"`). Facility totals follow the Comparison Tool convention: mins add to mins, maxes add to maxes; any range unit makes the total a range; **NO tilde ever on totals**. Rationale: all bed numbers are manufacturer spec and inherently soft against clinical judgment (a spec-10 ward may run as 8, or 6 as ICU) — softness is universal, so totals are honest arithmetic over stated spec; per-unit provenance marks derivation softness only. (Pointer also on Immediate feature backlog Capacity **#3** design notes.)

  **7. VENDOR NAMES / COLORS.** Display/tab strings: **WillScot**, **FORTS**, **Craftsmen**. `VENDOR_COLORS` placeholders: Craftsmen teal, FORTS yellow-gold, WillScot magenta (exact hexes tuned at build). The vendor color scheme overall is **PARKED** for a future revisit — these are placeholders, not commitments.

  **8. GK2342 / GK2360 PRECEDENT (extended models).** Share GK1935's exact cut-corner geometry — **7'8"** exterior / **7'6"** interior clear-span convention, same shape class, larger bbox. Future fidelity = apply this recorded precedent, not a fresh investigation. Sheets SW-2342 / SW-2360 exist in the reference pack.

  **9. ZUMRO DISAMBIGUATION.** ZUMRO Interconnect ≠ ZUMRO External Airlock — different products, never merged.

  **10. RAMP-GEOMETRY note** (logged only, not designed). Ramps are directional, entrance-attached, grade-dependent; observed in multi-unit assembly field testing. A future ramp object likely wants grade-dependent run, not a fixed catalog footprint. Cross-referenced on Overhaul Confirmed-in-scope item **7** (doors/exits) — not Immediate feature backlog #7 (offline tiles).

  **11. FOLLOW-UP WORK LIST.** Never-audited rect models needing an eventual fidelity pass: BLU-MED 2032.5 / 2039 / Vestibule; Western Vestibule / Generator; DLX X-24 / X-32; ZUMRO 400 / 600 / Interconnect; HDT 305 — plus, when surfaced, all EXTENDED footprints. Hard-sided (Craftsmen 8-Bed ICU Trailer, FORTS Model 38, WillScot Patient / Staff): eventual OEM-sheet verification when sheets exist; PSC-primary / fidelity unconfirmed stands until then. Does **not** reopen the closed non-rect shape-fidelity audit (GK20, GK1935, ZUMRO Quad, X-HUB, 8D36 remain COMPLETE).

  **12. REPO POLICY.** `PSMT Data Transfer.json` is committed (provenance snapshot, ~44KB, not a runtime dependency). `PSMT Reference Materials/` PDFs stay uncommitted — folder added to `.gitignore`.

  **STATUS:** **COMPLETE.** Catalog import Steps **0–5** shipped on `psmt-overhaul`: `e97b900` (Step 0 doctrine), `49df1b9` (Step 2 schema metadata) + `cb7a852` (Step 2 follow-up docs), `f68a276` (Step 3 fail-closed tier filter + hidden toggle), `54910cc` (Step 4 hard-sided + 3 vendors), `2844ec5` (Step 5 sixteen extended models). Data layer holds **36** `TENT_DB` records: **20** `tier:'standard'` (visible) / **16** `tier:'extended'` (hidden). Extended-catalog toggle remains `display:none` pending a future controlled activation commit (see Deferred / discussed). **Process note (Step 4):** `VENDOR_SPECS_DIGEST.md` entered that step's diff unplanned, was audit-flagged, dispositioned as amend, and produced the standing rule that plans name every file — part of the import's record. This Step 6 Notes pass closes the import docs; no further import code steps remain.

- **2026-08-12 — Catalog/card redesign Step 1:** Sidebar **Vendor → Catalog**; ninth tab **Power** + `VENDOR_COLORS['Power']` `#4d5866`; Generator relocated Western Shelter → Power (`ws-generator-70kva` unchanged). Files: HTML, `VENDOR_SPECS_DIGEST.md`, `PROJECT_MAP.md`, this Notes (minimal). Card body / placement unchanged. Rollback `6e28b2b`.

- **2026-08-12 — Catalog/card redesign Step 2:** Two-line catalog cards (name + role select; `dims · beds`); sticky per-card roles (session); Custom… create-anywhere on card and placed-row selects; Catalog ⚙ manage-roles popover (Measure-style fixed); Label & Style role chrome removed (Options stay); ZUMRO Quad card dims `20'×29' 4-way hub`. Files: HTML, this Notes (minimal). Rollback `e9e25c4`.

- **2026-08-12 — Catalog/card redesign Step 3:** Continuous catalog placement (stay armed after place); readout ✕ / re-click armed card / Esc / click placed object disarm; Custom Size remains one-shot. Files: HTML, this Notes (minimal). Rollback `3f11f3e`.

- **2026-08-12 — Catalog/card redesign Step 4:** Zoom-gated on-map role text (role only; roleless/`—` = none). Knobs: `z >= 20`, min shorter-edge **48px**, text **rotates** with `angleDeg` and runs along the object's **long axis** when length > width (divIcon, centered). Hover tooltip untouched. Files: HTML, this Notes (minimal). Rollback `3fa2b7d`.

- **2026-08-12 — Catalog/card redesign Step 5:** Placed running totals (layout A under header; 220px unchanged). Beds mins→mins/maxes→maxes, ranges propagate, no tilde; `N sq ft (M w/ buffer)`; ⓘ utilities (water, hygiene, waste) excluded; catalog-miss line “N structures not counted”. Files: HTML, this Notes (minimal). Rollback `c39083a`.

- **2026-08-12 — Catalog/card redesign Step 5b-1:** Session-only bed total toggle on Placed beds line — `Beds (all): …` / `Beds (Ward/ICU): …` (exact role match; Triage excluded; default All). Uncounted line unchanged (no-bed-source only). Files: HTML, this Notes (minimal). Rollback `d2667a5`.

- **2026-08-12 — Catalog/card redesign Step 5b-2:** Custom Size optional `customBeds` (blank = uncounted; typed incl. 0 = bed source). Persists undo/Save/autosave; GeoJSON `custom_beds` when set; older plans load clean. Totals use resolveBedContribution; Ward/ICU filter after. Files: HTML, this Notes (minimal). Rollback `48bf376`.

- **2026-08-12 — Placed totals ⓘ on Placed header:** Appended bed-figures sentence to `#placed-totals-disclaimer` (“Bed figures are manufacturer recommendations; actual capacity varies with site-specific use.”) and relocated `#placed-totals-info` from the sq ft line to the Placed (N) header (before Clear All); hover + click-pin unchanged. Files: HTML, this Notes (minimal).

- **2026-08-12 — Catalog/card redesign Step 6:** Docs close-out — COMPLETE entry, backlog #1/#5 closures, tablet drop, new deferred items, Role/Label status refresh. Files: this Notes only (README/Quickstart batch closed later by **1.3.0-dev** bump). Rollback `3e4dedd`.

- **2026-08-12 — Catalog/card redesign COMPLETE + session decisions.**

  **CONTEXT:** Catalog/card redesign Steps **1–5b** shipped on `psmt-overhaul` this effort. This Step 6 docs close-out records completions, closures, and new logged items. Operator-facing README/Quickstart sync was still batched at Step 6 time; that batch is **CLOSED** by the **1.3.0-dev** bump.

  **a. Steps 3–5b shipped this session (summary):**
  - **Step 3** (`64d354f`): continuous catalog placement; disarm via readout ✕ / Esc / re-click armed card / click placed object; place-armed readout hint "✕ or Esc to stop"; Custom Size remains one-shot.
  - **Step 4** (`8bc0549` + long-axis Notes `c39083a`): zoom-gated on-map role text — `z >= 20`, min shorter-edge **48px**, text rotates with footprint and runs along the **long axis** when length > width; roleless/`—` = none; hover tooltip untouched.
  - **Step 5** (`d2667a5`): Placed running totals (layout A, 220px unchanged) — beds mins→mins/maxes→maxes (no tilde), `N sq ft (M w/ buffer)`, uncounted line for no bed source, ⓘ utilities disclaimer.
  - **Step 5b-1** (`48bf376`): session-only bed total toggle — `Beds (all): …` / `Beds (Ward/ICU): …`; exact-match Ward/ICU; **Triage excluded** pending clinical input; default All; role-filtered exclusions do not enter the uncounted line.
  - **Step 5b-2** (`3e4dedd`): Custom Size optional single-value beds; additive `customBeds` (plan/undo/autosave) / GeoJSON `custom_beds` when set; blank = uncounted; typed incl. 0 = bed source.

  Commit chain for the redesign code path also includes Steps 1–2: `e9e25c4` (Catalog/Power/Generator), `3f11f3e` (cards + sticky roles + ⚙).

  **b. Backlog #5 (Utilities overlay) — CLOSED/rejected.** Utilities are load-dependent calculated quantities, not fixed-footprint objects (a 25-bed hospital might need 2 or 10 water bladders). The estimator suite's Water and Power calculators must answer those questions first; a map overlay is likely never this tool's scope. The utilities disclaimer's **"for now"** wording was **removed** as a consequence (**SUPERSEDES** the earlier locked "for now" phrasing requirement). Calculator-suite integration (**v2.5+**) remains the path for utilities logistics — at suite level, not as a map overlay.

  **c. Tablet target — DROPPED.** Feature backlog **#1** (Tablet mode / sidebar hide) **CLOSED/rejected.** The sidebar is now a dense precision-target interface unsuited to touch; the walk-the-site use case is served by **PDF export**. Only revisit path: a possible view-only mode if field testing demands it. Roadmap wording trimmed (desktop install; tablet UX removed from the v1 gap list).

  **d. Ward/ICU counting-role list — flagged for clinical input.** Whether Triage counts as bed space, and whether the exact-match list needs broadening (Pre-Op / Post-Op, etc.) — resolve with field testing + clinical feedback. Cross-reference Overhaul item **9**'s existing clinical-input note (bed counts / ward↔ICU conversion).

  **e. Backward-compat working rule.** Old-plan loading is **not** a support target on this branch; backward-compat checks are dropped from the test protocol. The `customBeds` missing-field handling shipped and stands, but is **not** a compatibility commitment.

  **STATUS:** **COMPLETE.** Redesign Steps **1–5b** shipped; this entry is the docs close-out. Operator-facing README/Quickstart batch **CLOSED** by the **1.3.0-dev** bump.

- **2026-08-13 — Filenames hyphenated for web hosting:** App and Quickstart renamed to `Portable-Solution-Site-Mapping-Tool.html` and `Portable-Solution-Site-Mapping-Tool-Quickstart.html` (spaces break URLs); all tracked references updated.

---

## Doc maintenance

- Bump *Last updated* and version when `APP_META.version` changes in `Portable-Solution-Site-Mapping-Tool.html`.
- When `APP_META.version` changes, sync README, Quickstart, and this file together in the same commit.
- Keep **README.md**, **PSMT_Project_Notes.md**, **Portable-Solution-Site-Mapping-Tool-Quickstart.html**, and in-app tooltips in sync on each release.
- Shipped features: document in README changelog; remove from backlog here.
