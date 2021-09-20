import React from 'react';
import './App.css';
import Friends from './components/Friends'
import { useLocalstorage } from './hooks/useLocalstorage';


function App() {

  //use bootstrap
  return (
    <div className="container">
     
      <Friends/>
      
      {/* display friends name here */}
    </div>
  );
}

export default App;
