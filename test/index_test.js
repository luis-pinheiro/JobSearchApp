const Nightmare = require('nightmare');
const jquery = require('jquery');
const fs = require('fs');
const { csvFormat } = require('d3-dsv');
require('mocha-generators').install();



let jobs = [];

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
});

nightmare
    .goto('http://emprego.sapo.pt/emprego/ofertas.htm/pais/portugal/distrito/aveiro/palavras-chave/front+end+developer/categoria/informatica-e-tecnologias')
    // .inject('js', './node_modules/jquery/dist/jquery.min.js')
    // .wait()
    .evaluate(function() {
        let sapoJobs = [];
        $('tr').each(function() {
            sapo = {};
            sapo["title"] = $(this).find("th > a").text();
            sapo["company"] = $(this).find("td.col2 > strong > span").text();
            sapo["source"] = "sapo.pt";
            sapo["date"] = $(this).find("td.col1 > span").text();
            sapoJobs.push(sapo);
        });
        return sapoJobs;
    })
    .then(nightmare.end());
