import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js';
import { program } from 'commander';
import { version } from '../package.json';

clear();

(figlet as any)['parseFont']('Standard', standard);
console.log(
    chalk.hex('#247bc6').bold(
        figlet.textSync('NodeJs CLI', {
            font: 'Standard',
            horizontalLayout: 'full',
        })
    )
);
console.log('');
console.log('NodeJs CLI tool boilerplate');
console.log('');

export interface IArgvOptions {
    argument?: string;
    path?: string;
}

let argvOptions: IArgvOptions = null;
const commands = () => {
    program
        .version(version)
        .name('node-cli-boilerplate')
        .argument('<argument>', 'Example argument.')
        .usage('[argument] [options]');

    program.parse(process.argv);
    argvOptions = program.opts();
    argvOptions.argument = program.processedArgs[0];
};

const run = async () => {
    try {
        commands();

        // Place your code here

    } catch(error) {
        console.error(chalk.red('NodeCLI tool failed'));
        console.error(error);
    }
};

run();
