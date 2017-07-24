
/**
 * Dependencies.
 */

var exec = require('child_process').exec;
var $ = require('jQuery');



/**
 * Login to a LinkedIn account.
 *
 * @param {String} email
 * @param {String} password
 */

var login = exports.login = function(email, password){
  return function(nightmare) {
    nightmare

      .cookies.clearAll()
      .viewport(800, 1600)
      .goto('https://www.linkedin.com/uas/login')
      .wait()
      .type('#session_key-login', email)
      .type('#session_password-login', password)
      .click('#btn-primary')
      .wait();
  };
};

var jobSearch = exports.jobSearch = function(job, location) {
  return function(nightmare) {
    nightmare
      .goto('https://www.linkedin.com/jobs')
      .inject('js', './node_modules/jquery/dist/jquery.min.js')
      .type('input[name: "keywords"]', job)
      .type('input[name: ""]', location)
      // .type('.location-search-form.location-search-box  > .svg-icon-wrap > .ember-view > .ember-view > .type-ahead-wrapper.type-ahead-theme-primary > .type-ahead-input-container > .type-ahead-input-wrapper > .type-ahead-input > imput.ember-text-field.ember-view', location)
      .click('.submit-button.button-secondary-large-inverse')
      .wait()
      .evaluate(function() {
                let jobs = [];
                $('.card-list__item.job-card job-card--column.ember-view').each(function() {
                    let job = {};
                    job["title"] = $(this).find(".truncate-multiline--truncation-target > span").text();
                /*    let extractedLink = $(this).find("div.list-title > a").attr("href");
                    job["link"] = "https://www.itjobs.pt" + extractedLink;
                    job["logo"] = $(this).find("div.responsive-container > div > a > img").attr("src");
                    job["company"] = $(this).find("div.list-name > a").text();
                    job["location"] = $(this).find("div.list-details").text();
                    job["source"] = "Linkedin.com"; */
                    jobs.push(job);
                });
                return jobs;
            })
  }
};

/**
 * Perform a search.
 *
 * @param {String} type
 * @param {String} query
 */

var search = exports.search = function(type, query) {
  if (!type || type.length === 0) type = 'all';
  type = type.toLowerCase();
  return function(nightmare) {
    nightmare
      .exists('#main-search-box', function(ready) {
        if (!ready) throw 'Search box not ready';
        return;
      })
      .type('#main-search-box', query)
      .click('.search-button')
      .wait('#search-types')
      .click('li > a[href*="' + type + '"]')
      .wait(5000);
  }
};

/**
 * Filter search results.
 *
 * @param {Array} filter, ['United States']
 */

var filter = exports.filter = function(filters) {
  return function(nightmare) {
    nightmare
      .exists('.search-results', function(ready) {
        if (!ready) throw 'Search results not ready';
        return;
      });
    filters.forEach(function(filter) {
      nightmare
        .click('label[title="' + filter + '"]')
        .wait(5000);
    });
  }
};

/**
 * Crawl X pages from search results.
 *
 * @param {Integer} pages leave blank for indefinite crawling.
 */

var crawl = exports.crawl = function(pages) {
  var pages = pages || 10;
  return function(nightmare) {
    for (var i = 0; i < pages; i++) {
      for (var j = 0; j < 10; j++) {
        nightmare
          .click('#results > li:nth-child(' + (j + 1) + ')')
          .wait(5000)
          .back();
      }
      nightmare
        .click('#results-pagination > ul > li.next > a')
        .wait(5000);
    }
  }
};

/**
 * Connect with user.
 *
 * WIP
 *
 * @param {String} user username or URL or nightmare is already on user page
 */

var connect = exports.connect = function(user) {
  return function(nightmare) {
    nightmare
      .exists('.button-primary', function(ready) {
        if (!read) throw 'Connect button not ready';
        return;
      })
      .click('.button-primary')
      .wait('.btn-primary')
      // Need to select how to i know this person OR fill in an email address
      .click('.btn-primary')
      .wait(1000);
  }
};

/**
 * Get an array of users who has viewed me.
 */

var viewedMe = exports.viewedMe = function() {
  return function(nightmare) {
    // WIP
  }
};
