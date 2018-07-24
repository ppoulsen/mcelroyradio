import Parser from 'rss-parser';

import feeds from './feeds';

const parser = new Parser();

const promises = [];
feeds.map(feed => parser.parseURL(feed)).forEach(feedPromise => promises.push(feedPromise));

const allPromise = Promise.all(promises);

export default allPromise;
