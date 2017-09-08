const exec = require('child_process').exec

console.log('-> glassdoor')

let search = exports.search = function () {
  return function (nightmare) {
      nightmare
            .goto('https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=true&clickSource=searchBtn&typedKeyword=front+&sc.keyword=front+end+developer&locT=C&locId=3185896&jobType=')
            .wait()
            .evaluate(function () {
              let glassJobs = []

                $('#MainCol > div > ul > li').each(function () {
                  glassJob = {}
                    glassJob['title'] = $(this).find('div > div > div > a').text()
                    glassJob['company'] = $(this).find('div > div.flexbox.empLoc > div').text()
                    glassJob['source'] = 'glassdoor.com'
                    glassJob['date'] = $(this).find('div > div.flexbox.empLoc > span.showHH.nowrap > span').text()
                    glassJob['logo'] = $(this).find('div.logoWrap > a > span > img').attr('src')
                    
                    glassJobs.push(glassJob);
                })

                return glassJobs;

            })
    }
}













// ===========================================
let glassdoor = function () {
  console.log('==========================')
    console.log('= SCRAPING GLASSDOOR.COM =')
    console.log('==========================')
    return function (nightmare) {
      nightmare
            .goto('https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=true&clickSource=searchBtn&typedKeyword=front+&sc.keyword=front+end+developer&locT=C&locId=3185896&jobType=')
            .wait()
            .evaluate(function () {
              let glassJobs = []
                $('#MainCol > div > ul > li').each(function () {
                  gb = {}
                    gb['title'] = $(this).find('div > div > div > a').text()
                    gb['company'] = $(this).find('div > div.flexbox.empLoc > div').text()
                    gb['source'] = 'glassdoor.com';
                  gb['date'] = $(this).find('div > div.flexbox.empLoc > span.showHH.nowrap > span').text()
                    gb['logo'] = $(this).find('div.logoWrap > a > span > img').attr('src')

                    glassJobs.push(gb)
                })
                return glassJobs
            })
    }
}