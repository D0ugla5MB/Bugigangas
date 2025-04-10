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

export function selectEnvVars() {
    let validKeys = Object.keys(_ENV).filter((v) => v.match(/^APP_/));
    const envVarsQty = Number.isInteger(_T_CNT) && _T_CNT >= 0 ? _T_CNT : -1;

    if (envVarsQty <= 0) {
        throw new Error(
            `Invalid _T_CNT value: Expected an integer greater than zero, but got ${_T_CNT}.`
        );
    }

    for (let i = 0; i < validKeys.length; i++) {
        if (!validKeys[i].match(/_(PATH|HTML|CSS|JS|ENTRY)$/)) {
            validKeys.splice(i, 1);
        }
    }

    return validKeys;
}

export function sortAppVars(keys) {
    return (() => {
        const apps = new Map();

        for (const key of keys) {
            const [pre, name, suffix] = key.split('_');
            const appProps = apps.get(name) || new Map();

            if (typeof _ENV[key] === 'string') {
                appProps.set(suffix, _ENV[key]);
                apps.set(name, appProps);
            }
        }

        return Array.from(apps.entries())
            .map(([name, props]) => ({
                [name]: Object.fromEntries(props)
            }));
    })();
}

export function buildVars(envVars, schema) {
    const appConfigs = sortAppVars(envVars);
    
    return (() => {
        const apps = new Map();

        for (const config of appConfigs) {
            const [appName] = Object.keys(config);
            const appProps = config[appName];
            
            try {
                const requiredProps = ['PATH', 'HTML', 'CSS', 'JS', 'ENTRY'];
                
                const missingProps = requiredProps.filter(prop => !(prop in appProps));
                if (missingProps.length > 0) {
                    throw new Error(
                        `Missing required properties for app ${appName}: ${missingProps.join(', ')}`
                    );
                }

                const paths = {
                    html: appProps.HTML,
                    css: appProps.CSS,
                    js: appProps.JS
                };

                const invalidPaths = Object.entries(paths)
                    .filter(([key, path]) => path && !schema[key]?.test(path))
                    .map(([key]) => key.toUpperCase());

                if (invalidPaths.length > 0) {
                    throw new Error(
                        `Invalid paths for ${appName}: ${invalidPaths.join(', ')}`
                    );
                }

                const appObject = {
                    path: appProps.PATH,
                    entryPoint: appProps.ENTRY,
                    files: {
                        html: appProps.HTML,
                        css: appProps.CSS,
                        js: appProps.JS
                    }
                };

                apps.set(appName, appObject);

            } catch (err) {
                console.error(`Error processing app ${appName}:`, err.message);
                continue;
            }
        }

        return Array.from(apps.entries())
            .map(([name, config]) => ({ [name]: config }));
    })();
}
