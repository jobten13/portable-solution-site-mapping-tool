# Vendor Tent Specs Digest (PoP 3)

**Status: Implemented.** The recommendations below have been applied in the Portable Solution Site Mapping Tool: `TENT_DB` dimensions and shapes match this digest; vendor pre-assigned colors (BLU-MED, Western Shelter, DLX, ZUMRO, HDT, Craftsmen, FORTS, WillScot, Power) are used for placement and when loading plans. HDT soft-sided standard set: Base-X 305 and Base-X Dome (8D36); extended (hidden) also includes Base-X 505, Quick Halt 402/403, Airbeam 3236A. Hard-sided Craftsmen / FORTS / WillScot added 2026-08-11 (PSC-primary, fidelity unconfirmed). Sixteen extended-tier soft-sided models added 2026-08-11 (catalog import Step 5) — hidden behind fail-closed tier filter; minimum-valid rect bbox; full fidelity deferred. **Power** (pseudo-vendor catalog tab) holds the Generator 70 kVA — relocated from Western Shelter 2026-08-12 (planning grouping, not procurement).

---

**Source:** `C:\Users\jason\Desktop\IMPACTS Project\PoP 3\VPC Mapping\Vendor Specs and Manuals`  
**Folders:** Soft-sided OEM pack — **BLU-MED**, **DLX**, **HDT Global**, **Western Shelter & Third Party**, **ZUMRO**. Hard-sided **Craftsmen**, **FORTS**, **WillScot** (added 2026-08-11) have **no OEM folders** in that pack — PSC combined catalog via performer-team transfer only. Extended DLX models (ASAP18, X-8, X-16, X-24SC, X-40) are **PSC/data.js-primary** pending OEM sheets in the pack.  
**Purpose:** Align Portable Solution Site Mapping Tool `TENT_DB` with manufacturer spec sheets where they exist; hard-sided entries document PSC-primary, unconfirmed footprints until OEM sheets are obtained; extended-tier entries are minimum-valid (hidden) until deliberately surfaced.

---

## 1. BLU-MED

| Model | Spec source | Spec dimensions (L × W or W × L) | Shape | Notes | Tool current |
|-------|-------------|----------------------------------|-------|-------|--------------|
| **2032.5** | Instructions - TM_20x32.5 BLU-MED XPH Shelter (Instructions & Manuals) | **20' × 32.5'** (manual title) | rect | 650 sq ft implied | 20 × 32.5 ✓ |
| **2039** | Instructions - TM_2039 XPH Shelter (Instructions & Manuals) | **20' × 39'** (manual title) | rect | Modular extend | 20 × 39 ✓ |
| **Vestibule** | Instructions - TM_7x8 Vestibule w BTD (Instructions & Manuals) | **7' × 8'** (2.13 m × 2.44 m) | rect | BM-7x8-VEST-BTD | 7 × 8 ✓ |

Heights (for reference only; tool is footprint-only): Not extracted from PDFs; optional for future “height” field.

---

## 2. DLX

Tech sheets: “Dimensions (L x W)” in spec table. Spec Sheets: X-Series X-24, X-32, X-Hub Shelter Tech Sheets (Nov 2024).

| Model | Spec source | Spec dimensions (L × W) | Area | Height | Shape | Tool current |
|-------|-------------|---------------------------|------|--------|-------|--------------|
| **X-24** | X-Series X-24 Shelter Tech Sheet Updated 11_18_24.pdf | **24 × 21.5 ft** (7.3 × 6.6 m) | 516 ft² | 10.25 ft | rect | 24 × 21.5 ✓ |
| **X-32** | X-Series X-32 Shelter Tech Sheet Updated 11_18_24.pdf | **32 × 21.5 ft** (9.8 × 6.6 m) | 688 ft² | 10.25 ft | rect | 32 × 21.5 ✓ |
| **X-HUB (Quad)** | X-Hub Shelter Tech Sheet Updated 11_19_24.pdf | **22 × 22 ft** (6.7 × 6.7 m) | 484 ft² bbox (spec prints “48 ft²” – typo; 22×22=484); rendered ~482 ft² with 1.0 ft chamfer | 12.5 ft | cut-corner-square | 22 × 22 ✓; **cornerCutW 1.0**, cornerCutL 1.0 — unverified from a primary dimension spec (overall 22'×22' bounding box confirmed; corner chamfer not confirmed from manufacturer spec sheet — verify with DLX). |

