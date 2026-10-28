# ==============================================================================
# IT631 Lab 1 Deliverable Packaging Utility
# Usage:
#   .\package_submission.ps1 -LastName "Santos" -FirstName "Juan"
# ==============================================================================
param (
    [string]$LastName = "Santos",
    [string]$FirstName = "Juan"
)

$ZipFileName = "IT631_Lab1_${LastName}_${FirstName}.zip"
$FilesToZip = @(
    "wireframe.png",
    "wireframe.pdf",
    "index.html",
    "styles.css",
    "script.js",
    "exit_ticket.txt"
)

Write-Host "Creating submission archive: $ZipFileName" -ForegroundColor Cyan

# Verify files exist
foreach ($file in $FilesToZip) {
    if (-not (Test-Path $file)) {
        Write-Warning "File missing: $file"
    } else {
        Write-Host "  [+] Bundled: $file" -ForegroundColor Green
    }
}

Compress-Archive -Path $FilesToZip -DestinationPath $ZipFileName -Force
Write-Host "`nSubmission package successfully created: $ZipFileName" -ForegroundColor Yellow

