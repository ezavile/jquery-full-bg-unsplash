require('dotenv').config();
var expect = require('chai').expect;
var jsdom = require('jsdom');

var dom = new jsdom.JSDOM('<html><body><div id="bg"></div></body></html>');
var $ = global.jQuery = require('jquery')(dom.window);
var clientId = process.env.CLIENT_ID;

require('jsdom-global')();
require('../src');

describe('jquery-full-bg-unsplash', function() {
  beforeEach(function() {
    window.FullBgUnsplash.setup(clientId);
  });
  it('should setup plugin', function() {
    expect(window.FullBgUnsplash.clientId).to.be.equal(clientId);
  });
  it('should put an image as full page background', function() {
    return $('#bg').getRandomPhoto().then(function($this){
      expect($this.css('backgroundImage')).to.be.string;
      expect($this.css('backgroundSize')).to.be.equal('cover');
    });
  });
});
