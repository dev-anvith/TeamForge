import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./src/routes/TeamRoutes.js";
import mbtiRoutes from "./src/routes/MBTI.js"
import dash from "./src/routes/ResDash.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/teamforge", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api", router);
app.use("/", mbtiRoutes);
app.use("/", dash );
app.listen(5000, () => console.log("Server running on port 5000"));
