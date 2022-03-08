import App from "./App";
import { AppRouter } from "./routers";

const appSelector = "#app";
const appRouter = new AppRouter();

new App(appSelector, null, appRouter, null);
