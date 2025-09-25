import express from "express";
import type { Application } from "express";
import cors from "cors";
import type { CorsOptions } from "cors";
import { config } from "./config/config.js";
import { routersApi } from "./routes/index.js";
import {
  boomErrorHandler,
  generalErrorHandler,
  notFoundHandler,
} from "./middlewares/errorHandler.js";

const port = config.port;
const nodeEnv = config.env;
const app: Application = express();
const urlProduction = "https://permit-management-demo.vercel.app";
const urllocal1 = "http://127.0.0.1:5173";
const urllocal2 = "http://localhost:5173";
const urlList =
  nodeEnv === "production" ? [urlProduction] : [urllocal1, urllocal2];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || urlList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

routersApi(app);

app.use(notFoundHandler); // Maneja rutas no encontradas (404)
app.use(boomErrorHandler); // Maneja errores de Boom
app.use(generalErrorHandler); // Maneja errores generales del servidor

if (nodeEnv !== "test") {
  app.listen(port, () => {
    console.log("lisening in port: ", port);
  });
}

export default app;
