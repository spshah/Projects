import React from 'react';
import CSVUpload from './pages/CSVUpload';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TransactionDetail from './components/TransactionDetail';
import Home from './pages/Home.js';
//function App() {
//  return (
//    <div className="App">
//      <CSVUpload />
//    </div>
//  );
//}


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/transaction/:id" element={<TransactionDetail />} />
          <Route path="/uploadCSV/:id" element={<CSVUpload />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;