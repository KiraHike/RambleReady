import React from 'react';

export default class ToggleSwitch extends React.Component {
  render() {
    if (this.props.toggle) {
      return (
        <div className="switch off">
          <input className="toggle-switch" type="checkbox" />
          <span className="toggle off" />
          <label htmlFor="toggle-switch" className="switch-label" onClick={this.props.onClick}></label>
        </div>
      );
    }
    return (
      <div className="switch on">
        <input className="toggle-switch" type="checkbox" />
        <span className="toggle on" />
        <label htmlFor="toggle-switch" className="switch-label" onClick={this.props.onClick}></label>
      </div>
    );
  }
}
