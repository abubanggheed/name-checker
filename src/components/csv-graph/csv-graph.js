import React, { Component } from 'react';

class CsvGraph extends Component {

    state = {
        data: [],
        headers: [],
        title: "data will be shown below"
    }


    setData = rawText => {
        let rows = rawText.split('\n').filter(content =>
            content
        );
        let headersToAdd = rows[0].split(',');
        let dataTitle = "data";
        let dataStart = 1;
        let dataToSet = [];
        if (headersToAdd.length === 1) {
            dataTitle = headersToAdd[0];
            headersToAdd = rows[1].split(',');
            dataStart = 2;
        }
        let dataItem = {}
        let rowData = [];
        for (let i = dataStart; i < rows.length; i++) {
            dataItem = {}
            rowData = rows[i].split(',');
            for (let j = 0; j < rowData.length; j++) {
                dataItem[headersToAdd[j]] = rowData[j];
            }
            dataToSet.push(dataItem);
        }
        this.setState({
            ...this.state,
            data: dataToSet,
            headers: headersToAdd,
            title: dataTitle,
        });
    }

    handleUpload = event => {
        let reader = new FileReader();
        reader.onload = event => {
            this.setData(event.target.result);
        }
        reader.readAsText(event.target.files[0]);
    }

    render() {
        let tHeaders = this.state.headers;
        return (
            <div style={{overflowX: "auto"}}>
                <h2>{this.state.title}</h2>
                <table>
                    <thead>
                        <tr>
                            {tHeaders.map(header => (
                                <th key={header}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(point => (
                            <tr key={tHeaders.reduce((prev, current) => (
                                prev + point[current]
                            ), '')}>
                                {tHeaders.map(header => (
                                    <td key={header}>{point[header]}</td>
                                ))}
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
