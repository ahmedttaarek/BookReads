import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import your CSS file

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate(); // Replaces history

  const handleLogin = async () => {
    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });

      // Extract isAdmin from response data
      const { isAdmin } = response.data;

      // Store user info and isAdmin flag (optional)
      localStorage.setItem('isAdmin', JSON.stringify(isAdmin));

      // Redirect based on isAdmin flag
      if (isAdmin) {
        navigate('/admin-dashboard'); // Use navigate instead of history.push
      } else {
        navigate('/home/books'); // Use navigate instead of history.push
      }
    } catch (error) {
      // Handle invalid login
      console.error('Login error:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="admin-login">
      <div>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
