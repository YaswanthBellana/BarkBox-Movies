import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const generateCaptcha = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const Captcha = () => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === captcha) {
      navigate('/movieSearch');
    } else {
      setError('Incorrect captcha. Please try again.');
      setCaptcha(generateCaptcha());
      setInput('');
    }
  };

  return (
    <div className='mainContainerC'>
      <h1>Enter Captcha to Proceed</h1>
      <div className='formcontainer'>
      <form onSubmit={handleSubmit}>
        <p className='formCaptchaPara'>{captcha}</p>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter captcha"
        />
        <button type="submit">Submit</button>
      </form>
      <br />
      {error && <p className='errorName'>{error}</p>}
      </div>
    </div>
  );
};

export default Captcha;
