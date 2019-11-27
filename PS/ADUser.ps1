Get-ADUser -Filter *   -Property SAMAccountName, LastLogonDate |
    Select-Object -Property SAMAccountName,LastLogonDate |
    Sort-Object -Property SAMAccountName, LastLogonDate |
    Export-CSV -NoTypeInformation "C:\dev\GetADUserLogin\myfile.csv"

Get-ADComputer -Filter *   -Property CN, LastLogonDate |
    Select-Object -Property CN,LastLogonDate |
    Sort-Object -Property CN, LastLogonDate |
    Export-CSV -NoTypeInformation "C:\dev\GetADUserLogin\computers.csv"
