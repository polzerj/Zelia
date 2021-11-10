FROM node:16-alpine as base
WORKDIR /app
COPY . /app

FROM base as build
RUN npm install
RUN npm run build


FROM base as run
COPY --from=build /app/dist /app
COPY --from=build /app/package.json /app
RUN npm i --only=production
ENV PORT=3001
ENV DB_SERVER=db
ENV DB_USER=root
ENV DB_PASSWORD=ZELIA
ENV DB_DATABASE=Zelia
ENV WEBUNTIS_SCHOOL=szu
ENV WEBUNTIS_BASE_URL=aoide.webuntis.com

EXPOSE 3001
CMD [ "node", "/app/index.js" ]