# Vendor Tent Specs Digest (PoP 3)

**Status: Implemented.** The recommendations below have been applied in the VPC Mapping Tool: `TENT_DB` dimensions and shapes match this digest; vendor pre-assigned colors (BLU-MED, Western Shelter, DLX, ZUMRO, HDT) are used for placement and when loading plans. HDT 6D31 was removed per product lineup; only Base-X 305 and Base-X Dome (8D36) remain for HDT.

---

**Source:** `C:\Users\jason\Desktop\IMPACTS Project\PoP 3\VPC Mapping\Vendor Specs and Manuals`  
**Folders:** **BLU-MED**, **DLX**, **HDT Global**, **Western Shelter & Third Party**, **ZUMRO**  
**Purpose:** Align VPC Mapping Tool `TENT_DB` with manufacturer spec sheets for accurate length, width, height, and shapes.

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
| **X-HUB (Quad)** | X-Hub Shelter Tech Sheet Updated 11_19_24.pdf | **22 × 22 ft** (6.7 × 6.7 m) | 484 ft² (spec prints “48 ft²” – typo; 22×22=484) | 12.5 ft | plus | 22 × 22 ✓; **armWidthFt 16** — unverified from a primary dimension spec (overall 22'×22' bounding box confirmed; arm width not confirmed from manufacturer spec sheet — verify with DLX). |

---

## 3. HDT Global

