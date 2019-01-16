import React, { Component } from 'react';

class CalcScreen extends Component {
    render() {
        const string = this.props.data
        return (
            <div id={this.props.id} className="Display">
                <span>{string}</span>
            </div>
        );
    }
}

export default CalcScreen;