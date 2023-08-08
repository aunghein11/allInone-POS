import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./src/db/db";
const port = 5000;

const app = express();
app.use(express.json());

app.use(cors());

app.post("/auth/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.sendStatus(400);

  try {
    const text =
      "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING*";
    const values = [name, email, password];
    const userResult = await db.query(text, values);
    const user = userResult.rows[0];
    delete user.password;
    res.send(user);
    console.log("request body", user);
  } catch (error) {
    console.log("error:....", error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server Started listening port ${port}`);
});
