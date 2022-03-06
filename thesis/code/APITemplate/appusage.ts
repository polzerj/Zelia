import App from "./app";
import HelloWorldController from "./controllers/helloworld";
import loggerMiddleware from "./middlewares/logger";

const app = new App({
  controllers: [new HelloWorldController()],
  middleWares: [loggerMiddleware],
  baseUrl: "/api",
  port: process.env.PORT ?? 3000,
});
app.listen();
