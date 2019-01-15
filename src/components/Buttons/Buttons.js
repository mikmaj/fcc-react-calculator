import React, { Component } from 'react';

class Buttons extends Component {
    render() {
        return (
            <div id={this.props.id} className="Buttons">
                {this.props.children}
            </div>
        );
    }
}

export default Buttons;