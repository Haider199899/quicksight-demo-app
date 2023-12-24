// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoaderComponent from './LoaderComponent'; // Import the loader component
import './LoginForm.css'; // Import the CSS file

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setIsLoading(true); // Set loading to true before making the fetch request
      const response = await fetch('https://quicksight-demo-app.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.url;
      } else {
        // Display error message
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setIsLoading(false); // Set loading to false regardless of the fetch result
    }
  };

  return (
    <div className="login-container">
      <h2>Quicksight Demo App</h2>
      <form>
        <label>
          Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>Login</button>

        {/* Display the loader component when isLoading is true */}
        {isLoading && <LoaderComponent />}
      </form>
    </div>
  );
};

export default LoginForm;
