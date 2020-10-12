import React, { Fragment } from "react"; 
import "./TypingBox.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert"
import { Button, Container } from "react-bootstrap";
import ColoredText from "./ColoredText.js";
import {FairyTales} from "./FairyTales.js";


class TypingBox extends React.Component {

    //text = "This is what the player will have to type really quickly so that they can look really cool and impress all of their friends by having a word per minute speed that is litteraly faster than the speed of light, do you dig it? ";
    
    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    initialState = {
        gameState: 0,
        currentWord: 0, 
        wordIndex: 0,
        currentChar: 0,
        charIndex: 0,
        spellCheck: "success", 
        textInput: {},
        time: 10,
        textObject: FairyTales[this.getRandomInt(FairyTales.length)]
    }

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.coloredText = [];
        var initArry = this.state.textObject.text.split(" "); 
        for(let i = 0; i < initArry.length; i++) {
            this.coloredText.push({word: initArry[i], color: "#000000"});
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
        for(let i = 0; i < textArry.length - 1; i++) {
            if(textInput[i]) {
                if ((textInput[i] !== textArry[i])) {
                    if (i === textInput.length - 1) {
                        this.coloredText[i].color = "#F9B847";
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
            spellCheck: (this.state.textObject.text.split(" ")[event.target.value.split(/ +/).length - 1].substring(0, event.target.value.split(" ").pop().length) === event.target.value.split(" ").pop()) ? "success":"danger"
        })
    }
    
    handleButtonClick = (event) => {

        var randObj = FairyTales[this.getRandomInt(FairyTales.length)];
    
        this.setState({
            gameState: 0,
            currentWord: 0, 
            wordIndex: 0,
            currentChar: 0,
            charIndex: 0,
            spellCheck: "success", 
            textInput: {},
            time: 10,
            textObject: randObj
        });
        var currArry = randObj.text.split(" "); 
        for(let i = 0; i < currArry.length; i++) {
            if(!this.coloredText[i]) {
                this.coloredText.push({word: currArry[i], color: "#000000"});
            }
            this.coloredText[i] = {word: currArry[i], color: "#000000"};
        }

    }

    render = () => {
        if (this.state.gameState === 0) {
            return (                   
                <Container>
                    <h1 className = "mb-5">{this.state.time} seconds left</h1>
                    <Alert variant={this.state.spellCheck} >
                        <ColoredText coloredText={this.checkText(this.state.textInput, this.state.textObject.text.split(" "))}></ColoredText>
                    </Alert>
                    <h2 className = "mb-5">{this.state.textObject.name}</h2>
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
                    <p>Accuracy: {((this.state.textInput.length - 1 - this.getErrors(this.state.textInput, this.state.textObject.text.split(" "))) / (this.state.textInput.length - 1) * 100).toFixed(2)} %</p>
                </Container>
                
            </div>         
        }
       
    }
    
}


export default TypingBox;