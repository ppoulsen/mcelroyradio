const express = require('express');
const helmet = require('helmet');
const app = express();

const feeds = require('./rssFeeds');
const ShuffledPlaylist = require('./shuffle');

const port = process.env.PORT || 5000;

let playlist = null;
const playQueue = [];
function onPlayNext() {
  if (playQueue.length) {
    playQueue.shift();
  }

  while (playQueue.length < MAX_PLAY_QUEUE_LENGTH - 1) {
    const item = playlist.nextItem();
    item.
    playQueue.push(item);
  }
}

feeds
  .then(feedResults => {
    // Link to parent from episode
    // Temporarily don't do this to avoid circular JSON
    // feedResults.forEach(show => show.items.forEach(episode => episode.show = show));

    const allEpisodes = feedResults.map(r => r.items).reduce((flat, toFlatten) => flat.concat(toFlatten), []);
    const allEpisodesWithUrls = allEpisodes.filter( e => !!(e && e.enclosure && e.enclosure.url));
    playlist = new ShuffledPlaylist(allEpisodesWithUrls);
    onPlayNext();
  })
  .catch(e => console.error(e));

app.use(helmet());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/queue', (req, res) => {
  return feeds.then(feed => {
    res.send(feed);
    return feed;
  }).catch(e => console.error(e));
})

app.listen(port, () => console.log(`Listening on port ${port}`));
