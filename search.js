const Nightmare = require('nightmare');
const jquery = require('jquery');
const fs = require('fs');
const { csvFormat } = require('d3-dsv');

let jobs = [];

let cre = require('./credentials.js');

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
    // loadTimeout: 5000, // in ms
    // executionTimeout: 5000 // in ms
});

// Define ItJobs function
let itJobs = function() {
    console.log("======================");
    console.log("= SCRAPING ITJOBS.PT =");
    console.log("======================");
    return function(nightmare) {
        nightmare
            .goto('https://www.itjobs.pt/emprego?location=1&q=frontend&sort=date')
            .wait()
            .evaluate(function() {
                let itJobs = [];
                $('div.col-xs-12.col-sm-9.col-md-9.altered > div > ul > li').each(function() {
                    let job = {};
                    job["title"] = $(this).text();
                    let extractedLink = $(this).find("div.list-title > a").attr("href");
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
let glassdoor = function() {
    console.log("==========================");
    console.log("= SCRAPING GLASSDOOR.COM =");
    console.log("==========================");
    return function(nightmare) {
        nightmare
            .goto('https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=true&clickSource=searchBtn&typedKeyword=front+&sc.keyword=front+end+developer&locT=C&locId=3185896&jobType=')
            .wait()
            .evaluate(function() {
                let glassJobs = [];
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
            .screenshot('screenshot.png')
            .click('input[name="email"]')
            .insert('input[name="email", '']')
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
            })
    }
};

nightmare
    /* itjobs.pt */
    // .use(itJobs())
    // .then(function(itJobs) {
    //     jobs.push(itJobs);
    // })

    /* glassdoor.com */
    // .then(() => nightmare.use(glassdoor()))
    // .then(function(glassJobs) {
    //     jobs.push(glassJobs);
    // })

    /* indeed.pt */
    // .then(() => nightmare.use(indeed()))
    // .then(function(indeedJobs) {
    //     jobs.push(indeedJobs);
    // })

    /* empregosonline.pt */
    // .then(() => nightmare.use(empregosonline())) 
    // .then(function(empregosonlineJobs){
    //     jobs.push(empregosonlineJobs);
    // })

    /* Empregos.pt */
    .then(() => nightmare.use(emprego()))
    .then(function(empregoJobs) {
        jobs.push(empregoJobs);
    })
    

    .then(function(content) {
        content = JSON.stringify(jobs).replace(/\[|\]|\\n/g, " ");
        fs.writeFile("./jobsearch.json", content, 'utf8', function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
        
    })
    .then(() => console.log("jobs results -> ", jobs))
    // .then(() => nightmare.end())
    .catch(function(error) {
        console.log(error);
    });