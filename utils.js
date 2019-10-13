const request = require('request');
const util = require('util');

const rp = util.promisify(request);

const { INTERVAL, WEBHOOK } = process.env;

const cache = [];

const intervalToMS = () => INTERVAL * 1000 || 10000;

const getNewItems = source =>
  source.filter(({ questionId }) => {
    const isNew = new Boolean(!cache.hasOwnProperty(questionId));
    if (isNew) {
      cache[questionId] = questionId;
      console.log("Item added to cache: ", questionId);
      console.log("Current cache: ", cache);
    }
    return isNew;
  });

const buildMessage = source => {
  const message = {
    embeds: [{
      fields: getNewItems(source).map(({question, url}) =>
        ({
          name: question,
          value: url,
          inline: true
        }))
    }, {
      fields: [{ name: 'test', value: 'test', inline: true }]
    }]
  };
};

const postMessage = source => {
  const options = {
    method: 'POST',
    uri: process.env.WEBHOOK,
    body: buildMessage(source),
    json: true
  };

  rp(options);
};

module.exports = {
  intervalToMS,
  postMessage
};
