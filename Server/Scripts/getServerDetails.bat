@echo off

powershell -Command "Get-NetTCPConnection -OwningProcess %1 | Where-Object { $_.State -eq 2 -and $_.LocalAddress -ne '::' } | Select-Object -Property LocalPort, LocalAddress, State, OwningProcess | ConvertTo-Json"