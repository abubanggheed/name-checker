import React, { Component } from 'react';
import EditDialog from './editDialog';
import DownloadButton from './downloadButton';
import AddDialog from './addDialog';
import ConfirmDelete from './confirmDelete';

class CsvGraph extends Component {

    state = {
        data: [],
        headers: [],
        title: "data will be shown below",
        filters: {},
        editRow: -1,
        editPoint: {},
        add: false,
        confirmDelete: false,
        deleteTarget: {},
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

    targetDelete = row => () => {
        this.setState({
            ...this.state,
            deleteTarget: row,
            confirmDelete: true,
        });
    }

    handleCancelDelete = () => {
        this.setState({
            ...this.state,
            confirmDelete: false,
        });
    }

    handleDelete = row => () => {
        this.setState({
            ...this.state,
            confirmDelete: false,
            data:
                this.state.data.filter(dataPoint => (dataPoint.rowId !== row.rowId))
                    .map(dataPoint => (
                        dataPoint.rowId < row.rowId ? dataPoint :
                            {
                                ...dataPoint,
                                rowId: dataPoint.rowId - 1,
                            })
                    ),
        })
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
                {this.state.confirmDelete && <ConfirmDelete
                    open={this.state.confirmDelete}
                    handleDelete={this.handleDelete}
                    cancelDelete={this.handleCancelDelete}
                    currentRow={this.state.deleteTarget}
                />}
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
                                        <button onClick={this.targetDelete(point)}>Delete</button>
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
