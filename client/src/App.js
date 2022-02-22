import React from 'react';
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import Details from './components/Details/Details'
import Create from './components/Create/Create'

function App() {
  return (
    <BrowserRouter>
        <Route exact path= "/" component={Landing}/>
        <Route exact path= "/home" component={Home}/>
        <Route exact path= "/create" component={Create}/>
        <Route exact path= "/details/:id" component={Details}/>
        <Route exact path= "/about" component={Home}/>
    </BrowserRouter>
  );
}

export default App;