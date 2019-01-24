import React, { Component } from 'react';
import math from 'mathjs'

import './CalculatorContainer.css'
import Button from '../Buttons/Button/Button'
import Buttons from '../Buttons/Buttons'
import CalcScreen from '../Screens/CalcScreen/CalcScreen'
import OperScreen from '../Screens/OperScreen/OperScreen'
import Screens from '../Screens/Screens'

class CalculatorContainer extends Component {
    state = {
        operationsUpper: [],
        operationsLower: ["0"],
        calculating: false,
        previous: ''
    }

    calculate = (value) => {
        // Show a more precise result on the lower display, and round it up a bit on the upper one for more room
        let result = this.state.operationsUpper.join('')
        if (result) {
            result = math.eval(result)
            result = math.format(result, { precision: 8 })
            const newOperationsUpper = [...this.state.operationsUpper, value, result]
            this.setState({
                operationsLower: [result],
                operationsUpper: newOperationsUpper,
                calculating: true,
                previous: value
            })
        }
    }

    // Allow calculation chaining by extracting the result and continuing calculation normally
    continueCalculation = (value) => {
        const sumDisplay = [...this.state.operationsUpper].pop()
        this.setState({
            operationsUpper: [sumDisplay, value],
            operationsLower: [value],
            previous: value
        })
    }

    // Add the operator on the lower display and make sure the whole operation is on the upper display
    addCalculationOnDisplay = (value) => {
        const addCalculation = [...this.state.operationsUpper, value]
        this.setState({
            operationsUpper: addCalculation,
            operationsLower: [value],
            previous: value
        })
    }

    // Insert whole or decimal numbers on the screen(s)
    addNumbersToDisplay = (value) => {
        const newOperationsLower = [...this.state.operationsLower, value]
        const newOperationsUpper = [...this.state.operationsUpper, value]
        this.setState({
            operationsUpper: newOperationsUpper,
            operationsLower: newOperationsLower,
            previous: value
        })
    }

    // Allow starting a calculation with a decimal or a negative number
    startCalculationWithSpecial = (value) => {
        this.setState({
            operationsUpper: [value],
            operationsLower: [value],
            previous: value,
            calculating: true
        })
    }

    handleClick = e => {
        // Get the data value of the button that was pressed
        const value = e.target.getAttribute('data-value')
        switch (value) {
            // If calculator is cleared, return initial state
            case 'clear':
                this.setState({
                    operationsUpper: [],
                    operationsLower: ["0"],
                    calculating: false,
                    previous: value
                })
                break

            // If = is pressed, calculate the result
            case '=':
                // Prevent crashing from inputting only an operator and pressing '='
                if (this.state.previous === '+' || this.state.previous === '-' || this.state.previous === '*' || this.state.previous === '/') {
                    this.setState({
                        operationsUpper: [],
                        operationsLower: ['ERROR']
                    })
                } else {
                    this.calculate(value)
                }
                break

            // Allow to start calculating with a '.' 
            case '.':
                if (!this.state.calculating) {
                    this.startCalculationWithSpecial(value)
                } else {
                    if (this.state.previous !== '.') {
                        // Don't do anything if the last button pressed was '=' OR if one decimal has been inserted to the current number
                        if (this.state.previous === '=' || this.state.operationsLower.includes('.')) {
                            break
                        } else {
                            this.addNumbersToDisplay(value)
                        }
                    }
                }
                break

            // If + is pressed, set lower display to show only '+'
            case '+':
                if (this.state.previous !== '+') {
                    if (this.state.previous === '=') {
                        this.continueCalculation(value)
                    } else {
                        this.addCalculationOnDisplay(value)
                    }
                }
                break

            case '*':
                if (this.state.previous !== '*') {
                    if (this.state.previous === '=') {
                        this.continueCalculation(value)
                    } else {
                        this.addCalculationOnDisplay(value)
                    }
                }
                break

            // Allow to start calculating with a '-' 
            case '-':
                if (!this.state.calculating) {
                    this.startCalculationWithSpecial(value)
                } else {
                    if (this.state.previous !== '-') {
                        if (this.state.previous === '=') {
                            this.continueCalculation(value)
                        } else {
                            this.addCalculationOnDisplay(value)
                        }
                    }
                }
                break

            case '/':
                if (this.state.previous !== '/') {
                    if (this.state.previous === '=') {
                        this.continueCalculation(value)
                    } else {
                        this.addCalculationOnDisplay(value)
                    }
                }
                break

            default:
                // If calculator is on stand-by, remove the default zero by inserting the input value in an empty array
                if (!this.state.calculating) {
                    const newOperationsLower = [value]
                    const newOperationsUpper = [value]
                    this.setState({
                        operationsLower: newOperationsLower,
                        operationsUpper: newOperationsUpper,
                        calculating: true,
                        previous: value
                    })
                    break
                } else {
                    // Only allow operators after a calculation
                    if (this.state.previous === '=') {
                        break
                    } else {
                        // If an operation key was pressed previously, push the number in an empty array on the lower display
                        if (this.state.previous === '+' || this.state.previous === '-' || this.state.previous === '*' || this.state.previous === '/') {
                            const newOperationsLower = [value]
                            const newOperationsUpper = [...this.state.operationsUpper, value]
                            this.setState({
                                operationsUpper: newOperationsUpper,
                                operationsLower: newOperationsLower,
                                previous: value
                            })
                        } else {
                            this.addNumbersToDisplay(value)
                        }
                        break
                    }
                }
        }
    }

    render() {
        return (
            <div className="container">
                <Screens id="screens">
                    <OperScreen id="operScreen" data={this.state.operationsUpper} />
                    <CalcScreen id="calcScreen" data={this.state.operationsLower} />
                </Screens>
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
                    <Button id="decimal" onClick={this.handleClick} label="." value="." />
                </Buttons>
            </div>
        );
    }
}

export default CalculatorContainer;