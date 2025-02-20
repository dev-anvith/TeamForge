import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./Button";
import axios from "axios";

export default function CreatorDashboard() {
  const { teamId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [teamConfig, setTeamConfig] = useState("balanced");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get(`/api/dashboard/${teamId}`).then((res) => {
      setParticipants(res.data.participants);
    });
  }, [teamId]);

  const generateTeams = () => {
    axios.post(`/api/generate-teams/${teamId}`, { config: teamConfig }).then((res) => {
      setTeams(res.data.teams);
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">TeamForge - Creator Dashboard</h1>
      <p className="text-gray-600">Manage and configure teams for <b>Team ID: {teamId}</b></p>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Participants</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          {participants.length === 0 ? (
            <p className="text-gray-500">No participants yet.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Name</th>
                  <th className="p-2">MBTI Type</th>
                  <th className="p-2">Age</th>
                  <th className="p-2">Experience</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">{p.mbti}</td>
                    <td className="p-2">{p.age}</td>
                    <td className="p-2">{p.experience} years</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Team Configuration</h2>
        <select className="border p-2 rounded-lg mt-2" value={teamConfig} onChange={(e) => setTeamConfig(e.target.value)}>
          <option value="balanced">Balanced Teams</option>
          <option value="similar">Similar Personality Teams</option>
          <option value="random">Random Teams</option>
        </select>
      </div>
      
      <motion.div whileHover={{ scale: 1.05 }} className="mt-4">
        <Button onClick={generateTeams} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Generate Teams</Button>
      </motion.div>

      {teams.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Generated Teams</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            {teams.map((team, index) => (
              <div key={index} className="border-b py-2">
                <h3 className="font-semibold">Team {index + 1}</h3>
                <ul>
                  {team.map((member) => (
                    <li key={member.id} className="text-gray-700">{member.name} ({member.mbti})</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
