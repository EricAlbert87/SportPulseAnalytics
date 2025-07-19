import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChartCustom({ title, data, dataKeyX, dataKeyY, barColor }) {
  const chartData = {
    labels: data.map(item => item[dataKeyX]),
    datasets: [{
      label: title,
      data: data.map(item => parseInt(item[dataKeyY]) || 0),
      backgroundColor: barColor,
      borderColor: barColor,
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: 'top' }, title: { display: true, text: title } },
  };

  return <Bar data={chartData} options={options} />;
}

export default BarChartCustom;