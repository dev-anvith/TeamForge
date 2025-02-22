import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

export default function ResultPage() {
  const { teamId } = useParams(); // Extract teamId from URL
  const [mbtiType, setMbtiType] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
  });

  // Fetch MBTI result from Devil.ai via backend
  useEffect(() => {
    async function fetchResult() {
      try {
        console.log(`Fetching MBTI result for teamId: ${teamId}`);
        const response = await axios.get(`${BACKEND_URL}/api/fetch-mbti/${teamId}`);

        console.log("Response from backend:", response.data);

        if (response.data.success) {
          setMbtiType(response.data.personalityType);
        } else {
          setError("Failed to fetch MBTI result.");
        }
      } catch (error) {
        console.error("Error fetching MBTI result:", error.response?.data || error.message);
        setError("Something went wrong.");
      }
    }
    fetchResult();
  }, [teamId]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/store-mbti-result`, {
        teamId,
        ...formData,
        mbtiType,
      });

      console.log("Store MBTI response:", response.data);

      if (response.data.success) {
        alert("Your data has been saved successfully!");
      } else {
        alert("Failed to save data.");
      }
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Your MBTI Result</h1>
      {error ? <p className="text-red-500">{error}</p> : null}
      {mbtiType ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-400">{mbtiType}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Form for User Details */}
      <form onSubmit={handleSubmit} className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
        <div className="mb-3">
          <label className="block text-sm">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="mt-4 px-6 py-2 bg-blue-500 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
}
