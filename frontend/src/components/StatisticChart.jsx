import React from 'react'
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatisticChart = ({ data }) => {
  const labels = ["Lv4 (8+)", "Lv3 (6-8)", "Lv2 (4-6)", "Lv1 (<4)"];
  const values = [data.lv4, data.lv3, data.lv2, data.lv1];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `Score distribution for ${data.subject}`,
        data: values,
        backgroundColor: ["#4CAF50", "#FFEB3B", "#FF9800", "#F44336"],
        borderColor: ["#388E3C", "#FBC02D", "#F57C00", "#D32F2F"],
        borderWidth: 1,
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: `Score Distribution for ${data.subject}` },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <Bar
      data={chartData}
      options={options}
      className="w-full h-full"
    />
  )
}

export default StatisticChart
