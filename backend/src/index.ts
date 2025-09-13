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

const app: Application = express();
const port = config.port;
const urlProduction = "http://localhost:5173";
const urllocal = "http://127.0.0.1:5173";

const urlList = [urlProduction, urllocal];

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

app.listen(port, () => {
  console.log("lisening in port: ", port);
});
