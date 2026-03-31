# VPC Mapping Tool — Suggested Upgrades
**Source:** Claude code review of v0.7.4
**Date:** 2026-03-10
**For:** Cursor review and implementation comment

---

## What Changed in v0.7.4

- Undo/Redo moved to header
- Options panel (color/opacity/rotation/buffer) collapsed under disclosure button; state persisted to localStorage
- Setup panel (scale presets + operation name) collapsed by default; state persisted to localStorage
- Finish Area and Clear Measurement now contextual via updateMeasureUI() — hidden unless relevant
- Apply Buffer to All now has confirm() dialog
- Tooltips added to all major controls
- Custom Size section renamed and reworded

**Items from prior review resolved by this version:** contextual Finish Area/Clear buttons, Apply Buffer confirmation, Undo/Redo discoverability.

---

## Tier 1 — Correctness and Core UX

### 1.1 Polygon-level overlap detection (replace AABB with SAT)

**Problem:** updateOverlapSummary() uses layer.getBounds().intersects() — axis-aligned bounding box only. Two rotated footprints (e.g. two GK1935s at 45°) can show zero overlaps while physically intersecting on the map. This is a safety-relevant false negative in a field hospital spacing context.

**Suggested fix:** Replace the AABB test with a Separating Axis Theorem (SAT) polygon intersection check using the actual vertex arrays already computed for each shape layer. The vertices exist — they just aren't currently used for overlap testing.

**Code pointer:** updateOverlapSummary() (~line 1930); createShapeLayer() and shape geometry functions (~lines 1510-1710).

---

### 1.2 Label editing after placement

**Problem:** Label is set at placement time via the obj-label input and cannot be changed afterwards. Role can be changed inline in the placed list; label cannot. In a fast-moving operation, names change (e.g. "Ward A" to "Ward A overflow"). The only current fix is delete and re-place.

**Suggested fix:** Add an inline editable label to each row in the placed objects list, similar to the existing inline role select. Must call pushStateToUndo() before the change and drawObject(o) after to update the map tooltip.

**Code pointer:** createObjectListItem() (~line 1770); drawObject() (~line 1440).

---

### 1.3 Remove or activate createGeoElongatedHexagon

**Problem:** createGeoElongatedHexagon() is defined but never called. No TENT_DB entry uses shape "elongated-hexagon". It was likely written for the HDT 6D31 before that model was removed from the lineup; the 8D36 was implemented as an ellipse instead. The tentShapeBadge() and dimStr() functions also have unreachable branches for this shape type.

**Options:**
- Remove the function and its dead branches in tentShapeBadge() and dimStr() if the shape is not planned.
- Or assign it to a future TENT_DB entry and document that intent with a comment.

**Code pointer:** createGeoElongatedHexagon() (~line 1645); tentShapeBadge() (~line 610); dimStr() (~line 660).

---

### 1.4 Distance measure: show start-point marker on first click

**Problem:** After clicking the first point in distance measure mode there is no visual feedback on the map. updateMeasureUI() now shows the Clear button when measureStart is set, which helps slightly — but there is still no on-map indicator. Easy to double-click thinking the first click did not register.

**Suggested fix:** Place a small L.circleMarker at measureStart when it is set. Remove it when the measurement completes or when clearMeasure() is called.

**Code pointer:** handleMeasureClick() (~line 1840); clearMeasure() (~line 842).

---

## Tier 2 — UX Polish and Field Workflow

### 2.1 PDF visual export (programmatic, separate from browser print)

**Rationale:** The current Print Fit workflow delegates to the browser print dialog, which varies by OS, browser, and paper size and produces inconsistent results. A programmatic PDF export would produce a fixed-layout document — map snapshot, zone summary table, object list, and operation metadata — with no dialog interaction. This is the primary recommended path for sharing layouts with non-mapping stakeholders (command staff, logistics, clinical planners).

**Suggested approach:** jsPDF combined with html2canvas, both CDN-loadable with no build step.

Implementation notes:
- Leaflet uses an SVG renderer by default. To capture the map as a canvas, either set preferCanvas: true on map init, or use html2canvas to capture the full map div including SVG overlays.
- Satellite tile CORS restrictions from the Esri tile servers may cause the basemap to render blank in html2canvas. The vector footprint overlays will render correctly regardless.
- A reliable fallback: export a PDF containing the zone summary table and object list only, with a note directing the reader to open the saved plan file for the interactive map view.
- Export should use Operation Name from #operation-name, zone summary from getZoneSummary(), scale from #scale-ratio, and timestamp.

**Code pointer:** printFitToPage() (~line 2152); getZoneSummary() (~line 2107); buildScenarioData() (~line 1105).

---

### 2.2 Placement label input: add scope hint

**Problem:** The "Custom Label (optional)" input in Label & Style has no indication that it applies to the next placement rather than to a currently selected object. Easy to overlook or misinterpret.

**Suggested fix:** Add a single dim-note line below the input: "Applied to next placement." Zero implementation cost, immediately clarifies scope.

**Code pointer:** Label & Style section HTML (~line 285).

---

