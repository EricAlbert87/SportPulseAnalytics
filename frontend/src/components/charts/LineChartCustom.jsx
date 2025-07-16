// frontend/src/components/charts/LineChartCustom.jsx

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function LineChartCustom({ data, dataKeyX, dataKeyY, title, lineColor = "#22C55E" }) {
  return (
    <div className="bg-white dark:bg-secondary shadow-lg rounded-2xl p-4 w-full">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        {title}
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey={dataKeyX} tick={{ fill: "#374151" }} />
          <YAxis tick={{ fill: "#374151" }} />
          <Tooltip contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px" }} />
          <Legend />
          <Line type="monotone" dataKey={dataKeyY} stroke={lineColor} strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartCustom;
