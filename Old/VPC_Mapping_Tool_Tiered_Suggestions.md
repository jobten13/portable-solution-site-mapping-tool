# VPC Mapping Tool — Top 20 Tiered Suggestions

**Source:** Code review of v0.7.4  
**Purpose:** Functional improvements, UX/UI, bug fixes, dead-code cleanup, and code-quality refinements.  
**No implementation yet — suggestions only.**

---

## Top 20 (ranked by tier: 1 = highest priority)

| # | Tier | Item | Notes |
|---|------|------|------|
| 1 | 1 | **Polygon-level overlap detection** | Replace AABB (`getBounds().intersects()`) with polygon-vs-polygon (e.g. SAT or shape vertices). Rotated footprints can intersect on the map but report 0 overlaps. |
| 2 | 1 | **Editable label after placement** | Add inline editable label in each Placed list row (like role). Use `pushStateToUndo()` before change and `drawObject(o)` after so map tooltip stays in sync. |
| 3 | 1 | **Distance measure: start-point marker** | After first click in distance mode there is no on-map feedback. Add small `L.circleMarker` at `measureStart`; remove when line is drawn or `clearMeasure()` runs. |
| 4 | 1 | **Role set once in placeObject** | `placeObject` spreads `...extra` (includes role) then overwrites with `obj.role = ...`. Set role once for clarity and to avoid confusion. |
| 5 | 2 | **Custom label scope hint** | Add one line under Custom Label input: e.g. "Applied to next placement." |
| 6 | 2 | **Visual mode indicator on map** | Add subtle border (or class) on `#map` by mode (e.g. green for place, orange for measure). Toggle in `setMode()` / `resetViewMode()`. |
| 7 | 2 | **Search results: reduce layout shift** | `#search-results` appearing/disappearing reflows header. Reserve space or position absolutely under search input. |
| 8 | 2 | **Placed list visibility** | On short viewports Placed list is far down. Consider moving it higher or a fixed-height scrollable block at bottom. |
| 9 | 2 | **Clear All confirm text** | Change "Clear all placed tents?" to "Clear all placed objects?" for consistency with UI. |
| 10 | 2 | **Scale ratio after restore** | Call `updateScaleRatio()` after `restoreSession()` (and after any programmatic `setView`/`fitBounds`) so scale readout is correct. |
| 11 | 2 | **Programmatic PDF/PNG export** | Optional export path for sharing (separate from Print Fit). Handle CORS/blank tiles; fallback to summary + object list + "open plan for map." |
| 12 | 3 | **Remove unused `.place-btn` CSS** | Place on Map button was removed; style block is dead. |
| 13 | 3 | **Elongated-hexagon: remove or use** | `createGeoElongatedHexagon` and branches in `tentShapeBadge`, `dimStr`, `createShapeLayer`, tooltips are unreachable (no TENT_DB entry). Remove or add a tent and document. |
| 14 | 3 | **Single `map.on('mouseup')` handler** | Combine the two `map.on('mouseup', ...)` calls into one that calls both `endObjectDrag()` and `endRotateDrag()`. |
| 15 | 3 | **Version in one place** | Version is in HTML comment, `APP_META.version`, and static `#version-display`. Leave `#version-display` empty or "v—" and set only from `APP_META.version` at init. |
| 16 | 3 | **Move _suppressDeleteUntil off object** | Use module-level `let dragEndedAt = 0`; in click handler check `Date.now() < dragEndedAt + 250`. Stops polluting object model and avoids accidental serialization. |
| 17 | 3 | **Collapsible panel helper** | Extract `makeCollapsible(panelId, btnId, storageKey, labels)` (or similar) so Options ▾ and Setup ▾ don’t duplicate ~40 lines; reuse for future panels. |
| 18 | 4 | **Split single file (long-term)** | Consider separating CSS, map/placement, measure, search, save/load, UI into modules or files when adding more features. |
| 19 | 4 | **Named constants for magic numbers** | 250 ms (delete suppress), 500 ms (session debounce), etc. are already localized; keep naming consistent. |
| 20 | 4 | **State consolidation (if app grows)** | If the codebase grows, consider a single state object or small store for mode flags, undo, and objects. |

---

## Tier key

| Tier | Focus |
|------|--------|
| 1 | Correctness and core UX |
| 2 | UX polish and field workflow |
| 3 | Code hygiene and ghosts |
| 4 | Architecture and maintainability (optional) |

Implement in order: Top 20 #1–4 (Tier 1), then #5–11 (Tier 2), then #12–17 (Tier 3); #18–20 (Tier 4) when scaling or refactoring.
