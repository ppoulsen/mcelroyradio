import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import feeds from './rssFeeds';

class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {};
  }

  componentDidMount() {
    feeds
      .then(feedResults => this.setState({ feeds: feedResults}))
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
