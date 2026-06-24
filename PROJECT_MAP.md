# VPC Mapping Tool — Project Map

Orientation document for developers and collaborators. Describes **what this project is** and **how it is organized**.

For **how to work on it** (read-only vs. authorized changes, scope discipline, catalog provenance, data-handling rules), see `.cursor/rules/` — especially `behavior.mdc`, `project-conventions.mdc`, and `data-handling.mdc`. This file does not duplicate those rules.

**Current version:** `0.8.8` (`APP_META.version`, `lastUpdated` `2026-05-19` in `VPC Mapping Tool.html`).

---

## 1. Purpose & program context

### What the tool is

**VPC Mapping Tool** is a browser-based site layout planner for emergency field hospitals and soft-sided shelter deployments. Users place vendor-accurate tent footprints on a real-world map at true scale, check spacing and overlaps, tag structures by functional role, and save or share layouts.

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
| **`VPC Mapping Tool.html`** | The application (~3,246 lines): HTML, CSS, JavaScript |
| **`README.md`** | Operator + developer reference: features, quick start, overlap behavior, autosave, changelog, backlog |
| **`VPC_Project_Notes.md`** | Product roadmap, immediate backlog, architecture notes, doc maintenance |
| **`VENDOR_SPECS_DIGEST.md`** | Spec alignment audit: manufacturer source for each `TENT_DB` entry |
| **`VPC Mapping Tool - Quickstart.html`** | Condensed field quickstart (sole quickstart source) |
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

Calculator suite (Load, Water, Consumables, Medicines) — separate HTML tools; integration planned at v2.5+ per `VPC_Project_Notes.md`.

---

## 3. Architecture of `VPC Mapping Tool.html`

### Whole-file layout

| Lines | Block | Contents |
|-------|-------|----------|
| 1–55 | `<head>` (partial) | DOCTYPE, meta, title, in-file changelog HTML comment |
| 56–59 | CDN | Leaflet CSS/JS, jsPDF, html2canvas |
| 60–335 | `<style>` | App layout, sidebar, map, print CSS |
| 336 | | `</head>` |
| 337–531 | `<body>` UI | Header, sidebar, map, status bar, print meta, hidden file input |
| 533–3243 | `<script>` | All application logic (see below) |
| 3244–3246 | | `</script>`, `</body>`, `</html>` |

### Libraries (CDN — no build step)

| Library | CDN version | Role |
|---------|-------------|------|
| **Leaflet** | 1.9.4 | Map, tiles, vectors, layer control, scale bar |
| **jsPDF** | 2.5.1 | PDF export |
| **html2canvas** | 1.4.1 | Map snapshot for PDF |

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
| CDN | First load / PDF | Library fetch |
| Nominatim | Address search | User-typed search string |

All layout data stays client-side until download or print.

---

## 4. Script block — contiguous line map (533–3243)

Every line in `<script>` is covered below. Ranges are **contiguous**: the end of one row plus one equals the start of the next (blank lines and section-marker comments are included in the span they sit within).

