import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import FeedbackPage from './pages/FeedbackPage';
import ChartPage from './pages/ChartPage';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/feedback' element={<FeedbackPage />} />
          <Route path='/chart' element={<ChartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
