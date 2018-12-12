import React, { Component } from 'react';
import * as d3 from 'd3';

class CsvGraph extends Component {

    componentDidMount() {
        d3.csv("/data.csv", (data) => {
            console.log(data);
          });
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default CsvGraph;
