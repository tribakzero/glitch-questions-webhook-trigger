const request = require('request');
const util = require('util');

const rp = util.promisify(request);

const cache = {};

const intervalToMS = (interval) => interval * 1000 || 10000;

const getNewItems = source =>
  source.filter(({ questionId }) => {
    const isNew = !cache.hasOwnProperty(questionId);
    if (isNew) {
      cache[questionId] = questionId;
      console.log("Item added to cache: ", questionId);
    }
    else {
      console.log("Item already in cache: ", questionId);
    }
    console.log("Current cache: ", cache);
    return isNew;
  });

const postMessage = (source, webhook, messageGenerator) =>
  rp({
    method: 'POST',
    uri: webhook,
    body: messageGenerator(source, getNewItems),
    json: true
  });

module.exports = {
  intervalToMS,
  postMessage
};
