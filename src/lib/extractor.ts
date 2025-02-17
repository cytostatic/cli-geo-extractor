import { join, extname, basename } from 'path';
import { readdirSync, readFileSync, lstatSync } from 'fs';
import { homedir } from 'os';
import * as exifReader from 'exifreader';
import xlsx from 'json-as-xlsx';
import dateFormat from 'dateformat';
import chalk from 'chalk';

const columns = [
    { label: 'Dateiname', value: 'file' },
    { label: 'Breitengrad', value: 'lat' },
    { label: 'Längengrad', value: 'lon' },
];

const data = [];
export const extractToExcel = async (paths: string[]) => {
    for (const fdPath of paths) {
        if (!lstatSync(fdPath).isDirectory()) {
            console.error('The path is not a directory: ', fdPath);
            continue;
        }

        const sheetData = {
            sheet: basename(fdPath),
            columns,
            content: [],
        };
        const files = readdirSync(fdPath);

        for (const file of files) {
            if (extname(file) !== '.jpeg') {
                continue;
            }
            const filePath = join(fdPath, file);
            const buffer = readFileSync(filePath);
            const tags = exifReader.load(buffer);
            if (!tags.GPSLatitude) {
                continue;
            }
            const lat = tags.GPSLatitude.description;
            const lon = tags.GPSLongitude.description;
            sheetData.content.push({
                file,
                lat: lat.toString(),
                lon: lon.toString(),
            });
        }

        data.push(sheetData);
    }

    const outputPath = join(homedir(), 'Downloads');
    const settings = {
        fileName: join(outputPath, `GeoDaten-${dateFormat(new Date(), 'dd.mm.yyyy')}`), // Name of the resulting spreadsheet
        extraLength: 3, // A bigger number means that columns will be wider
        writeMode: 'writeFile', // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    };
    xlsx(data, settings);

    console.log('');
    console.log(chalk.green(`Excel file created successfully in ${outputPath}`));
};
