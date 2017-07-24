
/**
 * Dependencies.
 */

var Nightmare = require('nightmare');
var LinkedIn = require('./index.js');
var nightmare = new Nightmare({
  openDevTools: {
        mode: 'right'
    },
    show: true,
    // pollInterval: 50, //in ms
    alwaysOnTop: false,
    title: 'JobSearchApp',
    width: 1300,
    height: 700,
});

/**
 * Set variables.
 */

var email = 'profitcreations@live.com';
var password = 'lolololololol';
var type = 'people';
var query = 'product manager';
var filter = ['United States'];
var pages = 2;

/**
 * Set nightmare commands.
 */

nightmare

  // Login to LinkedIn.
  .use(LinkedIn.login(email, password))
/*
  // Search for something and set the types of results.
  .use(LinkedIn.search(type, query))

  // Filter the search results for 'United States'.
  .use(LinkedIn.filter(filter))

  // Crawl results for two pages.
  .use(LinkedIn.crawl(pages))
*/
  // Execute commands.
  // .run(done);
