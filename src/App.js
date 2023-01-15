import React, { createContext } from 'react';
import './App.css';
import Home from './components/Home';


const Data = createContext();

function App() {
  return (
    <div className="App">
    <Home/>
    </div>
  );
}

export default App;
