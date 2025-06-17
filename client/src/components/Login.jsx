import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [tokenInput, setTokenInput] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tokenInput) {
      login(tokenInput);
      setTokenInput('');
      navigate('/posts');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label>
        Admin Token:
        <input
          type="password"
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
