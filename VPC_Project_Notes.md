# VPC Mapping Tool — Project Notes
*Last updated: 2026-03-11*

---

## Project Overview

**VPC Mapping Tool** (v0.8.4) — A single-file HTML application for emergency field hospital planning. Built on Leaflet.js with a real vendor tent/structure database, SAT polygon collision detection, snap-to-face placement, undo/redo, scenario save/load, GeoJSON export, and PDF export.

**Use case:** Field hospital planning and setup — domestic emergency response initially, international expansion planned. Primary users are incident commanders and field coordinators.

**Calculator Suite** — Five companion tools (all HTML/JS, offline-capable, scenario-based):
- Load Calc Basic
- Load Calc Pro
- Water Calc
- Consumables Calc (UCD Ward + ICU lists)
- Medicines Calc (UCD Medications list, Ward/ICU/Pharma)

All calculators use per-day/per-bed calculations and share consistent design language.

---

## Immediate Feature Backlog (VPC Tool)

1. **Tablet mode / sidebar hide** — Toggle in header; auto-detect on load (viewport <1024px or touch device); manual override; persisted in localStorage
2. **Floating overlap warning badge** — Map-level pill indicator; visible regardless of sidebar state; disappears when no overlaps
3. **Click placed item → fly-to + highlight** — Animate/pulse the map object; brief toast as secondary confirmation
4. **Capacity tracking** — User-input beds/patients per placed object; optional default per tent type; running total for incident commanders
5. **Access corridors** — Pathways between structures (ambulance, staff, evacuation routes)
6. **Utilities overlay** — Rough power, water, waste line drawing; longer-horizon: merge with calculator suite
7. **Named zones/sectors** — Grouping structures beyond current role tagging
8. **Offline-first tile caching** — For austere/international environments
9. **Coordinate export** — Lat/lng per object for logistics/aviation handoff
10. **Metric/imperial toggle** — Critical for international use
11. **Deployment phases** — Mark structures Phase 1/2/etc for staged setup planning
12. **PDF with map image** — Current export omits the map; significant gap for briefings

### Notes on specific items

**Item 2 — Overlap badge:** The status bar already shows overlap count but is easy to miss. A floating map-level pill is harder to miss and has no sidebar dependency. Disappears at zero overlaps to avoid visual noise.

**Item 4 — Capacity:** Bed counts vary by hospital and patient acuity — hard assumptions will get pushback. User input per placement is the right approach, with an optional default per tent type to speed up placement. ICU vs Ward role tagging already in the tool maps directly to the calculator consumption profiles.

**Item 6 — Utilities:** Longer-horizon vision is a full merge with the calculator suite. The data model aligns — every calculator uses days/beds/buffer, which flows directly from placed structures and capacity tracking.

---

## Product Roadmap

### v1 — VPC Standalone PWA
Map tool only, full feature backlog above implemented, offline-capable, installable on tablet/desktop. The current single-file architecture is nearly PWA-ready — manifest and service worker for tile caching is the main addition.

### v2 — Calcs Shell
Five calculators in a tabbed shell. Shared deployment parameter header (set days/beds/buffer once, flows to all tabs). No map. Useful as a standalone logistics planning tool for teams that don't need spatial layout.

### v2.5 — VPC + Calcs Combined (non-PWA)
Map and all calculators in one shell. Beds/roles placed on the map propagate to calc tabs automatically. Multi-file architecture but no service worker or install requirement. This is the key integration point — the map becomes the input form for the calculators.

### v3 — Unified PWA
Everything in v2.5 packaged as a fully installable offline PWA. Tile caching for expected deployment areas (or a "cache this area" workflow). Full offline operation. Multi-file PWA architecture required at this scale — single file would be unwieldy.

---

## Architecture Notes

**Integration data flow:**
Placed structures → role tagging (Ward/ICU) → bed capacity per structure → running totals → auto-populate days/beds/role split in calculator tabs

**Offline tiles:** Trickiest piece. Options are pre-cached tiles for known deployment areas or a user-initiated "cache this area" workflow before going into the field.

**Medicines/consumables data:** Currently based on UCD lists. Sensitivity question needs answering for international use — if WHO/MSF-standard rates, shareable; if hospital-specific, needs to be user-configurable.

**Single-file vs multi-file:** Current VPC tool is single-file HTML which is elegant for distribution. At v2.5+ scale (map + 5 calculators) a multi-file PWA with a service worker managing assets is the right call.

---

## Deferred / Discussed Items

- **Collapsible placed items list** — Low priority. The list is already pinned at 220px with internal scroll so it doesn't steal space from the tent catalog. Worth doing for small screens but not urgent.
- **IDE-style workflow** — Claude Code + Cursor is a reasonable combo for this project. Claude Code for planning/reasoning with file access, Cursor for inline edits and iteration.

---

*This document is the running project log. Continue this conversation in Claude.ai to pick up where we left off.*
