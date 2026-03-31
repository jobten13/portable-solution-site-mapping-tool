# VPC Mapping Tool — UX/UI Refactor Spec

Target file: `VPC Mapping Tool.html`  
Goal: Reduce sidebar clutter, remove redundant controls, and reorganize around the actual field operator task flow.

---

## 1. Remove Redundant Controls

### 1a. Remove "📍 Place on Map" and "Cancel" buttons
- **Why:** Clicking a tent model in the list already enters place mode. These buttons are redundant.
- **Exception:** The Custom Rectangle section still needs its own "Place Custom" trigger — keep that button only there.
- **Action:** Delete the `<button class="place-btn">` and the Cancel `<button>` from the Label & Style section entirely.

### 1b. Remove "Back to View" from the header
- **Why:** `Esc` already exits place/measure mode and is documented in the Quick Start. A persistent header button adds noise.
- **Action:** Delete the `<button class="ghost header-btn" onclick="resetViewMode()">Back to View</button>` from `#header`.
- **Optional enhancement:** Make the `#mode-display` badge itself clickable to call `resetViewMode()` when not in View Mode, so there's still a visible affordance without a dedicated button.

---

## 2. Move Undo / Redo to the Header

- **Why:** Undo/Redo are high-frequency actions, not plan-management actions. They're buried at the bottom of the Plan section.
- **Action:** Move the Undo and Redo buttons into `#header`, to the right of the mode badge. Style them as compact ghost buttons consistent with "Print Fit".
- **Remove** Undo/Redo from the Plan section in the sidebar. Keep Save Plan, Open Plan, Export GeoJSON, and the autosave note there.

---

## 3. Collapse "Label & Style" into Two Tiers

The current section has six stacked controls. Split into **primary** (always visible) and **advanced** (collapsed by default).

### Primary — always visible:
- Custom Label input
- Role / Zone select

### Advanced — hidden under an "Options ▾" disclosure toggle, open by default only if user has previously expanded it (use `localStorage` key `vpc_options_open`):
- Color swatches
- Opacity slider
- Rotation slider
- Clearance Buffer slider + presets (None / Std 5 ft / High 10 ft)
- "Apply Buffer to All Placed" button

**Implementation:** Wrap the advanced controls in a `<div id="style-advanced">` with `display:none` by default. Add a toggle button above it:
```html
<button class="ghost" onclick="toggleStyleAdvanced()" style="width:100%;font-size:11px;margin-top:4px;">
  Options ▾
</button>
```

---

## 4. Make Measurement Buttons Contextual

Currently four measurement buttons are always visible. They should show/hide based on state.

### Always visible:
- "Measure Distance" button
- "Measure Area" button

### Visible only when a measurement is active (add/remove a CSS class or toggle `display`):
- "Finish Area" button — show only when area measure is in progress
- "Clear Measurement" button — show only when any measurement exists

**Implementation:** Add a helper `updateMeasureUI()` called after every measure state change. It sets visibility of Finish Area and Clear Measurement based on `measureMode` and whether `measurePoints.length > 0` (or equivalent state variable).

---

## 5. Collapse Low-Frequency Sections

Move infrequently-used setup controls into a collapsible "Setup ▾" section at the bottom of the sidebar, collapsed by default.

### Move into "Setup ▾":
- Scale Presets (1:100, 1:150, 1:200, 1:500) and their explanatory note
- Print Metadata (Operation Name input)

### Keep outside (always visible):
- Vendor tabs + tent list
- Label & Style (per item 3 above)
- Custom Rectangle
- Plan (Save/Open/Export)
- Measure
- Placed objects list

**Implementation:** Wrap Scale Presets and Print Metadata `<div class="sb-section">` blocks in a new collapsible wrapper:
```html
<div class="sb-section">
  <button class="ghost" onclick="toggleSetup()" style="width:100%;text-align:left;font-size:11px;">
    Setup ▾
  </button>
  <div id="setup-panel" style="display:none;">
    <!-- Scale Presets and Print Metadata sections here -->
  </div>
</div>
```

---

## 6. Reorder Sidebar Sections

Reorder to match the natural operator task flow (top = first action, bottom = reference):

1. **Vendor + Model** — vendor tabs + tent list *(unchanged)*
2. **Label & Style** — collapsed Options ▾ *(per item 3)*
3. **Custom Rectangle** *(unchanged, but consider renaming to "Custom Size")*
4. **Plan** — Save Plan, Open Plan, Export GeoJSON *(Undo/Redo removed, now in header)*
5. **Measure** — contextual buttons *(per item 4)*
6. **Setup ▾** — collapsed by default *(scale presets + operation name)*
7. **Placed Objects list** — keep at bottom as running inventory

---

## 7. Minor Polish

- **"Apply Buffer to All Placed"** — this is a bulk destructive action. Add a `confirm()` dialog before applying: `"Apply X ft buffer to all N placed objects?"`.
- **"Clear All"** — already has confirm behavior; verify it respects undo history (it should push to undo stack before clearing).
- **Explanatory microcopy** — remove or shorten the gray helper text paragraphs inside sections (e.g., the Scale Presets note, the Plan note, the Measure instructions). Move essential hints to `title` attributes on buttons instead, reducing visual bulk while keeping discoverability.
- **Custom Rectangle section note** — current copy is `"Drag a box on the map to place a custom-sized shelter."` — this is inaccurate (it's not drag-to-draw, it's click-to-place). Update to: `"Enter dimensions, then click the map to place."` 

---

## Summary of Changes

| Change | Impact |
|--------|--------|
| Remove Place on Map + Cancel buttons | Removes 2 buttons, reduces confusion |
| Remove Back to View from header | Cleaner header |
| Move Undo/Redo to header | Faster access, shorter sidebar |
| Collapse Opacity/Rotation/Buffer/Color under Options ▾ | Cuts ~5 visible controls by default |
| Contextual Finish Area + Clear Measurement | Removes 2 always-visible buttons |
| Collapse Scale Presets + Operation Name into Setup ▾ | Removes 1 section from default view |
| Reorder sections to match task flow | Reduces cognitive load |
| Fix Custom Rectangle microcopy | Corrects inaccurate instruction |
