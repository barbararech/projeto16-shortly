import express, { json } from "express";
import cors from "cors";

import userRouter from "./routes/userRouter.js"

const app = express();
app.use(cors());
app.use(json());

app.use(userRouter)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("Server On!"));
