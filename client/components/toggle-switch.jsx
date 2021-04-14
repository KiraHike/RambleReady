import React from 'react';

export default class ToggleSwitch extends React.Component {
  render() {
    const toggleClass = this.props.toggle
      ? 'off'
      : 'on';
    return (
      <div className={`switch ${toggleClass}`}>
        <input className="toggle-switch" type="checkbox" />
        <span className={`toggle ${toggleClass}`} />
        <label htmlFor="toggle-switch" className="switch-label" onClick={this.props.onClick}></label>
      </div>
    );
  }
}
