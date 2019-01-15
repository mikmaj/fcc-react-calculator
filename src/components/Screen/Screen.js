import React, { Component } from 'react';

class Screen extends Component {
    render() {
        const string = this.props.data
        return (
            <div id={this.props.id} className="Display">
                {string}
            </div>
        );
    }
}

export default Screen;