import React from 'react';

import { SmileyToggle } from 'react-fun-toggles';

import './ShowToggle.css';

export default class ShowToggle extends React.PureComponent {
  static defaultProps = {
    checked: true,
    label: '',
    onChange: () => {},
  }
  render() {
    return (
      <div className="show-toggle">
        <p className="show-toggle__label">{this.props.label}</p>
        <SmileyToggle
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}