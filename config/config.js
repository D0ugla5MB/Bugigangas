import { readFileSync, createReadStream } from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import readline from 'readline';

dotenv.config({ path: '.env.preview' });

const _ENV = process.env;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const schemaPath = join(__dirname, '../src/_schemas.json');
const _T_CNT = Object.freeze(+_ENV.ENV_TOT);

export function loadSchema(filePath) {
    let jsonStr = null;
    const jsonProps = ['path', 'entryPoint', 'files', 'data', 'html', 'css', 'js'];

    try {
        jsonStr = readFileSync(filePath, 'utf8').trim();
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
    let validKeys = Object.keys(_ENV).filter((v) => v.match(/^APP_/));
    const envVarsQty = Number.isInteger(_T_CNT) && _T_CNT >= 0 ? _T_CNT : -1;

    if (envVarsQty === -1) {
        throw new Error(
            `Invalid _T_CNT value: Expected a non-negative integer, but got ${_T_CNT}.`
        );
    }

    for (let i = 0; i < validKeys.length; i++) {
        if (!validKeys[i].match(/_(PATH|HTML|CSS|JS|ENTRY)$/)) {
            validKeys.splice(i, 1);
        }
    }

    if (validKeys.length !== envVarsQty) {
        throw new Error(
            `Environment variable count mismatch: Expected ${envVarsQty}, ` +
            `but found ${validKeys.length} valid variables.`
        );
    }

    return validKeys;
}

export function getAppVars(keys) {
    return (
        (() => {
            const k = [];
            for (const key of keys) {
                if (typeof key !== 'string') {
                    continue;
                }
                if (!key.startsWith('APP_')) {
                    return new Error(`${key} does not start with APP_`);
                }
                if (key in _ENV) {
                    k.push(typeof _ENV[key] === 'string' ? _ENV[key] : 'INVALID KEY');
                }
            }
            return k;
        })()
    );
}

export function buildVars(envVars, schema) {
    const appsName = (() => {
        const hashedName = [];
        for (const ev of envVars) {
            ev.match(/_(PATH)$/);
            hashedName.push(ev.slice(1));
        }
        return hashedName;
    })();

    const appSchema = (() => {
        return appsName.map();
    })();

}
