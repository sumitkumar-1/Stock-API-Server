const path = require('path');
const url = require('url');
const fs = require('fs');

var web;
module.exports = web = {
    /* web.displayJson(response, html) - return a 200 http request with json */
    displayJson: function(response, jsondata) {
        response.writeHead(200, {'Content-Type': 'application/json'});
        if (jsondata) {
            response.end(JSON.stringify(jsondata));
        } else {
            response.end();
        }
    },
    /* web.permissiveHeaders - allow cross origin requests */
    permissiveHeaders: function (response) {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        response.setHeader('Access-Control-Allow-Credentials', true);
    }
}