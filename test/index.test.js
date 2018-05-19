var expect = require('chai').expect;
var jsdom = require('jsdom');

var dom = new jsdom.JSDOM('<html><body><div id="fake" style="background-color:blue"></div></body></html>');
var $ = global.jQuery = require('jquery')(dom.window);
global.window = dom.window;

require('../src');

describe('jquery-full-bg-unsplash', function() {
  var $fakeDiv;
  beforeEach(function() {
    $fakeDiv = $('#fake');
    window.fullBgUnsplash.setup('b2ec7ec8d4a7a62b644483d930ea01bb999ed271152503f5bcc0bb85308039af');
  });

  it('should be defined', function() {
    expect(global.window).to.be.exist;
  });

  it('should be a function', function() {
    expect(window.fullBgUnsplash).to.be.a('object');
  });

  it('should have a client id', function() {
    expect(window.fullBgUnsplash.clientId).to.be.equal('b2ec7ec8d4a7a62b644483d930ea01bb999ed271152503f5bcc0bb85308039af');
  });

  it('should have default values', function() {
    $fakeDiv.fullBgUnsplash();
    expect($fakeDiv.css('width')).to.be.equal('100%');
    expect($fakeDiv.css('min-height')).to.be.equal('800px');
    expect($fakeDiv.css('background-size')).to.be.equal('cover');
    expect($fakeDiv.css('background-position')).to.be.equal('center');
    expect($fakeDiv.css('background-color')).to.be.equal('black');
  });

  it('should override default values', function() {
    $fakeDiv.fullBgUnsplash({
      minHeight: '400px',
      backgroundSize: 'container',
      backgroundPosition: 'top right',
      backgroundColor: 'red',
    });
    expect($fakeDiv.css('min-height')).to.be.equal('400px');
    expect($fakeDiv.css('background-size')).to.be.equal('container');
    expect($fakeDiv.css('background-position')).to.be.equal('top right');
    expect($fakeDiv.css('background-color')).to.be.equal('red');
  });

  it('should have an image from unsplash', function(done) {
    $fakeDiv.fullBgUnsplash();

    setTimeout(function() {
      expect($fakeDiv.css('backgroundImage')).to.contain('images.unsplash.com');
      done();
    }, 1000);
  });

  it('should have the default image', function(done) {
    window.fullBgUnsplash.setup('fake-id');
    $fakeDiv.fullBgUnsplash({backgroundImage: 'default'});

    setTimeout(function() {
      expect($fakeDiv.css('backgroundImage')).to.contain('default');
      done();
    }, 1000);
  });

});
