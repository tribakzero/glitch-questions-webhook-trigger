'use strict';

var { expect } = require('chai');
var glitchQuestionsWebhookTrigger = require('../index');

describe('glitchQuestionsWebhookTrigger', function () {
  it('should return undefined if params are missing', function () {
    var result = glitchQuestionsWebhookTrigger();
    expect(result).to.be.undefined;
  });
})
