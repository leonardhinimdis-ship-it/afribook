@echo off
chcp 65001 > nul
title AfriBook - Ouverture Directe

echo =====================================================================
echo                🌍 BIENVENUE SUR AFRIBOOK 🌍
echo       Réseau Social & Communautaire pour le Continent Africain
echo =====================================================================
echo.
echo [✓] Ouverture instantanée de l'application dans votre navigateur web...
echo.

start "" "%~dp0public\index.html"
exit
