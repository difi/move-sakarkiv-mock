let mocks = require('./src/mocks');
let soap = require('soap');
const express = require('express');
const util = require('util');
const fs = require('fs');

const morgan = require('morgan')

process.env.PORT = process.env.PORT || 8002;

let app = express();

app.use(morgan('combined'));

// Set up SOAP mocks:

let soapString = mocks
    .map((item) => `http://localhost:${process.env.PORT}${item.pathName}?wsdl`);

app.post('/api/send', (req, res) => {
    console.log(req);
    res.send({ express: 'Hello From Express' });
});

app.get('/', (req, res) => {
    res.send(`
            <html style="font-family: Comic Sans MS;">
                <body>
                    <h1>MOVE Mocks<h1>
                        
                        <h3>SOAP Mocks:<h3>
                            <ul> ${ soapString.map((url) => `<li><a href="${url}">${url}</a></li>`).join('') }</ul>
                </body>
            </html>
`);
});


// Fetch the WSDLs:
Promise.all(mocks.map((mock) => getData(mock.wsdlUrl, 'utf8')))
    .then((res) => {
        // Map the WSDL to the mock:
        mocks.forEach((wsdl, idx) => {
            mocks[idx].wsdl = res[idx];
        });

        // Set up the listeners:
        app.listen(process.env.PORT, () => {
            mocks.forEach((mock) => {
                soap.listen(app, mock.pathName, mock.service, mock.wsdl);
            })
        });
    });


function getData(fileName, type) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, type, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
}
