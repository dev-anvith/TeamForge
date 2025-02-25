import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  teamId: { type: String, unique: true, required: true },
  testId: { type: String, required: true }, // Added testId field
  creator: { type: String, required: true }, // Can store user ID or email if needed
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Team", TeamSchema);
