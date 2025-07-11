// frontend/src/components/charts/BarChartCustom.jsx

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function BarChartCustom({ data, dataKeyX, dataKeyY, title, barColor = "#22C55E" }) {
  return (
    <div className="bg-white dark:bg-secondary shadow-lg rounded-2xl p-4 w-full">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        {title}
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey={dataKeyX} tick={{ fill: "#374151" }} />
          <YAxis tick={{ fill: "#374151" }} />
          <Tooltip contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px" }} />
          <Legend />
          <Bar dataKey={dataKeyY} fill={barColor} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartCustom;
