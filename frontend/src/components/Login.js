// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform your authentication logic here
    // For simplicity, we're assuming a successful login
    navigate('/dashboard');
  };

  return (
    <div className="dashboard" >
      <h2>Login</h2>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="button secondary-button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
