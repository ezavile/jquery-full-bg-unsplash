# jquery-full-bg-unsplash

[![Travis](https://img.shields.io/travis/ezavile/jquery-full-bg-unsplash.svg?style=flat-square)](https://travis-ci.org/ezavile/jquery-full-bg-unsplash)
[![Codecov](https://img.shields.io/codecov/c/github/ezavile/jquery-full-bg-unsplash.svg?style=flat-square)](https://codecov.io/gh/ezavile/jquery-full-bg-unsplash)
[![npm](https://img.shields.io/npm/v/jquery-full-bg-unsplash.svg?style=flat-square)](https://www.npmjs.com/package/jquery-full-bg-unsplash)

jQuery plugin to change a full background image from Unsplash

## Installation
```
npm install jquery-full-bg-unsplash
```

## Load
```html
<script src="/node_modules/jquery/dist/jquery.js"></script>
<script src="/node_modules/jquery-full-bg-unsplash/dist/index.js"></script>
```

## Usage
Create a container where you want to set a full background image(`div`, `section`, `article`, etc.)
```html
<div id="full-bg-random"></div>
<div id="full-bg-dog"></div>
```

Before using the Unsplash API, you need to [register as a developer](https://unsplash.com/developers).
You must put the **CLIENT_ID** in order to be enable to get photos from Unsplash API.

```js
window.FullBgUnsplash.setup(clientId);
```

Call the plugin:
```js
$(document).ready(function(){
  window.FullBgUnsplash.setup(clientId);

  // get random photo
  $('#full-bg-random').FullBgUnsplash({
    by: 'random'
  });

  // get photo by keyword
  $('#full-bg-dog').FullBgUnsplash({
    keyword: 'dog'
  });
});
```

### Options
By default the plugin use some values:
```js
{
  height: '100vh',
  width: '100%',
  minHeight: '800px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: 'black'
}
```

You can override them:
```js
$('#full-bg-random').FullBgUnsplash({
  minHeight: '900px',
  backgroundSize: 'contain'
});
```

In case that endpoint of Unsplash responses with errors, you can set an image(this only is visible when Unsplash endpoint fails):
```js
$('#full-bg-random').FullBgUnsplash({
  backgroundImage: 'path/image.jpg'
});
```

## Testing
This will build scripts, run tests and generate a code coverage report. Anything less than 100% coverage will throw an error.
```javascript
npm test
```

## Contributing
* ⇄ Pull requests and ★ Stars are always welcome.
* For bugs and feature requests, please create an issue.
* Pull requests must be accompanied by passing automated tests (`npm test`).

[MIT License]: https://github.com/ezavile/jquery-full-bg-unsplash/blob/master/LICENSE
