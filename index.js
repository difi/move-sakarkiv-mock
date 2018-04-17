let mocks = require('./mocks');
let soap = require('soap');
const express = require('express');
const util = require('util');
const fs = require('fs');

let app = express();

// Set up SOAP mocks:

// Fetch the WSDLs:
Promise.all(mocks.map((mock) => getData(mock.wsdlUrl, 'utf8')))
    .then((res) => {
        // Map the WSDL to the mock:
        mocks.forEach((wsdl, idx) => {
            mocks[idx].wsdl = res[idx];
        });

        // Set up the listeners:
        app.listen(8001, () => {
            mocks.forEach((mock) => {
                soap.listen(app, mock.pathName, mock.service, mock.wsdl);
            })
        });
    });


function getData(fileName, type) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, type, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
}
