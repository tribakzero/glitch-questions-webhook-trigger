'use strict';

var { expect } = require('chai');
var sandbox = require('sinon').createSandbox();
var {
  intervalToMS,
  newItems,
  processQuestions
} = require('../utils');

describe('utils', function () {
  describe('intervalToMS', function () {
    it('should return the default value if no parameter is passed', function () {
      var result = intervalToMS();
      expect(result).to.equal(10000);
    });
    it('should return the proper value if a parameter is passed', function () {
      var result = intervalToMS(1000);
      expect(result).to.equal(1000000);
    });
  });

  describe('newItems', function () {
    it('should return an empty array is values are cached', function () {
      var cache = {
        '1': '1',
        '2': '2'
      };
      var source = [
        { questionId: '1'},
        { questionId: '2'}
      ];
      var expectation = [];
      var result = newItems(source, cache);
      expect(result).to.deep.equal(expectation);
    });
    it('should return non-cached values only', function () {
      var cache = {
        '1': '1',
        '2': '2'
      };
      var source = [
        { questionId: '1'},
        { questionId: '2'},
        { questionId: '3'},
        { questionId: '4'},
      ];
      var expectation = [
        { questionId: '3'},
        { questionId: '4'},
      ];
      var result = newItems(source, cache);
      expect(result).to.deep.equal(expectation);
    });
  });
});
