param(
    [int]$Port = 4000,
    [string]$Folder = "$PSScriptRoot\..\public"
)

$Folder = (Resolve-Path $Folder).Path

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Prefixes.Add("http://127.0.0.1:$Port/")

# Détection de l'adresse IP locale du PC pour connexion depuis le téléphone
$localIps = @()
try {
    $localIps = (Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue | Where-Object { $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.*" }).IPAddress
    foreach ($ip in $localIps) {
        try {
            $listener.Prefixes.Add("http://${ip}:$Port/")
        } catch {}
    }
} catch {}

$started = $false
try {
    $listener.Start()
    $started = $true
} catch {
    # Fallback si les permissions réseau restreignent l'IP externe
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$Port/")
    $listener.Prefixes.Add("http://127.0.0.1:$Port/")
    try {
        $listener.Start()
        $started = $true
    } catch {
        Write-Host "❌ Erreur de demarrage sur le port $Port : $_" -ForegroundColor Red
        Read-Host "Appuyez sur Entree pour quitter..."
        exit 1
    }
}

Write-Host "=================================================================" -ForegroundColor Green
Write-Host "       🌍 SERVEUR WEB AFRIBOOK ACTIF SUR LE PORT $Port 🌍" -ForegroundColor Green
Write-Host "=================================================================" -ForegroundColor Green
Write-Host "💻 Sur votre PC      : http://localhost:$Port" -ForegroundColor Cyan
if ($localIps.Count -gt 0) {
    foreach ($ip in $localIps) {
        Write-Host "📱 Sur votre Téléphone (même Wi-Fi) : http://${ip}:$Port" -ForegroundColor Yellow
    }
}
Write-Host "📂 Dossier servi     : $Folder" -ForegroundColor DarkGray
Write-Host "💡 Firefox/Chrome    : La page s'ouvre automatiquement..." -ForegroundColor Green
Write-Host "⚠️  Pour arrêter      : Fermez cette fenêtre ou faites Ctrl+C" -ForegroundColor DarkGray
Write-Host "=================================================================" -ForegroundColor Green
Write-Host ""

Start-Process "http://localhost:$Port"

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        $response.Headers.Add("Access-Control-Allow-Headers", "*")

        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.OutputStream.Close()
            continue
        }

        $urlPath = $request.Url.LocalPath
        if ([string]::IsNullOrWhiteSpace($urlPath) -or $urlPath -eq "/") {
            $urlPath = "/index.html"
        }

        if ($urlPath -eq "/api/health") {
            $json = '{"status":"ok","service":"afribook-server","message":"Serveur pret"}'
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
            $response.ContentType = "application/json; charset=utf-8"
            $response.StatusCode = 200
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.OutputStream.Close()
            continue
        }

        $cleanPath = $urlPath.TrimStart('/').Replace('/', '\')
        $targetFile = Join-Path $Folder $cleanPath

        if (Test-Path $targetFile -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($targetFile).ToLower()
            $contentType = $mimeTypes[$ext]
            if (-not $contentType) { $contentType = "application/octet-stream" }

            $bytes = [System.IO.File]::ReadAllBytes($targetFile)
            $response.ContentType = $contentType
            $response.StatusCode = 200
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $indexPath = Join-Path $Folder "index.html"
            $bytes = [System.IO.File]::ReadAllBytes($indexPath)
            $response.ContentType = "text/html; charset=utf-8"
            $response.StatusCode = 200
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }

        $response.OutputStream.Close()
    } catch {}
}
