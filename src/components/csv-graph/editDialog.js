import React, { Component } from 'react';

class EditDialog extends Component {

  state = {}

  componentWillReceiveProps(props) {
    this.setState({
      ...props.dataPoint
    });
  }

  handleChangeFor = header => event => {
    this.setState({
      ...this.state,
      [header]: event.target.value,
    })
  }

  render() {

    return (
      <div>
        <dialog open={this.props.row > 0}>
          <form onSubmit={this.props.commitChanges(this.state)}>
            {this.props.headers
              .map(header => <pre key={header}><label>{header + ': '}
                <input name={header} onChange={this.handleChangeFor(header)} value={this.state[header] || ''} />
              </label></pre>)}
            <input type="submit" value="Commit" />
          </form>
          <pre>
            <button onClick={this.props.cancelEdit}>Close</button>
          </pre>
        </dialog>
      </div>
    )
  }
}

export default EditDialog;