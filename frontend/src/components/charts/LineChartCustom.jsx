import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function LineChartCustom({ title, data, dataKeyX, dataKeyY, lineColor }) {
  const chartData = {
    labels: data.map(item => item[dataKeyX]),
    datasets: [{
      label: title,
      data: data.map(item => parseInt(item[dataKeyY]) || 0),
      fill: false,
      borderColor: lineColor,
      tension: 0.1,
    }],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: 'top' }, title: { display: true, text: title } },
  };

  return <Line data={chartData} options={options} />;
}

export default LineChartCustom;