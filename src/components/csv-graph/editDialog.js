import React, { Component } from 'react';

class EditDialog extends Component {

  state = {}

  componentWillReceiveProps (props) {
      this.setState({
        ...JSON.parse(JSON.stringify(props.dataPoint))
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
          {this.props.headers
            .map(header => <pre key={header}><label>{header + ': '}
              <input name={header} onChange={this.handleChangeFor(header)} value={this.state[header] || ''} />
            </label></pre>)}
            <button onClick={this.props.cancelEdit}>Close</button>
        </dialog>
      </div>
    )
  }
}

export default EditDialog;