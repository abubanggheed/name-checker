import React from 'react';

const handleDownload = objectToParse => () => {
  let csvContent = 'data:text/csv;charset=utf-8,';
  if (objectToParse.title !== 'data') {
    csvContent += objectToParse.title + '\r\n';
  }
  csvContent += objectToParse.headers.join(',') + '\r\n';
  objectToParse.data.forEach(element => {
    let toAdd = '';
    objectToParse.headers.forEach((header, index) => {
      toAdd += element[header] + ((index + 1) < objectToParse.headers.length ? ',': '');
    });
    csvContent += toAdd + '\r\n';
  });
  let uriEncoding = encodeURI(csvContent);
  let link = document.createElement('a');
  link.setAttribute('href', uriEncoding);
  link.setAttribute('download', 'data.csv');
  document.body.appendChild(link);
  link.click();
}

const DownloadButton = props => {

  return (
    <div>
      <button onClick={handleDownload(props.toParse)}>Download CSV</button>
    </div>
  )
}

export default DownloadButton;