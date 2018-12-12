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

    handleNew = () => {
        console.log('adding new')
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Occasion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(point => (
                            <tr key={point.occasion}>
                                <td>{point.first_name}</td>
                                <td>{point.last_name}</td>
                                <td>{point.occasion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={this.handleNew}>New</button>
                <button onClick={() => { console.log(this.state) }}>Log</button>
            </div>
        );
    }
}

export default CsvGraph;
