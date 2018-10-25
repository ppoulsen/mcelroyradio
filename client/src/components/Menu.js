import React from 'react';
import ShowToggle from './ShowToggle';

import './Menu.css';

export default class Menu extends React.PureComponent {
  static defaultProps = {
    isOpen: false,
    shows: [],
  }

  renderShows() {
    return this.props.shows.map(show => (
      <div className="menu__toggle">
        <ShowToggle
          key={show.title}
          label={show.title}
          checked={show.enabled}
          onChange={() => this.props.onShowToggle(show.title, !show.enabled)}
        />
      </div>
    ));
  }

  render() {
    const menuOverlayClass = 'menu__overlay' +
      (this.props.isOpen ? ' menu__overlay--is-open' : '');

    return (
      <div className="menu">
        <div className="menu__icon" onClick={this.props.onOpen}>
          ☰
        </div>
        <div className={menuOverlayClass}>
          <div className="close__icon" onClick={this.props.onClose}>
            ✕
          </div>
          <h2 className="menu__title">Menu</h2>
          <h3 className="menu__subtitle">Toggle Shows</h3>
          <div className="menu__toggles" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {this.renderShows()}
          </div>
        </div>
      </div>
    );
  }
}