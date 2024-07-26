import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState([]);
  const [strikes, setStrikes] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedback');
        console.log('Feedback data:', response.data.data);
        console.log('Strikes data:', response.data.strikes);
        setFeedback(response.data.data);
        setStrikes(response.data.strikes);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setError('Error fetching feedback');
      }
    };

    fetchFeedback();
  }, []);

  const chartData = {
    labels: Object.keys(strikes),
    datasets: [
      {
        label: 'Corrective Feedback',
        data: Object.values(strikes),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h1>Employee Feedback " in red  has 3 or more strikes"</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {feedback.map((item, index) => (
          <li
            key={index}
            style={{
              color: strikes[item[1]] >= 3 ? 'red' : 'black'
            }}
          >
            {item.join(' - ')}
          </li>
        ))}
      </ul>
      <h2>Corrective Feedback Chart</h2>
      {Object.keys(strikes).length > 0 ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>No data available for the chart.</p>
      )}
    </div>
  );
};

export default FeedbackPage;
