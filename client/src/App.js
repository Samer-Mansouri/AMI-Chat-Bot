import React from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'

import Bot from './Components/Bot';


const App = () => {
  return (
    <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            
            <Home />

          </Route>

        </Switch>
        <Bot />
        <Footer />
     
    </Router>   
  );
}

export default App;
