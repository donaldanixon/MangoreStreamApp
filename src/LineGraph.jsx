import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph = ({ data }) => {
    
    const reversedData = [...data].reverse();

    const labels = reversedData.map(entry => 
        new Date(entry.Date).toLocaleString("en-NZ", {timeZone: "Pacific/Auckland", hour: '2-digit', minute: '2-digit'})
    );
    const flowData = reversedData.map(entry => entry.Flow);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Dam Outflow',
                data: flowData,
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
                text: 'Dam Outflow Tracking',
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'm3/s',
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default LineGraph;
