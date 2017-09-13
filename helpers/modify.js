const jsonfile = require('jsonfile')
const fs = require('fs')
const path = require('path')
let newFile;
var exec = require('child_process').exec;
var json2html = require('node-json2html');
/*
var template = {"<>":"li","id":"${id}","html":[
        {"<>":"a","href":"${link}","html":""},
        {"<>":"div","class":"logoWrap","html":[
            {"<>":"img","src":"${logo}","alt":"","html":""}
          ]},
        {"<>":"div","html":[
            {"<>":"div","class":"flexbox","html":[
                {"<>":"p","html":"${title}"},
                {"<>":"div","html":""},
                {"<>":"div","class":"flexbox empLoc","html":[
                    {"<>":"div","html":[
                        {"<>":"span","class":"subtle loc","html":"${location}"}
                      ]},
                    {"<>":"span","class":"date","html":[
                        {"<>":"span","class":"minor","html":"${date}"}
                      ]}
                  ]},
                {"<>":"div","class":"flexbox","html":[
                    {"<>":"div","html":"${source}"}
                  ]}
              ]}
          ]}
      ]};
*/


var template = {"<>":"li","html":[
        {"<>":"a","href":"${link}","target":"_blank","html":[
           
            {"<>":"h6","html":"${title}"},
              {"<>":"img","src":"${logo}","alt":"","html":""},
            {"<>":"p","html":"${company}"},
            {"<>":"p","html":"${location}"},
            {"<>":"p","class":"hidden" ,"html":"${source}"},
             {"<>":"p","html":"${date}"},
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