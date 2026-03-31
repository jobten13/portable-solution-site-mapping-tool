# VPC Mapping Tool v0.8.1 — High-Value Cleanup List
**Date:** 2026-03-10

---

## Bugs (fix first)

### B1 — Mode badge click regression
`initModeBadgeClick` checks `el.textContent !== 'View Mode'` but `setMode('View Mode')` now renders as `'Select a tent below, then click the map to place.'` — so the badge is never literally `'View Mode'` and clicking it does nothing. Esc still works. Fix: compare against `getDefaultModeMessage()` or track a separate mode state boolean.
**Code pointer:** `initModeBadgeClick` IIFE (~line 830); `getDefaultModeMessage()` (~line 794).

### B2 — Map border class not cleared on status messages
`setMode()` clears `.map-mode-place` / `.map-mode-measure` only when `txt === 'View Mode'`. Status messages like `'Moved Ward A'`, `'Undo'`, `'Rotation updated'` leave the previous colored border lingering. Fix: clear both classes unconditionally at the top of every `setMode()` call, then re-add conditionally.
**Code pointer:** `setMode()` (~line 798).

### B3 — SAT origin falls back to 0,0 if first object has no valid vertices
`updateOverlapSummary` sets `originLat/Lng` from `idx === 0` inside the forEach, but only when `latlngs` is valid. If object 0 has no valid layer, all conversions use lat/lng 0,0. Fix: set origin from `map.getCenter()`, or from the first object with valid vertices regardless of index.
**Code pointer:** `updateOverlapSummary()` (~line 2141).

---

## Quick UX Wins

### U1 — Export PDF: add offline caveat to button
jsPDF loads from CDN — it silently fails offline and the user gets a confusing error. Add a `dim-note` under the Export PDF button: *"Requires network connection to load PDF library."*
**Code pointer:** Plan section HTML (~line 397).

### U2 — Consolidate Plan section export buttons
Four stacked ghost buttons (Save Plan, Open Plan, Export GeoJSON, Export PDF) read as visual noise. Group as Save / Open pair, then an Export ▾ disclosure revealing GeoJSON and PDF. Reduces height and clarifies intent.
**Code pointer:** Plan section HTML (~lines 392–398).

### U3 — Promote color swatches out of Options panel
Color is changed more often than rotation or buffer. Move the 8 swatches to always-visible in Label & Style; keep sliders under Options ▾. Saves one click for the most common style action.
**Code pointer:** Label & Style HTML (~line 329); `style-advanced` panel (~line 349).

### U4 — Update "How to use" step 3
Step 3 leads with "Shift+click to delete" but the red ✕ handle is now the primary delete affordance. Reorder: lead with the handle, mention Shift+click as an alternative.
**Code pointer:** How to use panel HTML (~line 314).

### U5 — Move cursor coords off status bar
Six status bar items compress on small screens. Cursor coords are the lowest operational value. Move to a small overlay in the bottom-right of the map canvas (standard Leaflet pattern), freeing a status bar slot.
**Code pointer:** `#statusbar` HTML (~line 446); `map.on('mousemove')` cursor update.

---

## Code Hygiene

### C1 — Trim APP_META changelog
22 changelog entries load on every session but are never displayed in the UI. Keep only the current version entry in `APP_META`; move full history to README only.
**Code pointer:** `APP_META.changelog` (~line 474).

### C2 — Orphaned `#obj-list-items` padding rule
`#obj-list-items { padding:12px; }` at line 188 is spatially separated from the rest of the placed-list CSS block below it. Consolidate into the placed-list CSS section for clarity.
**Code pointer:** ~line 188.

---

*Total: 3 bugs, 5 UX wins, 2 hygiene items. Implement B1–B3 first.*