| Lines | Band | What lives here |
|-------|------|-----------------|
| **533–538** | Script preamble | Opening `<script>`, block comment describing flow |
| **539–551** | `APP_META` | Name, version, lastUpdated, changelog array |
| **552–571** | Constants | Blank + `DRAG_SUPPRESS_MS`, handle offsets, storage keys, `ROLES`, `FT_TO_M`, etc. |
| **572–639** | Tent database | Blank + `TENT_DB`, `COLORS`, `VENDOR_COLORS`, `getVendorColor()` |
| **640–673** | Mutable state | Blank + `objects[]`, modes, undo stacks, measure state, `overlapState` |
| **674–702** | Map init | Blank + `L.map`, tile layers, layer control, scale control |
| **703–735** | Overlap pill | `initOverlapPill()` IIFE — pill click scrolls to first flagged row |
| **736–759** | Vendor tab bootstrap | Blank + `Object.keys(TENT_DB).forEach` — builds vendor tab buttons |
| **760–838** | Vendor catalog UI | Blank + `setVendor`, `renderTentList`, `tentShapeBadge`, `createTentCard`, `dimStr`; initial `renderTentList()` |
| **839–859** | Color swatches | Blank + `syncColorSwatches`, `COLORS.forEach` swatch bootstrap |
| **860–913** | Placement modes | Blank + `startPlacing`, `startCustomPlace`, `cancelPlacing`, `getDefaultModeMessage`, `setMode` |
| **914–922** | View reset | Blank + `resetViewMode` |
| **923–934** | Mode badge | Blank + `initModeBadgeClick()` IIFE |
| **935–963** | Collapsibles | Blank + `makeCollapsible` + four panel init calls |
| **964–1075** | Measure UI | Blank + `updateMeasureUI`, menu helpers, toggle/clear measure |
| **1076–1317** | Drag / undo / handles | Blank + object drag, rotate, undo/redo, handles, buffer presets |
| **1318–1446** | Labels & roles | Blank + `sanitizeLabel`, custom roles storage/UI, `normalizeColor` |
| **1447–1694** | Save & export | Blank + `saveScenario`, `buildScenarioData`, GeoJSON, `exportPDF`, helpers |
| **1695–1885** | Load & autosave | Blank + `loadScenarioPrompt`, `loadScenarioFromData`, `saveSession`, `scheduleSaveSession`, `updateRestoreButtonState`, **`restoreAutosave`**, etc. |
| **1886–1914** | Plan hydration | Blank + `buildObjectFromRaw` — JSON → runtime object |
| **1915–2031** | Map events | Blank + `map.on('click'…)`, `mousemove`, `moveend`, `zoomend`, `mouseup` |
| **2032–2541** | Objects & list UI | Blank + section marker + `placeObject`, `drawObject`, geometry, list UI |
| **2542–2643** | On-map measure | Blank + `handleMeasureClick`, area measure, `polygonAreaMeters` |
| **2644–2873** | Overlap geometry | Blank + `scheduleOverlapSummary`, polygon tests, **`updateOverlapSummary`** |
| **2874–2880** | Offline | Blank + `updateOfflineBanner` |
| **2881–3094** | Search & print | Blank + `searchLocation`, scale ratio, `printFitToPage`, etc. |
| **3095–3163** | DOM wiring | Blank + listeners, `isTypingTarget`, keyboard shortcuts, tooltip CSS |
| **3164–3242** | Startup init | Blank + version badge, role/measure init IIFEs, autosave indicator hydrate |
| **3243** | Script close | `</script>` |

**Coverage check:** 533 → 3243 inclusive. Each row’s end line + 1 equals the next row’s start line. Blank lines between sections are absorbed into the following row’s range.

---

## 5. Function index (every top-level function)

All functions below appear in the script block. IIFEs and inline handlers are noted separately.

### 573–639 — Tent database

| Line | Function |
|------|----------|
| 637 | `getVendorColor` |

### 703–735 — IIFE

| Line | Name |
|------|------|
| 703 | `initOverlapPill` (IIFE) |

### 761–838 — Vendor catalog UI

| Line | Function |
|------|----------|
| 761 | `setVendor` |
| 770 | `renderTentList` |
| 779 | `tentShapeBadge` |
| 788 | `createTentCard` |
| 829 | `dimStr` |

### 840–913 — Placement modes

| Line | Function |
|------|----------|
| 842 | `syncColorSwatches` |
| 862 | `startPlacing` |
| 871 | `startCustomPlace` |
| 879 | `cancelPlacing` |
| 887 | `getDefaultModeMessage` |
| 891 | `setMode` |

### 915–1075 — View reset, collapsibles, measure UI

| Line | Function |
|------|----------|
| 915 | `resetViewMode` |
| 924 | `initModeBadgeClick` (IIFE) |
| 936 | `makeCollapsible` |
| 965 | `updateMeasureUI` |
| 995 | `closeMeasureMenu` |
| 1002 | `measureMenuPickDistance` |
| 1008 | `measureMenuPickArea` |
| 1014 | `toggleMeasureMode` |
| 1034 | `toggleAreaMeasureMode` |
| 1057 | `clearMeasure` |

### 1077–1446 — Interaction, roles, sanitize

