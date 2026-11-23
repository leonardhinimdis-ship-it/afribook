FROM node:20-alpine

WORKDIR /app

# Copie des définitions de paquets
COPY package*.json ./

# Installation des dépendances
RUN npm install --omit=dev

# Copie des fichiers applicatifs
COPY src ./src
COPY database ./database
COPY public ./public
COPY .env.example ./.env

EXPOSE 4000

CMD ["npm", "start"]
