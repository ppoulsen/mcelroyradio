// Need to specify dist since rss-parser currently exposes the source code by default
/* global RSSParser */
const RSSParser = require('rss-parser');

const feeds = require('./feeds');

const parser = new RSSParser();

const promises = [];
feeds.map(feed => parser.parseURL(feed)).forEach(feedPromise => promises.push(feedPromise));

const allPromise = Promise.all(promises);

module.exports = allPromise;
