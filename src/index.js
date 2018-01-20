/**
 * Full Bg Unsplash
 * @version 0.0.0-development
 * @author Edgar Zavala
 * @license The MIT License (MIT)
 */

(function( $ ) {
  $.fn.showLinkLocation = function() {
    this.filter('a').append(function() {
      return '(' + this.href + ')';
    });
    return this;
  };
}(jQuery));
