---
type: solution
exercise: "[[Ex02_Formulas_and_Lookup_Logic]]"
created: 2026-09-28
---
# Solutions: Exercise 2 (Formulas & Lookups)

### Task 2: SUMIFS
```excel
=SUMIFS(Sales[Total], Sales[Product], "Laptop", Sales[Region], "East")
```

### Task 3: XLOOKUP with Fallback
```excel
=XLOOKUP(A2, BonusTable[EmpID], BonusTable[BonusPct], 0.0)
```

### Task 4: Text Cleansing
```excel
=PROPER(TRIM(A2))
```

### Task 5: Date Tenure
```excel
=DATEDIF(B2, TODAY(), "Y")
```
