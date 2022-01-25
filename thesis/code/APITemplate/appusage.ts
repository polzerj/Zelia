import App from "./app";

const app = new App({
  controllers: [],
  middleWares: [],
  baseUrl: "/api",
  port: process.env.PORT ?? 3000,
});
app.listen();
