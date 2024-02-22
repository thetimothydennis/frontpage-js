import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { appRoute } from "../controllers/frontendController.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();

router.use(express.static(join(__dirname, "..", "client", "dist")));

router.get("/", appRoute);
// router.get("/add-recipe", appRoute);
// router.get("/recipes/:recipeid", appRoute);
// router.get("/edit-recipe/:recipeid", appRoute);

export default router;
