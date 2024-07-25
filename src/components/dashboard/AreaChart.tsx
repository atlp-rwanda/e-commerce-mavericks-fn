import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';

const AreaChart: React.FC = () => {
  const data: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Yearly sales',
        data: [200, 300, 1700, 400, 300, 200, 100, 100, 100, 50, 50],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: '#0E9CFF',
        fill: true,
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    return () => {
      Object.values(Chart.instances).forEach(instance => instance.destroy());
    };
  }, []);

  return <Line data={data} options={options} />;
};

export default AreaChart;
