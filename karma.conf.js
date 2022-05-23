/* eslint-disable global-require */
console.log('ENV_VARS', process.env)

module.exports = function (config) {
  config.set({
    browserNoActivityTimeout: 300000,
    browserDisconnectTimeout: 300000,
    browserSocketTimeout    : 300000,
    // captureTimeout: 900000,
    // processKillTimeout: 2000,

    browsers: process.env.GITHUB_WORKFLOW
      ? [
        'ChromeLatest',
        'ChromiumCI',
      ]
      : [
        'ChromeLatest',
        'Chromium39',
        'FirefoxHeadless',
        // "Edge",
      ],
    files     : ['dist/browser/browser.test.js'],
    frameworks: ['mocha'],
    reporters : ['progress', 'coverage'],
    plugins   : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-edge-launcher',
      'karma-mocha',
      'karma-coverage',
      require('./dist/node/index.cjs'),
    ],
    coverageReporter: {
      // Prevent to disable coverage by IntelliJ
      // see: https://github.com/karma-runner/karma-coverage/issues/183#issuecomment-167880660
      instrumenter: null,

      type: 'json',
      dir : 'tmp/coverage/karma/json',
    },
    customLaunchers: {
      ChromiumCI: {
        base       : 'Custom',
        parent     : 'ChromiumHeadless',
        displayName: 'Chromium CI',
        flags      : [
          '--headless',
          '--incognito',
          '--no-sandbox',
          // '--disable-setuid-sandbox',
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
        // DEFAULT_CMD: {
        //   win32: 'E:/Program Files (x86)/Google/Chrome Dev/Application/chrome.exe',
        // },
        ENV_CMD: null,
      },
    },
  })
}
