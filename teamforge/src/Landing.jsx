import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Button } from "./Button";
import { FaUsers, FaShareAlt, FaRocket, FaCopy } from "react-icons/fa";
const BACKEND_URL = "http://localhost:5000";
export default function TeamForgeLanding() {
  const [generatedLink, setGeneratedLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateTeam = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${BACKEND_URL}/api/create-team`, {
        creator: "user123", // Replace with actual user data if using authentication
      });

      if (response.data.success) {
        setGeneratedLink(response.data.link);
      } else {
        setError("Failed to create team.");
      }
    } catch (err) {
      console.error("Error creating team:", err);
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-20 px-6">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Build the Perfect Team with <span className="text-blue-400">TeamForge</span>
        </motion.h1>
        <p className="text-lg text-gray-300 mb-6 max-w-2xl">
          Create and organize teams based on MBTI personality types, age, and experience effortlessly.
        </p>
        <Button
          className={`bg-blue-500 px-6 py-3 text-lg rounded-lg shadow-lg transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          onClick={handleCreateTeam}
          disabled={loading}
        >
          {loading ? "Creating..." : "Get Started"}
        </Button>
      </header>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-800 text-center">
        <h2 className="text-4xl font-bold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: FaUsers, title: "Create a Team Link", desc: "Generate a unique link to invite members." },
            { icon: FaShareAlt, title: "Members Join & Answer", desc: "Invitees take an MBTI quiz to define their personality." },
            { icon: FaRocket, title: "Generate Teams", desc: "Select a configuration and let AI optimize the team formation." }
          ].map(({ icon: Icon, title, desc }, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} className="p-6 bg-gray-700 rounded-lg shadow-lg">
              <Icon className="text-blue-400 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-gray-300">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Build Your Perfect Team?</h2>
        <p className="text-gray-300 mb-6">Start organizing teams now with TeamForge.</p>
        <Button
          className={`bg-blue-500 px-6 py-3 text-lg rounded-lg shadow-lg transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          onClick={handleCreateTeam}
          disabled={loading}
        >
          {loading ? "Creating..." : "Get Started"}
        </Button>
      </section>

      {/* Show Generated Link */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {generatedLink && (
        <div className="text-center mt-6 p-4 bg-gray-800 text-white rounded-lg flex items-center justify-center gap-4">
          <p className="text-lg font-semibold">Share this link:</p>
          <a href={generatedLink} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
            {generatedLink}
          </a>
          <button onClick={copyToClipboard} className="text-white p-2 bg-gray-700 rounded-md hover:bg-gray-600">
            <FaCopy />
          </button>
        </div>
      )}
    </div>
  );
}
