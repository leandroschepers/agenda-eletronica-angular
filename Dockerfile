FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build da aplicação Angular
RUN npm run build

# Instala o serve
RUN npm install -g serve

EXPOSE 4200

# Serve a pasta correta (browser)
CMD ["serve", "-s", "dist/agenda-app/browser", "-l", "4200"]
