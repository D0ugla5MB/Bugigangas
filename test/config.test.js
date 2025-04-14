import { selectEnvVars, loadSchema, buildAppVars, sortAppVars } from '../config/config.js';

import { readFileSync, createReadStream } from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const schemaPath = join(__dirname, '../src/_schemas.json');



test('sortAppVars', () => { 
    const select = selectEnvVars();
    const sorted = sortAppVars(selectEnvVars());
    
    console.log(select);
    console.log(sorted);
});
