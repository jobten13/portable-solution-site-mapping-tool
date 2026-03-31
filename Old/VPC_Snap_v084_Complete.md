# VPC Mapping Tool — Snap Cleanup + Face Selection
**Version target:** v0.8.4
**Date:** 2026-03-10

All snap-related fixes in implementation order. Fixes 1–5 are from the v0.8.1 cleanup pass; Fix 2 is replaced here by the full face-selection implementation. Fix 6 is the face-selection geometry upgrade.

---

## Fix 1 — Incomplete U5: move cursor coords to map overlay (Bug)

**Problem:** `.map-coords-overlay` CSS was added in 0.8.2 but `#cursor-pos` was never moved out of the status bar. The overlay CSS class is written and unused; cursor coords still appear in the statusbar crowding five other items.

**HTML — remove from `#statusbar` (~line 452):**
```html
<!-- REMOVE this div from #statusbar -->
<div id="cursor-pos">Hover map for coords</div>
```

**HTML — add overlay inside `#map` div (~line 443):**
```html
<div id="map">
  <div id="cursor-pos" class="map-coords-overlay">—</div>
</div>
```

No JS change needed — the `mousemove` handler already updates `#cursor-pos` by id.

**Print CSS — already correct.** `.map-coords-overlay` is already in the `@media print` hide list (~line 280).

---

## Fix 2 — Snap offset uses new tent's length only, ignoring width → replaced by Fix 6

~~Pass `newWidthM` to `getSnapAttachLatLng`~~ — **superseded by Fix 6 below**, which replaces the entire function with a four-face implementation. Do not apply the partial Fix 2 stub from the previous cleanup doc.

---

## Fix 3 — Snap checkbox persists silently across placements (UX)

**Problem:** After one snap placement the checkbox stays checked and `selectedObjectId` still points to the last-used target. The hint text gives no warning that snap stays armed.

**Fix A — Update hint text (~line 346):**
```html
<!-- REPLACE -->
<p class="dim-note" id="snap-hint" style="display:none;">Select an object on the map, then place; new tent will match its rotation and attach.</p>

<!-- WITH (updated again to reflect face-selection in Fix 6) -->
<p class="dim-note" id="snap-hint" style="display:none;">Select a placed object, then click near the face you want to attach to. New tent matches rotation. Click near a length end or width end — nearest face wins. Best for rect-to-rect. Stays active until unchecked.</p>
```

**Fix B — Auto-uncheck after each snap placement** (optional but recommended):

In `map.on('click')`, after a successful snap placement (see the updated call site in Fix 6), add:
```js
if (attachedToLabel) {
  const snapCheck = document.getElementById('snap-to-selected');
  const snapHint  = document.getElementById('snap-hint');
  if (snapCheck) snapCheck.checked = false;
  if (snapHint)  snapHint.style.display = 'none';
}
```

> **Note:** If placing multiple tents against the same target in a row (e.g. two vestibules on one shelter), skip Fix B and rely on Fix A's hint text alone. Fix A is the minimum; Fix B is a judgment call per workflow.

---

## Fix 4 — `cancelPlacing` overwrites snap status message (Code order)

**Problem:** Current order at lines 1502–1504:
```js
placeObject(...);
cancelPlacing();                                    // → setMode('View Mode')
if (attachedToLabel) setMode(`Attached to ...`);    // overwrites it — works today but fragile
```

**Fix:** Compute `postMode` before `cancelPlacing`, then apply after. This is handled in the updated call site in Fix 6 — do not apply separately.

---

## Fix 5 — Extract `ROLES` to a shared constant (Hygiene)

**Problem:** Role options are hardcoded in two places:
- HTML `<select id="obj-role">` (~line 349): inline `<option>` elements
- JS `createObjectListItem()` (~line 1949): `['—', 'Triage', 'Ward', 'ICU', 'Pharmacy', 'Support', 'Morgue']`

Adding a new role requires updating both. They can silently diverge.

**Add constant to the constants block (~line 494):**
```js
const ROLES = ['—', 'Triage', 'Ward', 'ICU', 'Pharmacy', 'Support', 'Morgue'];
```

