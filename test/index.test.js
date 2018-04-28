var expect = require('chai').expect;
var jsdom = require('jsdom');

var dom = new jsdom.JSDOM('<html><body><div id="fake" style="background-color:blue"></div></body></html>');
var $ = global.jQuery = require('jquery')(dom.window);

require('../src');

describe('jquery-full-bg-unsplash', function() {
  it('should set the background from blue to red', function() {
    var $fakeDiv = $('#fake');
    expect($fakeDiv.css('background-color')).to.be.equal('blue');
    $fakeDiv.setRed();
    expect($fakeDiv.css('background-color')).to.be.equal('red');
  });
});
