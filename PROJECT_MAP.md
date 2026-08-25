# Portable Solution Site Mapping Tool — Project Map

Orientation document for developers and collaborators. Describes **what this project is** and **how it is organized**.

For **how to work on it** (read-only vs. authorized changes, scope discipline, catalog provenance, data-handling rules), see `.cursor/rules/` — especially `behavior.mdc`, `project-conventions.mdc`, and `data-handling.mdc`. This file does not duplicate those rules.

**Current version:** `1.4.0-dev` (`APP_META.version`, `lastUpdated` `2026-08-25` in `Portable-Solution-Site-Mapping-Tool.html`).

**Note:** Script section headers below mark **approximate** bands in the live HTML (~5,200 lines). Use search (`function name`) for authoritative locations — not contiguous line numbers.

---

## 1. Purpose & program context

### What the tool is

**Portable Solution Site Mapping Tool** is a browser-based site layout planner for emergency field hospitals and soft-sided shelter deployments. Users place vendor-accurate tent footprints on a real-world map at true scale, check spacing and overlaps, tag structures by functional role, and save or share layouts.

It is a **single HTML file** opened directly in a modern browser. No install, no build step, no backend.

### Who uses it

Primary users: **incident commanders** and **field coordinators** planning hospital expansion or emergency shelter layouts under time pressure.

### Problem it solves

Before physical setup, answer **“what fits where?”** on an actual site — with correct tent dimensions, rotation, clearance buffers, and a portable plan — without CAD or GIS expertise.

### Program context

This tool supports the **IMPACTS** project (**NDMS Modular/Convertible Capability Pilot**), **DHA-sponsored**, **UC Davis–implemented** — planning rapid hospital expansion with soft-sided shelter systems from multiple vendors. Catalog dimensions feed real emergency planning.

### Hosting context

Intended for **hospital use** and **government (USU/DHA-adjacent) hosting**. Layout artifacts (operation names, labels, coordinates) may be operationally sensitive. See `.cursor/rules/data-handling.mdc`.

---

## 2. File layout

### Root — active files

| Path | Purpose |
|------|---------|
| **`Portable-Solution-Site-Mapping-Tool.html`** | The application (~5,200 lines): HTML, CSS, JavaScript |
| **`README.md`** | Operator + developer reference: features, quick start, overlap behavior, autosave, changelog, backlog |
| **`PSMT_Project_Notes.md`** | Product roadmap, immediate backlog, architecture notes, doc maintenance |
| **`VENDOR_SPECS_DIGEST.md`** | Spec alignment audit: manufacturer source for each `TENT_DB` entry |
| **`Portable-Solution-Site-Mapping-Tool-Quickstart.html`** | Condensed field quickstart (sole quickstart source) |
| **`Initial prompt.txt`** | Original product idea / build prompt |
| **`PROJECT_MAP.md`** | This document |
| **`.gitignore`** | Ignores local restore snapshot and vendor PDF bundle (see below) |
| **`.cursor/rules/`** | Cursor project rules: `behavior.mdc`, `project-conventions.mdc`, `data-handling.mdc` |

### `Old/` — archive (not active source)

| File | Notes |
|------|-------|
| `VPC Map_1.html` … `VPC Map_7.html` | Earlier map prototypes |
| `emergency-tent-placer.html` | Pre-VPC baseline |
| `VPC_Mapping_Tool_Tiered_Suggestions.md` | Historical suggestions |
| `VPC_Mapping_Tool_Upgrade_Suggestions.md` | Historical suggestions |
| `VPC_Mapping_Tool_v081_Cleanup.md` | Historical cleanup notes |
| `VPC_Snap_v084_Complete.md` | Snap feature implementation notes |
| `VPC_UX_Refactor.md` | UX refactor notes |

Do not edit `Old/` or treat it as authoritative. See `.cursor/rules/project-conventions.mdc`.

### Gitignored (local only — listed in `.gitignore`)

| Path | Purpose |
|------|---------|
| **`Vendor Specs and Manuals/`** | Large PDF/spec bundle referenced by `VENDOR_SPECS_DIGEST.md` |
| **`VPC Mapping Tool - restore 2026-02-26.html`** | Local emergency restore snapshot |

