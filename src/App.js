import React from 'react';
import './App.css';
import Header from './components/Header';
import Routes from './routes';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes/>
      <Footer/>
    </div>
  );
}

export default App;
