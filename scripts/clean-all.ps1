# clean-all.ps1
# Robust cleanup script for Windows MFE workspace

Write-Host "Starting deep cleanup..." -ForegroundColor Cyan

$targets = @(
    "dist",
    ".nx",
    "node_modules",
    "apps/*/dist",
    "apps/*/.nx",
    "apps/*/node_modules",
    "libs/*/dist",
    "libs/*/.nx",
    "libs/*/node_modules",
    "libs/shared/*/dist",
    "libs/shared/*/.nx",
    "libs/shared/*/node_modules"
)

# 1. Kill any existing node processes that might hold locks (optional but recommended)
# Write-Host "Checking for running node processes..." -ForegroundColor Yellow
# Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -Confirm:$false

# 2. Delete target directories
foreach ($target in $targets) {
    $paths = Get-Item $target -ErrorAction SilentlyContinue
    foreach ($path in $paths) {
        if ($path.Attributes -match "Directory") {
            Write-Host "Deleting: $($path.FullName)" -ForegroundColor Gray
            Remove-Item -Recurse -Force $path.FullName -ErrorAction SilentlyContinue
        }
    }
}

# 3. Nx Reset
Write-Host "Resetting Nx cache..." -ForegroundColor Cyan
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    pnpm nx reset
}

Write-Host "Cleanup complete! Please run 'pnpm install' now." -ForegroundColor Green
