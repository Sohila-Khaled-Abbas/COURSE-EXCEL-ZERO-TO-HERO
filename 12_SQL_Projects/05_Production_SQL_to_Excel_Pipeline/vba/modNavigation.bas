Attribute VB_Name = "modNavigation"
Option Explicit

' ==============================================================================
' Module: modNavigation
' Purpose: Seamless UI App Navigation across Dashboard, Details, and Parameters
' ==============================================================================

Public Sub NavigateToDashboard()
    On Error GoTo ErrorHandler
    modUtilities.OptimizeExcel True
    Sheets("Dashboard").Visible = xlSheetVisible
    Sheets("Dashboard").Activate
    Range("A1").Select
    modUtilities.OptimizeExcel False
    Exit Sub
ErrorHandler:
    modUtilities.OptimizeExcel False
    modUtilities.LogError "modNavigation.NavigateToDashboard", Err.Number, Err.Description
End Sub

Public Sub NavigateToDetails()
    On Error GoTo ErrorHandler
    modUtilities.OptimizeExcel True
    Sheets("Detail_Analytics").Visible = xlSheetVisible
    Sheets("Detail_Analytics").Activate
    Range("A1").Select
    modUtilities.OptimizeExcel False
    Exit Sub
ErrorHandler:
    modUtilities.OptimizeExcel False
    modUtilities.LogError "modNavigation.NavigateToDetails", Err.Number, Err.Description
End Sub

Public Sub NavigateToParameters()
    On Error GoTo ErrorHandler
    modUtilities.OptimizeExcel True
    Sheets("Pipeline_Config").Visible = xlSheetVisible
    Sheets("Pipeline_Config").Activate
    Range("A1").Select
    modUtilities.OptimizeExcel False
    Exit Sub
ErrorHandler:
    modUtilities.OptimizeExcel False
    modUtilities.LogError "modNavigation.NavigateToParameters", Err.Number, Err.Description
End Sub
