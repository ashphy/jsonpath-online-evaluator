# Building pages
FROM node:22-bullseye-slim AS webpack
WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

# Serve the static files
FROM nginx:1.27.3-bookworm
COPY --from=webpack /app/dist /usr/share/nginx/html
