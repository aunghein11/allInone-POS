import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import { config } from "./src/config/Config";
import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./src/db/db";
import bcrypt from "bcrypt";
import { checkAuth } from "./src/utils/auth";
import menuRouter from "./src/routers/menuRouter";
import authRouter from "./src/routers/authRouter";
const port = 5000;

const app = express();
app.use(express.json());

app.use(cors());

app.use("/menus", menuRouter);

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server Started listening port ${port}`);
});
