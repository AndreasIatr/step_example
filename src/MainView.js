import React, {Component} from 'react';
import ReactImageMagnify from "react-image-magnify/dist/es/ReactImageMagnify";
import ScriptCache from './ScriptCache.js';
import {Chart} from "./Chart.js";

class MainView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartsLoaded: false,
            rows: [
                [new Date(2017, 2, 1), {v: 100000, f: '$100,000'}, true, null],
                [new Date(2017, 3, 1), {v: 80000, f: '$80,000'}, false, null],
                [new Date(2017, 4, 1), {v: 125000, f: '$125,000'}, true, null],
                [new Date(2017, 5, 1), {v: 70000, f: '$70,000'}, true, null]
            ],
            options: {
                legend: 'none',
                showRowNumber: true,
                width: '100%',
                height: '100%'
            },
            dataTableForTableChart: null,
            dataTableForLineChart: null
        }
    }

    componentDidMount() {
        this.scriptCache = ScriptCache({
            google: 'https://www.gstatic.com/charts/loader.js'
        });
        this.scriptCache.google.onLoad((err, tag) => {
            window.google.charts.load('current', {packages: ['table', 'corechart']});
            window.google.charts.setOnLoadCallback(() => {
                this.setState({chartsLoaded: true});
                this.setState({dataTableForTableChart: this.getDataTableForTableChart()});
                this.setState({dataTableForLineChart: this.getDataTableForLineChart()});
            });
        });
    };

    getDataTableForTableChart() {
        let data = new window.google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'Revenue');
        data.addColumn('boolean', 'Over YOY Revenue');
        data.addColumn({'type': 'string', 'role': 'style'});
        data.addRows(this.state.rows);
        return data;
    }

    getDataTableForLineChart() {
        let data = new window.google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'Revenue');
        data.addColumn({'type': 'string', 'role': 'style'});
        // ignore boolean column (Over YOY Revenue)
        data.addRows(this.state.rows.map(row => [row[0], row[1], row[3]]));
        return data;
    }

    render() {
        return (
            <div className="row">
                { this.props.step < 4 ?
                    <div className="col-xs-12">
                        <p className='App-intro'>
                            You can hover over (or touch and drag on mobile) an image to zoom
                        </p>
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    isFluidWidth: true,
                                    alt: '',
                                    src: this.props.images[this.props.step][1],
                                },
                                largeImage: {
                                    alt: '',
                                    src: this.props.images[this.props.step][0],
                                    width: 1024,
                                    height: 768,
                                },
                                enlargedImagePosition: 'over'
                            }}/>
                    </div>
                    :
                    <div>
                        <p className='App-intro'>
                            Select a row in the table and the corresponding point in the line chart will be highlighted in green or red based on whether the company was over in YOY revenue
                        </p>
                        { this.state.chartsLoaded &&
                        <div className="col-xs-12">
                            <Chart
                                name="table-chart"
                                chartConstructor={window.google.visualization.Table}
                                dataTable={this.state.dataTableForTableChart}
                                options={this.state.options}
                                eventHandlers={[
                                    ['select', this.selectHandler(this.state.dataTableForTableChart, this.state.dataTableForLineChart, this)]
                                ]
                                }
                            />
                        </div>
                        }
                        { this.state.chartsLoaded &&
                        <div className="col-xs-12" style={{height: "300px"}}>
                            <Chart
                                name="line-chart"
                                chartConstructor={window.google.visualization.LineChart}
                                dataTable={this.state.dataTableForLineChart}
                                options={
                                    {
                                        title: 'Company Performance',
                                        legend: {position: 'bottom'},
                                        width: '100%',
                                        height: '100%',
                                        pointSize: 5
                                    }
                                }
                            />
                        </div>
                        }
                    </div>
                }
            </div>
        );
    }

    selectHandler(dataTableForTableChart, dataTableForLineChart, appComponent) {
        return (chart) => {
            return () => {
                let selectedItem = chart.getSelection()[0];
                if (selectedItem && dataTableForTableChart && dataTableForLineChart) {
                    // remove style from all points
                    for (let i = 0; i < dataTableForLineChart.getNumberOfRows(); i++) {
                        dataTableForLineChart.setValue(i, 2, null);
                    }
                    let overYOY = dataTableForTableChart.getValue(selectedItem.row, 2);
                    dataTableForLineChart.setValue(selectedItem.row, 2, "point {size: 10; fill-color: " + (overYOY ? "green" : "red"));
                    appComponent.setState({dataTableForLineChart: dataTableForLineChart});
                }
            };
        };
    }
}

export default MainView;
