import React, { Component } from 'react';
import EditDialog from './editDialog';
import DownloadButton from './downloadButton';
import AddDialog from './addDialog';

class CsvGraph extends Component {

    state = {
        data: [],
        headers: [],
        title: "data will be shown below",
        filters: {},
        editRow: -1,
        editPoint: {},
        add: false,
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
                dataItem.rowId = i + 1;
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

    handleChangeFor = (header) => event => {
        this.setState({
            ...this.state,
            filters: {
                ...this.state.filters,
                ['header=' + header]: event.target.value,
            }
        });
    }

    clearFilters = () => {
        this.setState({
            ...this.state,
            filters: {},
        });
    }

    handleEdit = dataPoint => () => {
        this.setState({
            ...this.state,
            editRow: dataPoint.rowId,
            editPoint: dataPoint,
        });
    }

    cancelEdit = () => {
        this.setState({
            ...this.state,
            editRow: -1,
            editPoint: {},
        });
    }

    commitChanges = newRow => event => {
        event.preventDefault();
        this.setState({
            ...this.state,
            data: this.state.data.map(point => (
                point.rowId === newRow.rowId ? newRow : point
            )),
            editRow: -1,
            editPoint: {},
        });

    }

    handleAdd = toAdd => event => {
        event.preventDefault();
        let currentData = this.state.data;
        this.setState({
            ...this.state,
            add: false,
            data: [
                ...currentData,
                {
                    ...toAdd,
                    rowId: currentData[currentData.length - 1].rowId + 1,
                }
            ]
        })
    }

    addDialogSwitch = () => {
        this.setState({
            ...this.state,
            add: !this.state.add,
        });
    }

    render() {
        let tHeaders = this.state.headers;
        return (
            <div style={{ overflowX: "auto" }}>
                <h2>{this.state.title}</h2>
                {this.state.data.length > 0 && this.state.editRow < 0 && <pre>
                    <DownloadButton
                        toParse={this.state}
                    />
                    {!this.state.add && <button onClick={this.addDialogSwitch}>
                        Add Row
                    </button>}
                    <AddDialog
                        add={this.state.add}
                        handleAdd={this.handleAdd}
                        headers={this.state.headers}
                        dialogSwitch={this.addDialogSwitch}
                    />
                </pre>}
                {this.state.data.length > 0 && this.state.editRow < 0 && <table>
                    <thead>
                        <tr>
                            <th>Row</th>
                            {tHeaders.map(header => (
                                <th key={header}>{header}</th>
                            ))}
                            <th>Actions</th>
                        </tr>
                        <tr>
                            <th>Filter</th>
                            {tHeaders.map(header => (
                                <th key={header}>
                                    <input
                                        onChange={this.handleChangeFor(header)}
                                        value={this.state.filters['header=' + header] || ''}
                                    />
                                </th>
                            ))}
                            <th>
                                <button onClick={this.clearFilters}>Clear</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data
                            .filter(dataPoint => tHeaders
                                .reduce((current, header) => (
                                    current && dataPoint[header]
                                        .includes(this.state.filters['header=' + header] || '')
                                ), true))
                            .map(point => (
                                <tr key={point.rowId}>
                                    <td>{point.rowId}</td>
                                    {tHeaders.map(header => (
                                        <td key={header}>{point[header]}</td>
                                    ))}
                                    <td>
                                        <button onClick={this.handleEdit(point)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>}
                <pre>
                    <button onClick={() => { console.log(this.state) }}>Log</button>
                    {!this.state.data.length && <input type="file" filename={this.state.upload} onChange={this.handleUpload} />}
                </pre>
                <EditDialog
                    row={this.state.editRow}
                    headers={this.state.headers}
                    cancelEdit={this.cancelEdit}
                    dataPoint={this.state.editPoint}
                    commitChanges={this.commitChanges}
                />
            </div>
        );
    }
}

export default CsvGraph;
