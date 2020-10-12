import React from 'react';
import './App.css';
import TypingBox from './components/TypingBox'; 

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
