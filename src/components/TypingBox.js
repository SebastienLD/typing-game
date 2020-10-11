import React from "react"; 
import "./TypingBox.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert"
import { Button, Container } from "react-bootstrap";
import ColoredText from "./ColoredText.js";
import {FairyTales} from "./FairyTales.js";

class TypingBox extends React.Component {

    //text = "This is what the player will have to type really quickly so that they can look really cool and impress all of their friends by having a word per minute speed that is litteraly faster than the speed of light, do you dig it? ";
    

    initialState = {
        gameState: 0,
        currentWord: 0, 
        wordIndex: 0,
        currentChar: 0,
        charIndex: 0,
        spellCheck: "success", 
        textInput: {},
        time: 10,
    }

    constructor(props) {
        super(props);

        console.log(FairyTales[0])
        this.state = this.initialState;
        this.coloredText = [];
        for(let i = 0; i< this.state.textArry.length; i++){
            this.coloredText.push({word:this.state.textArry[i], color:"#FF00FF"}); 
        }
    }

    getErrors = (textInput, textArry) => {
        let currErrors = 0
        for (let i = 0; i < textInput.length - 1; i++) {
            if (textInput[i] !== textArry[i]) {
                currErrors += 1;
            }
        }
        return currErrors;
    }

    checkText = (textInput, textArry) => {
        console.log(textInput);
        for(let i = 0; i < textArry.length - 1; i++) {
            if(textInput[i]) {
                if ((textInput[i] !== textArry[i])) {
                    if (i === textInput.length - 1) {
                        this.coloredText[i].color = "#FFFF00";
                    } else {
                        this.coloredText[i].color = "#FF0000";
                    }
                } else {
                    this.coloredText[i].color = "#000000"
                }
            }
            else {
                this.coloredText[i].color = "#000000";
            }
        }
        return this.coloredText;
    }

    interval = null;

    handleTextInput = (event) => {
      
        this.coloredText[0].color = "#00FF00";

        if (!this.interval) {
            this.interval = setInterval(() => {
           
                this.setState({
                    time: this.state.time - 1
                })
        
                if (this.state.time < 1) {
                    clearInterval(this.interval);
                    this.interval = null;
                    this.setState({gameState:1});
                }
            },1000);
        }
                
        this.setState({
            textInput: event.target.value.split(/ +/),
            currentWord: event.target.value.split(" ").pop(),
            wordIndex: event.target.value.split(" ").length - 1,
            currentChar: event.target.value.split(" ").pop().slice(-1),
            charIndex: event.target.value.split(" ").pop().length,
            spellCheck: (this.text.split(" ")[event.target.value.split(/ +/).length - 1].substring(0, event.target.value.split(" ").pop().length) === event.target.value.split(" ").pop()) ? "success":"danger"
        })
    }
    
    handleButtonClick = (event) => {
        this.setState(this.initialState);
    }

    render = () => {
        if (this.state.gameState === 0) {
            return (                   
                <Container>
                    <h1 className = "mb-5">{this.state.time} seconds left</h1>
                    <Alert variant={this.state.spellCheck} className = "mb-5">
                        <ColoredText coloredText={this.checkText(this.state.textInput, this.state.textArry)}></ColoredText>
                    </Alert>
                    <Form>
                        <Form.Group>
                            <Form.Control type = "textarea" placeholder = "Type here!" onChange={this.handleTextInput} />
                            <Form.Text className = "text-muted">
                                You will have 60 seconds once the test begins.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                    
                </Container>
            )
        } else {
            return <div>
                <h1 className = "mb-3">Game Over!</h1>
                <Button onClick={this.handleButtonClick} className = "mb-3">Click to play again!</Button>
                <Container>
                    <p>WMP: {(this.state.textInput.length - 1) / (this.initialState.time / 60)}</p>
                    <p>Accuracy: {((this.state.textInput.length - 1 - this.getErrors(this.state.textInput, this.state.textArry)) / (this.state.textInput.length - 1) * 100).toFixed(2)} %</p>
                </Container>
                
            </div>         
        }
       
    }
    
}


export default TypingBox;