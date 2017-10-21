import React, {Component} from 'react';
import logo from './logo.svg';
import koala from './images/Koala.jpg';
import penguins from './images/Penguins.jpg';
import './App.css';
import StepButtonComponent from './StepButtonComponent';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: {
                1: koala,
                2: penguins,
                3: logo
            },
            imageSrc: logo
        };
    }

    goToStep = (step) => this.setState({step: step});

    render() {
        return (
            <div className='container'>
                <div className='App'>
                    <div className='row'>
                        <header className='App-header'>
                            <h1 className='App-title'>Welcome to the example</h1>
                        </header>
                    </div>

                    <div className='row'>
                        <p className='App-intro'>
                            This is just an example, choose step
                        </p>
                    </div>

                    <div className='row'>
                        <div className='col-xs-4'>
                            <div className='row top-5'>
                                <StepButtonComponent
                                    step={1}
                                    isActive={this.state.step === 1}
                                    onClick={this.goToStep}
                                />
                            </div>
                            <div className='row top-5'>
                                <StepButtonComponent
                                    step={2}
                                    isActive={this.state.step === 2}
                                    onClick={this.goToStep}
                                />
                            </div>
                            <div className='row top-5'>
                                <StepButtonComponent
                                    step={3}
                                    isActive={this.state.step === 3}
                                    onClick={this.goToStep}
                                />
                            </div>
                        </div>
                        <div className='col-xs-8 top-5'>
                            <img src={this.state.images[this.state.step]} className='img-rounded img-responsive'
                                 alt=''/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
