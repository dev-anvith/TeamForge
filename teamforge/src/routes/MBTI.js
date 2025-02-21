import express from "express";
import axios from "axios";

const router = express.Router();

// Store API key in environment variables for security
const API_KEY = process.env.DEVILAI_API_KEY || "69fdcc-4c9e83-d0f893-a43aaf"; // Replace with actual key

router.get("/mbti/:teamId", async (req, res) => {
  try {
    const { teamId } = req.params;
    const { name, age, testerName } = req.query;

    // Construct query parameters for Devil.ai API
    const params = new URLSearchParams({
      api_key: API_KEY,
      company_name: "TeamForge",
      name_of_tester: testerName || name || "Anonymous",
      ask_age,
      ask_gender,
      theme_color: "#ff4d40",
      return_url: `http://localhost:5173/results/${teamId}`,
    });

    // Call Devil.ai API to generate the MBTI test URL
    const response = await axios.get(`https://api.devil.ai/v1/new_test?${params.toString()}`);

    if (response.data.meta.success) {
      const testUrl = response.data.data.test_url;

      // Redirect user to the Devil.ai test page
      return res.redirect(testUrl);
    } else {
      return res.status(400).json({ success: false, message: "Failed to generate MBTI test link." });
    }
  } catch (error) {
    console.error("Error generating MBTI test:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

export default router ;
