const request = require('request');
const util = require('util');

const rp = util.promisify(request);

const cache = {};

const intervalToMS = (interval) => interval * 1000 || 10000;

const newItems = source =>
  source.filter(({ questionId }) => {
    const isNew = !cache.hasOwnProperty(questionId);
    if (isNew) cache[questionId] = questionId;
    return isNew;
  });

const postMessage = (source, webhook, messageGenerator) => {
  const items = newItems(source);
  if (items.length === 0) return;
  return rp({
    method: 'POST',
    uri: webhook,
    body: messageGenerator(items),
    json: true
  });
}

const processQuestions = (data, webhook, messageGenerator) => {
  if (data.length > 0) {
    postMessage(data, webhook, messageGenerator)
  }
};

const fetchAndProcessQuestions = (webhook, messageGenerator) => {
  glitchQuestions()
    .then((data) =>
      processQuestions(data, webhook, messageGenerator)
    );
}

module.exports = {
  postMessage,
  processQuestions,
  fetchAndProcessQuestions,
  intervalToMS
};
