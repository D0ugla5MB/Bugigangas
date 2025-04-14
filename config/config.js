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

export function loadSchema(appData) {
 


    return (() => {
      
        return { [name]: validated };
    })();
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

export function selectEnvVars() {
    const envVarsQty = Number.isInteger(_T_CNT) && _T_CNT >= 0 ? _T_CNT : -1;
    if (envVarsQty <= 0) {
        throw new Error(
            `Invalid _T_CNT value: Expected an integer greater than zero, but got ${_T_CNT}.`
        );
    }

    let validKeys = Object.keys(_ENV).filter((v) => v.match(/^APP_/));

    for (let i = 0; i < validKeys.length; i++) {
        if (!validKeys[i].match(/_(PATH|HTML|CSS|JS|ENTRY)$/)) {
            validKeys.splice(i, 1);
        }
    }

    return validKeys;
}

export function sortAppVars(keys) {
    const apps = new Map();

    for (const key of keys) {
        const [pre, name, suffix] = key.split('_');
        const appProps = apps.get(name) || new Map();

        if (!apps.has(name)) {
            appProps.set('DATA', []);
        }
        if (typeof _ENV[key] === 'string') {
            appProps.set(suffix, _ENV[key]);
            apps.set(name, appProps);
        }
    }

    return apps;
}

export function buildAppVars(sortedApps) {
    const baseName = /^[a-z]$/;

    const appNames = [...sortedApps.keys()];
    for (let i = appNames.length - 1; i >= 0; i--) {
        const n = appNames[i];
        if (!baseName.test(n)) {
            sortedApps.delete(n);
            appNames.splice(i, 1); 
        }
    }
    const baseProps = {
        path: (value) => /^#[a-zA-Z0-9/_]+$/.test(value) ? value : "",
        entryPoint: (value) => /^[a-zA-Z0-9_]+$/.test(value) ? value : "",
        html: (value) => /^[a-zA-Z0-9_]+\.html$/.test(value) ? value : "",
        css: (value) => /^[a-zA-Z0-9_]+\.css$/.test(value) ? value : "",
        js: (value) => /^[a-zA-Z0-9_]+\.js$/.test(value) ? value : "",
        data: (value) => Array.isArray(value) ? value : []
    };

    return sortedApps;
}