**Replace hardcoded array in `createObjectListItem` (~line 1949):**
```js
// REPLACE:
['—', 'Triage', 'Ward', 'ICU', 'Pharmacy', 'Support', 'Morgue'].forEach(r => {

// WITH:
ROLES.forEach(r => {
```

The HTML `<select id="obj-role">` option elements can stay as-is (rendered once, not rebuilt) — the JS array in `createObjectListItem` is the high-risk divergence point since it runs on every `updateList()` call.

---

## Fix 6 — Full face-selection snap (replaces Fix 2)

### Geometry background

At `angleDeg = 0`, the coordinate axes used throughout the tool are:
- `dx` = east/west → **width axis** (`±widthM/2`)
- `dy` = north/south → **length axis** (`±lengthM/2`)

After rotation by `angleDeg`, the four face midpoints of a rect target are:

| Face | `dx` offset | `dy` offset |
|------|-------------|-------------|
| Length end A ("north" at 0°) | `-hl · sinA` | `hl · cosA` |
| Length end B ("south" at 0°) | `hl · sinA` | `-hl · cosA` |
| Width end A ("west" at 0°) | `-hw · cosA` | `-hw · sinA` |
| Width end B ("east" at 0°) | `hw · cosA` | `hw · sinA` |

where `hl = target.lengthM / 2`, `hw = target.widthM / 2`.

Since the new tent inherits the target's rotation, its attaching face is on the same axis. The outward offset from the chosen target face to the new tent's center is:
- Length-end attachment → `newLengthM / 2` along the length axis direction
- Width-end attachment → `newWidthM / 2` along the width axis direction

### Replace `getSnapAttachLatLng` (~line 1682)

Remove the entire existing function and replace with:

```js
// Given a target object and the new tent's dimensions, return { latlng, face } where
// latlng is the new tent center and face is 'length' or 'width'.
// The click point determines which of the target's 4 face midpoints is nearest.
// Both tents share the target's rotation. Returns null if target has no usable dimensions.
function getSnapAttachLatLng(target, newLengthM, newWidthM, clickLatlng) {
  const tHL = (target.lengthM != null ? target.lengthM : target.widthM) / 2; // half-length
  const tHW = target.widthM / 2;                                              // half-width
  if (!tHL || tHL <= 0 || !tHW || tHW <= 0) return null;

  const angleDeg = normalizeAngle(target.angleDeg || 0);
  const rad      = angleDeg * Math.PI / 180;
  const sinA     = Math.sin(rad);
  const cosA     = Math.cos(rad);
  const center   = target.latlng;

  // Four face midpoints of target
  const faces = [
    { pt: L.latLng(metersToDeg(center, -tHL * sinA,  tHL * cosA)),  axis: 'length', dir: -1 }, // length end A
    { pt: L.latLng(metersToDeg(center,  tHL * sinA, -tHL * cosA)),  axis: 'length', dir:  1 }, // length end B
    { pt: L.latLng(metersToDeg(center, -tHW * cosA, -tHW * sinA)),  axis: 'width',  dir: -1 }, // width end A
    { pt: L.latLng(metersToDeg(center,  tHW * cosA,  tHW * sinA)),  axis: 'width',  dir:  1 }, // width end B
  ];

  // Pick the face midpoint nearest the click
  let nearest = null, nearestDist = Infinity;
  faces.forEach(f => {
    const d = clickLatlng.distanceTo(f.pt);
    if (d < nearestDist) { nearestDist = d; nearest = f; }
  });
  if (!nearest) return null;

  // Offset new tent center outward from chosen face by half the new tent's matching dimension
  const newHalf = nearest.axis === 'length' ? newLengthM / 2 : newWidthM / 2;
  const [lat, lng] = nearest.axis === 'length'
    ? metersToDeg(nearest.pt, -newHalf * sinA * nearest.dir, newHalf * cosA * nearest.dir)
    : metersToDeg(nearest.pt,  newHalf * cosA * nearest.dir, newHalf * sinA * nearest.dir);

  return { latlng: L.latLng(lat, lng), face: nearest.axis };
}
```

### Update the snap call site in `map.on('click')` (~lines 1485–1504)

Replace everything from `const color = getVendorColor(vendor);` through `if (attachedToLabel) setMode(...)` with:

