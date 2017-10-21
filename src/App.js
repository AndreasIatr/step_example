import React, {Component} from 'react';
import koala from './images/Koala.jpg';
import koala_s from './images/Koala_s.jpg';
import penguins from './images/Penguins.jpg';
import penguins_s from './images/Penguins_s.jpg';
import tulips from './images/Tulips.jpg';
import tulips_s from './images/Tulips_s.jpg';
import './App.css';
import StepButtonComponent from './StepButtonComponent';
import ReactImageMagnify from 'react-image-magnify/dist/es/ReactImageMagnify';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: {
                1: [koala, koala_s],
                2: [penguins, penguins_s],
                3: [tulips, tulips_s]
            },
            step: 1
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
                            This is just an example, choose step.
                        </p>
                        <p className='App-intro'>
                            You can hover over (or touch and drag on mobile) an image to zoom
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
                            <ReactImageMagnify
                                {...{
                                    smallImage: {
                                        isFluidWidth: true,
                                        alt: '',
                                        src: this.state.images[this.state.step][1],
                                    },
                                    largeImage: {
                                        alt: '',
                                        src: this.state.images[this.state.step][0],
                                        width: 1024,
                                        height: 768,
                                    },
                                    enlargedImagePosition: 'over'
                                }}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
