import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaUsersCog } from "react-icons/fa";

const BACKEND_URL = "http://localhost:5000";

export default function TeamForgeDashboard() {
  const { teamId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/participants/${teamId}`);
        if (response.data.success) {
          setParticipants(response.data.participants);
        } else {
          setError(response.data.message || "No participants found.");
        }
      } catch (err) {
        setError("Failed to fetch participants.");
      }
      setLoading(false);
    };
    fetchParticipants();
  }, [teamId]);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 flex flex-col items-center">
      {/* Header */}
      <header className="text-center py-6">
        <motion.h1
          className="text-4xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Creator Dashboard
        </motion.h1>
      </header>

      {/* Main Layout */}
      <div className="flex w-full max-w-6xl gap-6">
        {/* Left Side - Participants List */}
        <div className="w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaUsersCog /> Participants
          </h2>

          {loading ? (
            <p className="text-center text-gray-400">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : participants.length === 0 ? (
            <p className="text-center text-gray-400">No Participants</p>
          ) : (
            <ul className="divide-y divide-gray-700">
              {participants.map((p, index) => (
                <li key={index} className="py-2 flex justify-between">
                  <span>{p.name}</span>
                  <span className="text-blue-400">{p.mbtiType}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Side - Team Configuration */}
        <div className="w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Team Configuration</h2>

          {/* Mode Selection */}
          <label className="block mb-2 text-gray-300">Mode</label>
          <select className="w-full p-2 bg-gray-700 rounded-lg text-white">
            <option>Diverse</option>
            <option>Like-Minded</option>
            <option>Random</option>
          </select>

          {/* Team Size Input */}
          <label className="block mt-4 mb-2 text-gray-300">Team Size</label>
          <input
            type="number"
            min="1"
            className="w-full p-2 bg-gray-700 rounded-lg text-white"
          />

          {/* Generate Teams Button */}
          <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
            Generate Teams
          </button>
        </div>
      </div>
    </div>
  );
}
