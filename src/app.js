import express from "express";
import cors from "cors";
import { PORT } from "./utils/env.js";
import { connectDB } from "./config/database.js";

const init = async () => {
  try {
    await connectDB();

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cors());

    app.get("/", (req, res) => {
      res.status(200).json({
        status: true,
        message: "server running...",
        data: null,
      });
    });

    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Connecting server failed: ", error);
  }
};

init();
