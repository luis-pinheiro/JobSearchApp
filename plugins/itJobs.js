var exec = require("child_process").exec;
console.log("-> itJobs ");
var search = exports.search = function() {
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
    };
};
