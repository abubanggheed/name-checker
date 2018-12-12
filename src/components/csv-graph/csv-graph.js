import React, { Component } from 'react';
import * as d3 from 'd3';

class CsvGraph extends Component {

    state = {
        data: [],
        upload: "/data.csv",
    }


    setData = path => {
        this.setState({
            ...this.state,
            data: [],
        });
        d3.csv(path, point => {
            this.setState({
                ...this.state,
                data: [...this.state.data, {
                    first_name: point["first name"],
                    last_name: point["last name"],
                    occasion: point["occasion id"],
                    role: point["role"],
                }]
            });
        });
    }

    handleUpload = event => {
        this.setState({
            ...this.state,
            upload: event.target.value
        })
        this.setData(this.state.upload)
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
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(point => (
                            <tr key={point.first_name + point.last_name + point.occasion}>
                                <td>{point.first_name}</td>
                                <td>{point.last_name}</td>
                                <td>{point.occasion}</td>
                                <td>{point.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={() => { console.log(this.state) }}>Log</button>
                <input type="file" filename={this.state.upload} onChange={this.handleUpload} />
            </div>
        );
    }
}

export default CsvGraph;
