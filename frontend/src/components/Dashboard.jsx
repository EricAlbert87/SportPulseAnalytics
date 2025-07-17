// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { fetchNHL, fetchNFL, fetchGolf, fetchTennis } from '../api/sportsApi';
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [nhl, setNhl] = useState([]);
  const [nfl, setNfl] = useState([]);
  const [golf, setGolf] = useState([]);
  const [tennis, setTennis] = useState([]);

  useEffect(() => {
    fetchNHL().then(data => {
      const games = data.games.map(game => ({
        team: game.awayTeam.abbreviation + ' vs ' + game.homeTeam.abbreviation,
        score: game.awayTeam.score + game.homeTeam.score
      }));
      setNhl(games);
    });

    fetchNFL().then(data => {
      const events = data.events.map(event => ({
        team: event.name,
        score: event.competitions[0].competitors.reduce((sum, t) => sum + (t.score ? parseInt(t.score) : 0), 0)
      }));
      setNfl(events);
    });

    fetchGolf().then(data => {
      const players = data.leaderboard.entries.slice(0, 10).map(p => ({
        name: p.player_bio.first_name + ' ' + p.player_bio.last_name,
        score: parseInt(p.total) || 0
      }));
      setGolf(players);
    });

    fetchTennis().then(data => {
      const standings = data.children[0].standings.entries.slice(0, 10).map(p => ({
        name: p.team.shortDisplayName,
        wins: p.stats.find(stat => stat.name === 'wins')?.value || 0
      }));
      setTennis(standings);
    });
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">NHL Scores</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={nhl}>
          <XAxis dataKey="team" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h2 className="text-2xl font-bold">NFL Scores</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={nfl}>
          <XAxis dataKey="team" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <h2 className="text-2xl font-bold">Golf Leaderboard</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={golf}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>

      <h2 className="text-2xl font-bold">Tennis Standings</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={tennis}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="wins" fill="#413ea0" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