### Not in this repo

Calculator suite (Load, Water, Consumables, Medicines) — separate HTML tools; integration planned at v2.5+ per `PSMT_Project_Notes.md`.

---

## 3. Architecture of `Portable-Solution-Site-Mapping-Tool.html`

### Whole-file layout (approximate)

| Section | Block | Contents |
|---------|-------|----------|
| Head | `<head>` | DOCTYPE, meta, title, in-file changelog HTML comment |
| CDN | Leaflet 1.9.4 CSS/JS |
| Styles | `<style>` | App layout, sidebar, map, print CSS, handles, toasts, Start Here modal |
| Body UI | `<body>` (early) | Header (search, Snap, Undo/Redo, Measure, Print, Restore), Start Here modal, sidebar, map, status bar, print meta, file input |
| Script | `<script>` (~4,400 lines) | All application logic — see section bands below |
| Close | `</script>`, `</body>`, `</html>` |

### Libraries (CDN — no build step)

| Library | CDN version | Role |
|---------|-------------|------|
| **Leaflet** | 1.9.4 | Map, tiles, vectors, layer control, scale bar |

**Not used:** Turf.js, frameworks, bundlers, npm. Geometry is hand-rolled.

### Map layers

| Variable | Layer control | Provider |
|----------|---------------|----------|
| `satelliteLayer` | Base (default) | Esri World Imagery |
| `streetLayer` | Base (toggle) | CARTO light |
| `labelsLayer` | Overlay | Esri Reference / Places |

Placed structures are vector overlays on `map` — not attached to tile layers.

### External network calls

| Service | When | Data sent |
|---------|------|-----------|
| Esri / CARTO tiles | Map display | Tile requests |
| CDN | First load | Library fetch |
| Nominatim | Address search | User-typed search string |

All layout data stays client-side until download or print.

---

## 4. Script block — section bands (approximate)

Use ripgrep / editor search for `function name` — bands below are orientation only.

| Band | What lives here |
|------|-----------------|
| Script preamble | Opening `<script>`, flow comment |
| `APP_META` | Name, version, lastUpdated, changelog |
| Constants | `DRAG_SUPPRESS_MS`, handle offsets, storage keys, `ROLES`, `FT_TO_M`, overlap thresholds, etc. |
| `TENT_DB` | Catalog data, `COLORS`, `VENDOR_COLORS`, tier visibility helpers |
| Mutable state | `objects[]`, placement/measure modes, **`selectedIds`**, **`primaryId`**, undo stacks, autosave timers, `overlapState`, search pending results |
| Map init | `L.map`, tile layers, layer control, scale control, `roleLabelPane` |
| Overlap pill | `initOverlapPill` IIFE |
| Vendor catalog UI | Tabs, `createTentCard`, roles on cards, extended-catalog toggle (hidden) |
| Placement & modes | `startPlacing`, `startCustomPlace`, toasts, readout, Snap toggle |
| Measure UI | Menu, strip positioning, distance/area mode toggles |
| Drag / rotate / selection | `startObjectDrag`, `endObjectDrag`, `startRotateDrag`, `endRotateDrag`, handles, group geometry, selection set API, buffer apply |
| Undo | `pushStateToUndo`, `undo`, `redo`, snapshots |
| Labels & roles | `sanitizeLabel`, `formatObjectIdentity`, custom roles UI |
| Persistence | `saveScenario`, `buildScenarioData`, `exportGeoJSON`, `loadScenarioFromData`, **`getPlacedObjectsBounds`**, **`restoreAutosave`**, session save |
| Plan hydration | `buildObjectFromRaw` |
| Map events | `map.on('click'…)`, `mousemove` (drag, group move/rotate), `moveend`, `zoomend`, `mouseup` |
| Objects & list UI | `placeObject`, `drawObject`, selection underlay, role labels, snap attach, list rows, placed-list expand |
| On-map measure | `handleMeasureClick`, area measure, `polygonAreaMeters` |
| Overlap geometry | `scheduleOverlapSummary`, **`getLayerMeterRing`**, **`latlngToMeters`**, polygon intersection, **`updateOverlapSummary`** |
| Offline & search | `updateOfflineBanner`, **`searchLocation`**, picker show/dismiss |
| Print & scale | `updatePrintMeta`, `updateScaleRatio`, `restorePrintHandles` |
| DOM wiring | `addEventListener`, **`isTypingTarget`**, document `keydown` (Esc, /, Ctrl+A, Delete, Ctrl+Z/Y) |
| Startup init | Version badge, catalog roles popover, measure menu init, autosave indicator hydrate |

