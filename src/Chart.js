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
        let chart = new this.props.chartConstructor(document.getElementById("chart"));
        this.setState({chart: chart});
    }

    render() {
        return (
            <div className="Chart" id="chart">
                Loading chart...
            </div>
        );
    }

    drawChart() {
        this.state.chart.draw(this.props.dataTable, this.props.options);
    }
}