import React from "react"; 
import "./TypingBox.css"; 
import Container from "react-bootstrap/Container"; 
import Jumbotron from "react-bootstrap/Jumbotron"; 
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";

const TypingBox = () => (
    <Container className = "p-3">
        <Jumbotron>
            <h1 className = "header">Welcome to my App</h1>
        </Jumbotron>
    </Container>
); 

export default TypingBox;