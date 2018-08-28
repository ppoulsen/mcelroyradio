import React from 'react';

import { formatSeconds } from './utils/timeFormat';
import './PlayerControls.css';

export default class PlayerControls extends React.PureComponent {
  render() {
    const {
      currentTimeSeconds,
      durationSeconds,
      onNextClick,
    } = this.props;

    const currentTime = isNaN(currentTimeSeconds) || currentTimeSeconds === Infinity ? 0 : currentTimeSeconds;
    const duration = isNaN(durationSeconds) || durationSeconds === Infinity ? 0 : durationSeconds;

    const formattedCurrentTime = formatSeconds(currentTime);
    const formattedDuration = formatSeconds(duration);

    const percentage = duration === 0 ? 100 : currentTime / duration * 100;

    return (
      <div className="player-controls">
        <p className="player-controls__time">{formattedCurrentTime}</p>
        <div className="player-controls__progress-container">
          <div className="player-controls__progress">
            <div className="player-controls__progress-bar" style={{ width: `${percentage}%`}} />
          </div>
        </div>
        <p className="player-controls__time">{formattedDuration}</p>
        <div className="player-controls__right-controls">
          <span onClick={onNextClick}>▶</span>
        </div>
      </div>
    );
  }
}
