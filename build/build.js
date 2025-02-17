const { compile } = require('nexe');
const glob = require('glob');
const fs = require('fs');

const fileName = 'geoext';

compile({
    input: './bin/index.js',
    name: fileName,
    build: true,
    ico: './build/pin-point.png',
    verbose: true,
})
    .then(() => {
        console.log('compile successfully!');
    })
    .catch((error) => {
        console.error(error);
    });
