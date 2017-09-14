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
// define indeed.pt
let indeed = function() {
    console.log("======================");
    console.log("= SCRAPING INDEED.PT =");
    console.log("======================");
    return function(nightmare) {
        nightmare
            .goto('https://www.indeed.pt/ofertas?q=Front+End+Developer&l=Aveiro,+Distrito+de+Aveiro')
            .inject('js', './node_modules/jquery/dist/jquery.min.js')
            .wait()
            .evaluate(function() {
                let indeedJobs = [];
                $('.result').each(function() {
                    ind = {};
                    ind["title"] = $(this).find("h2.jobtitle > a").text();
                    ind["company"] = $(this).find("span.company > span").text();
                    ind["source"] = "indeed.pt";
                    ind["date"] = $(this).find("table > tbody > tr > td > div.result-link-bar-container > div > span.date").text();
                    ind["description"] = $(this).find(".sumary").text();

                    indeedJobs.push(ind);
                });
                return indeedJobs;
            })

    }
};

// Empregosonline.pt
let empregosonline = function() {
    console.log("==============================");
    console.log("= SCRAPING EMPREGOSONLINE.PT =");
    console.log("==============================");
    return function(nightmare) {
        selector = 'pesquisaItem';
        nightmare
            .goto('http://www.empregosonline.pt/Pesquisa/Results.aspx?search=developer&cat=&zon=2')
            .inject('js', './node_modules/jquery/dist/jquery.min.js')
            .wait()
            .evaluate(function() {
                let empregosonlineJobs = [];
                $('.pesquisaItem').each(function() {
                    eo = {};
                    eo["title"] = $(this).find("h3 > a > strong").text();
                    let extractedLink = $(this).find("h3 > a").attr("href");
                    eo["link"] = "http://www.empregosonline.pt" + extractedLink;
                    eo["logo"] = $(this).find(".resultPesquisa_img > a > img").attr("src");
                    eo["company"] = $(this).find(".subInfo > a").text();
                    eo["location"] = 'Distrito de Aveiro';
                    eo["date"] = $(this).find("span:nth-child(4)").text();
                    eo["source"] = "Empregosonline.pt";
                    empregosonlineJobs.push(eo);
                });
                return empregosonlineJobs;
            })
    }
};


// emprego.pt
let emprego = function() {
    console.log("=======================");
    console.log("= SCRAPING EMPREGO.PT =");
    console.log("=======================");
    return function(nightmare) {
        selector = 'pesquisaItem';
        nightmare
            .goto('https://www.emprego.pt/jobs')
            .inject('js', './node_modules/jquery/dist/jquery.min.js')
            .wait()
            .click('body > header > nav > div > div.navbar-collapse.collapse > ul.nav.navbar-nav.navbar-right > li > button')
            .wait(5000)
            // .click('input[type="email"]')
            .type('input#auth_user_email', 'lol')
            .type('input#auth_user_password', 'Pro862486248')
            .click('#login-tab > form > button')

            .wait(5000)
            .screenshot('screenshot.png')
            .evaluate(function() {

                    let empregoJobs = [];
                    $('.pesquisaItem').each(function() {
                        eo = {};
                        eo["title"] = $(this).find("h3 > a > strong").text();
                        let extractedLink = $(this).find("h3 > a").attr("href");
                        eo["link"] = "http://www.emprego.pt" + extractedLink;
                        eo["logo"] = $(this).find(".resultPesquisa_img > a > img").attr("src");
                        eo["company"] = $(this).find(".subInfo > a").text();
                        eo["location"] = 'Distrito de Aveiro';
                        eo["date"] = $(this).find("span:nth-child(4)").text();
                        eo["source"] = "emprego.pt";
                        empregoJobs.push(eo);
                    });
                    return empregoJobs;
                },
                function() {
                    alert($("#auth_user_email"));
                })
    }
};

nightmare
    .use(itJobs.search())
    .then((itJobs) => jobs.push(itJobs))
    /* glassdoor.com */
    /*
    .then(() => nightmare.use(glassdoor.search()))
    .then((glassdoor) => jobs.push(glassdoor))
    */
    .then(() => modify.modify(jobs))

    .then(function (jobs) {
        document.getElementById("results").innerHTML = jobs;
        // document.getElementById("jobSearch").innerHTML = "Search";
    })
    // .then(() => nightmare.end())
    .catch(function(error) {
        console.log(error);
    });

