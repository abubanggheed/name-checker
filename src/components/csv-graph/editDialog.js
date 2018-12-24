import React, { Component } from 'react';

class EditDialog extends Component {

  state = {}

  render() {

    return (
      <div>
        <dialog open={this.props.row > 0}>
          {this.props.headers
            .map(header => <label key={header}>{header}
              <input />
            </label>)}
            <button onClick={this.props.cancelEdit}>Close</button>
        </dialog>
      </div>
    )
  }
}

export default EditDialog;