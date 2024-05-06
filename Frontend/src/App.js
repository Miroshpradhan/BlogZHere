import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const handleLogin = () => {
    // Your login logic...
    console.log('Logged in');
  };
  return (
   
    <Router>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={ <Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <Profile handleLogout={handleLogout} />
            ) : (
              <Navigate to="/login" state={{ from: '/profile' }} replace />
            )
          }
        />
        <Route path="/posts" element={<PostList />} />
        <Route path="/create-post" element={<PostForm />} />
      </Routes>
    </Router>
    
  );
}

const Home = () => {
  return <h2>Welcome to Blog Z!</h2>;
};

export default App;
