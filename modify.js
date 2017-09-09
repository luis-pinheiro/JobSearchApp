const jsonfile = require('jsonfile')
const fs = require('fs')
const path = require('path')
let newFile;
let file = fs.readFile(__dirname + '/jobsearch.json', 'utf8', (err, data) => {
	if (err) throw err;
	data = data.replace(/\\n+/g, ' ');
	data = data.replace(/\s\s/g, '');
	data = "[" + data + "]";
  	newFile = data;
	console.log(newFile);
	fs.writeFile('jobs.json', data, (err) => {
		if (err) throw err;
	})
}); 


 // console.log(newFile)
