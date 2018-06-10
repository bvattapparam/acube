#!/bin/bash

echo "-------------------------------------------------------------"
echo "PAAP application is going to start..."
echo "-------------------------------------------------------------"

ServerStop="[+] Already runnng server stopped if any......."
ServerStart="[+] Server Started newly......."
ApplicationStart="[+] Application Started......"

sudo /Applications/XAMPP/xamppfiles/xampp stop

echo $ServerStop

sudo /Applications/XAMPP/xamppfiles/xampp start

echo $ServerStart

open "http://localhost/acube/app/"

echo $ApplicationStart