---

## 5. Function index (every top-level function)

All functions below appear in the script block. IIFEs and inline handlers are noted separately. **No line numbers** — search by name.

### Catalog & vendor UI

`getVendorColor`, `catalogTierOf`, `isCatalogModelVisible`, `visibleCatalogModels`, `visibleCatalogVendors`, `tentCatalogKey`, `applyExtendedCatalogToggle`, `renderVendorTabs`, `setVendor`, `renderTentList`, `getCardRole`, `setCardRole`, `formatCardDimsBeds`, `catalogPlacementLabel`, `catalogCardAccessibleName`, `fillRoleSelectOptions`, `wireRoleSelect`, `showRoleCustomInline`, `createTentCard`, `dimStr`, `syncColorSwatches`

### Placement, modes, feedback

`startPlacing`, `startCustomPlace`, `cancelPlacing`, `clearToasts`, `scheduleToastHide`, `clampToastPosition`, `showActionToast`, `showSpatialToast`, `syncMapStateReadout`, `setMode`, `updateSnapModeUI`, `toggleSnapMode`, `resetViewMode`, `makeCollapsible`, `isStartHereModalOpen`, `openStartHereModal`, `closeStartHereModal`

### Measure UI & on-map measure

`positionMeasureStripUnderButton`, `updateMeasureUI`, `closeMeasureMenu`, `measureMenuPickDistance`, `measureMenuPickArea`, `toggleMeasureMode`, `toggleAreaMeasureMode`, `clearMeasure`, `clearMeasureStartMarker`, `handleMeasureClick`, `handleAreaMeasureClick`, `drawAreaMeasureLayer`, `northBoundaryAnchor`, `finishAreaMeasure`, `polygonAreaMeters`

### Drag, rotate, handles, group geometry

`startObjectDrag`, `endObjectDrag`, `startRotateDrag`, `endRotateDrag`, `getObjectById`, `clearRotateHandle`, `getRotateHandleLatLng`, `getDeleteHandleLatLng`, `getMembersCentroid`, `getGroupMaxCornerRadiusM`, `getGroupRotateHandleSeatAtRest`, `rotateLatLngAboutPivot`, `shortestAngleDelta`, `syncRotateHandle`, `computeAngleFromCenter`, `isMultiMemberGestureActive`

### Selection set (runtime only — not in plan schema)

`selectionIds`, `isSelected`, `selectionReadoutText`, `applySelectionReadout`, `setSelection`, `toggleInSelection`, `setSelectedObject`, `clearSelection`, `isMultiSelectModifierEvent`

### Undo & buffer

`getObjectsSnapshot`, `applySnapshot`, `pushStateToUndo`, `undo`, `redo`, `updateUndoRedoButtons`, `setBufferInput`, `applyBufferPreset`, `applyBufferToSelected`, `applyBufferToAll`

### Labels, roles, identity

`sanitizeLabel`, `formatObjectIdentity`, `getCustomRolesFromStorage`, `getEffectiveRoles`, `addCustomRole`, `rebuildRoleDropdowns`, `rebuildManageRolesPanel`, `removeCustomRole`, `normalizeColor`

### Persistence & session

`saveScenario`, `buildScenarioData`, `downloadJsonFile`, `exportGeoJSON`, `loadScenarioPrompt`, `toNumber`, `getPlacedObjectsBounds`, `loadScenarioFromData`, `formatLastSaved`, `updateLastSavedIndicator`, `getStoredSessionObjectCount`, `saveSession`, `scheduleSaveSession`, `updateRestoreButtonState`, `restoreAutosave`, `buildObjectFromRaw`

