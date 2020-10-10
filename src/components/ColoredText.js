import React from 'react'; 


class ColoredText extends React.Component {
    render () {
        const coloredText = this.props.coloredText;  
        return coloredText.map((coloredWord) => <span style={ {color:coloredWord.color} }>{coloredWord.word} </span>)
    }
}
 
export default ColoredText;