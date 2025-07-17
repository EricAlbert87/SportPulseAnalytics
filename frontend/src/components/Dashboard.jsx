import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [nhlData, setNhlData] = useState([]);
  const [nflData, setNflData] = useState([]);
  const [golfData, setGolfData] = useState([]);
  const [tennisData, setTennisData] = useState([]);

  useEffect(() => {
    fetch('/data/nhl.json').then(res => res.json()).then(setNhlData);
    fetch('/data/nfl.json').then(res => res.json()).then(setNflData);
    fetch('/data/golf.json').then(res => res.json()).then(setGolfData);
    fetch('/data/tennis.json').then(res => res.json()).then(setTennisData);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">SportPulseAnalytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 shadow-md bg-white rounded-2xl">
          <h2 className="text-xl font-semibold mb-2">🏒 NHL Live Scores</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={nhlData}>
              <XAxis dataKey="team" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 shadow-md bg-white rounded-2xl">
          <h2 className="text-xl font-semibold mb-2">🏈 NFL Live Scores</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={nflData}>
              <XAxis dataKey="team" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 shadow-md bg-white rounded-2xl">
          <h2 className="text-xl font-semibold mb-2">🏌️ Golf Leaderboard</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={golfData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="player" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#facc15" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 shadow-md bg-white rounded-2xl">
          <h2 className="text-xl font-semibold mb-2">🎾 Tennis Standings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tennisData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="player" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="wins" stroke="#e11d48" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
