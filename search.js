


var Nightmare = require('nightmare');
var jquery = require('jquery');
var fs = require('fs');

var jobs = [];

nightmare = Nightmare({
    openDevTools: {
        mode: 'right'
    },
    show: true,
    pollInterval: 50, //in ms
    alwaysOnTop: false,
    title: 'JobSearchApp',
    width: 1300,
    height: 700,
});

// Define ItJobs function
var itJobs = function() {
    console.log("======================");
    console.log("= SCRAPING ITJOBS.PT =");
    console.log("======================");
    return function(nightmare) {
        nightmare
            .goto('https://www.itjobs.pt/emprego?location=1&q=frontend&sort=date')
            .wait()
            .evaluate(function() {
                var itJobs = [];
                $('div.col-xs-12.col-sm-9.col-md-9.altered > div > ul > li').each(function() {
                    var job = {};
                    job["title"] = $(this).text();
                    var extractedLink = $(this).find("div.list-title > a").attr("href");
                    job["link"] = "https://www.itjobs.pt" + extractedLink;
                    job["logo"] = $(this).find("div.responsive-container > div > a > img").attr("src");
                    job["company"] = $(this).find("div.list-name > a").text();
                    job["location"] = $(this).find("div.list-details").text();
                    job["source"] = "itjobs.pt";
                    itJobs.push(job);
                });
                return itJobs;
            })
    }
};

// define glassdoor
var glassdoor = function() {
    console.log("==========================");
    console.log("= SCRAPING GLASSDOOR.COM =");
    console.log("==========================");
    return function(nightmare) {
        nightmare
            .goto('https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=true&clickSource=searchBtn&typedKeyword=front+&sc.keyword=front+end+developer&locT=C&locId=3185896&jobType=')
            .wait()
            .evaluate(function() {
                var glassJobs = [];
                $('#MainCol > div > ul > li').each(function() {
                    gb = {};
                    gb["title"] = $(this).find("div > div > div > a").text();
                    gb["company"] = $(this).find("div > div.flexbox.empLoc > div").text();
                    gb["source"] = "glassdoor.com";
                    gb["date"] = $(this).find("div > div.flexbox.empLoc > span.showHH.nowrap > span").text();
                    gb["logo"] = $(this).find("div.logoWrap > a > span > img").attr("src");

                    glassJobs.push(gb);
                });
                return glassJobs;
            })
    }
};

// define indeed.pt
var indeed = function() {
    console.log("======================");
    console.log("= SCRAPING INDEED.PT =");
    console.log("======================");
    return function(nightmare) {
        nightmare
            .goto('https://www.indeed.pt/ofertas?q=Front+End+Developer&l=Aveiro,+Distrito+de+Aveiro')
            .inject('js', './node_modules/jquery/dist/jquery.min.js')
            .wait()
            .evaluate(function() {
                var indeedJobs = [];
                $('.result').each(function() {
                    ind = {};
                    ind["title"] = $(this).find("h2.jobtitle > a").text();
                    // ind["company"] = $(this).find("div > div.flexbox.empLoc > div").text();
                    // ind["source"] = "glassdoor.com";
                    // ind["date"] = $(this).find("div > div.flexbox.empLoc > span.showHH.nowrap > span").text();
                    // ind["logo"] = $(this).find("div.logoWrap > a > span > img").attr("src");

                    indeedJobs.push(ind);
                });
                return indeedJobs;
            })
    }
};

nightmare

    /* itjobs.pt */
    .use(itJobs())
    .then(function(itJobs) {
        jobs.push(itJobs);
    })

    /* glassdoor.com */
    .then(() => nightmare.use(glassdoor()))
    .then(function(glassJobs) {
        jobs.push(glassJobs);
    })

    /* indeed.pt */
    .then(() => nightmare.use(indeed()))
    .then(function(indeedJobs) {
        jobs.push(indeedJobs);
        return nightmare.end();
    })
    // .end()
    .then(() => console.log("jobs results -> ", jobs));