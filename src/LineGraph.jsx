import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph = ({ data }) => {
    
    // Extract time and weight from input data
    const labels = data.map(entry => 
        new Date(entry.readingDateTime).toLocaleString("en-NZ", {timeZone: "Pacific/Auckland", year: 'numeric', month: '2-digit', day: '2-digit'})
    );
    const weightData = data.map(entry => entry.weight > 2000 ? (entry.weight / 1000) : entry.weight);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Weight',
                data: weightData,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: 'Weight Tracking',
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default LineGraph;