### Objects, drawing, list UI, delete

`placeObject`, `drawObject`, `shouldShowRoleLabel`, `removeRoleLabel`, `clearSelectionUnderlay`, `ensureSelectionUnderlay`, `buildRoleLabelIcon`, `syncRoleLabel`, `refreshRoleLabelVisibility`, `createShapeLayer`, `metersToDeg`, `snapEngageThresholdM`, `roundRelativeAngleTo90`, `resolveSnapMate`, `findNearestSnapCandidate`, `getSnapAttachLatLng`, `getNearestFaceMidpointLatLng`, `normalizeAngle`, `rotateOffsets`, `createGeoPolygon`, `createGeoCutCornerRectangle`, `createGeoEllipse`, `createGeoPlusSign`, `createGeoRect`, `deleteObj`, `confirmAndDeleteSelection`, `deleteSelectedBulk`, `resetPlacedObjects`, `clearAll`, `updateList`, `togglePlacedListExpand`, `scrollPlacedListToObject`, `createObjectListItem`

### Overlap geometry

`scheduleOverlapSummary`, `getLayerVertices`, `latlngToMeters`, `polygonBounds`, `bboxOverlap2D`, `pointInPolygonXY`, `segmentIntersectsOpen`, `polygonsTouchOrOverlap2D`, `cross2DXY`, `polygonSignedArea2D`, `pointInTriangle2D`, `lineIntersection2D`, `isInsideClipEdge2D`, `clipPolygonByHalfPlane2D`, `clipPolygonByConvexPolygon2D`, `triangulatePolygon2D`, `polygonIntersectionArea2D`, `polygonsFootprintOverlap2D`, `getLayerPointRing`, `getLayerMeterRing`, `updateOverlapSummary`

### Search, offline, print, helpers

`updateOfflineBanner`, `searchLocation` (async), `fetchSearchResults` (async), `focusSearchResult`, `clearSearchResults`, `isSearchResultsVisible`, `closeSearchResultsOnOutsideClick`, `showSearchResults`, `escapeHtml`, `updateScaleRatio`, `getZoneSummary`, `updatePrintMeta`, `restorePrintHandles`, `isTypingTarget`

### IIFEs & inline handlers

| Name | Role |
|------|------|
| `initOverlapPill` | Pill click scrolls to first flagged row |
| `initCatalogRolesPopover` | Manage-roles popover positioning |
| `measureMenuInit` | Measure dropdown open/close |
| `map.on(...)` | Placement click, drag mousemove (singleton + group move/rotate), pan/zoom autosave |
| `document keydown` | Esc (modes + deselect + snap off), `/`, Ctrl/Cmd+A, Delete/Backspace, Ctrl+Z/Y |
| `btn-print` click | `window.print()` |

**Removed (do not search):** `printFitToPage`, `getPlacedBounds`, `getGroupRotateHandleLatLng` (dead AABB seat; removed 1.4.0-dev), `#snap-to-selected` path.

---

## 6. Key data structures

### `APP_META`

```javascript
{ name, version, lastUpdated, changelog: [{ version, date, note }, …] }
```

Bottom-right badge reads `APP_META.version`.

### `TENT_DB`

Object keyed by vendor name → array of model entries.

**Per-model fields:**

| Field | Required | Description |
|-------|----------|-------------|
| `name` | yes | Display name |
| `widthFt` | yes | Width in feet (`circle`: diameter) |
| `lengthFt` | yes | Length in feet |
| `shape` | yes | Footprint type (below) |
| `note` | yes | Spec summary; tent card `title` |
| `cornerCutW` | optional | Cut-corner rectangle (GK1935, 8D36) or cut-corner square (X-HUB) — width-axis cut (ft) |
| `cornerCutL` | optional | Cut-corner rectangle (GK1935, 8D36) or cut-corner square (X-HUB) — length-axis cut (ft) |
| `armWidthFt` | optional | Plus/cross hub arm width (ft) |

