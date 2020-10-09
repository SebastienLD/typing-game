import React from 'react';
import './App.css';
import TypingBox from './components/TypingBox'; 

const gameLength = 60; 
var interval;

var gameState = {
  time: gameLength,
  inGame: true
}

const startGame = () => {

    interval = setInterval(() => {
    gameState.time--; 

    if (gameState.time <= 0) {
      gameState.inGame = false; 
      clearInterval(interval);
    }
  },1000);
};

class App extends React.Component {
  constructor(props) {
    super(props);
    startGame(); 
  }
  render() {
    return (
      <div className = "App">
      <header className = "App-header">
        <h1 className = "mb-5">{gameState.time} seconds left</h1>
        <TypingBox></TypingBox>
      </header> 
    </div>
    )
  }
}



export default App;
