import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    email: ''
    
  });

  // Handle changes to input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/register', formData);
      console.log('User registered:', response.data);
      window.alert('Registration successful!');
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map((errorItem: { msg: string }) => errorItem.msg).join('\n');
        window.alert(`Registration failed:\n${errorMessages}`);
      } else {
        console.error('Error registering user:', error);
        window.alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className='signup'>
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder='Name'
        />
      </div>
      <div>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder='Username'
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder='Password'
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder='Email'
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
    </div>
  );
};

export default Signup;
