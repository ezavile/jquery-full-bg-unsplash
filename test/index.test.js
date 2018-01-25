require('dotenv').config();
var expect = require('chai').expect;
var sinon = require('sinon');
var jsdom = require('jsdom');

var dom = new jsdom.JSDOM('<html><body><div id="bg"></div></body></html>');
var $ = global.jQuery = require('jquery')(dom.window);
var clientId = process.env.CLIENT_ID;

require('jsdom-global')();
require('../src');

describe('jquery-full-bg-unsplash', function() {
  var ajaxSetupStub = sinon.stub($, 'ajaxSetup');
  var ajaxStub = sinon.stub($, 'ajax');
  beforeEach(function() {
    window.FullBgUnsplash.setup(clientId);
  });
  it('should setup plugin', function() {
    ajaxSetupStub.yieldsTo('beforeSend', {setRequestHeader: sinon.spy() }).calledOnce;
  });
  it('should have the default values', function() {
    return $('#bg').FullBgUnsplash({}).catch(function($this){
      expect($this.css('width')).to.be.equal('100%');
      expect($this.css('minHeight')).to.be.equal('800px');
      expect($this.css('backgroundSize')).to.be.equal('cover');
      expect($this.css('backgroundPosition')).to.be.equal('center');
      expect($this.css('backgroundColor')).to.be.equal('black');
    });
  });
  it('should have defined values', function() {
    return $('#bg').FullBgUnsplash({
      minHeight: '700px',
      backgroundSize: 'contain',
      backgroundPosition: 'top center',
      backgroundColor: 'red',
    }).catch(function($this){
      expect($this.css('minHeight')).to.be.equal('700px');
      expect($this.css('backgroundSize')).to.be.equal('contain');
      expect($this.css('backgroundPosition')).to.be.equal('top center');
      expect($this.css('backgroundColor')).to.be.equal('red');
    });
  });
  describe('when the user set an image', function() {
    var successResponse, errorResponse, options;
    var imageFromUnsplash = 'path/imagefromunsplash.jpg';
    var imageByDefault = 'path/image.jpg';
    beforeEach(function() {
      options = {};
      options.backgroundImage = 'path/image.jpg';
      errorResponse = function() {
        var d = $.Deferred();
        d.reject();
        return d.promise();
      };
    });

    describe('when it is a random image', function() {
      beforeEach(function() {
        options.by = 'random';
        successResponse = function() {
          var d = $.Deferred();
          d.resolve({
            urls: {
              regular: imageFromUnsplash
            }
          });
          return d.promise();
        };
      });
      it('should set an image as full page background', function() {
        ajaxStub.returns(successResponse());
        return $('#bg').FullBgUnsplash(options)
          .then(function($this){
            expect($this.css('backgroundImage')).to.contain(imageFromUnsplash);
          });
      });
      it('should set the default image when fails', function() {
        ajaxStub.returns(errorResponse());
        return $('#bg').FullBgUnsplash(options)
          .catch(function($this) {
            expect($this.css('backgroundImage')).to.contain(imageByDefault);
          });
      });
    });
    describe('when it is an image by keyword', function() {
      beforeEach(function() {
        options.keyword = 'dog';
        successResponse = function() {
          var d = $.Deferred();
          d.resolve({
            results: [{
              urls: { regular: imageFromUnsplash
              }
            }]
          });
          return d.promise();
        };
      });
      it('should set an image as full page background', function() {
        ajaxStub.returns(successResponse());
        return $('#bg').FullBgUnsplash(options)
          .then(function($this){
            expect($this.css('backgroundImage')).to.contain(imageFromUnsplash);
          });
      });
      it('should set the default image when fails', function() {
        ajaxStub.returns(errorResponse());
        return $('#bg').FullBgUnsplash(options)
          .catch(function($this) {
            expect($this.css('backgroundImage')).to.contain(imageByDefault);
          });
      });
    });
  });
});
