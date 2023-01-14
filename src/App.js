import React, { createContext } from 'react';
import './App.css';
import Home from './components/Home';
// import { Route, Switch, Routes } from 'react-router-dom';
// import Sidebar from './components/Sidebar';

const Data = createContext();

function App() {
  return (
    <div className="App">
     {/* <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reports" element={<About />} /> */}
      {/* <Route path="/lead-source" element={<LeadSourceMain />} /> */}

    {/* </Routes> */}
    <Home/>
    </div>
  );
}

export default App;