### 2.3 Visual mode indicator on the map canvas

**Problem:** The mode badge in the header is the only mode indicator. Nothing changes visually on the map when in Measure or Place mode. Easy to lose track of active mode, especially on smaller displays where the header may be less prominent.

**Suggested fix:** Apply a subtle colored CSS border to #map when in a non-View mode (e.g. 2px orange for measure, 2px green for placing). Toggle via a class on #map inside setMode(). Remove on resetViewMode().

**Code pointer:** setMode() (~line 718); #map CSS (~line 195).

---

### 2.4 Search results select: reduce header layout shift

**Problem:** The #search-results select appears and disappears in the header depending on whether a search returns multiple results, causing the header to reflow each time.

**Suggested fix:** Position the dropdown absolutely below the search input so it does not affect header flow, or reserve a fixed minimum width at all times.

**Code pointer:** #search-results CSS (~line 63); showSearchResults() / clearSearchResults() (~lines 2072-2080).

---

### 2.5 Sidebar scroll: Placed list always requires scrolling

**Problem:** Even after the 0.7.4 refactor, the Placed list — the most-used section during active layout work — still requires scrolling past Label & Style, Custom Size, Plan, and Measure on displays smaller than ~1080p tall. The collapsible panels help but do not fully close this gap.

**Suggested fix:** Consider moving the Placed list to the top of the sidebar (above the vendor/model selector), or making it a fixed-height panel at the bottom of the sidebar with internal scroll, so it is always visible regardless of what is above it.

**Code pointer:** Sidebar HTML structure (~lines 275-390).

---

### 2.6 Snap and alignment assist for paired tents

**Note:** Larger item, flagged for planning purposes.

**Problem:** Connecting structures (BLU-MED Vestibule + 2032.5, GK1935 + Vestibule, DLX X-24 + X-HUB) must be manually eyeballed into alignment. Even with the rotate handle, aligning a vestibule flush with a shelter end is tedious and imprecise.

**Suggested fix (lightweight):** When placing a new object, if the cursor is within ~2-3 meters of an existing object's edge midpoint, snap the new object's center to the correct offset and match its rotation. Show a snap indicator line during placement.

---

## Tier 3 — Code Hygiene

### 3.1 _suppressDeleteUntil: refactor to module-level variable

**Problem:** A UI timing flag (_suppressDeleteUntil timestamp) is attached directly to the object data model to suppress spurious click-after-drag delete events. A side-effectful timing concern has no business living on a data object.

**Suggested fix:** Replace with a module-level let dragEndedAt = 0 and check Date.now() < dragEndedAt + 250 in the click handler.

**Code pointer:** endObjectDrag() (~line 873); bindSelect in drawObject() (~line 1495).

---

### 3.2 Duplicate map.on('mouseup') registrations

**Problem:** Two separate map.on('mouseup') listeners are registered on consecutive lines — one for endObjectDrag() and one for endRotateDrag(). Functionally correct but reads as an oversight.

**Suggested fix:** Combine into: map.on('mouseup', () => { endObjectDrag(); endRotateDrag(); });

**Code pointer:** ~lines 1408-1409.

---

### 3.3 Version string defined in three places

**Problem:** The version appears in the HTML comment block, in APP_META.version, and as static text in #version-display. The static text is immediately overwritten by the JS init line, making the HTML value a lie.

**Suggested fix:** Leave #version-display empty in HTML (or use a placeholder like v--) and rely on the single JS assignment at init.

**Code pointer:** ~line 403 (HTML); ~line 416 (APP_META); ~line 2255 (JS init).

---

### 3.4 Double role assignment in placeObject

**Problem:** role is set via the ...extra spread, then immediately overwritten by an explicit obj.role assignment on the next line. Not a bug, but the intent is ambiguous.

**Suggested fix:** Extract role from extra before spreading, then assign once explicitly.

**Code pointer:** placeObject() (~line 1410).

---

### 3.5 Duplicated collapsible panel pattern

**Problem:** toggleStyleAdvanced/initStyleAdvanced and toggleSetup/initSetup are ~40 lines of near-identical logic. Adding a third collapsible section requires a third copy.

**Suggested fix:** Extract a generic factory: makeTogglePanel(panelId, btnId, storageKey, openLabel, closedLabel). Call it twice (or three times as needed).

**Code pointer:** toggleStyleAdvanced / initStyleAdvanced (~lines 754-774); toggleSetup / initSetup (~lines 777-797).

---

## README Roadmap Items (already well-specified, not duplicated here)

| Item | README location |
|---|---|
| Layout templates (MSF-style starting point) | Tier 2 #6 |
| Snap connecting tents to rotation and position | Optional (post-tier) |
| Offline tile package (MBTiles/PMTiles) | Optional (post-tier) |
| Layer visibility toggle by role | Optional (post-tier) |
| Validation rules (minimum clearance, access path) | Tier 3 #12 |
| GeoJSON export enhancements (legend, schema version) | Tier 3 #13 |

---

*Generated by Claude Sonnet 4.6 — v0.7.4 code review, 2026-03-10*
