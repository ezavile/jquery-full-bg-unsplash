/**
 * Full Bg Unsplash
 * @version 0.0.0-development
 * @author Edgar Zavala
 * @license The MIT License (MIT)
 */

(function(global, $) {

  function FullBgUnsplash() {
    this.apiUrl = 'https://api.unsplash.com/photos';
  }

  FullBgUnsplash.prototype.setup = function(clientId) {
    this.clientId = clientId;
    $.ajaxSetup({
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Client-ID ' + clientId);
      }
    });
  };

  FullBgUnsplash.prototype.getRandomPhoto = function() {
    return (
      $.ajax({
        url: this.apiUrl + '/random'
      })
    );
  };

  $.fn.getRandomPhoto = function() {
    var self = this;
    var deferred = $.Deferred();
    global.FullBgUnsplash
      .getRandomPhoto()
      .done(function(photo) {
        self.css({
          backgroundImage: 'url(' + photo.urls.regular + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100%'
        });
        deferred.resolve(self);
      });
    return deferred.promise();
  };

  global.FullBgUnsplash = new FullBgUnsplash();
})(window, jQuery);