| Model | Spec source | Spec dimensions | Area | Shape | Tool current |
|-------|-------------|-----------------|------|-------|--------------|
| **Base-X 305** | HDT_305shelter_13-13.pdf (Spec Sheets) | Outer footprint **20'6" × 25'** (18' interior clear span). Width corrected from interior clear span (18') to outer cover dimension (20'6") per **HDT_305shelter** spec diagram. | 450 ft² | rect | **20.5 × 25** ✓ |
| **Base-X 8D36** | HDT_8D36Shelter_11.pdf (Spec Sheets) | Interior **31' × 37'** (9.45 × 11.28 m) | 935 ft² | ellipse (dome) | 31 × 37 ✓ |

Heights (305: eave ~6'7", peak ~10'6"; 8D36: diagram ~7'4" liner, ~14'7" peak) – optional for future. Anchor kits: 69KHSA305 and 69KHSA8D36.pdf in Spec Sheets.

---

## 4. Western Shelter & Third Party

| Model | Spec source | Spec dimensions | Area | Shape | Tool current |
|-------|-------------|-----------------|------|-------|--------------|
| **GK1935 (SW-1935)** | SW-1935.pdf (Spec Sheets) | **18' 7" × 33' 11"** (5.7 × 10.4 m usable); diagram labels **7'6"** and **9'4"** corner cuts (length of cut lines on diagram; tool uses inward axis projections) | 570 ft² | elongated-octagon | 18.583 × 33.917, **cornerCutW 5.303**, cornerCutL 9.333 ✓ (W: 7'6" / √2 along width axis) |
| **GK20** | Instructions - WS_GK20 Set Up.pdf; Western-Shelter-_-Product-Catalog.pdf (no dedicated SW-20 spec sheet) | **18' 7" × 18' 7"** octagon (tool per SW-20/setup) | 286 ft² | octagon | 18.583 × 18.583 ✓ |
| **Vestibule (SO-VC8H)** | Western Shelter SO-VC8H spec (see Vendor Specs and Manuals); replaces prior misread (6' was sidewall height, not depth) | Footprint **7'8" × 7'4"**; **6'** sidewall height | 56 ft² | rect | **7.667 × 7.333** ✓ |
| **Generator 70 kVA (on trailer)** | MQP3Generators, trailer data sheet in folder: DCA70SSJU4F-03-Trailer-Data-Sheet-TRLR75XF2.pdf | **Trailer TRLR70US** (70 kVA): 169.4" × 72.5" → **14.12' × 6.04'** L×W for mapping. 70 kVA / 56 kW, 103 gal, Isuzu Tier 4. Folder has TRLR75XF2 sheet; TRLR70US dims from generator/trailer spec. | — | rect | 14.12 × 6.04 ✓ |

---

## 5. ZUMRO

| Model | Spec source | Spec dimensions (exterior / interior) | Area | Shape | Tool current |
|-------|-------------|--------------------------------------|------|-------|--------------|
| **Model 400** | Zumro 400 Specs.pdf (Spec Sheets) | Length 21', Exterior width 20', Interior 19.2'; heights 10' / 10.7' | 400 ft² | rect | 20 × 21 (exterior) ✓ |
| **Model 600** | Zumro 600 Specs.pdf (Spec Sheets) | Length 31', Exterior width 20.4', Interior 19.3'; heights 9' / 9.7' | 600 ft² | rect | 20.4 × 31 (exterior) ✓ |
| **Quad Interface** | Zumro Quad Interface.pdf (Spec Sheets) | Length 29.4', Exterior width 19.5', Interior 15.7'; heights 8.5' / 8' | 454 ft² | plus | 19.5 × 29.4, armWidthFt 15.7 ✓ |
| **Interconnect** | ZUMRO_Interconnect_Dimensions.md; engineering drawing (ZUMRO_Interconnect_to_WS / Photo - Zumro Interconnect to Western Shelter.png) | **7.17' × 6.92'** (86" × 83") | rect | 7.17 × 6.92 ✓ |

---

## Summary: Changes Applied in VPC Mapping Tool

All of the following are implemented in the tool.

1. **BLU-MED Vestibule**: 7×8 (from TM_7x8 Vestibule).
2. **DLX X-24**: 24×21.5 (L×W per tech sheet).
3. **DLX X-32**: 32×21.5 (L×W per tech sheet).
4. **ZUMRO Model 400**: 20×21 exterior.
5. **ZUMRO Model 600**: 20.4×31 exterior.
6. **HDT**: Base-X 8D36 as ellipse 31×37; 6D31 removed (product lineup: 305 and 8D36 only).
7. **Western Shelter GK20**: 18'7"×18'7" octagon (SW-20/setup); Generator 70 kVA on trailer 14.12'×6.04'.
8. **Western Shelter GK1935**: Diagram corner **7'6"** on width axis is the **diagonal cut** length on the drawing; `cornerCutW` in the tool is the **inward projection along the width axis** = 7.5 / √2 ≈ **5.303 ft** (with `cornerCutL` unchanged at 9.333 ft for 9'4" on length axis).
9. **Western Shelter Vestibule (SO-VC8H)**: Footprint **7'8" × 7'4"** (7.667 × 7.333 ft), **56 sq ft**; **6'** is sidewall height, not footprint depth. Connects to GK1935 end face.
10. **ZUMRO Interconnect**: Added 7.17'×6.92' rect (footprint from ZUMRO_Interconnect_Dimensions.md / engineering drawing; connects Zumro to Western Shelter).

---

## Source Files Used (Vendor Specs and Manuals)

- **BLU-MED**: Instructions & Manuals — TM_20x32.5 BLU-MED XPH Shelter, TM_2039 XPH Shelter, TM_7x8 Vestibule w BTD. Spec Sheets: BLU-MED Weather Load Shelter Specs.pdf (and others).
- **DLX**: Spec Sheets — Approved for Release X-Series X-24, X-32, X-Hub Shelter Tech Sheet Updated 11_18_24 / 11_19_24.pdf.
- **HDT Global**: Spec Sheets — HDT_305shelter_13-13.pdf, HDT_8D36Shelter_11.pdf, Anchor Kits 69KHSA305 and 69KHSA8D36.pdf.
- **Western Shelter & Third Party**: Spec Sheets — SW-1935.pdf, DCA70SSJU4F-03-Trailer-Data-Sheet-TRLR75XF2.pdf, MQP3Generators. Instructions — WS_GK1935 Set Up, WS_GK20 Set Up, GK+Vestibule, Vestibule+Entryway. **SO-VC8H** vestibule footprint (7'8"×7'4") and sidewall height per Western Shelter SO-VC8H spec. Product catalog: Western-Shelter-_-Product-Catalog.pdf.
- **ZUMRO**: Spec Sheets — Zumro 400 Specs.pdf, Zumro 600 Specs.pdf, Zumro Quad Interface.pdf, UC DAVIS SPEC SHEET PACKAGE 011325.pdf. Interconnect: ZUMRO_Interconnect_Dimensions.md (root), engineering drawing Photo - Zumro Interconnect to Western Shelter.png / ZUMRO Interconnect to WS (1).jpg; footprint 7.17'×6.92' (86"×83"), rect.

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
| **Western Shelter** | Folder name set to **Western Shelter & Third Party**. GK20: source set to Instructions - WS_GK20 Set Up and Product Catalog; tool uses 18'7"×18'7" (no SW-20.pdf in folder). Generator: trailer data sheet in folder is **TRLR75XF2**; 70 kVA dimensions (14.12'×6.04') noted as TRLR70US from generator/trailer spec. Tool current: all ✓. |
| **ZUMRO** | Tool current: Model 400, 600, Quad Interface, Interconnect ✓. Interconnect dimensions from ZUMRO_Interconnect_Dimensions.md (7.17'×6.92' rect). |
| **Tables** | “Recommendation” column removed; “Tool current” column now reflects implemented values only, all ✓. |
| **Source Files Used** | Section rewritten to list actual paths and filenames under Vendor Specs and Manuals. |

**Spec sheet verification note:** Dimensions in this digest were previously verified against manufacturer docs; PDF content was not re-extracted in this pass. Folder contents were cross-checked to ensure every tent in `TENT_DB` has a corresponding spec or manual in **Vendor Specs and Manuals**.

---

**Date:** 2026-03-31  
**Action:** Digest aligned with `TENT_DB` updates for **Western Shelter GK1935** and **Vestibule (SO-VC8H)**.

| Change | Details |
|--------|--------|
| **GK1935** | `cornerCutW` in tool is **5.303 ft** (inward projection along width axis); spec diagram **7'6"** treated as diagonal cut length → divide by √2. Table and summary updated; `cornerCutL` **9.333** unchanged. |
| **Vestibule SO-VC8H** | Footprint **7.667 × 7.333 ft** (7'8" × 7'4"), 56 sq ft; **6'** documented as sidewall height. Replaces incorrect 8×6 (6' had been misread as depth). |

---

**Date:** 2026-04-02  
**Action:** **HDT Base-X 305** width corrected from interior **18'** to outer cover **20.5'** (20'6") per **HDT_305shelter** spec sheet diagram (digest §3 table updated).
