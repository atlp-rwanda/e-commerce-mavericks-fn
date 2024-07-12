// BarChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ChartOptions } from 'chart.js';
import { ChartData } from 'chart.js/auto';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const BarChart: React.FC = () => {
  const data: ChartData<'bar'> = {
    labels: ['', '', '', '', '', ''],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#1877F2',
        borderRadius: 5, // No border radius
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
