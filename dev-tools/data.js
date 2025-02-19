import dotenv from 'dotenv';
import { readdir, readFile } from 'fs/promises';
import { extname } from 'path';

dotenv.config();

const dataFilesPath = process.env.DATA_WORDS_PATH;
const targetFiles = [];


async function loadFiles(dirPath) {
    try {
        const files = await readdir(dirPath);

        for (const f of files) {
            if (extname(f) === '.csv') {
                targetFiles.push({ name: `${dirPath}/${f}` });
            }
        }
    }
    catch (err) {
        console.error(err);
    }
}

async function readDataFiles() {
    try {
        for (const tf of targetFiles) {
            const data = await readFile(tf.name, 'utf-8');
            const lines = data.trim().split('\n');
            const headers = lines[0].split(',').map(h => h.trim());
            const rows = lines.slice(1).map(line => {
                const values = line.split(',').map(v => v.trim());
                return Object.fromEntries(headers.map((header, i) => [header, values[i]]));
            });
            console.log(rows);
        }
    }
    catch (err) {
        console.error(err);
    }
}

(async function run() {
    await loadFiles(dataFilesPath);
    await readDataFiles();
})();