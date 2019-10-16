'use strict';

var { expect } = require('chai');
var sandbox = require('sinon').createSandbox();
var glitchQuestionsWebhookTrigger = require('../index');

describe('glitchQuestionsWebhookTrigger', function () {
  it('should throw about missing webhook', function () {
    expect(() => glitchQuestionsWebhookTrigger(null, () => {}, 10)).to.throw('missing webhook');
  });
  it('should throw about missing messageGenerator', function () {
    expect(() => glitchQuestionsWebhookTrigger('url', null, 10)).to.throw('missing messageGenerator');
  });
  it('should throw about missing interval', function () {
    expect(() => glitchQuestionsWebhookTrigger('url', () => {}, null)).to.throw('missing interval');
  });
  it('should not throw if all params are set', function () {
    var clock = sandbox.useFakeTimers();
    expect(() => glitchQuestionsWebhookTrigger('url', () => {}, 10)).to.not.throw();
    clock.restore();
  });
  it('should return a function if all params are set', function () {
    var clock = sandbox.useFakeTimers();
    expect(() => glitchQuestionsWebhookTrigger('url', () => {}, 10)).to.be.a('function');
    clock.restore();
  });
})
