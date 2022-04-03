import React from 'react';
import './App.css';
import { Route, Routes} from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';
import Home from './components/Home/Home.jsx';
import Details from './components/Details/Details';
import Create from './components/Create/Create';

function App() {
  return (
  <>
  <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/create" element={<Create/>} />
        <Route path="/details/:id" element={<Details/>}/>
  </Routes> 
  </>
  );
}

export default App;