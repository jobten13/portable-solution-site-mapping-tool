# VPC Mapping Tool — Project Notes

*Last updated: 2026-05-19 (aligned with app v0.8.8)*

Operator-facing documentation: **`README.md`**. Field quickstart: **`VPC Mapping Tool - Quickstart.html`**. Spec alignment: **`VENDOR_SPECS_DIGEST.md`**.

---

## Project overview

**VPC Mapping Tool** (v**0.8.8**) — Single-file HTML app for emergency field hospital site layout. Leaflet.js map at true scale, vendor `TENT_DB` (five vendors), click-then-place workflow, drag/rotate handles, snap-to-face attachment, two-tier overlap (footprint red / clearance buffer amber), undo/redo (50 steps), role tagging with custom roles, debounced browser autosave with manual **Restore Autosave**, portable **Save Plan** / **Open Plan**, GeoJSON export, PDF export with map snapshot, and print fit.

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

## Immediate feature backlog (VPC tool)

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

### v1 — VPC standalone PWA

Map tool with backlog above implemented; offline-capable; installable on tablet/desktop. Single-file app is nearly PWA-ready — **manifest + service worker** (especially tile caching) are the main additions.

**Gap vs v1:** Items 1–13 in backlog; true offline basemap; tablet UX.

### v2 — Calcs shell

Five calculators in a tabbed shell. Shared deployment header (days/beds/buffer once → all tabs). No map. Standalone logistics tool for teams that do not need spatial layout.

### v2.5 — VPC + calcs combined (non-PWA)

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
| Autosave (`vpc-mapping-session`) | Same browser | No |
| Save Plan JSON | File / email | Yes |
| Undo stack | Session memory | No — lost on refresh |

**Medicines/consumables data:** UCD lists today. International use needs a decision: WHO/MSF-standard rates (shareable) vs hospital-specific (user-configurable).

**Single-file vs multi-file:** VPC stays single-file for distribution until v2.5+. Combined app should be multi-file PWA with service worker.

**Schema:** Not released yet — plan/GeoJSON schema may change freely until v1.

---

## Deferred / discussed

- **Collapsible placed list** — Low priority; list already pinned (~220px) with internal scroll. More valuable once tablet mode exists.
- **Drag-and-drop from sidebar** — Removed from current workflow; click-then-place is standard (v0.6.2+).
- **Automatic session restore on load** — Removed v0.8.7; intentional to avoid surprising overwrites; use Restore Autosave.
---

## Decisions

- **2026-06-10 — Quickstart PDF retired permanently.** `VPC Mapping Tool - Quickstart.pdf` has been removed from the project. **`VPC Mapping Tool - Quickstart.html`** is the sole quickstart source going forward; no PDF will be regenerated.

---

## Doc maintenance

- Bump *Last updated* and version when `APP_META.version` changes in `VPC Mapping Tool.html`.
- Keep **README.md**, **VPC_Project_Notes.md**, **Quickstart.html**, and in-app tooltips in sync on each release.
- Shipped features: document in README changelog; remove from backlog here.
