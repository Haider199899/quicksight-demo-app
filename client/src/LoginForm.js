import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './LoginForm.css'; // Import the CSS file

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleLogin = async () => {
    // Perform validation and send login request to the server
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Successful login
     // onLogin();
      navigate('/quicksight-dashboard')
    } else {
      // Display error message
      alert(data.message);
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
      </form>
    </div>
  );
};

export default LoginForm;
