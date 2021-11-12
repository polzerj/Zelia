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

EXPOSE 3001
CMD [ "node", "/app/index.js" ]