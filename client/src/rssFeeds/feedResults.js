// Need to specify dist since rss-parser currently exposes the source code by default
/* global RSSParser */
import 'rss-parser/dist/rss-parser';

import feeds from './feeds';

const parser = new RSSParser();

const promises = [];
feeds.map(feed => parser.parseURL(feed)).forEach(feedPromise => promises.push(feedPromise));

const allPromise = Promise.all(promises);

export default allPromise;
