import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./src/db/db";
import bcrypt from "bcrypt";
const port = 5000;

const app = express();
app.use(express.json());

app.use(cors());

app.post("/auth/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.sendStatus(400);

  const hashedPassword = await bcrypt.hash(password, 10);
  const text =
    "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING*";
  const values = [name, email, hashedPassword];
  const userResult = await db.query(text, values);

  try {
    const user = userResult.rows[0];
    delete user.hashedPassword;
    res.send(user);
    console.log("request body", user);
  } catch (error) {
    console.log("error:....", error);
    res.sendStatus(500);
  }
});

app.post("/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);
  const userResult = await db.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);

  if (!userResult.rows.length) return res.sendStatus(401);
  const user = userResult.rows[0];
  const hashedPassword = user.password;
  const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
  return isCorrectPassword ? res.sendStatus(200) : res.sendStatus(401);
  // try {
  //   const values = [email, hashedPassword];
  //   const userResult = await db.query(text, values);
  //   const user = userResult.rows[0];
  //   delete user.hashedPassword;
  //   res.send(user);
  //   console.log("request body", user);
  // } catch (error) {
  //   console.log("error:....", error);
  //   res.sendStatus(500);
  // }
});

app.listen(port, () => {
  console.log(`Server Started listening port ${port}`);
});
