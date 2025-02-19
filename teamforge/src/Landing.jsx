import { useState } from "react";
import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Button } from "./components/ui/button"; // Adjust the path as needed
import { Button } from "./Button";
import { FaUsers, FaShareAlt, FaRocket } from "react-icons/fa";

export default function TeamForgeLanding() {
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
        <Button className="bg-blue-500 px-6 py-3 text-lg rounded-lg shadow-lg hover:bg-blue-600 transition">
          Get Started
        </Button>
      </header>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-800 text-center">
        <h2 className="text-4xl font-bold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-700 rounded-lg shadow-lg">
            <FaUsers className="text-blue-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Create a Team Link</h3>
            <p className="text-gray-300">Generate a unique link to invite members.</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-700 rounded-lg shadow-lg">
            <FaShareAlt className="text-green-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Members Join & Answer</h3>
            <p className="text-gray-300">Invitees take an MBTI quiz to define their personality.</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-700 rounded-lg shadow-lg">
            <FaRocket className="text-yellow-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Generate Teams</h3>
            <p className="text-gray-300">Select a configuration and let AI optimize the team formation.</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Build Your Perfect Team?</h2>
        <p className="text-gray-300 mb-6">Start organizing teams now with TeamForge.</p>
        <Button className="bg-blue-500 px-6 py-3 text-lg rounded-lg shadow-lg hover:bg-blue-600 transition">
          Get Started
        </Button>
      </section>
    </div>
  );
}
