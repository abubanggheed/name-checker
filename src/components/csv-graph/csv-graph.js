import React, { Component } from 'react';
const csv = require('csv-parser')
const fs = require('fs')
const results = [];

class CsvGraph extends Component {

    render() {
console.log(fs);
        // fs.createReadStream('data.csv')
        //     .pipe(csv())
        //     .on('data', results.push)
        //     .on('end', () => {
        //         console.log(results);
        //     });
        return (
            <div>
            </div>
        );
    }
}

export default CsvGraph;
