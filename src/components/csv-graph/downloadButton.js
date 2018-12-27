import React from 'react';

const handleDownload = objectToParse => () => {
  console.log('preparing CSV', objectToParse);
}

const DownloadButton = props => {

  return (
    <div>
      <button onClick={handleDownload(props.toParse)}>Download CSV</button>
    </div>
  )
}

export default DownloadButton;