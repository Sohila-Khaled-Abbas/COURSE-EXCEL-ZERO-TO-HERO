-- =========================================================================
-- Project 02: Pubs Publishing Sales Intelligence
-- Script: 05_create_author_sales_view.sql
-- Purpose: Creates the governed author royalty and publishing intelligence view
-- Target: pubs database on SQL Server
-- =========================================================================

USE pubs;
GO

CREATE OR ALTER VIEW dbo.vw_AuthorRoyaltyIntelligence
AS
WITH AuthorEarningsCTE AS (
    SELECT 
        a.au_id,
        CONCAT(a.au_fname, ' ', a.au_lname) AS AuthorFullName,
        a.city AS AuthorCity,
        a.state AS AuthorState,
        a.contract AS HasActiveContract,
        t.title_id,
        t.title AS BookTitle,
        t.type AS Genre,
        COALESCE(t.price, 0) AS RetailPrice,
        COALESCE(t.advance, 0) AS TotalTitleAdvance,
        COALESCE(t.royalty, 0) AS TotalTitleRoyaltyPct,
        COALESCE(t.ytd_sales, 0) AS YtdUnitsSold,
        ta.royaltyper AS AuthorSharePct,
        ROUND(COALESCE(t.advance, 0) * (ta.royaltyper / 100.0), 2) AS AuthorAdvanceShare,
        ROUND((COALESCE(t.price, 0) * COALESCE(t.ytd_sales, 0)) * (COALESCE(t.royalty, 0) / 100.0) * (ta.royaltyper / 100.0), 2) AS AuthorEstimatedRoyaltyShare,
        p.pub_id AS PublisherID,
        p.pub_name AS PublisherName
    FROM dbo.authors a
    INNER JOIN dbo.titleauthor ta ON a.au_id = ta.au_id
    INNER JOIN dbo.titles t ON ta.title_id = t.title_id
    INNER JOIN dbo.publishers p ON t.pub_id = p.pub_id
)
SELECT * FROM AuthorEarningsCTE;
GO

-- Verification query
SELECT TOP 10 * FROM dbo.vw_AuthorRoyaltyIntelligence;
GO
