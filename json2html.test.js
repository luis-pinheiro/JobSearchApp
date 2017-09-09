var json2html = require('node-json2html');
 
var transform = {'<>':'li','html':'${name} (${age})'};
    
var data = [
    {'name':'Bob','age':40},
    {'name':'Frank','age':15},
    {'name':'Bill','age':65},
    {'name':'Robert','age':24}
];
    
console.log( json2html.transform(data,transform) );