import { readFileSync } from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

function set_T_CNT() { }

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const schemaPath = path.join(__dirname, '../src/_schemas.json');
const _T_CNT = Object.freeze(set_T_CNT());

export function loadSchema(filePath) {
    let jsonStr = null;
    const jsonProps = ['path', 'entryPoint', 'files', 'data', 'html', 'css', 'js'];

    try {
        jsonStr = fs.readFileSync(filePath, 'utf8').trim();
        if (!jsonStr) {
            throw new Error('JSON file is empty');
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error(`File not found: ${filePath}`);
        }
        throw err;
    }

    const schema = JSON.parse(jsonStr, (key, value) => {
        if (key === '') return value;
        if (!jsonProps.includes(key)) {
            throw new Error(`Invalid key ${key} to the value ${value.values}`);
        }
        if (typeof value === 'string' && value.startsWith('^')) {
            try {
                return new RegExp(value);
            } catch (e) {
                return null;
            }
        }
        if (value === 'array') {
            return [];
        }
        return value;
    });

    if (!schema || Object.keys(schema).length === 0) {
        throw new Error('Schema parsed to empty object');
    }

    return schema;
}

/*
 * "Assigning any value other than a string, number, or boolean to a "
            "process.env property is deprecated. Please make sure to convert "
            "the "
            "value to a string before setting process.env with it.",
            "DEP0104"
            https://github.com/nodejs/node/blob/main/src/node_env_var.cc
            line 444
 */

export function checkEnvVarsNames() {
    const envVarsNames = Object.keys(process.env).filter((v) => v.match(/^APP_/));
    let checker = true;
    const envVarsQty = +process.env.ENV_TOT.match(/^\d+$/) ? +process.env.ENV_TOT : -1;

    if (envVarsQty !== _T_CNT || envVarsQty < 0) {
        throw new Error(
            `Environment variable count mismatch: Expected ${_T_CNT}, but found ${envVarsQty}${envVarsQty < 0 ? ' (invalid format)' : ''
            }. Please check ENV_TOT in your environment configuration.`
        );
    }

    if (envVarsNames.length > 0) {
        var d = [];
        for (const key of envVarsNames) {
            if (key.match(/_(PATH|HTML|CSS|JS|ENTRY)$/)) {
                continue;
            } else {
                checker = false;
                d.push(key);
            }
        }
    }
    return checker;
}
