Get-ADUser -Filter *   -Property SAMAccountName, LastLogonDate |
    Select-Object -Property SAMAccountName,LastLogonDate |
    Sort-Object -Property SAMAccountName, LastLogonDate |
    Export-CSV -NoTypeInformation "C:\dev\GetADUserLogin\myfile.csv"
