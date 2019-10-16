'use strict';

const glitchQuestions = require('glitch-questions');
const { postMessage, processQuestions, intervalToMS } = require('./utils');

module.exports = (webhook, messageGenerator, interval) => {
  if (!webhook) throw new Error('missing webhook');
  if (!messageGenerator) throw new Error('missing messageGenerator');
  if (!interval) throw new Error('missing interval');
  return setInterval(
    () => fetchAndProcessQuestions(webhook, messageGenerator)
    , intervalToMS(interval)
  );
}