**Extended (hidden, tier:`extended`) — minimum-valid rect bbox; fidelity deferred:**

| Model | Spec source | Spec dimensions (W × L in tool) | Area | Shape | Tool current |
|-------|-------------|----------------------------------|------|-------|--------------|
| **ASAP18** | PSC / data.js (OEM ASAP-18 sheet missing from pack) | **16 × 18** | 288 ft² | rect | 16 × 18 ✓ (extended) |
| **X-8** | PSC / data.js (OEM missing) | **21.5 × 8** | 172 ft² | rect | 21.5 × 8 ✓ (extended); connector beds null |
| **X-16** | PSC / data.js (OEM missing) | **21.5 × 16** | 344 ft² | rect | 21.5 × 16 ✓ (extended) |
| **X-24SC** | PSC / data.js (OEM Side-Connect missing) | **25.3 × 24** | 607.2 ft² bbox (interior 531) | rect | 25.3 × 24 ✓ (extended) |
| **X-40** | PSC / data.js (OEM missing) | **21.5 × 40** | 860 ft² | rect | 21.5 × 40 ✓ (extended) |

---

## 3. HDT Global

| Model | Spec source | Spec dimensions | Area | Shape | Tool current |
|-------|-------------|-----------------|------|-------|--------------|
| **Base-X 305** | HDT_305shelter_13-13.pdf (Spec Sheets) | Outer footprint **20'6" × 25'** (18' interior clear span). Width corrected from interior clear span (18') to outer cover dimension (20'6") per **HDT_305shelter** spec diagram. | 450 ft² | rect | **20.5 × 25** ✓ |
| **Base-X 8D36** | HDT_8D36Shelter_11.pdf (Spec Sheets) | Interior **31' × 37'** (9.45 × 11.28 m) | 935 ft² spec; rendered ~925 ft² with 8.4/13.2 ft legs | cut-corner-rectangle | 31 × 37 ✓; **cornerCutW 8.4**, cornerCutL 13.2 — unverified from a primary dimension spec (overall 31'×37' bbox confirmed; corner legs derived by pixel-measure from top-down diagram, cross-checked vs sheet area figure — verify with HDT). |

**Extended (hidden, tier:`extended`) — minimum-valid rect bbox; fidelity deferred:**

| Model | Spec source | Spec dimensions | Area | Shape | Tool current |
|-------|-------------|-----------------|------|-------|--------------|
| **Base-X 505** | HDT_505shelters_06.pdf; PSC alternate unresolved | Vendor diagram ~**25'7" × 25'7"** outer; PSC alternate 26'×25'×13' unresolved | ~654.5 ft² bbox | rect | 25.583 × 25.583 ✓ (extended) |
| **Quick Halt 402** | HDT_Quick-Halt_TAC_Shelter_08.pdf | One published set: Interior (W×L) **15' × 12'** / 180 ft²; no separate exterior (unlike 305). Tool order **12 × 15** (smaller-first) | 180 ft² | rect | 12 × 15 ✓ (extended) |
| **Quick Halt 403** | HDT_Quick-Halt_TAC_Shelter_08.pdf | One published set: Interior (W×L) **15' × 18'** / 270 ft²; no separate exterior (unlike 305). Tool order **15 × 18** | 270 ft² | rect | 15 × 18 ✓ (extended) |
| **Airbeam 3236A** | HDT_32SeriesAirBeam_17.pdf | Bbox **77'4" × 34'5"**; transfer tapered-end class deferred to rect | ~2662 ft² bbox | rect | 34.417 × 77.333 ✓ (extended) |

Heights (305: eave ~6'7", peak ~10'6"; 8D36: diagram ~7'4" liner, ~14'7" peak) – optional for future. Anchor kits: 69KHSA305 and 69KHSA8D36.pdf in Spec Sheets.

---

## 4. Western Shelter & Third Party

| Model | Spec source | Spec dimensions | Area | Shape | Tool current |
|-------|-------------|-----------------|------|-------|--------------|
| **GK1935 (SW-1935)** | SW-1935.pdf (Spec Sheets) | **18' 7" × 33' 11"** overall; symmetric corner cuts; **7'8"** exterior corner face; sheet **7'6"** = interior clear-span (same convention as GK20) | ~570 ft² | cut-corner-rectangle | 18.583 × 33.917, **cornerCutW 5.421**, cornerCutL 5.421 ✓ (symmetric 45° cut; each leg 5.421 ft → 7'8" exterior face) |
| **GK20** | Instructions - WS_GK20 Set Up.pdf; Western-Shelter-_-Product-Catalog.pdf (no dedicated SW-20 spec sheet) | **18' 7"** across flats; **7' 8"** equal facets; regular octagon (SW-20) | ~286 ft² | octagon | 18.583 × 18.583 ✓ |
| **Vestibule (SO-VC8H)** | Western Shelter SO-VC8H spec (see Vendor Specs and Manuals); replaces prior misread (6' was sidewall height, not depth) | Footprint **7'8" × 7'4"**; **6'** sidewall height | 56 ft² | rect | **7.667 × 7.333** ✓ |

**Extended (hidden, tier:`extended`) — minimum-valid rect bbox; fidelity deferred:**

| Model | Spec source | Spec dimensions | Area | Shape | Tool current |
|-------|-------------|-----------------|------|-------|--------------|
| **GK2342** | SW-2342_Shelter.pdf; PSC alternate 22'8" unresolved | Vendor **22'6" × 41'2"** bbox; cut-corner class (GK1935 precedent 7'8"/7'6") deferred | ~926 ft² bbox | rect (cut-corner deferred) | 22.5 × 41.167 ✓ (extended) |
| **GK2360** | SW-2360.pdf | **22'8" × 60'1"** bbox; cut-corner class (GK1935 precedent) deferred | ~1362 ft² bbox | rect (cut-corner deferred) | 22.667 × 60.083 ✓ (extended) |
| **Guardian 2032** | Guardian_2032x3065.pdf + PSC | **20' × 32'6"** plan rect (Quonset elevation) | 650 ft² | rect | 20 × 32.5 ✓ (extended) |
| **Guardian 3065** | Guardian_2032x3065.pdf + PSC | **30' × 65"**; PSC inch typo (65"/height 15') unresolved | 1950 ft² | rect | 30 × 65 ✓ (extended) |

---

## 4b. Power (equipment / planning grouping)

Pseudo-vendor catalog tab (**not** an OEM shelter vendor). Holds support equipment that serves any vendor's shelters. Spec sheets for the Generator still live in the **Western Shelter & Third Party** reference folder (procurement history); catalog grouping is **planning**, not purchasing.

| Model | Spec source | Spec dimensions | Area | Shape | Tool current |
|-------|-------------|-----------------|------|-------|--------------|
| **Generator 70 kVA (on trailer)** | MQP3Generators, trailer data sheet in folder: DCA70SSJU4F-03-Trailer-Data-Sheet-TRLR75XF2.pdf | **Trailer TRLR70US** (70 kVA): 169.4" × 72.5" → **14.12' × 6.04'** L×W for mapping. 70 kVA / 56 kW, 103 gal, Isuzu Tier 4. Folder has TRLR75XF2 sheet; TRLR70US dims from generator/trailer spec. | — | rect | 14.12 × 6.04 ✓ (`TENT_DB` key **Power**; id `ws-generator-70kva` unchanged). Relocated from Western Shelter 2026-08-12. |

---

## 5. ZUMRO

| Model | Spec source | Spec dimensions (exterior / interior) | Area | Shape | Tool current |
|-------|-------------|--------------------------------------|------|-------|--------------|
| **Model 400** | Zumro 400 Specs.pdf (Spec Sheets) | Length 21', Exterior width 20', Interior 19.2'; heights 10' / 10.7' | 400 ft² | rect | 20 × 21 (exterior) ✓ |
| **Model 600** | Zumro 600 Specs.pdf (Spec Sheets) | Length 31', Exterior width 20.4', Interior 19.3'; heights 9' / 9.7' | 600 ft² | rect | 20.4 × 31 (exterior) ✓ |
| **Quad Interface** | Zumro Quad Interface.pdf (Spec Sheets) | Exterior footprint **29.4' × 19.5'** (what the tool maps); interior width **15.7'**; four Quad connection faces; side connectors ~**1.9'** E/W, end ~**6.85'** N/S; heights 8.5' / 8' | **~454 ft² interior** floor (air-beam — inflated beams reduce usable interior below exterior footprint); exterior footprint ~521 ft² | plus | 19.5 × 29.4, armWidthFt 15.7 ✓ (exterior footprint; render faithful — no geometry change) |
| **Interconnect** | ZUMRO_Interconnect_Dimensions.md; engineering drawing (ZUMRO_Interconnect_to_WS / Photo - Zumro Interconnect to Western Shelter.png) | **7.17' × 6.92'** (86" × 83") | rect | 7.17 × 6.92 ✓ |

**Extended (hidden, tier:`extended`) — minimum-valid rect bbox; fidelity deferred. External Airlock ≠ Interconnect.**

| Model | Spec source | Spec dimensions | Area | Shape | Tool current |
|-------|-------------|-----------------|------|-------|--------------|
| **Model 216** | Zumro 216.pdf + PSC | Exterior **14.7' × 16'**; UNRESOLVED floor-space 151 vs 216 | 235.2 ft² bbox | rect | 14.7 × 16 ✓ (extended) |
| **Model 900** | Zumro 900.pdf + PSC | Exterior **32.9' × 30'**; UNRESOLVED PSC 32.9" typo; beds 20–25 vs sheet ≤15 unresolved | 987 ft² | rect | 32.9 × 30 ✓ (extended) |
| **External Airlock** | Zumro External Airlock.pdf (interior); PSC (exterior inches) | **7.167' × 10.667'** (86"×128"); ≠ Interconnect; marketing 65 sq ft anomaly unresolved | ~76.4 ft² | rect | 7.167 × 10.667 ✓ (extended); beds null |

---

## 6. Craftsmen (hard-sided)

| Model | Spec source | Spec dimensions (W × L) | Shape | Notes | Tool current |
|-------|-------------|-------------------------|-------|-------|--------------|
| **8-Bed ICU Trailer** | PSC combined catalog (performer-team specs); no OEM sheet as of import | **Expanded 22.5' × 53'** (mapped); closed **8.5' × 53'** reference-only | rect | Beds **8** (PSC-stated). Elevated; ramp required; ramp run grade-dependent. Fidelity **unconfirmed**. | 22.5 × 53 ✓ |

---

## 7. FORTS (hard-sided)

| Model | Spec source | Spec dimensions (W × L) | Shape | Notes | Tool current |
|-------|-------------|-------------------------|-------|-------|--------------|
| **Model 38** | PSC / data.js base unit (performer-team); no OEM sheet as of import | **18' × 20'** | rect | Beds **"~2 to 3"** derived/unconfirmed (not per-unit vendor-stated). Single base unit, not full PSC assembly. Elevated; ramp required; ramp run grade-dependent. Fidelity **unconfirmed**. | 18 × 20 ✓ |

---

## 8. WillScot (hard-sided)

| Model | Spec source | Spec dimensions (W × L) | Shape | Notes | Tool current |
|-------|-------------|-------------------------|-------|-------|--------------|
| **Patient Unit** | PSC combined catalog (performer-team); no OEM sheet as of import | **23.5' × 60'** (23'6") | rect | Beds **6 to 10** (6 critical / 10 medical surge, PSC p.134 — range). Pairing intent with Staff Unit. Elevated; ramp required; ramp run grade-dependent. Fidelity **unconfirmed**. | 23.5 × 60 ✓ |
| **Staff Unit** | PSC combined catalog (performer-team); no OEM sheet as of import | **11.75' × 60'** (11'9") | rect | Beds **null** (flex/support). Pairing intent with Patient Unit. Elevated; ramp required; ramp run grade-dependent. Fidelity **unconfirmed**. | 11.75 × 60 ✓ |

---

## Summary: Changes Applied in Portable Solution Site Mapping Tool

All of the following are implemented in the tool.

1. **BLU-MED Vestibule**: 7×8 (from TM_7x8 Vestibule).
2. **DLX X-24**: 24×21.5 (L×W per tech sheet).
3. **DLX X-32**: 32×21.5 (L×W per tech sheet).
4. **ZUMRO Model 400**: 20×21 exterior.
5. **ZUMRO Model 600**: 20.4×31 exterior.
6. **ZUMRO Quad Interface**: Exterior footprint **29.4'×19.5'** (what the tool maps; render ~521 sq ft); interior width **15.7'**; **~454 sq ft interior** floor space (air-beam — inflated beams reduce usable interior below exterior footprint); four Quad connection faces; side connectors ~**1.9'** E/W, end ~**6.85'** N/S. Render faithful to exterior footprint; no geometry change.
7. **HDT**: Base-X 8D36 as cut-corner-rectangle 31×37 (cornerCutW 8.4, cornerCutL 13.2 — diagram-derived, unverified); 6D31 removed (product lineup: 305 and 8D36 only).
8. **Western Shelter GK20**: 18'7" across flats, 7'8" equal facets, regular octagon (SW-20); ~286 sq ft.
8b. **Power — Generator 70 kVA on trailer**: 14.12'×6.04'; catalog tab **Power** (planning grouping; specs from Western Shelter & Third Party folder — procurement history). Relocated from Western Shelter tab 2026-08-12.
9. **Western Shelter GK1935**: Overall **18'7"×33'11"**; **symmetric** corner cuts (each leg **5.421 ft**); **7'8"** exterior corner face; sheet **7'6"** = interior clear-span (same convention as GK20); **~570 sq ft**.
10. **Western Shelter Vestibule (SO-VC8H)**: Footprint **7'8" × 7'4"** (7.667 × 7.333 ft), **56 sq ft**; **6'** is sidewall height, not footprint depth. Connects to GK1935 end face.
11. **ZUMRO Interconnect**: Added 7.17'×6.92' rect (footprint from ZUMRO_Interconnect_Dimensions.md / engineering drawing; connects Zumro to Western Shelter).
12. **Craftsmen / FORTS / WillScot (hard-sided, 2026-08-11 import):** PSC-primary, fidelity **unconfirmed** (no OEM sheet). Craftsmen 8-Bed ICU Trailer mapped **expanded 53'×22.5'** (closed 53'×8.5' reference-only). FORTS Model 38 **18'×20'** base unit; beds **"~2 to 3"** derived. WillScot **Patient** 23.5'×60' beds **6 to 10**; **Staff** 11.75'×60' beds null — two placeable units, pairing intent in notes.
13. **Extended catalog (2026-08-11 Step 5):** Sixteen soft-sided transfer-only models added as `tier:'extended'` (hidden). All ship as **rect bbox**, fidelity deferred. Includes DLX ASAP18/X-8/X-16/X-24SC/X-40; HDT 505/QH402/QH403/Airbeam 3236A; WS GK2342/GK2360/Guardian 2032/3065; ZUMRO 216/900/External Airlock. GK2342/GK2360 carry GK1935 cut-corner precedent in notes only. Quick Halt footprint = published sheet dims (no separate exterior; 8D36-style precedent); tool order 12×15 / 15×18.

---

## Source Files Used (Vendor Specs and Manuals)

- **BLU-MED**: Instructions & Manuals — TM_20x32.5 BLU-MED XPH Shelter, TM_2039 XPH Shelter, TM_7x8 Vestibule w BTD. Spec Sheets: BLU-MED Weather Load Shelter Specs.pdf (and others).
- **DLX**: Spec Sheets — Approved for Release X-Series X-24, X-32, X-Hub Shelter Tech Sheet Updated 11_18_24 / 11_19_24.pdf. Extended ASAP18/X-8/X-16/X-24SC/X-40: PSC/data.js only until OEM sheets are added to the pack.
- **HDT Global**: Spec Sheets — HDT_305shelter_13-13.pdf, HDT_8D36Shelter_11.pdf, HDT_505shelters_06.pdf, HDT_Quick-Halt_TAC_Shelter_08.pdf, HDT_32SeriesAirBeam_17.pdf, Anchor Kits 69KHSA305 and 69KHSA8D36.pdf.
- **Western Shelter & Third Party**: Spec Sheets — SW-1935.pdf, SW-2342_Shelter.pdf, SW-2360.pdf, Guardian_2032x3065.pdf, DCA70SSJU4F-03-Trailer-Data-Sheet-TRLR75XF2.pdf, MQP3Generators. Instructions — WS_GK1935 Set Up, WS_GK20 Set Up, GK+Vestibule, Vestibule+Entryway. **SO-VC8H** vestibule footprint (7'8"×7'4") and sidewall height per Western Shelter SO-VC8H spec. Product catalog: Western-Shelter-_-Product-Catalog.pdf. (Generator trailer/MQ Power sheets live in this folder; catalog tab is **Power**.)
- **Power (catalog tab):** Generator 70 kVA — same MQ Power / TRLR70US sources as above; grouping is planning (serves any vendor), not procurement.
- **ZUMRO**: Spec Sheets — Zumro 400 Specs.pdf, Zumro 600 Specs.pdf, Zumro Quad Interface.pdf, Zumro 216.pdf, Zumro 900.pdf, Zumro External Airlock.pdf, UC DAVIS SPEC SHEET PACKAGE 011325.pdf. Interconnect: ZUMRO_Interconnect_Dimensions.md (root), engineering drawing Photo - Zumro Interconnect to Western Shelter.png / ZUMRO Interconnect to WS (1).jpg; footprint 7.17'×6.92' (86"×83"), rect.
- **Craftsmen / FORTS / WillScot (hard-sided):** No OEM sheets in the reference package as of 2026-08-11 import. Dimensions and notes from **PSC combined catalog** (Vendor Product Catalog Template - Revised Version.pdf) via performer-team transfer (`PSMT Data Transfer.json`); fidelity **unconfirmed**.

---

## Optional: Height and Notes

For future tool versions, consider storing **height** (eave/peak) and **area** from spec sheets for labels/tooltips and for clearance or stacking logic. Dimensions above focus on footprint (length, width, shape) for map accuracy.

---

## Verification Report (Digest Update)

**Date:** 2026-02-26  
**Action:** Digest updated to match PoP 3 folder **Vendor Specs and Manuals** and to reflect current tool state.

| Change | Details |
|--------|--------|
| **Source path** | Updated from `PoP 2\Vendors` (folders 1. BluMed, 2. DLX, …) to `PoP 3\VPC Mapping\Vendor Specs and Manuals` with folders **BLU-MED**, **DLX**, **HDT Global**, **Western Shelter & Third Party**, **ZUMRO**. |
| **BLU-MED** | Spec source for 2032.5/2039/Vestibule set to Instructions & Manuals filenames (no TM_*.pdf in Spec Sheets; dimensions from manuals). Tool current: all ✓ (7×8 Vestibule implemented). |
| **DLX** | Spec filenames set to exact tech sheets in folder (Updated 11_18_24, 11_19_24). Tool current: X-24, X-32, X-HUB all ✓. |
| **HDT Global** | Spec sheet references updated to **HDT_305shelter_13-13.pdf** and **HDT_8D36Shelter_11.pdf** (folder does not contain _11 for 305 or _10 for 8D36). 6D31 row removed from table (already removed from tool). Tool current: 305 and 8D36 ✓. |
| **Western Shelter** | Folder name set to **Western Shelter & Third Party**. GK20: source set to Instructions - WS_GK20 Set Up and Product Catalog; tool uses 18'7" across flats, 7'8" equal facets, regular octagon (SW-20; no SW-20.pdf in folder). Generator specs remain in this folder; catalog display/grouping moved to **Power** tab 2026-08-12 (planning vs procurement). Tool current: shelters ✓. |
| **Power** | Pseudo-vendor catalog tab (not an OEM). Generator 70 kVA: trailer data sheet in Western Shelter & Third Party folder is **TRLR75XF2**; 70 kVA dimensions (14.12'×6.04') noted as TRLR70US from generator/trailer spec. `TENT_DB` key **Power**; id `ws-generator-70kva`. Tool current: ✓. |
| **ZUMRO** | Tool current: Model 400, 600, Quad Interface (exterior footprint 29.4'×19.5'; ~454 sq ft interior floor to 15.7' interior width), Interconnect ✓. Interconnect dimensions from ZUMRO_Interconnect_Dimensions.md (7.17'×6.92' rect). |
| **Tables** | “Recommendation” column removed; “Tool current” column now reflects implemented values only, all ✓. |
| **Source Files Used** | Section rewritten to list actual paths and filenames under Vendor Specs and Manuals. |

**Spec sheet verification note:** Dimensions in this digest were previously verified against manufacturer docs; PDF content was not re-extracted in this pass. Folder contents were cross-checked so every **standard soft-sided** tent in `TENT_DB` has a corresponding spec or manual in **Vendor Specs and Manuals** where cited. **Extended** DLX models (ASAP18, X-8, X-16, X-24SC, X-40) are PSC/data.js-primary until OEM sheets are added. The four **hard-sided** models (Craftsmen 8-Bed ICU Trailer, FORTS Model 38, WillScot Patient Unit, WillScot Staff Unit) have **no OEM sheet** in that pack — provenance is PSC via another performer team only; fidelity **unconfirmed** as of the 2026-08-11 import.

---

**Date:** 2026-03-31  
**Action:** Digest aligned with `TENT_DB` updates for **Western Shelter GK1935** and **Vestibule (SO-VC8H)**.

| Change | Details |
|--------|--------|
| **GK1935** | **Symmetric** corner cut: **`cornerCutW` and `cornerCutL` both 5.421 ft** (45° legs → **7'8"** exterior corner face); overall **18'7"×33'11"**; **~570 sq ft** usable; sheet **7'6"** = interior clear-span (same convention as GK20). Table and summary updated. |
| **Vestibule SO-VC8H** | Footprint **7.667 × 7.333 ft** (7'8" × 7'4"), 56 sq ft; **6'** documented as sidewall height. Replaces incorrect 8×6 (6' had been misread as depth). |

---

**Date:** 2026-04-02  
**Action:** **HDT Base-X 305** width corrected from interior **18'** to outer cover **20.5'** (20'6") per **HDT_305shelter** spec sheet diagram (digest §3 table updated).

---

**Date:** 2026-07-06  
**Action:** Digest aligned with `TENT_DB` note correction for **ZUMRO Quad Interface** (exterior footprint vs interior floor space).

| Change | Details |
|--------|--------|
| **Quad Interface** | Exterior footprint **29.4'×19.5'** mapped in tool (~521 sq ft rendered); **~454 sq ft** documented as **interior** floor space to interior width **15.7'** (air-beam — inflated beams reduce usable interior below exterior footprint). Four Quad connection faces; side connectors ~**1.9'** E/W, end ~**6.85'** N/S. Render faithful to exterior footprint; no geometry change. Table, summary, and verification row updated. |

---

**Date:** 2026-08-11  
**Action:** Hard-sided vendors **Craftsmen**, **FORTS**, **WillScot** added to digest + `TENT_DB` (catalog import Step 4). PSC-primary; fidelity **unconfirmed**; no OEM sheets.

| Change | Details |
|--------|--------|
| **Craftsmen 8-Bed ICU Trailer** | Mapped **expanded 22.5'×53'**; closed 8.5'×53' reference-only; beds **8**. |
| **FORTS Model 38** | **18'×20'** base unit; beds **"~2 to 3"** derived. |
| **WillScot Patient / Staff** | Patient **23.5'×60'** beds **6 to 10**; Staff **11.75'×60'** beds null; two placeable units. |

---

**Date:** 2026-08-11  
**Action:** Sixteen **extended**-tier soft-sided models added to digest + `TENT_DB` (catalog import Step 5). Hidden behind fail-closed filter; all `shape:"rect"` minimum-valid; fidelity deferred. Conflicts recorded unresolved (Zumro 216 floor space; Zumro 900 beds; PSC inch typos; HDT 505 PSC alternate; GK2342 PSC alternate).

| Change | Details |
|--------|--------|
| **DLX extended** | ASAP18, X-8, X-16, X-24SC, X-40 — PSC/data.js dims; OEM sheets missing from pack. |
| **HDT extended** | 505 (~25'7" square); Quick Halt 402 **12×15** / 403 **15×18** (one published dim set); Airbeam 3236A bbox rect (tapered-end deferred). |
| **WS extended** | GK2342/GK2360 rect bbox + GK1935 cut-corner precedent in notes; Guardian 2032/3065 plan rect. |
| **ZUMRO extended** | Model 216, Model 900, External Airlock (≠ Interconnect). |
