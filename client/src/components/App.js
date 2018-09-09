import React, { Component } from 'react';
import './App.css';

import feeds from '../rssFeeds';
import ShuffledPlaylist from '../shuffle';
import NowPlaying from './NowPlaying';
import PlayerControls from './PlayerControls';

class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {};
  }

  componentDidMount() {
    feeds
      .then(feedResults => {
        // Link to parent from episode
        feedResults.forEach(show => show.items.forEach(episode => episode.show = show));

        const allEpisodes = feedResults.map(r => r.items).reduce((flat, toFlatten) => flat.concat(toFlatten), []);
        const allEpisodesWithUrls = allEpisodes.filter( e => !!(e && e.enclosure && e.enclosure.url));
        this.playlist = new ShuffledPlaylist(allEpisodesWithUrls);
        this.onPlayNext();
      })
      .catch(e => this.setState({ error: e }))
  }

  onPlayNext = () => {
    if (this.audioElement) {
      this.audioElement.removeEventListener('ended', this.onPlayNext);
      this.audioElement.removeEventListener('timeupdate', this.onTimeUpdate);
      this.audioElement.removeEventListener('durationchange', this.onDurationUpdate);
      this.audioElement.removeEventListener('pause', this.onPause);
      this.audioElement.removeEventListener('play', this.onPlay);
      if (!this.audioElement.ended && !this.audioElement.paused) {
        this.audioElement.pause();
      }
      delete this.audioElement;
    }
    const nowPlaying = this.playlist.nextItem();
    window.debugAudio = this.audioElement = new Audio(nowPlaying.enclosure.url);
    this.audioElement.addEventListener('ended', this.onPlayNext);
    this.audioElement.addEventListener('timeupdate', this.onTimeUpdate)
    this.audioElement.addEventListener('durationchange', this.onDurationUpdate)
    this.audioElement.addEventListener('pause', this.onPause)
    this.audioElement.addEventListener('play', this.onPlay)
    this.playAudio();
    this.setState({
      currentTimeSeconds: Math.floor(this.audioElement.currentTime),
      durationSeconds: Math.floor(this.audioElement.duration),
      nowPlaying,
    });
  }

  onTimeUpdate = () => {
    this.setState({
      currentTimeSeconds: Math.floor(this.audioElement.currentTime),
    });
  }

  onDurationUpdate = () => {
    this.setState({
      durationSeconds: Math.floor(this.audioElement.duration),
    });
  }

  onPause = () => {
    this.setState({
      paused: true,
    });
  }

  onPlay = () => {
    this.setState({
      paused: false,
    });
  }

  onPlayClick = () => {
    if (this.state.paused) {
      this.playAudio();
    } else {
      this.audioElement.pause();
    }
  }

  playAudio = () => {
    this.audioElement.play()
      .then(() => this.setState({ paused: false }))
      .catch(() => this.setState({ paused: true }));
  }

  onNextClick = () => {
    if (this.state.paused) {
      this.playAudio();
      return;
    }

    this.onPlayNext();
  }

  render() {
    const {
      currentTimeSeconds,
      durationSeconds,
      error,
      nowPlaying,
      paused,
    } = this.state;
    const showImageUrl = nowPlaying && nowPlaying.show && nowPlaying.show.image && nowPlaying.show.image.url;
    const episodeImageUrl = nowPlaying && nowPlaying.itunes && nowPlaying.itunes.image;
    const imageUrl = episodeImageUrl || showImageUrl || 'https://i.pinimg.com/originals/32/50/14/32501421afef2954397ae03c9d78023a.jpg';
    const episodeTitle = nowPlaying && nowPlaying.title;
    const showTitle = nowPlaying && nowPlaying.show && nowPlaying.show.title;

    return (
      <div className="app">
        {nowPlaying && (
          <NowPlaying
            episodeTitle={episodeTitle}
            showTitle={showTitle}
            imageUrl={imageUrl}
            showPlayOverlay={!!paused}
            onPlayClick={this.onPlayClick}
          />
        )}
        {error && <p>error.toString()</p>}
        <PlayerControls
          currentTimeSeconds={currentTimeSeconds}
          durationSeconds={durationSeconds}
          onNextClick={this.onNextClick}
        />
      </div>
    );
  }
}

export default App;
