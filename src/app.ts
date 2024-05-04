import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/users/user.route";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// app routes
app.use("/api/v1/users", UserRoutes);

const getAController = (req: Request, res: Response) => {
  res.send(
    `<div style="background: blue; border-radius: 15px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 600px; height: 200px; margin: auto; margin-top: 50px; display: flex; flex-direction: column; justify-content: center; align-items: cenrer;"><h1 style="color: white; text-align: center;">Welcome to the assignment-2 server 🥳</h1></div>`,
  );
};

app.get("/", getAController);

export default app;