**Shape types used in catalog:** `rect`, `octagon`, `cut-corner-rectangle`, `cut-corner-square`, `plus`. (`circle` and `ellipse` supported in drawing code; not in current catalog — `ellipse` for legacy saved plans only.)

Dimensions convert to meters at placement (`× FT_TO_M`).

### `VENDOR_COLORS`

Maps catalog vendor → default hex. Missing vendor falls back to user swatch via `getVendorColor()`.

Current keys: `BLU-MED`, `Western Shelter`, `DLX`, `ZUMRO`, `HDT`, `Craftsmen`, `FORTS`, `WillScot`, `Power`.

### Runtime selection (not serialized)

| Variable | Type | Description |
|----------|------|-------------|
| `selectedIds` | `number[]` | Ordered set of selected object ids |
| `primaryId` | `number \| null` | Last-interacted member; anchor for singleton handles and scroll |

### `objects[]` — runtime placed structure

Built by `placeObject` / `buildObjectFromRaw`; drawn by `drawObject`.

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Unique ID |
| `latlng` | `L.LatLng` | Center |
| `label` | string | Sanitized display name |
| `shape` | string | Footprint type |
| `widthM` | number | Width (meters) |
| `lengthM` | number | Length (meters) |
| `color` | string | Hex |
| `opacity` | number | Fill opacity |
| `angleDeg` | number | Rotation degrees |
| `bufferFt` | number | Clearance buffer (feet) |
| `vendor` | string | Catalog vendor, `'Custom'`, or `'Loaded'` |
| `role` | string | Zone role |
| `intentionalBuffer` | boolean | User accepted amber buffer advisory |
| `cornerCutW`, `cornerCutL`, `armWidthFt`, `endCapFt` | number? | Shape extras when applicable |
| `layer` | Leaflet layer | Footprint on `map` (not serialized) |
| `layerBuffer` | Leaflet layer? | Dashed clearance ring |

### `vendor` field — three kinds

| Value | Origin |
|-------|--------|
| Catalog vendor (e.g. `'BLU-MED'`) | From `TENT_DB` when placing catalog model |
| **`'Custom'`** | Custom Size workflow (`customMode`); always `rect` |
| **`'Loaded'`** | `buildObjectFromRaw` default when plan lacks `vendor` |

### `overlapState`

```javascript
{ footprintIds: Set<number>, bufferIds: Set<number> }
```

Updated by `updateOverlapSummary`. Recomputes live during drag/rotate via `scheduleOverlapSummary` from `drawObject`. UI-only pair details are not exported.

### Serialization spellings (intentional — do not unify)

| Surface | Field name |
|---------|------------|
| Runtime / undo | `intentionalBuffer` |
| Plan JSON (`psmt-scenario-v1`) | `intentionalBufferOverlap` |
| GeoJSON export | `intentional_buffer_overlap` |

See `.cursor/rules/project-conventions.mdc`.

---

## 7. Vendor catalog

### Current vendors and models (`TENT_DB`)

| Vendor | Models (standard-visible; extended omitted here) |
|--------|--------|
| **BLU-MED** | 2032.5, 2039, Vestibule |
| **Western Shelter** | GK1935, GK20, Vestibule |
| **DLX** | X-24, Quad (X-HUB), X-32 |
| **ZUMRO** | Quad Interface, Model 400, Model 600, Interconnect |
| **HDT** | Base-X 305, Base-X Dome (8D36) |
| **Craftsmen** | 8-Bed ICU Trailer |
| **FORTS** | Model 38 |
| **WillScot** | Patient Unit, Staff Unit |
| **Power** | Generator 70 kVA (on trailer) — MQ Power card identity; planning tab grouping, not procurement |

Catalog section header is **Catalog**. Tabs render from `TENT_DB` keys automatically.

### Provenance

Every catalog model must trace to **`VENDOR_SPECS_DIGEST.md`**. Adding a vendor: digest entry first → `TENT_DB` + `VENDOR_COLORS`.

