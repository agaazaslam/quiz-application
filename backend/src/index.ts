
import express, { Request, Response } from "express";
import quizRouter from "./routes/quiz.js";
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", quizRouter);

const PORT = process.env.PORT || 3000;


app.get("/health-check", (req: Request, res: Response) => {
  res.status(200).json({ "message": "Everything working fine " })
})


app.listen(PORT, () => console.log(`Successfully listening : ${PORT} `))

