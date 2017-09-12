const jsonfile = require('jsonfile')
const fs = require('fs')
const path = require('path')
let newFile;
var exec = require('child_process').exec;
var json2html = require('node-json2html');

var template = {"<>":"li","html":[
        {"<>":"a","href":"${link}","target":"_blank","html":[
            {"<>":"img","src":"${logo}","alt":"","html":""},
            {"<>":"h6","html":"${title}"},
            {"<>":"p","html":"${company}"},
            {"<>":"p","html":"${location}"},
            {"<>":"p","html":"${source}"}
          ]}
      ]};

let modify = exports.modify = function(data) {
        console.log('Mofify -> ', data)
        console.log('data length -> ', data[0].length)
        data = JSON.stringify(data);
        data = data.replace(/[[^\]]|[[\]]]/gm, " ");
        data = data.replace(/\\n+/g, ' ');
        data = data.replace(/\s\s/g, '');
        data = "[" + data + "]";
        // data = data.toString();
        

        data = json2html.transform(data, template);

        fs.writeFile('data.html', data, 'utf8', (err) => {
                if (err) throw err;
        })
        
        console.log('data type -> ', typeof data)
        console.log('data-> ', data)
        
        return data;
        // newData = JSON.parse()
        
        
        
        
        // fs.writeFile('jobs.html', newData, 'utf8', (err) => {
        //         if (err) throw err;
        // })
};