**Known open gap:** DLX Quad (X-HUB) `cornerCutW` / `cornerCutL` **1.0 ft** — unverified in code comment; overall 22'×22' bounding box confirmed, corner chamfer not confirmed from primary spec. HDT Base-X Dome (8D36) `cornerCutW` **8.4 ft** / `cornerCutL` **13.2 ft** — unverified; overall 31'×37' bbox confirmed, corner legs diagram-derived (pixel-measure), not vendor-stated.

### Designed to expand

Catalog is not fixed. See `.cursor/rules/project-conventions.mdc` for the provenance gate and non-catalog vendor values.

---

## 8. Core workflows

### Locate site

Search address/place or `lat, lng` (`searchLocation` — **Enter** to run). Results prefer the current map area; first match centers; multi-match shows `#search-results` picker (Esc / outside-click dismiss). **Plan Name** under **Plan**. Layer control: satellite / street / hybrid labels. Internet required for address search; lat/lng works offline.

### Place structures (click-then-place)

Select catalog model → place mode → click map → `placeObject`. Catalog placement stays armed (continuous); Custom Size is one-shot (`startCustomPlace`, vendor `'Custom'`).

### Select & adjust placed objects

| Action | Behavior |
|--------|----------|
| Select | Click footprint or list row; **Shift/Ctrl/Cmd+click** toggles membership (`toggleInSelection`); **Ctrl/Cmd+A** selects all |
| Highlight | Double-outline blue underlay (`ensureSelectionUnderlay`) |
| Exit selection | **Esc** or empty-map click (`clearSelection`); Esc also leaves place/measure and turns Snap off |
| Move | Drag body — **rigid group translate** when N>1 (`startObjectDrag`); one undo per gesture; **snap off** for N>1 |
| Rotate | Drag shared **↻** handle (`startRotateDrag`); singleton or **rigid group rotate** about centroid; Shift = 5°; one undo per gesture |
| Delete (map) | Shared **✕** on primary — identity confirm N=1, count confirm N≥2 (`confirmAndDeleteSelection` / `deleteSelectedBulk`) |
| Delete (list) | Row **✕** always **`deleteObj`** for that row only (identity confirm), even when row is in a multi-selection |
| Delete (key) | **Delete** / **Backspace** — same as map ✕; suppressed when `isTypingTarget` |
| Buffer | **Apply to Selected** / **Apply to All** — one undo per apply |

### Snap (singleton drag only)

Header **Snap** toggle + `findNearestSnapCandidate` / `getSnapAttachLatLng` on drag. Uses **rotation-as-intent**: pre-drag angle quantized to nearest 0°/90° relative to anchor. **Ctrl/Cmd** suppresses while dragging; **Esc** turns Snap off. Disabled during multi-member moves (N>1).

### Two-tier overlap (advisory)

| Tier | Color | Geometry | Meaning |
|------|-------|----------|---------|
| Footprint | Red | Pair-local **meter space** (`getLayerMeterRing`, `polygonsFootprintOverlap2D`) | Solid footprints intersect (positive area) |
| Buffer | Amber | **Layer pixel** rings (`getLayerPointRing`, touch-or-overlap) | Clearance ring conflict |

Status bar, sidebar warning, map pill. **Intentional** checkbox on amber-only rows. Recomputes **live during drag and rotate** (rAF-coalesced). Does not block placement.

### Measure

Header Measure menu + on-map handlers. Distance or area. Strip centered under Measure button; labels offset off geometry. Not persisted.

### Undo / redo

50 steps (`undo`/`redo`). Covers place, move, rotate, delete, role, buffer-to-selected, buffer-to-all, clear all, group move/rotate/delete. Lost on refresh.

### Persistence

| Action | Key functions | Notes |
|--------|---------------|-------|
| Autosave write | `scheduleSaveSession` → `saveSession` | `localStorage` key `psmt-session`; 500 ms debounce |
| Autosave restore | **`restoreAutosave`** → `loadScenarioFromData` | Manual; confirms if layout exists; restores saved center/zoom; **`getPlacedObjectsBounds`** fit fallback only when no structure visible (maxZoom 18) |
| Save Plan | `saveScenario` | Downloads `psmt-scenario-v1` JSON |
| Open Plan | `loadScenarioPrompt` + file input | Replaces layout |

