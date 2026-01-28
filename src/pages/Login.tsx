import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Login.scss';
import loginIllustration from '@/assets/login_image.png';
import lendsqrLogoImage from '@/assets/lendsqrLogoImage.png'; 

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Store login state
    localStorage.setItem('lendsqr_auth', 'true');
    
    setIsLoading(false);
    navigate('/dashboard/users');
  };

  return (
    <div className="login">
      <div className="login__left">
        <div className="login__left-content">
          <div className="login__logo">
            <img 
              src={lendsqrLogoImage} 
              alt="Lendsqr Logo" 
              className="login__logo-image"
            />
          </div>
          <div className="login__illustration">
            <img 
              src={loginIllustration} 
              alt="Person with colorful geometric shapes illustration" 
            />
          </div>
        </div>
      </div>
      
      <div className="login__right">
        <div className="login__form-container">
          <h1 className="login__title">Welcome!</h1>
          <p className="login__subtitle">Enter details to login.</p>
          
          <form className="login__form" onSubmit={handleSubmit}>
            <div className="login__input-group">
              <input
                type="email"
                className="login__input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
              />
            </div>
            
            <div className="login__input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="login__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
              />
              <button
                type="button"
                className="login__show-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
            
            <a href="#" className="login__forgot-password">
              Forgot Password?
            </a>
            
            <button
              type="submit"
              className="login__submit"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'LOG IN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;