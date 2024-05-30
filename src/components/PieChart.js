import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import MusicArtists from '../components/MusicArtists'; // Assuming MusicArtists is your model

export default function PieChart() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const genres = {};
        MusicArtists.forEach(artist => {
            genres[artist.Genre] = (genres[artist.Genre] || 0) + 1;
        });

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const myChartRef = chartRef.current.getContext('2d');

        chartInstance.current = new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: Object.keys(genres),
                datasets: [{
                    label: 'Music Genres',
                    data: Object.values(genres),
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        // Add more colors if needed
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            afterLabel: function (context) {
                                let genre = context.label;
                                let count = genres[genre];
                                return `Count: ${count}`;
                            }
                        }
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div className="d-flex justify-content-center" style={{ height: '100vh' }}>
            <div style={{ width: '300px', height: '300px' }}>
                <canvas ref={chartRef} />
            </div>
        </div>
    );
}
