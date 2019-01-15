import React, { Component } from 'react';

import './CalculatorContainer.css'

class CalculatorContainer extends Component {
    render() {
        return (
            <div className="container">
                <div id="display"> Näyttö </div>
                <div id="clear"> AC </div>
                <div id="divide"> / </div>
                <div id="multiply"> * </div>
                <div id="seven"> 7 </div>
                <div id="eight"> 8 </div>
                <div id="nine"> 9 </div>
                <div id="subtract"> - </div>
                <div id="four"> 4 </div>
                <div id="five"> 5 </div>
                <div id="six"> 6 </div>
                <div id="add"> + </div>
                <div id="one"> 1 </div>
                <div id="two"> 2 </div>
                <div id="three"> 3 </div>
                <div id="equals"> = </div>
                <div id="zero"> 0 </div>
                <div id="decimal"> , </div>
            </div>
        );
    }
}

export default CalculatorContainer;