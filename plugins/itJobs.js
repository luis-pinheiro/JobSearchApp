var exec = require("child_process").exec;
console.log('jobTitle -> ', jobTitle.value);
// console.log("jobLocation -> ", jobLocation.value);
console.log("-> itJobs ");
console.log("date ->>>>>", Date());
var search = exports.search = function(job, loc) {
    return function(nightmare) {
        nightmare
            // .goto("https://www.itjobs.pt/emprego?location=" + location + "&q=" + jobTitle.value + "&sort=date")
            .goto("https://www.itjobs.pt/emprego?q=" + job.value + "&location=" + loc)
            .wait()
            .evaluate(function() {
                let itJobs = [];
                $('.block.borderless').each(function() {
                    let job = {};
                    job["title"] = $(this).text();
                    // job["title"] = window.location.href ;
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