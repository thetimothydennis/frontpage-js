import app from "./index.js";
import http from "http";
import https from "https";
import { ssl_options } from "./config/certs.js";
import { config } from "dotenv";

config();

const PORT = process.env.PORT;
const HTTPS_PORT = process.env.HTTPS_PORT;

http.createServer(app).listen(PORT, () => {
     console.log(`app is listening on port ${PORT}`);
});

https.createServer(ssl_options, app).listen(HTTPS_PORT, () => {
     console.log(`app is listening on port ${HTTPS_PORT}`);
})