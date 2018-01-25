/**
 * Full Bg Unsplash
 * @version 1.0.2
 * @author Edgar Zavala
 * @license The MIT License (MIT)
 */

(function(global, $) {

  function FullBgUnsplash() {
    this.apiUrl = 'https://api.unsplash.com/';
  }

  FullBgUnsplash.prototype.setup = function(clientId) {
    $.ajaxSetup({
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Client-ID ' + clientId);
      }
    });
  };

  FullBgUnsplash.prototype.getRandomPhoto = function(orientation) {
    return (
      $.ajax({
        url: this.apiUrl + 'photos/random/',
        data: {orientation: orientation || 'landscape'}
      })
    );
  };

  FullBgUnsplash.prototype.getPhotoByKeyword = function(orientation, keyword) {
    return (
      $.ajax({
        url: this.apiUrl + 'search/photos/',
        data: {
          orientation: orientation || 'landscape',
          query: keyword,
          page: 1,
          per_page: 1
        }
      })
    );
  };

  $.fn.FullBgUnsplash = function(options) {
    var self = this;
    var deferred = $.Deferred();
    self.css({
      height: '100vh',
      width: '100%',
      minHeight: options.minHeight || '800px',
      backgroundSize: options.backgroundSize || 'cover',
      backgroundPosition: options.backgroundPosition || 'center',
      backgroundColor: options.backgroundColor || 'black',
    });
    if (options.by === 'random') {
      global.FullBgUnsplash
        .getRandomPhoto(options.orientation)
        .done(function(photo) {
          self.css({
            backgroundImage: 'url(' + photo.urls.regular + ')',
          });
          deferred.resolve(self);
        })
        .fail(function() {
          self.css({
            backgroundImage: 'url(' + options.backgroundImage + ')',
          });
          deferred.reject(self);
        });
    } else if (options.keyword) {
      global.FullBgUnsplash
        .getPhotoByKeyword(options.orientation, options.keyword)
        .done(function(photos) {
          self.css({
            backgroundImage: 'url(' + photos.results[0].urls.regular + ')',
          });
          deferred.resolve(self);
        })
        .fail(function() {
          self.css({
            backgroundImage: 'url(' + options.backgroundImage + ')',
          });
          deferred.reject(self);
        });
    } else {
      deferred.reject(self);
    }
    return deferred.promise();
  };

  global.FullBgUnsplash = new FullBgUnsplash();
})(window, jQuery);
