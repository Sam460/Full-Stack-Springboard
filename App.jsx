import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import './App.css';
import './index.css';
import './main.jsx';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsername = 'testuser';
    const storedPassword = 'password123';

    if (formData.username === storedUsername && formData.password === storedPassword) {
      alert('Login successful! Redirecting...');
      window.location.href = '/dashboard';
    } else {
      alert('Invalid username or password. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    alert('Forgot Password functionality not implemented yet.');
  };

  const handleCreateAccount = () => {
    alert('Redirecting to Create New Account...');
    window.location.href = '/create-account';
  };

  const handleGoogleSuccess = (response) => {
    console.log('Google Login Success:', response.profileObj);
    
    localStorage.setItem('user', JSON.stringify(response.profileObj));
  
    localStorage.setItem('token', response.tokenId);
  
    alert(`Welcome, ${response.profileObj.name}! Redirecting to your dashboard...`);
    window.location.href = '/dashboard';
  };
  
  const handleGoogleFailure = (response) => {
    console.error('Google Login Failed:', response);
    alert('Google Login failed. Please try again.');
  };
  

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Login Page</h1>
        </header>
        <main>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="login-button">Login</button>
            <button type="button" className="forgot-button" onClick={handleForgotPassword}>
              Forgot Password?
            </button>
          </form>
          <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID"
            buttonText="Login with Google"
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={'single_host_origin'}
            className="google-login-button"
          />
          <div className="create-account">
            <p>Don't have an account?</p>
            <button
              type="button"
              className="create-account-button"
              onClick={handleCreateAccount}
            >
              Create New Account
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
