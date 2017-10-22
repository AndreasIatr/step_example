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
                ['Mike', {v: 10000, f: '$10,000'}, true],
                ['Jim', {v: 8000, f: '$8,000'}, false],
                ['Alice', {v: 12500, f: '$12,500'}, true],
                ['Bob', {v: 7000, f: '$7,000'}, true]
            ],
            options: {
                legend: 'none',
                showRowNumber: true,
                width: '100%',
                height: '100%'
            }
        }
    }

    componentDidMount() {
        this.scriptCache = ScriptCache({
            google: 'https://www.gstatic.com/charts/loader.js'
        });
        this.scriptCache.google.onLoad((err, tag) => {
            window.google.charts.load('current', {packages: ['table']});
            window.google.charts.setOnLoadCallback(() => this.setState({chartsLoaded: true}));
        });


    };

    getDataTable() {
        let data = new window.google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('number', 'Salary');
        data.addColumn('boolean', 'Full Time Employee');
        data.addRows(this.state.rows);
        return data;
    }

    render() {
        return (
            <div>
                { this.props.step < 4 ?
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
                    :
                    <div>
                        { this.state.chartsLoaded &&
                        <Chart
                            chartConstructor={window.google.visualization.Table}
                            dataTable={this.getDataTable()}
                            options={this.state.options}
                        />
                        }
                    </div>
                }
            </div>
        );
    }
}

export default MainView;
