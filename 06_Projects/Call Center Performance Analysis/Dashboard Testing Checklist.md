---
type: project-documentation
project_name: PwC Digital Transformation Analytics Suite
status: completed
document: Dashboard Testing & Quality Assurance Checklist
version: 2.0
target_platform: Microsoft Excel (.xlsm)
date: 2026-10-01
author: Senior Excel Quality Assurance & BI Engineer
tags:
- testing-framework
- qa-checklist
- regression-testing
- data-validation
- excel-audit
title: Dashboard Testing & Verification Checklist
description: 32-point pre-flight quality and reconciliation checklist
---

# ✅ Dashboard Testing & Quality Assurance Framework

> [!abstract] Quality Assurance Standard
> Prior to executive sign-off and deployment, **`PwC_Digital_Transformation_Suite.xlsm`** must pass all 32 verification criteria across four operational dimensions: **Functional Integrity, Data Reliability, UX/Ergonomic Usability, and Performance Benchmarks**.

---

## 1. Functional Integrity Testing

- [ ] **Navigation Verification**:
  - [ ] Clicking `🏠 Home Portal` on any screen smoothly opens `ws_Portal` and focuses cell `F5`.
  - [ ] Clicking `📞 Call Center` opens `ws_CallCenter` without screen flicker.
  - [ ] Clicking `🔄 Customer Retention` opens `ws_Retention` without screen flicker.
  - [ ] Clicking `👥 Diversity & Inclusion` opens `ws_Diversity` without screen flicker.
  - [ ] Hidden staging sheets (`Stage_...`) remain completely invisible (`xlSheetVeryHidden`).
- [ ] **Slicer & Filter Controls**:
  - [ ] Selecting an Agent in `Slicer_Agent` updates all 5 KPI cards and all 4 charts on `ws_CallCenter`.
  - [ ] Selecting a Contract in `Slicer_Contract` updates churn metrics on `ws_Retention`.
  - [ ] Selecting a Department in `Slicer_Department` updates promotion metrics on `ws_Diversity`.
  - [ ] Slicer filtering on one domain does **not** cross-contaminate or alter any other domain.
- [ ] **Reset Filter Controller**:
  - [ ] Clicking `[Reset Filters]` on `ws_CallCenter` clears Agent and Topic slicers in $< 200\text{ms}$.
  - [ ] Clicking `[Reset Filters]` preserves any active slicer states on other modules.
  - [ ] Global reset on Portal successfully clears all workbook slicer caches.
- [ ] **Automation & Pipeline Execution**:
  - [ ] Clicking `[🔄 Sync Data]` executes `modDataRefresh.ExecuteSuiteRefresh()` synchronously.
  - [ ] Header timestamp updates across all visible sheets to current date and time (`YYYY-MM-DD HH:NN`).
  - [ ] Clicking `[📄 Export PDF]` publishes a clean A4 landscape PDF in `\08_Exported_Reports\`.

---

## 2. Data Reliability & Boundary Testing

- [ ] **Null Value Handling**:
  - [ ] The 946 abandoned calls in Call Center do not produce `#NUM!` or `#DIV/0!` errors in AHT or CSAT.
  - [ ] Average speed of answer is calculated strictly over answered calls ($67.5\text{s}$).
  - [ ] CSAT reflects surveyed calls accurately ($3.40 / 5.0$).
- [ ] **The 11 Blank String Trap in Churn Data**:
  - [ ] Customers with 0 tenure and `" "` in `TotalCharges` are parsed as `0.00` without throwing `DataFormat.Error`.
  - [ ] Total Monthly Charges matches ground-truth baseline ($$456,116.60$).
- [ ] **D&I Formula Decoupling**:
  - [ ] Formula pointers to `Backing 4` evaluate cleanly without `#REF!` or circular dependency warnings.
  - [ ] Headcount sums to exactly 500 active employees.
- [ ] **Zero-Result / Empty Filter Handling**:
  - [ ] If a user selects an impossible slicer combination, KPI cards display `—` (dash) gracefully.
  - [ ] Charts display friendly fallback notice rather than empty jagged holes.

---

## 3. UI/UX & Ergonomic Usability Testing

- [ ] **Visual Hierarchy & Signal-to-Noise**:
  - [ ] Primary visual priority immediately directs eye to executive KPI cards and core trends.
  - [ ] Number formats are fully masked: no raw decimals (`7.90` is formatted as `3m 45s`, `$139130.85` as `$139,131`).
- [ ] **Multi-DPI Scaling Resilience**:
  - [ ] Dashboard canvas tested at **100%, 125%, and 150% Windows OS display scaling**.
  - [ ] Zero KPI text clipping; zero shape displacement (all KPI metrics hosted in native grid cells).
- [ ] **Accessibility & Dual-Encoding**:
  - [ ] All status indicators combine color with text and icons (e.g. `⚠️ 18.9% - SLA Breach`).
  - [ ] Contrast ratio between text and card backgrounds meets or exceeds WCAG AA (4.5:1).
  - [ ] Visuals remain legible and distinct when viewed in grayscale print preview.

---

## 4. Performance & Scalability Testing

- [ ] **Latency Benchmarks**:
  - [ ] Slicer click-to-render response time is $< 350 \text{ ms}$.
  - [ ] View switching via `modNavigation` executes in $< 150 \text{ ms}$.
  - [ ] Full Power Query model refresh completes in $< 5.0 \text{ seconds}$.
- [ ] **File Size & Memory Footprint**:
  - [ ] Saved `.xlsm` file size is under $3.5 \text{ MB}$.
  - [ ] RAM overhead during operation remains $< 150 \text{ MB}$.
  - [ ] Calculation mode remains set to `xlCalculationAutomatic` at all times without background formula loops.
