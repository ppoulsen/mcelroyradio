import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import feeds from './rssFeeds';
import ShuffledPlaylist from './shuffle';

class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {};
  }

  componentDidMount() {
    feeds
      .then(feedResults => {
        const allEpisodes = feedResults.map(r => r.items).reduce((flat, toFlatten) => flat.concat(toFlatten), []);
        console.log(allEpisodes.length);
        const allEpisodeUrls = allEpisodes.filter( e => !!(e && e.enclosure && e.enclosure.url)).map(e => e.enclosure.url);
        console.log(allEpisodeUrls.length);
        const playlist = new ShuffledPlaylist(allEpisodeUrls);
        const first100 = [];
        for (let i = 0; i < 100; i++) {
          first100.push(playlist.nextItem());
        }
        this.setState({ feeds: first100 });
      })
      .catch(e => this.setState({ error: e }))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {this.state.feeds && JSON.stringify(this.state.feeds)}
        </p>
        <p>
          {this.state.error && this.state.error.toString()}
        </p>
      </div>
    );
  }
}

export default App;
