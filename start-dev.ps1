param(
  [string]$ServiceAccountPath = "C:\Users\jacks\Downloads\ordering-system-80310-firebase-adminsdk-fbsvc-d93045a6ac.json"
)

function FailIfNoNode {
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js (node/npm) not found in PATH."
    Write-Host "Install Node.js LTS from https://nodejs.org/ and re-open PowerShell."
    exit 1
  }
}

FailIfNoNode

$backendDir = "C:\Users\jacks\restaurant-prototype\backend"
$frontendDir = "C:\Users\jacks\restaurant-prototype\frontend"

$backendCmd = "cd '$backendDir'; npm install --no-audit --no-fund; `$env:GOOGLE_APPLICATION_CREDENTIALS='$ServiceAccountPath'; npm start"
$frontendCmd = "cd '$frontendDir'; npm install --no-audit --no-fund; npm run dev"

# Use powershell.exe so new windows open with -NoExit to preserve logs
Write-Host "Starting backend in a new PowerShell window..."
Start-Process -FilePath powershell -ArgumentList "-NoExit","-Command",$backendCmd

Start-Sleep -Milliseconds 500
Write-Host "Starting frontend in a new PowerShell window..."
Start-Process -FilePath powershell -ArgumentList "-NoExit","-Command",$frontendCmd

Write-Host "Launched backend and frontend.\nBackend will use service account path: $ServiceAccountPath"
Write-Host "If you prefer to run servers in the same window, run the commands manually as described in README.md."