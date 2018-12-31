import React, { Component } from 'react';

class AddDialog extends Component {

  state = {}

  componentWillReceiveProps(props) {
    props.headers.forEach(header => {
      this.setState({
        ...this.state,
        [header]: ''
      });
    });
  }

  handleChangeFor = header => event => {
    this.setState({
      ...this.state,
      [header]: event.target.value,
    });
  }

  handleCancel = () => {
    this.setState({

    });
    this.props.dialogSwitch();
  }

  render() {
    return (
      <dialog open={this.props.add}>
        <form onSubmit={this.props.handleAdd(this.state)}>
          {this.props.headers.map(header => (
            <pre key={header}>
              <input
                onChange={this.handleChangeFor(header)}
                value={this.state[header] || ''}
                placeholder={header}
              />
            </pre>
          ))}
          <pre>
            <input type="submit" value="Confirm" />
          </pre>
        </form>
        <pre>
          <button onClick={this.handleCancel}>Cancel</button>
        </pre>
      </dialog>
    )
  }
}

export default AddDialog;