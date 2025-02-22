import express from "express";
import axios from "axios";
import Team from "../Models/Team.js";
import MBTIResult from "../Models/MBTIResult.js";

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
        theme_color: "#ff4d40",
        return_url: `http://localhost:5173/results/${teamId}`,
      });
  
      // Call Devil.ai API to generate the MBTI test URL
      const response = await axios.get(`https://api.devil.ai/v1/new_test?${params.toString()}`);
  
      if (response.data.meta.success) {
        const testUrl = response.data.data.test_url;
        const testId = response.data.data.test_id; // Extract testId from response
  
        // Store testId in the database under the corresponding teamId
        await Team.findOneAndUpdate(
          { teamId }, 
          { testId }, 
          { upsert: true, new: true } // Create new if not found
        );
  
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

// router.get("/api/mbti-results/:teamId", async (req, res) => {
//     try {
//       const { teamId } = req.params;
//       const result = await MBTIResult.findOne({ teamId });
  
//       if (result) {
//         res.json({ success: true, personalityType: result.mbtiType });
//       } else {
//         res.status(404).json({ success: false, message: "No result found." });
//       }
//     } catch (error) {
//       console.error("Error fetching MBTI result:", error);
//       res.status(500).json({ success: false, message: "Server error." });
//     }
//   });

  router.post("/api/store-mbti-result", async (req, res) => {
    try {
      const { teamId, name, age, gender, mbtiType } = req.body;
  
      const newEntry = new MBTIResult({
        teamId,
        name,
        age,
        gender,
        mbtiType,
      });
  
      await newEntry.save();
      res.json({ success: true, message: "Data stored successfully." });
    } catch (error) {
      console.error("Error storing MBTI result:", error);
      res.status(500).json({ success: false, message: "Server error." });
    }
  });
  

  router.get("/api/fetch-mbti/:teamId", async (req, res) => {
    try {
      const { teamId } = req.params;
      console.log(`Fetching MBTI result for teamId: ${teamId}`);
  
      // Find testId for the given teamId
      const team = await Team.findOne({ teamId });
  
      if (!team) {
        console.error("Team not found for teamId:", teamId);
        return res.status(404).json({ success: false, message: "Team not found." });
      }
  
      if (!team.testId) {
        console.error("Test ID missing for team:", teamId);
        return res.status(404).json({ success: false, message: "Test ID not found for this team." });
      }
  
      console.log(`Found testId: ${team.testId} for teamId: ${teamId}`);
  
      // Call Devil.ai API to get MBTI result
      const response = await axios.get("https://api.devil.ai/v1/check_test", {
        params: { api_key: API_KEY, test_id: team.testId },
      });
  
      console.log("Received response from Devil.ai:", response.data);
  
      if (response.data.meta.success) {
        return res.json({ success: true, personalityType: response.data.data.prediction });

      } else {
        console.error("Failed to fetch MBTI result:", response.data);
        return res.status(400).json({ success: false, message: "Failed to fetch MBTI result." });
      }
    } catch (error) {
      console.error("Error fetching MBTI result:", error.response?.data || error.message);
      return res.status(500).json({ success: false, message: "Server error." });
    }
  });
export default router ;
