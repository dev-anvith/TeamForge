import mongoose from "mongoose";

const MBTIResultSchema = new mongoose.Schema({
  teamId: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  mbtiType: { type: String, required: true },
});

const MBTIResult = mongoose.model("MBTIResult", MBTIResultSchema);
export default MBTIResult;
