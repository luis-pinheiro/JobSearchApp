const Nightmare = require('nightmare');
const jquery = require('jquery');
const fs = require('fs');
const {csvFormat} = require('d3-dsv');
const $ = require('cheerio');
const Linkedin = require('./plugins/linkedin.js');
const duck = require('./plugins/duck.js');
const itJobs = require('./plugins/itJobs');
const glassdoor = require('./plugins/glassdoor');
const modify = require('./helpers/modify.js');
let jobsArr = [];
let jobsArray = [];

let jobs = [];

const cred = require('./credentials.json');

console.log('cred.loc -> ', cred.loc);

nightmare = Nightmare({
    openDevTools: {
    mode: 'bottom'
  },
    // show: true,
    webPreferences: {
        partition: 'persist:derp'
    },
    electronPath: require('./node_modules/electron'),
    alwaysOnTop: false,
    title: 'JobSearchApp',
    width: 1300,
    height: 600,
});

Nightmare.action('clearCache',
    function(name, options, parent, win, renderer, done) {
        parent.respondTo('clearCache', function(done) {
            win.webContents.session.clearCache(done);
        });
        done();
    },
    function(message, done) {
        this.child.call('clearCache', done);
    });

nightmare
    .use(itJobs.search())
    .then((itJobs) => jobs.push(itJobs))

    .then(() => modify.modify(jobs))

    .then(function (jobs) {
        document.getElementById("results").innerHTML = jobs;
    })
    .then(() => nightmare.end())
    .catch(function(error) {
        console.log(error);
    });
