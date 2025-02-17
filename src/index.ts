import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js';
import { program } from 'commander';
import { version } from '../package.json';
import { askConfirmation, askImageFolderPath } from './lib/inquirer';
import { extractToExcel } from './lib/extractor';

clear();

(figlet as any)['parseFont']('Standard', standard);
console.log(
    chalk.hex('#8a8b58').bold(
        figlet.textSync('GeoExtractor', {
            font: 'Standard',
            horizontalLayout: 'full',
        }),
    ),
);
console.log('');
console.log('Geo Extractor CLI tool');
console.log('');

export interface IArgvOptions {
    argument?: string;
    path?: string;
}

let argvOptions: IArgvOptions = null;
const commands = () => {
    program.version(version).name('cli-geo-extractor').usage('[argument] [options]');

    program.parse(process.argv);
    argvOptions = program.opts();
    argvOptions.argument = program.processedArgs[0];
};

const folderPaths = [];

const recusiveAsking = async () => {
    const folderPath = await askImageFolderPath();
    folderPaths.push(folderPath);

    const rerun = await askConfirmation();
    return rerun;
};

let done = false;
const whileGenerator = function* () {
    while (!done) {
        yield true;
    }
};

const run = async () => {
    try {
        commands();

        for (let i of whileGenerator()) {
            console.log('');
            const rerun = await recusiveAsking();

            if (!rerun) {
                done = true;
            }
        }

        await extractToExcel(folderPaths);
    } catch (error) {
        console.error(chalk.red('Geo Extractor CLI tool failed'));
        console.error(error);
    }
};

run();
