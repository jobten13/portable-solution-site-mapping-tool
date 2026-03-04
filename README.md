# VPC Mapping Tool

Web-based site planning tool for placing field hospital/tent footprints on real-world maps at true scale.

## Quick Start Card

- Search site (address/place or `lat, lng`).
- Select vendor/model, set rotation + clearance.
- Click tent model (auto-enters place mode), then click location.
- Click a placed object to select it; drag body to move, drag orange handle to rotate.
- Check `Overlaps` and run distance/area measurements.
- `Save Scenario` for backup/handoff.
- `Export GeoJSON` for GIS coordination.
- `Print Fit` for final map sheet with metadata.

## Working File

- `VPC Mapping Tool.html`

## Versioning Approach

- This project uses lightweight in-file versioning while we iterate.
- Current app version is defined in `APP_META` inside `VPC Mapping Tool.html`.
- The same version is shown in a subtle bottom-right badge as `vX.Y.Z`.

## Current Version

- `0.6.3` (2026-02-26)

## Change Log

| Version | Date       | Notes |
|---------|------------|-------|
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

- Simplify scenario workflow for field use: rename `Save Scenario`/`Load Scenario` to `Save Plan`/`Open Plan`.
- Add lightweight autosave/local backup to reduce dependency on manual file export in fast-moving operations.

## Field Operator Quick Guide

### 1) Start and locate site

- Open `VPC Mapping Tool.html`.
- Search by address/place or paste `lat, lng`.
- Keep `Prefer current map area` checked for local precision, uncheck for fully global search.

### 2) Set planning context

- Use satellite + hybrid labels for real-world siting.
- Use scale presets (`1:100`, `1:150`, etc.) as needed for standardized views.
- Enter `Operation Name` before printing/exporting.

### 3) Place tents/shelters

- Select vendor and model.
- Set color, opacity, rotation, and clearance buffer.
- Click a tent model (green highlight), then click map location.
- Drag placed objects directly on the map to fine-tune position.
- Use custom rectangle when exact tent model is not listed.

### 4) Validate fit and spacing

- Watch `Overlaps` in status bar (buffered overlap warning).
- Use `Measure Distance` for lane/setback checks.
- Use `Measure Area` for lot or lawn capacity checks.

### 5) Save, share, and print

- `Save Scenario` for full working state backup/reload.
- `Export GeoJSON` for GIS/coordination workflows.
- `Print Fit` to frame objects for print output with metadata footer.

### Keyboard Shortcuts

- `Esc`: return to View mode.
- `/`: focus search input.
- `P`: start placing selected tent.

### Field Tips

- Save scenario snapshots frequently during fast-moving operations.
- Use a consistent clearance preset across teams before final layout handoff.
- Confirm final print/export after applying any scale preset or map move.

## Notes

- We will update this file as features are added, priorities change, and versions are bumped.