**Fresh open:** default map (NYC area), empty layout — autosave does **not** auto-restore (init hydrates indicator only).

### Export & print

| Action | Function | Output |
|--------|----------|--------|
| GeoJSON | `exportGeoJSON` | `FeatureCollection` + metadata |
| Print | `#btn-print` or Ctrl/Cmd+P + `beforeprint` / `afterprint` | Browser print of current map view + totals strip |

---

## 9. Serialization (high level)

### Plan JSON — `psmt-scenario-v1` (`buildScenarioData`)

`schema`, `appVersion`, `savedAt`, `map` (center, zoom), `ui` (operationName, bufferFt), `objects[]` (may include `customBeds` on Custom), `customRoles[]`. Older plans may still carry `preferCurrentMapArea` — ignored on load.

Does not store: `selectedIds` / `primaryId`, active base layer, undo history, overlap pairs, measure drawings.

### GeoJSON (`exportGeoJSON`)

Per-feature properties + collection `metadata.zoneSummary`. Footprint geometry from Leaflet `toGeoJSON()`.

Schema not frozen pre-v1 — change deliberately; keep plan and GeoJSON in sync.

---

## 10. Known constraints & gotchas

| Topic | Detail |
|-------|--------|
| Single-file | All logic in one HTML file |
| Fresh open | v0.8.7+ — no auto-restore on load |
| Autosave | Same browser only |
| Selection | Runtime-only; not in plan JSON |
| Units | Feet in UI; meters internally; no unit toggle yet |
| PDF / CORS | `crossOrigin: true` on tiles; browser print only (no Export PDF) |
| Offline | Tool requires internet for tiles/search; offline banner warns when connection is lost |
| Overlap | Advisory only; hybrid geometry (meter footprint + layer-pixel buffer) |
| Geometry | Hand-rolled; no Turf |
| Group rotate seat | Centroid pivot; handle seat is polar offset (`getGroupRotateHandleSeatAtRest`), not union AABB |
| `Old/` | Archive only |

---

## 11. Documentation map

| Document | Covers |
|----------|--------|
| **`PROJECT_MAP.md`** | This orientation map |
| **`README.md`** | Release features, operator quick start, overlap, autosave, changelog |
| **`PSMT_Project_Notes.md`** | Roadmap, backlog, calculator integration plan |
| **`VENDOR_SPECS_DIGEST.md`** | Spec provenance per model |
| **`Portable-Solution-Site-Mapping-Tool-Quickstart.html`** | Field quickstart |
| **`.cursor/rules/`** | Agent working agreement and invariants |

When `APP_META.version` changes: update README, Project Notes, Quickstart, in-app changelog (see project-conventions rule).

---

## 12. Quick code lookup

| Looking for… | Go to… |
|--------------|--------|
| Add/change tent model | `TENT_DB`, digest |
| Map imagery | `satelliteLayer`, layer control init |
| Selection set | `selectedIds`, `primaryId`, `setSelection`, `toggleInSelection` |
| Group move / rotate | `startObjectDrag`, `startRotateDrag`, `getMembersCentroid`, `getGroupRotateHandleSeatAtRest` |
| Group / key delete | `confirmAndDeleteSelection`, `deleteSelectedBulk`, `deleteObj` |
| Restore autosave + drift guard | `restoreAutosave`, `getPlacedObjectsBounds` in `loadScenarioFromData` |
| Load plan file | `loadScenarioFromData` |
| Autosave write | `saveSession`, `scheduleSaveSession` |
| Placement click | `map.on('click')` |
| Overlap logic | `updateOverlapSummary`, `getLayerMeterRing`, `latlngToMeters` |
| Snap attach | `getSnapAttachLatLng`, `findNearestSnapCandidate` |
| Export GeoJSON | `exportGeoJSON` |
| Identity strings | `formatObjectIdentity` |
| Buffer to selection | `applyBufferToSelected` |
