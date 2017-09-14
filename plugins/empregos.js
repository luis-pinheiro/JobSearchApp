console.log("-> empregos ");
var exec = require("child_process").exec;
let cred = require('../credentials.json');
let loc = cred.loc;
let job = cred.job;
let remote = "";
if (cred.remote) {
    remote = "remote=1&";
};

    option value = "11" > Guarda < /option> <
    option value = "29" > Internacional < /option> <
    option value = "13" > Leiria < /option> <
    option value = "14" > Lisboa < /option> <
    option value = "15" > Madeira < /option> <
    option value = "12" > Portalegre < /option> <
    option value = "18" > Porto < /option> <
    option value = "20" > Santarém < /option> <
    option value = "17" > Setúbal < /option> <
    option value = "22" > Viana do Castelo < /option> <
        option value = "21" > Vila Real < /option> <
        option value = "16" > Viseu < /option>


// function to match location from index to empregos select options
switch (loc) {
    case 2:
        loc = 21;
        break;
    case 1:
        loc = 3;
        break;
    case 3:
        loc = 4;
        break;
    case 4:
        loc = 5;
        break;
    case 5:
        loc = 6;
        break;
    case 6:
        loc = 7;
        break;
    case 8:
        loc = 8;
        break;
    case 10:
        loc = 9;
        break;
    case 9:
        loc = 10;
        break;



    default:

}



var search = exports.search = function() {
    return function(nightmare) {
        nightmare
            .goto("http://www.empregos.org/")
            .insert()
            .evaluate(function() {
                let empregosJobs = [];
                $('.block.borderless').each(function() {
                    let job = {};
                    job["title"] = $(this).text();
                    let extractedLink = $(this).find("div.list-title > a").attr("href");
                    job["link"] = "https://www.itjobs.pt" + extractedLink;
                    job["logo"] = $(this).find("div.responsive-container > div > a > img").attr("src");
                    job["company"] = $(this).find("div.list-name > a").text();
                    job["location"] = $(this).find("div.list-details").text();
                    job["source"] = "itjobs.pt";
                    empregosJobs.push(job);
                });
                return empregosJobs;
            })
    };
};
