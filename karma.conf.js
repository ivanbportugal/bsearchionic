// Karma configuration
// Generated on Mon May 08 2017 08:21:35 GMT-0500 (CDT)
module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'angular-cli'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-remap-istanbul'),
            require('karma-mocha-reporter'),
            require('angular-cli/plugins/karma')
        ],
        files: [{
            pattern: '**/*spec.js',
            watched: false
        }],
        preprocessors: {
            '**/*spec.js': ['angular-cli']
        },
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        remapIstanbulReporter: {
            reports: {
                html: 'coverage',
                lcovonly: './coverage/coverage.lcov'
            }
        },
        reporters: config.angularCli && config.angularCli.codeCoverage ? ['mocha', 'karma-remap-istanbul', 'progress'] : ['mocha', 'progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity
    })
}