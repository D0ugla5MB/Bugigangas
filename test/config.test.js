import { checkEnvVarsNames } from '../config/config.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function rmMatched(array, item) {
    let writeIndex = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== item) {
            array[writeIndex++] = array[i]; 
        }
    }
    array.length = writeIndex; 
}

describe('Config utility functions', () => {
    const originalEnv = process.env;
    
    beforeEach(() => {
        process.env = { ...originalEnv };
        dotenv.config({ path: path.join(__dirname, '../.env.preview') });
    });

    afterAll(() => {
        process.env = originalEnv;
    });
    
    describe('set_T_CNT', () => {
        const envVarsNames = Object.keys(process.env).filter((v) => v.match(/^APP_/));
        let checker = true;

        if (envVarsNames.length > 0) {
            for (const key of envVarsNames) {
                if (key.match(/_(PATH|HTML|CSS|JS|ENTRY)$/)) {
                    continue;
                } else {
                    checker = false;
                }
            }
        }
    });
    
    describe('checkEnvVarsNames', () => {
        
        test('should return true when all APP_ variables have valid suffixes', () => {
            const result = checkEnvVarsNames();
            expect(result).toBe(true);
        });

        test('should return the ENV_TOT value when it does not match the expected count', () => {
            process.env.ENV_TOT = '19';
            const result = checkEnvVarsNames();
            expect(result).toBe(19);
        });

        test('should return false when an APP_ variable has an invalid suffix', () => {
            process.env.APP_INVALID_SUFFIX = 'invalid';
            const result = checkEnvVarsNames();
            expect(result).toBe(false);
        });

        test('should return true when multiple APP_ variables all have valid suffixes', () => {
            process.env.APP_TEST_PATH = '#test';
            process.env.APP_TEST_HTML = '/test.html';
            process.env.APP_TEST_CSS = '/test.css';
            process.env.APP_TEST_JS = '/test.js';
            process.env.APP_TEST_ENTRY = 'testFunction';
            process.env.ENV_TOT = '25'; // Update the count
            const result = checkEnvVarsNames();
            expect(result).toBe(true);
        });

        test('should return false when at least one APP_ variable has an invalid suffix', () => {
            process.env.APP_VALID_PATH = '#valid';
            process.env.APP_INVALID_WRONG = 'wrong';
            process.env.ENV_TOT = '22'; // Update the count
            const result = checkEnvVarsNames();
            expect(result).toBe(false);
        });
    });
});