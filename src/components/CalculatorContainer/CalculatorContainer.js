import React, { Component } from 'react';

import './CalculatorContainer.css'
import Button from '../Button/Button'
import Buttons from '../Buttons/Buttons'
import Screen from '../Screen/Screen'

class CalculatorContainer extends Component {
    render() {
        return (
            <div className="container">
                <Screen id="display"/>
                <Buttons id="buttons">
                    <Button id="clear" onClick={this.handleClick} label="C" value="clear" />
                    <Button id="divide" onClick={this.handleClick} label="/" value="/" />
                    <Button id="multiply" onClick={this.handleClick} label="*" value="*" />
                    <Button id="seven" onClick={this.handleClick} label="7" value="7" />
                    <Button id="eight" onClick={this.handleClick} label="8" value="8" />
                    <Button id="nine" onClick={this.handleClick} label="9" value="9" />
                    <Button id="subtract" onClick={this.handleClick} label="-" value="-" />
                    <Button id="four" onClick={this.handleClick} label="4" value="4" />
                    <Button id="five" onClick={this.handleClick} label="5" value="5" />
                    <Button id="six" onClick={this.handleClick} label="6" value="6" />
                    <Button id="add" onClick={this.handleClick} label="+" value="+" />
                    <Button id="one" onClick={this.handleClick} label="1" value="1" />
                    <Button id="two" onClick={this.handleClick} label="2" value="2" />
                    <Button id="three" onClick={this.handleClick} label="3" value="3" />
                    <Button id="equals" onClick={this.handleClick} label="=" value="=" />
                    <Button id="zero" onClick={this.handleClick} label="0" value="0" />
                    <Button id="decimal" onClick={this.handleClick} label="," value="," />
                </Buttons>
            </div>
        );
    }
}

export default CalculatorContainer;