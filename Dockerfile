# Building pages
FROM node:14-alpine as webpack
WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

# Serve the static files
FROM nginx:1.18.0-alpine
COPY --from=webpack /app/dist /usr/share/nginx/html
