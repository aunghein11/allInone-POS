import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "../db/db";

const menuRouter = express.Router();
menuRouter.get("/", checkAuth, async (req: Request, res: Response) => {
  const menuResult = await db.query("SELECT * FROM menus");
});

export default menuRouter;
