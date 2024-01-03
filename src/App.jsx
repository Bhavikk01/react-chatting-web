import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterScreen from './app/screens/auth_screen/register.jsx';
import LoginScreen from './app/screens/auth_screen/login.jsx';
import ChatScreen from './app/screens/chat_screen/chat_screen.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='register/' element={<RegisterScreen />} />
        <Route path='login/' element={<LoginScreen />} />
        <Route path='/' element={<ChatScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
