# Building pages
FROM node:16-alpine as webpack
WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

# Serve the static files
FROM nginx:1.21.0-alpine
COPY --from=webpack /app/build /usr/share/nginx/html