| Line | Function |
|------|----------|
| 1077 | `startObjectDrag` |
| 1092 | `endObjectDrag` |
| 1107 | `startRotateDrag` |
| 1115 | `endRotateDrag` |
| 1127 | `getObjectById` |
| 1131 | `clearRotateHandle` |
| 1142 | `getObjectsSnapshot` |
| 1164 | `applySnapshot` |
| 1187 | `pushStateToUndo` |
| 1194 | `undo` |
| 1202 | `redo` |
| 1210 | `updateUndoRedoButtons` |
| 1217 | `getRotateHandleLatLng` |
| 1224 | `getDeleteHandleLatLng` |
| 1231 | `syncRotateHandle` |
| 1274 | `setSelectedObject` |
| 1282 | `computeAngleFromCenter` |
| 1288 | `setBufferInput` |
| 1296 | `applyBufferPreset` |
| 1301 | `applyBufferToAll` |
| 1319 | `sanitizeLabel` |
| 1324 | `getCustomRolesFromStorage` |
| 1339 | `getEffectiveRoles` |
| 1353 | `addCustomRole` |
| 1368 | `rebuildRoleDropdowns` |
| 1384 | `rebuildManageRolesPanel` |
| 1426 | `removeCustomRole` |
| 1443 | `normalizeColor` |

### 1448–1885 — Persistence

| Line | Function |
|------|----------|
| 1448 | `saveScenario` |
| 1458 | `buildScenarioData` |
| 1497 | `downloadJsonFile` |
| 1509 | `exportGeoJSON` |
| 1550 | `setExportChromeVisible` |
| 1557 | `waitForTilesIdle` |
| 1595 | `exportPDF` (async) |
| 1696 | `loadScenarioPrompt` |
| 1703 | `toNumber` |
| 1708 | `loadScenarioFromData` |
| 1763 | `formatLastSaved` |
| 1770 | `updateLastSavedIndicator` |
| 1790 | `saveSession` |
| 1802 | `scheduleSaveSession` |
| 1807 | `updateRestoreButtonState` |
| 1835 | **`restoreAutosave`** |
| 1887 | `buildObjectFromRaw` |

### 2034–2873 — Objects, measure-on-map, overlap

| Line | Function |
|------|----------|
| 2034 | `placeObject` |
| 2065 | `drawObject` |
| 2145 | `createShapeLayer` |
| 2171 | `metersToDeg` |
| 2183 | `getSnapAttachLatLng` |
| 2216 | `normalizeAngle` |
| 2220 | `rotateOffsets` |
| 2233 | `createGeoPolygon` |
| 2256 | `createGeoElongatedOctagon` |
| 2289 | `createGeoEllipse` |
| 2310 | `createGeoPlusSign` |
| 2334 | `createGeoRect` |
| 2347 | `deleteObj` |
| 2364 | `resetPlacedObjects` |
| 2379 | `clearAll` |
| 2388 | `updateList` |
| 2408 | `createObjectListItem` |
| 2543 | `clearMeasureStartMarker` |
| 2550 | `handleMeasureClick` |
| 2581 | `handleAreaMeasureClick` |
| 2592 | `drawAreaMeasureLayer` |
| 2610 | `finishAreaMeasure` |
| 2628 | `polygonAreaMeters` |
| 2645 | `scheduleOverlapSummary` |
| 2654 | `getLayerVertices` |
| 2680 | `latlngToMeters` |
| 2692 | `polygonBounds` |
| 2707 | `bboxOverlap2D` |
| 2711 | `pointInPolygonXY` |
| 2729 | `segmentIntersectsOpen` |
| 2744 | `polygonsOverlap2D` |
| 2763 | `getLayerPointRing` |
| 2773 | `updateOverlapSummary` |

### 2875–3127 — Offline, search, scale, print, keyboard helper

| Line | Function |
|------|----------|
| 2876 | `updateOfflineBanner` |
| 2883 | `searchLocation` (async) |
| 2941 | `fetchSearchResults` (async) |
| 2963 | `focusSearchResult` |
| 2980 | `clearSearchResults` |
| 2987 | `showSearchResults` |
| 3001 | `escapeHtml` |
| 3010 | `updateScaleRatio` |
| 3018 | `getZoneSummary` |
| 3028 | `updatePrintMeta` |
| 3042 | `applyScalePreset` |
| 3051 | `getPlacedBounds` |
| 3063 | `printFitToPage` |
| 3123 | `isTypingTarget` |

