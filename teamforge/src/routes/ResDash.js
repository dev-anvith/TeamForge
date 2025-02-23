import express from "express";
import axios from "axios";
import Team from "../Models/Team.js";
import MBTIResult from "../Models/MBTIResult.js";

const app = express.Router();

// Store API key in environment variables for security
//const API_KEY = process.env.DEVILAI_API_KEY || "69fdcc-4c9e83-d0f893-a43aaf"; // Replace with actual key


app.get("/participants/:teamId", async (req, res) => {
    try {
      const { teamId } = req.params;
      const participants = await MBTIResult.find({ teamId });
  
      if (participants.length === 0) {
        return res.status(404).json({ success: false, message: "No participants found." });
      }
  
      res.json({ success: true, participants });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  export default app;