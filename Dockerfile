FROM node:16-alpine AS build
WORKDIR /app
COPY ./pwa . 

RUN npm i && npm run build


FROM nginx:1.16.0-alpine as server

COPY --from=build /app/dist /www
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./certs /etc/certs 

EXPOSE 443