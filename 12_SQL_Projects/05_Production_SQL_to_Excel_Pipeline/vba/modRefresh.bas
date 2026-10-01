Attribute VB_Name = "modRefresh"
Option Explicit

' ==============================================================================
' Module: modRefresh
' Purpose: Governed Refresh Pipeline for Power Query Data Connections & PivotTables
' ==============================================================================

Public Sub RefreshProductionPipeline()
    Dim startTime As Double
    Dim wb As Workbook
    Dim conn As WorkbookConnection
    Dim pc As PivotCache
    
    On Error GoTo ErrorHandler
    
    startTime = Timer
    Set wb = ThisWorkbook
    
    ' Optimize Excel Environment
    modUtilities.OptimizeExcel True
    modUtilities.UpdateStatus "Initiating SQL Server Power Query Pipeline Refresh..."
    
    ' Refresh all background data connections synchronously
    For Each conn In wb.Connections
        If conn.Type = xlConnectionTypeOLEDB Or conn.Type = xlConnectionTypeODBC Or conn.Type = xlConnectionTypeMODEL Then
            modUtilities.UpdateStatus "Refreshing connection: " & conn.Name & "..."
            conn.OLEDBConnection.BackgroundQuery = False
            conn.Refresh
        End If
    Next conn
    
    ' Refresh all PivotTable caches linked to the analytical model
    modUtilities.UpdateStatus "Refreshing analytical Pivot Caches..."
    For Each pc In wb.PivotCaches
        pc.Refresh
    Next pc
    
    ' Record refresh timestamp in KPI tracking cell
    modDashboard.RecordLastRefreshTime Now, Round(Timer - startTime, 2)
    
    modUtilities.OptimizeExcel False
    modUtilities.UpdateStatus "Pipeline refresh completed successfully in " & Round(Timer - startTime, 2) & " seconds."
    MsgBox "Pipeline refresh complete! (" & Round(Timer - startTime, 2) & "s)", vbInformation, "Production Pipeline"
    Exit Sub

ErrorHandler:
    modUtilities.OptimizeExcel False
    modUtilities.LogError "modRefresh.RefreshProductionPipeline", Err.Number, Err.Description
    MsgBox "Error during pipeline refresh: " & Err.Description, vbCritical, "Pipeline Refresh Error"
End Sub