### 3165–3239 — Startup IIFEs

| Line | Name |
|------|------|
| 3169 | `initCustomRoleControls` (IIFE) |
| 3201 | `measureMenuInit` (IIFE) |
| 3236 | `initHeaderTruncateTitles` (IIFE) |

### Not named functions (inline in bands above)

- **1916–2031:** `map.on(...)` handlers (placement click, drag mousemove, pan/zoom autosave)
- **3096–3121:** `addEventListener` on address input, search results, scenario file input
- **3129–3156:** document `keydown` handler (Esc, `/`, P, Ctrl+Z/Y)

---

## 6. Key data structures

### `APP_META` (539–551)

```javascript
{ name, version, lastUpdated, changelog: [{ version, date, note }, …] }
```

Bottom-right badge reads `APP_META.version`.

### `TENT_DB` (575–627)

Object keyed by vendor name → array of model entries.

**Per-model fields:**

| Field | Required | Description |
|-------|----------|-------------|
| `name` | yes | Display name |
| `widthFt` | yes | Width in feet (`circle`: diameter) |
| `lengthFt` | yes | Length in feet |
| `shape` | yes | Footprint type (below) |
| `note` | yes | Spec summary; tent card `title` |
| `cornerCutW` | optional | Elongated octagon — width-axis cut (ft) |
| `cornerCutL` | optional | Elongated octagon — length-axis cut (ft) |
| `armWidthFt` | optional | Plus/cross hub arm width (ft) |

**Shape types used in catalog:** `rect`, `octagon`, `elongated-octagon`, `plus`, `ellipse`. (`circle` supported in drawing code; not in current catalog.)

Dimensions convert to meters at placement (`× FT_TO_M`).

### `VENDOR_COLORS` (630–636)

Maps catalog vendor → default hex. Missing vendor falls back to user swatch via `getVendorColor()`.

Current keys: `BLU-MED`, `Western Shelter`, `DLX`, `ZUMRO`, `HDT`.

### `objects[]` — runtime placed structure (647+)

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

### `overlapState` (673)

```javascript
{ footprintIds: Set<number>, bufferIds: Set<number> }
```

Updated by `updateOverlapSummary` (2773). UI-only pair details are not exported.

### Serialization spellings (intentional — do not unify)

| Surface | Field name |
|---------|------------|
| Runtime / undo | `intentionalBuffer` |
| Plan JSON (`vpc-scenario-v1`) | `intentionalBufferOverlap` |
| GeoJSON export | `intentional_buffer_overlap` |

See `.cursor/rules/project-conventions.mdc`.

---

## 7. Vendor catalog

### Current vendors and models (`TENT_DB`, lines 575–627)

| Vendor | Models |
|--------|--------|
| **BLU-MED** | 2032.5, 2039, Vestibule |
| **Western Shelter** | GK1935, GK20, Vestibule, Generator 70 kVA (on trailer) |
| **DLX** | X-24, Quad (X-HUB), X-32 |
| **ZUMRO** | Quad Interface, Model 400, Model 600, Interconnect |
| **HDT** | Base-X 305, Base-X Dome (8D36) |

Vendor tabs render from `TENT_DB` keys automatically (737–759).

### Provenance

Every catalog model must trace to **`VENDOR_SPECS_DIGEST.md`**. Adding a vendor: digest entry first → `TENT_DB` + `VENDOR_COLORS`.

**Known open gap:** DLX Quad (X-HUB) `armWidthFt: 16` — unverified in code comment (603–604); bounding box confirmed, arm width not confirmed from primary spec.

### Designed to expand

Catalog is not fixed. See `.cursor/rules/project-conventions.mdc` for the provenance gate and non-catalog vendor values.

---

## 8. Core workflows

### Locate site

Search address/place or `lat, lng` (2883 `searchLocation`). Coordinates work offline; address search needs network (Nominatim). Setup panel: operation name, search local bias, scale presets. Layer control: satellite / street / hybrid labels.

### Place structures (click-then-place)

Select vendor model → auto place mode (862) → click map (1917 handler) → `placeObject`. **Custom Size:** `startCustomPlace` (871), vendor `'Custom'`. **Snap:** checkbox + `getSnapAttachLatLng` (2183); auto-uncheck after success.

