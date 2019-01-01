import React from 'react';

const ConfirmDelete = props => {

  return (
    <dialog open={props.open}>
      <h3>Delete this row?</h3>
      <pre>
        <button onClick={props.handleDelete(props.currentRow)}>yes</button>
        <button onClick={props.cancelDelete}>no</button>
      </pre>
    </dialog>
  )
}

export default ConfirmDelete;
