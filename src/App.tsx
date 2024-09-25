import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Create this file for custom styles

function App() {
  const [coinBalance, setCoinBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Function to get the Telegram ID from the URL query parameters
  const getTelegramIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('telegramId');
  };

  const telegramId = "8188886153:AAHRM1zL_EELdhq6Ilhdwr1TohClD8aUVXc"; // Get Telegram ID from URL
  const API_URL = 'https://co3-labs-task-tapme-telegram-web-app.onrender.com';

  useEffect(() => {
    if (telegramId) {
      const fetchCoinBalance = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/user/${telegramId}`);
          if (response.status === 404) {
            setError('User not found.');
          } else {
            setCoinBalance(response.data.coinBalance);
          }
        } catch (error) {
          setError('Error fetching coin balance.');
          console.error('Error fetching coin balance:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCoinBalance();
    } else {
      setError('Telegram ID not found.');
      setLoading(false);
    }
  }, [telegramId, API_URL]);

  const handleTap = async () => {
    try {
      const response = await axios.put(`${API_URL}/api/user/${telegramId}`);
      setCoinBalance(response.data.coinBalance);
      setSuccess('Coin balance updated successfully!');
      setTimeout(() => setSuccess(""), 3000); // Clear success message after 3 seconds
    } catch (error) {
      setError('Error incrementing coin balance.');
      console.error('Error incrementing coin balance:', error);
    }
  };

  
  return (
    <div className="App">
      <h1>TapMe Game</h1>
        <>
          <p>Coins: {coinBalance}</p>
          <button onClick={handleTap}>Tap to Earn Coins</button>
          {success && <p className="success">{success}</p>}
        </>
     
    </div>
  );
}

export default App;