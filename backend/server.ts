import express, { Request, Response } from "express";
import cors from "cors";
const port = 5000;

const app = express();
app.use(express.json());

app.use(cors());

app.post("/auth/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  res.send({ name, email, password });
  console.log("request body", req.body);
});

app.listen(port, () => {
  console.log(`Server Started listening port ${port}`);
});
