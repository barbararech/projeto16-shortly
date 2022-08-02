import express, { json } from "express";
import cors from "cors";

import userRouter from "./routes/userRouter.js"
import urlRouter from "./routes/urlRouter.js"

const app = express();
app.use(cors());
app.use(json());

app.use(userRouter)
app.use(urlRouter)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("Server On!"));