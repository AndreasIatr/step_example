import React, {Component} from 'react';

class StepButton extends Component {

    handleClick = () => this.props.onClick(this.props.step);

    render() {
        return (
            <button
                type='button'
                className={'btn btn-lg ' + (this.props.isActive ? 'btn-success' : 'btn-primary')}
                onClick={this.handleClick}>
                <span>Step {this.props.step}</span>
            </button>
        );
    }
}
export default StepButton;
