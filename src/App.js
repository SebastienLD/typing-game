import React from 'react';
import './App.css';
import TypingBox from './components/TypingBox'; 

const gameLength = 60; 


class App extends React.Component {
 
  render() {
    return (
      <div className = "App">
        <header className = "App-header">
          <TypingBox></TypingBox>
        </header> 
    </div>
    )
  }
}



export default App;
