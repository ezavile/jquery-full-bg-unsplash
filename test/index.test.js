var expect = require('chai').expect;
var jsdom = require('jsdom');

var dom = new jsdom.JSDOM('<html><body><a href="page.html">Foo</a></body></html>');
var $ = global.jQuery = require('jquery')(dom.window);

require('../src');

describe('jq-full-bg-unsplash', function() {
  it('should have the location', function() {
    $('a').showLinkLocation();
    expect($('a').text()).to.be.equal('Foo(page.html)');
  });
});
