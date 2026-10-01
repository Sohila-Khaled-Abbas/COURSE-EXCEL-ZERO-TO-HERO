Attribute VB_Name = "modExport"
Option Explicit

' ==============================================================================
' Module: modExport
' Purpose: Executive PDF Report Generation and Standalone Workbook Snapshot Export
' ==============================================================================

Public Sub ExportDashboardToPDF()
    Dim wsDash As Worksheet
    Dim exportPath As String
    Dim fileName As String
    
    On Error GoTo ErrorHandler
    
    Set wsDash = ThisWorkbook.Sheets("Dashboard")
    exportPath = ThisWorkbook.Path & "\"
    fileName = exportPath & "Executive_Sales_Dashboard_" & Format(Now, "YYYYMMDD_HHMM") & ".pdf"
    
    modUtilities.OptimizeExcel True
    modUtilities.UpdateStatus "Generating Executive PDF Export..."
    
    wsDash.ExportAsFixedFormat _
        Type:=xlTypePDF, _
        fileName:=fileName, _
        Quality:=xlQualityStandard, _
        IncludeDocProperties:=True, _
        IgnorePrintAreas:=False, _
        OpenAfterPublish:=False
        
    modUtilities.OptimizeExcel False
    modUtilities.UpdateStatus "PDF report generated: " & fileName
    MsgBox "Executive Dashboard exported successfully to:" & vbCrLf & fileName, vbInformation, "Export Complete"
    Exit Sub

ErrorHandler:
    modUtilities.OptimizeExcel False
    modUtilities.LogError "modExport.ExportDashboardToPDF", Err.Number, Err.Description
    MsgBox "Failed to export PDF: " & Err.Description, vbCritical, "Export Error"
End Sub
