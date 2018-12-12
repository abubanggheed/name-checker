import React, { Component } from 'react';
import * as d3 from 'd3';

class CsvGraph extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        d3.csv("/data.csv", point => {
            this.setState({
                data: [...this.state.data, {
                    first_name: point["first name"],
                    last_name: point["last name"],
                    occasion: point["occasion id"],
                }]
            });
        });
    }

    render() {
        return (
            <div>
                <button onClick={() => {console.log(this.state)}}>Log</button>
            </div>
        );
    }
}

export default CsvGraph;
