const { compile } = require('nexe')
const glob = require('glob');
const fs = require('fs');

const fileName = 'geoext';

compile({
    input: './bin/index.js',
    name: fileName,
    build: true,
    ico: './build/pin-point.png',
    verbose: false
}).then(() => {
    console.log('compile successfully!')

    return new Promise((resolve, reject) => {
        glob('./geoext*', null, (error, files) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(files);
        });
    });

}).then((files) => {
    files.forEach((file) => {
        const distPath = `./dist/${file}`;

        fs.renameSync(file, distPath);
    });

}).catch(error => {
    console.error(error);
});
