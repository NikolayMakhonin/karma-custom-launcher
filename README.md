[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][github-image]][github-url]

# Usage

karma.conf.js
```js
module.exports = function (config) {
  config.set({
    browsers: [
    'ChromeLatest',
    'Chromium39',
    'FirefoxHeadless',
  ],
    files     : ['dist/browser/browser.test.js'],
    reporters : ['progress'],
    plugins   : [
      'karma-chrome-launcher',
      '@flemist/karma-custom-launcher',
    ],
    customLaunchers: {
      ChromiumCI: {
        base       : 'Custom',
        parent     : 'ChromiumHeadless',
        displayName: 'Chromium CI',
        flags      : [
          '--headless',
          '--incognito',
          '--no-sandbox',
          '--disable-gpu',
          '--disable-web-security',
          '--allow-cross-origin-auth-prompt',
          '--disable-site-isolation-trials',
          '--enable-precise-memory-info',
        ],
        DEFAULT_CMD: {
          linux: process.env.CHROMIUM_BIN,
        },
        ENV_CMD: null,
      },
      Chromium33: {
        base       : 'Custom',
        parent     : 'ChromiumHeadless',
        displayName: 'Chromium 33.0.1750.170',
        flags      : [
          '--incognito',
          '--no-sandbox',
          '--disable-web-security',
          '--allow-cross-origin-auth-prompt',
          '--disable-site-isolation-trials',
        ],
        DEFAULT_CMD: {
          win32: 'E:/Program Files (x86)/Chromium/33.0.1750.170/chrome.exe',
        },
        ENV_CMD: null,
      },
      Chromium39: {
        base       : 'Custom',
        parent     : 'ChromiumHeadless',
        displayName: 'Chromium 39.0.2171.99',
        flags      : [
          '--incognito',
          '--no-sandbox',
          '--disable-web-security',
          '--allow-cross-origin-auth-prompt',
          '--disable-site-isolation-trials',
        ],
        DEFAULT_CMD: {
          win32: 'E:/Program Files (x86)/Chromium/39.0.2171.99/chrome.exe',
        },
        ENV_CMD: null,
      },
      Chromium44: {
        base       : 'Custom',
        parent     : 'ChromiumHeadless',
        displayName: 'Chromium 44.0.2403.119',
        flags      : [
          '--incognito',
          '--no-sandbox',
          '--disable-web-security',
          '--allow-cross-origin-auth-prompt',
          '--disable-site-isolation-trials',
        ],
        DEFAULT_CMD: {
          win32: 'E:/Program Files (x86)/Chromium/44.0.2403.119/chrome.exe',
        },
        ENV_CMD: null,
      },
      ChromiumLatest: {
        base  : 'Custom',
        parent: 'ChromiumHeadless',
        flags : [
          '--incognito',
          '--no-sandbox',
          '--disable-web-security',
          '--allow-cross-origin-auth-prompt',
          '--disable-site-isolation-trials',
        ],
        DEFAULT_CMD: {
          win32: 'E:/Program Files (x86)/Chromium/44.0.2403.119/chrome.exe',
        },
        ENV_CMD: null,
      },
      ChromeLatest: {
        base  : 'Custom',
        parent: 'ChromeHeadless',
        flags : [
          '--incognito',
          '--no-sandbox',
          '--disable-web-security',
          '--allow-cross-origin-auth-prompt',
          '--disable-site-isolation-trials',
        ],
      },
    },
  })
}
```

[npm-image]: https://img.shields.io/npm/v/@flemist/karma-custom-launcher.svg
[npm-url]: https://npmjs.org/package/@flemist/karma-custom-launcher
[downloads-image]: https://img.shields.io/npm/dm/@flemist/karma-custom-launcher.svg
[downloads-url]: https://npmjs.org/package/@flemist/karma-custom-launcher
[github-image]: https://github.com/NikolayMakhonin/karma-custom-launcher/actions/workflows/test.yml/badge.svg
[github-url]: https://github.com/NikolayMakhonin/karma-custom-launcher/actions
