Attribute VB_Name = "modUtilities"
Option Explicit

' ==============================================================================
' Module: modUtilities
' Purpose: Environment Performance Optimizers, Logging, and Status Bar Messaging
' ==============================================================================

Public Sub OptimizeExcel(ByVal enableFastMode As Boolean)
    With Application
        If enableFastMode Then
            .ScreenUpdating = False
            .DisplayAlerts = False
            .Calculation = xlCalculationManual
            .EnableEvents = False
        Else
            .ScreenUpdating = True
            .DisplayAlerts = True
            .Calculation = xlCalculationAutomatic
            .EnableEvents = True
            .StatusBar = False
        End If
    End With
End Sub

Public Sub UpdateStatus(ByVal msg As String)
    Application.StatusBar = ">> Pipeline Manager: " & msg
End Sub

Public Sub LogError(ByVal procedureName As String, ByVal errNum As Long, ByVal errDesc As String)
    Dim wsConfig As Worksheet
    Dim nextRow As Long
    On Error Resume Next
    
    Set wsConfig = ThisWorkbook.Sheets("Pipeline_Config")
    If Not wsConfig Is Nothing Then
        nextRow = wsConfig.Cells(wsConfig.Rows.Count, "D").End(xlUp).Row + 1
        If nextRow < 10 Then nextRow = 10
        wsConfig.Cells(nextRow, "D").Value = Now
        wsConfig.Cells(nextRow, "E").Value = procedureName
        wsConfig.Cells(nextRow, "F").Value = errNum & " - " & errDesc
    End If
End Sub
