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

function BarChartCustom({ data, dataKeyX, dataKeyY, title, barColor = "#d4a017" }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full">
      <h2 className="text-2xl font-semibold text-navy-900 font-roboto mb-5">
        {title}
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey={dataKeyX} tick={{ fill: "#374151" }} />
          <YAxis tick={{ fill: "#374151" }} />
          <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e5e7eb" }} />
          <Legend wrapperStyle={{ fontFamily: "Open Sans", fontSize: "14px" }} />
          <Bar dataKey={dataKeyY} fill={barColor} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartCustom;