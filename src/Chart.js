import React, {Component} from 'react';
import './Chart.css';

export class Chart extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.options !== this.props.options || nextProps.dataTable !== this.props.dataTable
            || nextState !== this.state;
    }

    componentDidUpdate(prevProps, prevState) {
        this.drawChart();
    }

    componentDidMount() {
        let chart = new this.props.chartConstructor(document.getElementById(this.props.name));
        this.setState({chart: chart});
        if (this.props.eventHandlers) {
            this.props.eventHandlers.forEach(handler => {
                window.google.visualization.events.addListener(chart, handler[0], handler[1](chart))
            });
        }
    }

    render() {
        return (
            <div className="Chart" id={this.props.name}>
                Loading chart...
            </div>
        );
    }

    drawChart() {
        this.state.chart.draw(this.props.dataTable, this.props.options);
    }
}