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
    text: "New questions:",
    attachments: getNewItems(source).map(({question, url}) => {
      const output = {
        text: `${question}\n${url}`
      };
      return output;
    })
  };
};

const postMessage = source => {
  const data = JSON.stringify(buildMessage(source));
  const options = {
    uri: process.env.WEB,
    port: 443,
    path: WEBHOOK,
    method: "POST"
  };
  rp(process.env.);
};

module.exports = {
  intervalToMS,
  postMessage
};
