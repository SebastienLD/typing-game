import React from "react"; 
import "./TypingBox.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert"
import { Container } from "react-bootstrap";


var text = "This is what the player will have to type really quickly so that they can look really cool and impress all of their friends by having a word per minute speed that is litteraly faster than the speed of light, do you dig it? ";
var textArry = text.split(" ")

const initialState = {
     currentWord: 0, 
     wordIndex: 0,
     currentChar: 0,
     charIndex: 0,
     spellCheck: "success", 
     textInput: {}
}

class TypingBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleTextInput = (event) => {
        this.setState({
            textInput: event.target.value.split,
            currentWord: event.target.value.split(" ").pop(),
            wordIndex: event.target.value.split(" ").length - 1,
            currentChar: event.target.value.split(" ").pop().slice(-1),
            charIndex: event.target.value.split(" ").pop().length,
            spellCheck: (text.split(" ")[event.target.value.split(" ").length - 1].substring(0, event.target.value.split(" ").pop().length) === event.target.value.split(" ").pop()) ? "success":"danger"
        })
        
        
    } 

    render() {
        return (
            <Container>
                <Alert variant={this.state.spellCheck} className = "mb-5">
                    {text}
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
    }
    
}


export default TypingBox;