import React from 'react';

import PlayIcon from './PlayIcon';
import './NowPlaying.css';

export default class NowPlaying extends React.PureComponent {
  static defaultProps = {
    episodeTitle: 'Loading...',
    showTitle: 'Loading...',
    onPlayClick: () => {},
    showPlayOverlay: false,
  }

  render() {
    const {
      episodeTitle,
      showTitle,
      imageUrl,
      onPlayClick,
      showPlayOverlay,
    } = this.props;

    const nowPlayingIconOverlayClass = 'now-playing__play-icon-overlay' +
      (showPlayOverlay ? ' now-playing__play-icon-overlay--visible' : '');

    return (
      <div className="now-playing">
        <div className="now-playing__img-wrapper">
          <img
            alt={`${episodeTitle} - ${showTitle}`}
            className="now-playing__img"
            decoding="sync"
            src={imageUrl}
          />
          <div className={nowPlayingIconOverlayClass} onClick={onPlayClick}>
            <PlayIcon />
          </div>
        </div>
        <p className="now-playing__track-title">{episodeTitle}</p>
        <p className="now-playing__show-title">{showTitle}</p>
      </div>
    );
  }
}