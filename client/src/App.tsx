import React, { FC } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import NavigationBar from './components/NavigationBar';

const App:FC = () => {
  return (
    <div className="App">
      <NavigationBar/>
      <AppRouter/>
    </div>
  );
}

export default App;
