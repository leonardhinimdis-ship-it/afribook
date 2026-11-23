#!/usr/bin/env bash

echo "====================================================================="
echo "               🌍 BIENVENUE SUR AFRIBOOK 🌍"
echo "      Réseau Social & Communautaire pour le Continent Africain"
echo "====================================================================="
echo ""

if command -v node >/dev/null 2>&1; then
    echo "[✓] Node.js détecté."
    if [ ! -d "node_modules" ]; then
        echo "[i] Installation des dépendances npm..."
        npm install
    fi
    echo "[i] Lancement du serveur..."
    npm start
else
    echo "[!] Node.js n'est pas installé."
    echo "[✓] Ouverture de l'interface autonome..."
    if command -v xdg-open >/dev/null 2>&1; then
        xdg-open public/index.html
    elif command -v open >/dev/null 2>&1; then
        open public/index.html
    fi
fi
