-- ============================================================================
-- AdventureWorksDW2022: Schema Exploration & Table Grain Analysis
-- Database: AdventureWorksDW2022
-- Target: Catalog exploration of Facts, Dimensions, and Surrogate Keys
-- ============================================================================

USE AdventureWorksDW2022;
GO

-- 1. Inventory of Fact Tables vs Dimension Tables
SELECT 
    t.name AS TableName,
    CASE 
        WHEN t.name LIKE 'Fact%' THEN 'Fact Table (Transactional / Measurement Grain)'
        WHEN t.name LIKE 'Dim%' THEN 'Dimension Table (Context / Filtering Entity)'
        ELSE 'Other System / Staging Object'
    END AS TableClassification,
    p.rows AS RowCountEstimate
FROM sys.tables t
INNER JOIN sys.partitions p ON t.object_id = p.object_id AND p.index_id IN (0, 1)
ORDER BY TableClassification DESC, t.name ASC;
GO

-- 2. Inspect FactInternetSales Foreign Keys & Grain
SELECT 
    fk.name AS ForeignKeyConstraint,
    tp.name AS ParentDimensionTable,
    cp.name AS ParentKeyColumn,
    tr.name AS FactTable,
    cr.name AS FactForeignKeyColumn
FROM sys.foreign_keys fk
INNER JOIN sys.tables tp ON fk.referenced_object_id = tp.object_id
INNER JOIN sys.tables tr ON fk.parent_object_id = tr.object_id
INNER JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
INNER JOIN sys.columns cp ON fkc.referenced_object_id = cp.object_id AND fkc.referenced_column_id = cp.column_id
INNER JOIN sys.columns cr ON fkc.parent_object_id = cr.object_id AND fkc.parent_column_id = cr.column_id
WHERE tr.name = 'FactInternetSales'
ORDER BY tp.name;
GO
