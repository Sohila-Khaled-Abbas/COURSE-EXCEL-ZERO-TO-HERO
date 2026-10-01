Attribute VB_Name = "modDashboard"
Option Explicit

' ==============================================================================
' Module: modDashboard
' Purpose: Dashboard UI State Management, Slicer Reset, and KPI Meta-Tracking
' ==============================================================================

Public Sub ResetAllSlicers()
    Dim sc As SlicerCache
    On Error GoTo ErrorHandler
    
    modUtilities.OptimizeExcel True
    modUtilities.UpdateStatus "Clearing all dashboard slicer filters..."
    
    For Each sc In ThisWorkbook.SlicerCaches
        sc.ClearManualFilter
    Next sc
    
    modUtilities.OptimizeExcel False
    modUtilities.UpdateStatus "Dashboard filters reset to default."
    Exit Sub

ErrorHandler:
    modUtilities.OptimizeExcel False
    modUtilities.LogError "modDashboard.ResetAllSlicers", Err.Number, Err.Description
End Sub

Public Sub RecordLastRefreshTime(ByVal refreshDate As Date, ByVal durationSec As Double)
    On Error Resume Next
    Dim wsConfig As Worksheet
    Set wsConfig = ThisWorkbook.Sheets("Pipeline_Config")
    If Not wsConfig Is Nothing Then
        wsConfig.Range("B3").Value = refreshDate
        wsConfig.Range("B4").Value = durationSec & " seconds"
        wsConfig.Range("B5").Value = Environ("USERNAME")
    End If
End Sub
