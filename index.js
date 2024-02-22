import express from "express";
import { config } from "dotenv";

import FrontendRouter from "./routers/FrontendRouter.js"

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(FrontendRouter);

export default app;