import { checkEnvVarsNames, loadSchema, buildVars, getAppVars } from '../config/config.js';

import { readFileSync, createReadStream } from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const schemaPath = join(__dirname, '../src/_schemas.json');

test('checkEnvVarsNames', () => {
    console.log(getAppVars(checkEnvVarsNames()));
})

test('loadSchema', () => {
    console.log(loadSchema(schemaPath));
});