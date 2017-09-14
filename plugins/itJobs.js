console.log("-> itJobs ");
var exec = require("child_process").exec;
let cred = require('../credentials.json');
let loc = cred.loc;
let job = cred.job;
let remote = "";
if(cred.remote) {
   remote = "remote=1&";
};
console.log("remote -> ", remote);
console.log('loc -> ', loc);
var search = exports.search = function() {
    return function(nightmare) {
        nightmare
            .goto("https://www.itjobs.pt/emprego?" + remote + "location=" + loc + "&q=" + job + "&sort=date")
            .evaluate(function() {
                let itJobs = [];
                $('.block.borderless').each(function() {
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
    };
};
