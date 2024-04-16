#!/bin/bash

pid=$1

netstat -tunalp | grep 'tcp' | awk -v pid="$pid" '
    $7 == pid"/dotnet" && $1 == "tcp" {
        print "{\"LocalAddress\": \"" $4 "\", \"ForeignAddress\": \"" $5 "\", \"State\": \"" $6 "\", \"PID\": \"" pid "\"}"
    }'
