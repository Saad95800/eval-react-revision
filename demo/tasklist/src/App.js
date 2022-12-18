
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Container from './component/Container'
import {Routes, Route} from 'react-router-dom'
import HomePage from './component/HomePage';
import Login from './component/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={`/`} element={<HomePage/>} />
        <Route path={`/login`} element={<Login/>} />
        <Route path={`/tasklist`} element={<Container />} />
      </Routes>
      
    </div>
  );
}

export default App;
