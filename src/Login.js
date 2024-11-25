import React, { useState } from 'react';
import Logo from './assets/images/logo.png';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const staticUsername = 'user';
    const staticPassword = 'Adaa@1234';

    if (username === staticUsername && password === staticPassword) {
      onLogin(); // Call the login callback
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="login-container">
      <div className="login-flex">
        <div className='login-branding'>

        </div>
        <div className='login-form-container'>
            <div className='login-logo'>
            <img src={Logo} alt="Adaa Logo" />
            </div>
          <div className='form-inputs'>
          <form className="login-form" onSubmit={handleLogin}>
            <input className='form-input' type="text" placeholder="اسم المستخدم" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className='form-input' type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="error-message">{error}</p>}
            <button className='login-button' type="submit">تسجيل الدخول</button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
