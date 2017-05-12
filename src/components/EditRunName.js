import React, { Component } from 'react';

export default class EditRunName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.run && props.run.name,
    };
  };

  componentDidMount() {
    this.nameInput.focus();
  };

  render() {
    const { onSave, onCancel } = this.props;
    const { name } = this.state;

    return (
      <form className="flex1"
        onClick={e => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          onSave(name);
        }}>
        <div className="input-group input-group-sm">
          <input
            className="form-control"
            style={{fontSize: '20px'}}
            value={name}
            onChange={e => this.setState({name: e.target.value})}
            ref={node => this.nameInput = node}/>
          <span className="input-group-btn">
            <button type="submit"
              className="btn btn-primary">
              Save
            </button>
          </span>
          <span className="input-group-btn">
            <button type="button"
              className="btn btn-secondary"
              onClick={() => onCancel()}>
              Cancel
            </button>
          </span>
        </div>
      </form>
    );
  };
};