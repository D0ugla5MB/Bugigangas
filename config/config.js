import { readFileSync } from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export function loadSchema(filePath) {
    const schema = JSON.parse(readFileSync(filePath, 'utf8'));
    return schema;
}

export function checkEnvVarsNames() {
    const envVarsNames = Object.keys(process.env).filter((v) => v.match(/^APP_/));
    let checker = true;
    const envVarsQty = +process.env.ENV_TOT;

    if (envVarsQty !== 20) {
        return envVarsQty;
    }

    if (envVarsNames.length > 0) {
        var d = [];
        for (const key of envVarsNames) {
            if (key.includes('_PATH') || key.includes('_HTML') || key.includes('_CSS') || key.includes('_JS') || key.includes('_ENTRY')) {
                continue;
            } else {
                checker = false;
                d.push(key);
            }
        }
    }
    return checker;
}
