Get-ADUser -Filter *  -ResultPageSize 0 -Property SAMAccountName, LastLogonTimestamp |
    Select-Object -Property SAMAccountName, @{ n = "LastLogonDate"; e = { [datetime]::FromFileTime( $_.lastLogonTimestamp ) } } |
    Sort-Object -Property SAMAccountName, LastLogonDate |
    Convertto-CSV -NoTypeInformation