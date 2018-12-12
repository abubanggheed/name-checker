import React, { Component } from 'react';

class CsvGraph extends Component {

    state = {
        data: [],
    }


    setData = rawText => {
        this.setState({
            ...this.state,
            data: [],
        });
        console.log(rawText);
    }

    handleUpload = event => {
        let reader = new FileReader();
        reader.onload = event => {
            this.setData(event.target.result);
        }
        reader.readAsText(event.target.files[0]);
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
