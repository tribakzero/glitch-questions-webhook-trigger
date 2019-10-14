'use strict';

const glitchQuestions = require('glitch-questions');
const { intervalToMS, postMessage } = require('./utils');

module.exports = (webhook, messageGenerator, interval) => {
  if (!webhook) console.warn('You need to add a webhook URL');
  if (!messageGenerator) console.warn('You need to add a messageGenerator method');
  if (!interval) console.warn('You need to add an interval (in seconds)');
  if(!webhook || !messageGenerator || !interval) return;
  setInterval(() => {
    glitchQuestions()
      .then(res => {
        if (res.length > 0) {
          postMessage(res, webhook, messageGenerator)
        }
      });
  }, intervalToMS(interval));
}
