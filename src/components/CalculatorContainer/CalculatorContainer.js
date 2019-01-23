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

    calculate = () => {
        let result = this.state.operationsUpper.join('')
        if (result) {
            result = math.eval(result)
            result = math.format(result, { precision: 14 })
            const newOperationsUpper = [...this.state.operationsUpper, "=", result]
            this.setState({
                operationsLower: [result],
                operationsUpper: newOperationsUpper,
                calculating: false,
                previous: '='
            })
        }
    }

    handleClick = e => {
        const value = e.target.getAttribute('data-value')
        switch (value) {
            // If calculator is cleared, return initial state
            case 'clear':
                this.setState({
                    operationsUpper: [],
                    operationsLower: ["0"],
                    calculating: false,
                    previous: 'clear'
                })
                break
            // If = is pressed, calculate the result
            case '=':
                this.calculate()
                break
            // If + is pressed, set lower display to show only '+'
            case '+':
                if (this.state.previous !== '+') {
                    const addUpper = [...this.state.operationsUpper, "+"]
                    this.setState({
                        operationsUpper: addUpper,
                        operationsLower: ["+"],
                        previous: '+'
                    })
                }
                break

            case '*':
                if (this.state.previous !== '*') {
                    const multiplyUpper = [...this.state.operationsUpper, "*"]
                    this.setState({
                        operationsUpper: multiplyUpper,
                        operationsLower: ["*"],
                        previous: '*'
                    })
                }
                break

            case '-':
                if (!this.state.calculating) {
                    this.setState({
                        operationsUpper: ["-"],
                        operationsLower: ["-"],
                        previous: '-',
                        calculating: true
                    })
                } else {
                    if (this.state.previous !== '-') {
                        const subtractUpper = [...this.state.operationsUpper, "-"]
                        this.setState({
                            operationsUpper: subtractUpper,
                            operationsLower: ["-"],
                            previous: '-'
                        })
                    }
                }
                break

            case '/':
                if (this.state.previous !== '/') {
                    const divideUpper = [...this.state.operationsUpper, "/"]
                    this.setState({
                        operationsUpper: divideUpper,
                        operationsLower: ["/"],
                        previous: '/'
                    })
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
                        previous: 'num'
                    })
                    break
                } else {
                    // If an operation key was pressed previously, push the number in an empty array on the lower display
                    if (this.state.previous === '+' || this.state.previous === '-' || this.state.previous === '*' || this.state.previous === '/') {
                        const newOperationsLower = [value]
                        const newOperationsUpper = [...this.state.operationsUpper, value]
                        this.setState({
                            operationsUpper: newOperationsUpper,
                            operationsLower: newOperationsLower,
                            previous: 'num'
                        })
                    } else {
                        const newOperationsLower = [...this.state.operationsLower, value]
                        const newOperationsUpper = [...this.state.operationsUpper, value]
                        this.setState({
                            operationsUpper: newOperationsUpper,
                            operationsLower: newOperationsLower,
                            previous: 'num'
                        })
                    }
                    break
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