@echo off
chcp 65001 > nul
title AfriBook - Plateforme Communautaire Africaine

echo =====================================================================
echo                🌍 BIENVENUE SUR AFRIBOOK 🌍
echo       Réseau Social & Communautaire pour le Continent Africain
echo =====================================================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [✓] Node.js détecté sur votre système.
    if not exist "node_modules" (
        echo [i] Première exécution : installation des dépendances npm...
        call npm install
    )
    echo [i] Démarrage du serveur Node.js sur le port 4000...
    start http://localhost:4000
    npm start
) else (
    echo [i] Node.js n'est pas installé sur ce PC.
    echo [✓] Lancement automatique du serveur HTTP local sur http://localhost:4000...
    echo.
    powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\server.ps1" -Port 4000
)
