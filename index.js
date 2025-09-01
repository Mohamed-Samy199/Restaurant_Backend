import express from "express";
import bootstrap from "./src/app.controller.js";
import path from "node:path";
import * as dotenv from "dotenv";

dotenv.config({path : path.join("./src/config/.env")});
const app = express();
const port = process.env.PORT || 5050;

bootstrap(app , express);

app.listen(port , ()=> console.log(`app is listening on port ${port}...`))