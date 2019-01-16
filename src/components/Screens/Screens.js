import React, { Component } from 'react';

class Screens extends Component {
    render() {
        return (
            <div id={this.props.id} className="Screens">
                {this.props.children}
            </div>
        );
    }
}

export default Screens;