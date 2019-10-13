const glitchQuestions = require('glitch-questions');
const { intervalToMS, postMessage } = require('./utils');

module.exports = setInterval(() => {
  glitchQuestions()
    .then(res => {
      console.log(res);
      if (res.length > 0) postMessage(res);
    });
}, intervalToMS());