```js
  const color = getVendorColor(vendor);
  let placeLatLng     = e.latlng;
  let placeAngle      = angleDeg;
  let attachedToLabel = null;
  let attachedFace    = null;

  const snapCheck = document.getElementById('snap-to-selected');
  if (snapCheck && snapCheck.checked && selectedObjectId != null) {
    const target = getObjectById(selectedObjectId);
    if (target && objects.includes(target)) {
      const result = getSnapAttachLatLng(
        target,
        lengthFt * FT_TO_M,
        widthFt  * FT_TO_M,
        e.latlng
      );
      if (result) {
        placeLatLng     = result.latlng;
        placeAngle      = normalizeAngle(target.angleDeg || 0);
        attachedToLabel = target.label;
        attachedFace    = result.face;
      }
    }
  }

  placeObject(placeLatLng, label, shape, widthFt * FT_TO_M, lengthFt * FT_TO_M, color, opacity, placeAngle, bufferFt, vendor, extra);

  // Compute post-place status before cancelPlacing overwrites mode (fixes Fix 4)
  const postMode = attachedToLabel
    ? `Attached to ${sanitizeLabel(attachedToLabel)} (${attachedFace} face)`
    : null;
  cancelPlacing();
  if (postMode) setMode(postMode);

  // Optional Fix 3B: auto-uncheck snap after placement
  if (attachedToLabel) {
    const snapHint = document.getElementById('snap-hint');
    if (snapCheck) snapCheck.checked = false;
    if (snapHint)  snapHint.style.display = 'none';
  }
```

---

## Version bump

Update `APP_META.version` to `0.8.4` and add changelog entry:
```
0.8.4: Snap face selection — click near any of target's 4 faces (2 length ends, 2 width ends);
offset uses correct half-dimension per axis. Fixes cursor coords overlay (U5), snap hint text,
cancelPlacing/setMode order, and ROLES constant.
```

---

## Geometry verification checklist

Run these manually in a browser before shipping:

| Test | Expected |
|------|----------|
| Vestibule (7×8) → BLU-MED 2032.5 (20×32.5), click near length end | Flushes to 32.5' end; status "length face" |
| Vestibule (8×6 WS) → GK1935, click near length end | Attaches to 33'11" end — slight overhang due to octagon corner cuts; center math correct |
| DLX X-24 (21.5×24) → X-HUB (22×22), click near width end | Attaches to 22' wide face; status "width face" |
| Two BLU-MED 2032.5 end-to-end, click near length end | 32.5' faces butt flush |
| Rotated target (45°), click each of 4 faces in turn | Each nearest face selected correctly |
| BLU-MED 2032.5 → 2032.5, click near width end (20' face) | Attaches to 20' face with 20'/2 = 10m offset; status "width face" |
| Plus-shape target (X-HUB or Zumro Quad) | Attaches to nearest bounding-box face — visually approximate, usable for rough layout |

---

## Notes on non-rect target accuracy

- **Elongated-octagon (GK1935):** Face midpoints use full bounding-box dimensions. Actual end face is shorter due to corner cuts, so a vestibule will sit ~1–2 ft proud. Known limitation; acceptable for planning.
- **Plus-shape (X-HUB, Zumro Quad):** Width and length endpoints are on arm tips, not connector openings. Snap lands at arm tip; exact connector alignment needs manual fine-tuning after placement.
- **Ellipse (HDT 8D36):** Snap works geometrically but "flush face" has no meaning on a dome. Low usage risk.
- **Circle:** `target.lengthM` may be null; the `target.lengthM != null ? ... : target.widthM` fallback handles this. Snap to a circle won't crash but is not geometrically meaningful.

Consider adding a one-line note to the README snap entry: *"Snap is most accurate for rect-to-rect connections. Non-rectangular targets (octagon, plus, ellipse) use bounding-box face midpoints."*

---

## Implementation order

1. Fix 5 — `ROLES` constant (safe, isolated, no risk)
2. Fix 1 — cursor coords overlay (HTML only)
3. Fix 6 — replace `getSnapAttachLatLng` + update call site (includes Fix 2, Fix 4)
4. Fix 3A — update hint text
5. Fix 3B — auto-uncheck (optional, decide before shipping)
6. Version bump + README note
