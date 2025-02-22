import express from "express";
import { nanoid } from "nanoid"; // Generates unique IDs
import Team from "../Models/Team.js";
// import MBTIResult from "../Models/MBTIResult.js";

const router = express.Router();

router.post("/create-team", async (req, res) => {
  try {
    const teamId = nanoid(8); // Generates an 8-character unique ID
    const testId='123'
    const newTeam = new Team({
      teamId,
      testId,
      creator: req.body.creator, // Replace with actual user authentication
    });

    await newTeam.save();
    
    res.json({ success: true, link: `http://localhost:5000/mbti/${teamId}` });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating team" });
  }
});

export default router;
