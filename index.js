const glitchQuestions = require('glitch-questions');
const { intervalToMS, postMessage } = require('./utils');

module.exports = setInterval(() => {
  glitchQuestions()
    .then(res => {
      if (res.length > 0) postMessage();
    });
}, intervalToMS());