### Adjust placed objects

Drag body (`startObjectDrag`), rotate orange handle (`startRotateDrag`, Shift = 5°), delete (handles, list, Shift+click). Select via click or list row.

### Two-tier overlap (advisory)

| Tier | Color | Meaning |
|------|-------|---------|
| Footprint | Red | Solid footprints intersect |
| Buffer | Amber | Clearance ring conflict |

Status bar, sidebar warning, map pill. **Intentional** checkbox on amber-only rows. Does not block placement.

### Measure

Header Measure menu (965+ UI; 2550+ on-map handlers). Distance or area. Not persisted.

### Undo / redo

50 steps (`undo`/`redo`, 1194/1202). Lost on refresh.

### Persistence

| Action | Key functions | Notes |
|--------|---------------|-------|
| Autosave write | `scheduleSaveSession` → `saveSession` (1802, 1790) | `localStorage` key `vpc-mapping-session`; 500 ms debounce |
| Autosave restore | **`restoreAutosave`** (1835) → `loadScenarioFromData` | Manual; confirms if layout exists |
| Save Plan | `saveScenario` (1448) | Downloads `vpc-scenario-v1` JSON |
| Open Plan | `loadScenarioPrompt` (1696) + file input handler (3102) | Replaces layout |

**Fresh open:** default map (NYC area), empty layout — autosave does **not** auto-restore (init 3216–3241 only hydrates indicator).

### Export

| Action | Function | Output |
|--------|----------|--------|
| GeoJSON | `exportGeoJSON` (1509) | `FeatureCollection` + metadata |
| PDF | `exportPDF` (1595) | Map snapshot + summary; text-only fallback |
| Print Fit | `printFitToPage` (3063) | Browser print |

---

## 9. Serialization (high level)

### Plan JSON — `vpc-scenario-v1` (`buildScenarioData`, 1458)

`schema`, `appVersion`, `savedAt`, `map` (center, zoom), `ui` (operationName, preferCurrentMapArea, bufferFt), `objects[]`, `customRoles[]`.

Does not store: active base layer, undo history, overlap pairs, measure drawings.

### GeoJSON (`exportGeoJSON`, 1509)

Per-feature properties + collection `metadata.zoneSummary`. Footprint geometry from Leaflet `toGeoJSON()`.

Schema not frozen pre-v1 — change deliberately; keep plan and GeoJSON in sync.

---

## 10. Known constraints & gotchas

| Topic | Detail |
|-------|--------|
| Single-file | All logic in one HTML file |
| Fresh open | v0.8.7+ — no auto-restore on load |
| Autosave | Same browser only |
| Units | Feet in UI; meters internally; no unit toggle yet |
| PDF / CORS | `crossOrigin: true` on tiles; capture may fail → text-only PDF |
| Offline | Editing works; tiles/search may not |
| Overlap | Advisory only |
| Geometry | Layer-space polygon tests; no Turf |
| `Old/` | Archive only |

---

## 11. Documentation map

| Document | Covers |
|----------|--------|
| **`PROJECT_MAP.md`** | This orientation map |
| **`README.md`** | Release features, operator quick start, overlap, autosave, changelog |
| **`VPC_Project_Notes.md`** | Roadmap, backlog, calculator integration plan |
| **`VENDOR_SPECS_DIGEST.md`** | Spec provenance per model |
| **`VPC Mapping Tool - Quickstart.html`** | Field quickstart |
| **`.cursor/rules/`** | Agent working agreement and invariants |

When `APP_META.version` changes: update README, Project Notes, Quickstart, in-app changelog (see project-conventions rule).

---

## 12. Quick code lookup

| Looking for… | Go to… |
|--------------|--------|
| Add/change tent model | `TENT_DB` (575), digest |
| Map imagery | `satelliteLayer` (678), layer control (696) |
| Restore autosave | **`restoreAutosave`** (1835) |
| Load plan file | `loadScenarioFromData` (1708) |
| Autosave write | `saveSession` (1790) |
| Placement click | `map.on('click')` (1917) |
| Overlap logic | `updateOverlapSummary` (2773) |
| Export GeoJSON/PDF | 1509 / 1595 |
