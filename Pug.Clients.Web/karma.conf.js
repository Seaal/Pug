// Karma configuration

module.exports = function (config) {

    var outputBase = "wwwroot/";
    var appBase = outputBase + "app/";
    var srcBase = "app/";

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["jasmine"],


    // list of files / patterns to load in the browser
    files: [
        // System.js for module loading
        "node_modules/systemjs/dist/system.src.js",

        // Polyfills
        "node_modules/core-js/client/shim.js",

        // zone.js
        "node_modules/zone.js/dist/zone.js",
        "node_modules/zone.js/dist/long-stack-trace-zone.js",
        "node_modules/zone.js/dist/proxy.js",
        "node_modules/zone.js/dist/sync-test.js",
        "node_modules/zone.js/dist/jasmine-patch.js",
        "node_modules/zone.js/dist/async-test.js",
        "node_modules/zone.js/dist/fake-async-test.js",

        // External Modules
        { pattern: "node_modules/rxjs/**/*.js", included: false, watched: false },
        { pattern: "node_modules/rxjs/**/*.js.map", included: false, watched: false },
        { pattern: "node_modules/@ngx-translate/core/bundles/*.umd.js", included: false, watched: false },
        { pattern: "node_modules/tslib/tslib.js", included: false, watched: false },
        { pattern: "node_modules/moment/min/moment-with-locales.js", included: false, watched: false},
        { pattern: "node_modules/auth0-js/build/auth0.js", included: false, watched: false},

        // Paths loaded via module imports:
        // Angular itself
        { pattern: "node_modules/@angular/**/*.js", included: false, watched: false },
        { pattern: "node_modules/@angular/**/*.js.map", included: false, watched: false },

        { pattern: outputBase + "/systemjs.config.js", included: false, watched: false },
        "karma-test-shim.js",

        // transpiled application & spec code paths loaded via module imports
        { pattern: appBase + "**/*.js", included: false, watched: true },

        // Asset (HTML & CSS) paths loaded via Angular's component compiler
        // (these paths need to be rewritten, see proxies section)
        { pattern: appBase + "**/*.html", included: false, watched: true },
        { pattern: appBase + "**/*.css", included: false, watched: true },

        // Paths for debugging with source maps in dev tools
        { pattern: srcBase + "**/*.ts", included: false, watched: false },
        { pattern: appBase + "**/*.js.map", included: false, watched: false }
    ],

    proxies: {
        "/base/wwwroot/libs/" : "/base/node_modules/",
        "/app/" : "/base/wwwroot/app/"
    },

    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        "wwwroot/app/**/!(*.spec).js": ["coverage"],
        "wwwroot/app/**/*.js": ["sourcemap"]
    },


    // test results reporter to use
    // possible values: "dots", "progress"
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["dots", "coverage", "remap-coverage"],

    coverageReporter: {
        type: "in-memory"
    },

    remapCoverageReporter: {
        "text-summary": null
    },

    remapOptions: {
        basePath: "./app"
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["ChromeHeadless"],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
