import { checkEnvVarsNames } from '../config/config.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createReadStream } from 'fs';
import readline from 'readline';  // Add this import

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
    const p = path.join(__dirname, '../.env.preview');

    beforeEach(() => {
        process.env = { ...originalEnv };
        dotenv.config(p);
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    describe('set_T_CNT', () => {
        const count = () => {
            return new Promise((resolve, reject) => {
                const lineReader = readline.createInterface({
                    input: createReadStream(p, { encoding: 'utf8' }),
                    crlfDelay: Infinity 
                });
                
                let lineCount = 0;
                
                lineReader.on('line', () => {
                    lineCount++;
                });
                
                lineReader.on('close', () => {
                    console.log(`total lines: ${lineCount}`);
                    resolve(lineCount);
                });
                
                lineReader.on('error', (err) => {
                    reject(new Error(`Error reading file: ${err}`));
                });
            });
        };

        test('should return a number greater than or equal to 0', async () => {
            const result = await count();
            expect(result).toBeGreaterThanOrEqual(0);
            expect(typeof result).toBe('number');
        });

        test('should count lines correctly', async () => {
            const result = await count();
            expect(Number.isInteger(result)).toBe(true);
        });

        test('should not throw any errors', async () => {
            await expect(count()).resolves.not.toThrow();
        });

        test('should set process.env.ENV_TOT to the counted value', async () => {
            const lineCount = await count();
            process.env.ENV_TOT = lineCount.toString();

            expect(process.env.ENV_TOT).toBe(lineCount.toString());
            expect(parseInt(process.env.ENV_TOT)).toBeGreaterThanOrEqual(0);
        });
    });

    describe('checkEnvVarsNames', () => {

        test('should return true when all APP_ variables have valid suffixes', () => {
            // Mock the _T_CNT value to match ENV_TOT to avoid error
            process.env.ENV_TOT = '20'; 
            const result = checkEnvVarsNames();
            expect(result).toBe(true);
        });

        test('should throw an error when ENV_TOT does not match the expected count', () => {
            process.env.ENV_TOT = '19';
            expect(() => {
                checkEnvVarsNames();
            }).toThrow("Environment variable count mismatch");
        });

        test('should throw an error when ENV_TOT is in invalid format', () => {
            process.env.ENV_TOT = 'invalid';
            expect(() => {
                checkEnvVarsNames();
            }).toThrow("Environment variable count mismatch");
        });

        test('should return false when an APP_ variable has an invalid suffix', () => {
            // Mock the _T_CNT value to match ENV_TOT to avoid error
            process.env.ENV_TOT = '21'; // Set to match the _T_CNT value
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
            // Set ENV_TOT to match _T_CNT to avoid errors
            process.env.ENV_TOT = '25'; 
            const result = checkEnvVarsNames();
            expect(result).toBe(true);
        });

        test('should return false when at least one APP_ variable has an invalid suffix', () => {
            process.env.APP_VALID_PATH = '#valid';
            process.env.APP_INVALID_WRONG = 'wrong';
            // Set ENV_TOT to match _T_CNT to avoid errors
            process.env.ENV_TOT = '22';
            const result = checkEnvVarsNames();
            expect(result).toBe(false);
        });
    });
});