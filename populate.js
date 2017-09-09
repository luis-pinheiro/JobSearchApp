var jsonfile = require('jsonfile')
var path = require('path')
var file = path.join(__dirname, 'jobs.json');
var json2html = require('node-json2html');
const fs = require('fs')

var template = {"<>":"li","html":[
    {"<>":"a","href":"${link}","target":"_blank","html":[
        {"<>":"h3","html":"${title}"},
        {"<>":"h4","html":"${company}"},
        {"<>":"img","src":"${logo}","alt":"","html":""},
        {"<>":"p","html":"${location}"},
        {"<>":"p","html":"${source}"}
      ]}
  ]};



jsonfile.readFile(file, function(err, obj) {
	if (err) throw err;
  	obj = json2html.transform(obj,template)
  	fs.writeFile('jobs.html', obj, 'utf8', (err) => {
		if (err) throw err;
	})
})

// console.dir(jsonfile.readFileSync(file))


   
   
// console.log( json2html.transform(file,transform) );