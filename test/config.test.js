import { checkEnvVarsNames, loadSchema, buildVars } from '../config/config.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Config utility functions', () => {
    jest.mock('fs');

    const originalEnv = process.env;
    const p = path.join(__dirname, '../.env.preview');

    beforeEach(() => {
        process.env = { ...originalEnv };
        dotenv.config(p);
    });

    afterAll(() => {
        process.env = originalEnv;
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

    
    describe('loadSchema', () => {
        const tempPath = path.join(__dirname, 'test-schema.json');
        
        beforeEach(() => {
            jest.clearAllMocks();
        });
        
        afterEach(() => {
            jest.restoreAllMocks();
        });
        
        test('should load and parse valid schema file', () => {
            const mockSchema = {
                testApp: {
                    path: '/test-path',
                    entryPoint: 'testInit',
                    files: {
                        html: 'test.html',
                        css: 'test.css',
                        js: 'test.js'
                    }
                }
            };
            
            fs.readFileSync.mockReturnValue(JSON.stringify(mockSchema));
            
            const result = loadSchema(tempPath);
            expect(result).toEqual(mockSchema);
            expect(fs.readFileSync).toHaveBeenCalledWith(tempPath, 'utf8');
        });
        
        test('should convert string patterns starting with ^ to RegExp objects', () => {
            const mockSchema = {
                testApp: {
                    path: '^/[a-z-]+$',
                    entryPoint: 'testInit'
                }
            };
            
            fs.readFileSync.mockReturnValue(JSON.stringify(mockSchema));
            
            const result = loadSchema(tempPath);
            expect(result.testApp.path instanceof RegExp).toBe(true);
            expect(result.testApp.path.test('/valid-path')).toBe(true);
            expect(result.testApp.path.test('123')).toBe(false);
            expect(result.testApp.entryPoint).toBe('testInit');
        });
        
        test('should convert "array" value to empty array', () => {
            const mockSchema = {
                testApp: {
                    data: 'array'
                }
            };
            
            fs.readFileSync.mockReturnValue(JSON.stringify(mockSchema));
            
            const result = loadSchema(tempPath);
            expect(Array.isArray(result.testApp.data)).toBe(true);
            expect(result.testApp.data.length).toBe(0);
        });
        
        test('should throw error for invalid key', () => {
            const mockSchema = {
                testApp: {
                    invalidKey: 'value'
                }
            };
            
            fs.readFileSync.mockReturnValue(JSON.stringify(mockSchema));
            
            expect(() => {
                loadSchema(tempPath);
            }).toThrow('Invalid key');
        });
        
        test('should throw error for empty file', () => {
            fs.readFileSync.mockReturnValue('  ');
            
            expect(() => {
                loadSchema(tempPath);
            }).toThrow('JSON file is empty');
        });
        
        test('should throw error for file not found', () => {
            const error = new Error('File not found');
            error.code = 'ENOENT';
            fs.readFileSync.mockImplementation(() => {
                throw error;
            });
            
            expect(() => {
                loadSchema(tempPath);
            }).toThrow('File not found');
        });
        
        test('should throw error for empty schema object', () => {
            fs.readFileSync.mockReturnValue('{}');
            
            expect(() => {
                loadSchema(tempPath);
            }).toThrow('Schema parsed to empty object');
        });
        
        test('should handle malformed JSON', () => {
            fs.readFileSync.mockReturnValue('{ "bad": "json"');
            
            expect(() => {
                loadSchema(tempPath);
            }).toThrow(SyntaxError);
        });
        
        test('should handle nested structure with valid properties', () => {
            const mockSchema = {
                app: {
                    path: '/app1',
                    files: {
                        html: 'app1.html',
                        css: 'app1.css',
                        js: 'app1.js'
                    }
                }
            };
            
            fs.readFileSync.mockReturnValue(JSON.stringify(mockSchema));
            
            const result = loadSchema(tempPath);
            expect(Object.keys(result).length).toBe(2);
            expect(result.app1.files.html).toBe('app1.html');
            expect(Array.isArray(result.app2.data)).toBe(true);
        });
        
        test('should return null for invalid RegExp pattern', () => {
            const mockSchema = {
                testApp: {
                    path: '^[' // Invalid regex pattern
                }
            };
            
            fs.readFileSync.mockReturnValue(JSON.stringify(mockSchema));
            
            const result = loadSchema(tempPath);
            expect(result.testApp.path).toBeNull();
        });
    });

    describe('buildVars', () => {
        let mockSchema;
        let mockEnvVars;

        beforeEach(() => {
            mockSchema = {
                myApp: {
                    path: '/my-app',
                    entryPoint: 'init',
                    files: {
                        html: 'index.html',
                        css: 'styles.css',
                        js: 'app.js'
                    }
                }
            };

            mockEnvVars = ['APP_MYAPP_PATH', 'APP_MYAPP_ENTRY', 'APP_MYAPP_HTML', 'APP_MYAPP_CSS', 'APP_MYAPP_JS'];

            process.env.APP_MYAPP_PATH = '/my-app';
            process.env.APP_MYAPP_ENTRY = 'init';
            process.env.APP_MYAPP_HTML = 'index.html';
            process.env.APP_MYAPP_CSS = 'styles.css';
            process.env.APP_MYAPP_JS = 'app.js';
        });

        afterEach(() => {
            delete process.env.APP_MYAPP_PATH;
            delete process.env.APP_MYAPP_ENTRY;
            delete process.env.APP_MYAPP_HTML;
            delete process.env.APP_MYAPP_CSS;
            delete process.env.APP_MYAPP_JS;
        });

        test('should build config object from environment variables', () => {
            const result = buildVars(mockEnvVars, mockSchema);
            expect(result).toEqual({
                myApp: {
                    path: '/my-app',
                    entryPoint: 'init',
                    files: {
                        html: 'index.html',
                        css: 'styles.css',
                        js: 'app.js'
                    }
                }
            });
        });

        test('should handle missing environment variables', () => {
            delete process.env.APP_MYAPP_CSS;
            const incompleteEnvVars = mockEnvVars.filter(v => v !== 'APP_MYAPP_CSS');

            expect(() => {
                buildVars(incompleteEnvVars, mockSchema);
            }).toThrow(/missing.*variable/i);
        });

        test('should validate environment variables against schema', () => {
            mockSchema.myApp.path = /^\/[a-z-]+$/;
            process.env.APP_MYAPP_PATH = '123';

            expect(() => {
                buildVars(mockEnvVars, mockSchema);
            }).toThrow(/invalid.*format/i);
        });

        test('should return empty object when no environment variables are provided', () => {
            const result = buildVars([], {});
            expect(result).toEqual({});
        });

        test('should properly transform app name from env var to config key', () => {
            process.env.APP_MY_APP_PATH = '/transformed-app';
            mockEnvVars = ['APP_MY_APP_PATH'];
            const customSchema = {
                myApp: { path: '/default' }
            };
            const result = buildVars(mockEnvVars, customSchema);
            expect(result).toHaveProperty('myApp.path', '/transformed-app');
        });
    });
describe('loadSchema', () => {
    const tempPath = path.join(__dirname, 'test-schema.json');
    
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    afterEach(() => {
        jest.restoreAllMocks();
    });
    
    test('should load and parse valid schema file', () => {
        const mockSchema = {
            testApp: {
                path: '/test-path',
                entryPoint: 'testInit',
                files: {
                    html: 'test.html',
                    css: 'test.css',
                    js: 'test.js'
                }
            }
        };
        
        fs.readFileSync.mockReturnValue(JSON.stringify(mockSchema));
        
        const result = loadSchema(tempPath);
        expect(result).toEqual(mockSchema);
        expect(fs.readFileSync).toHaveBeenCalledWith(tempPath, 'utf8');
    });
    
    test('should convert string patterns starting with ^ to RegExp objects', () => {
        const mockSchema = {
            testApp: {
                path: '^/[a-z-]+$',
                entryPoint: 'testInit'
            }
        };
        
        fs.readFileSync.mockReturnValue(JSON.stringify(mockSchema));
        
        const result = loadSchema(tempPath);
        expect(result.testApp.path instanceof RegExp).toBe(true);
        expect(result.testApp.path.test('/valid-path')).toBe(true);
        expect(result.testApp.path.test('123')).toBe(false);
        expect(result.testApp.entryPoint).toBe('testInit');
    });
    
    test('should convert "array" value to empty array', () => {
        const mockSchema = {
            testApp: {
                data: 'array'
            }
        };
        
        fs.readFileSync.mockReturnValue(JSON.stringify(mockSchema));
        
        const result = loadSchema(tempPath);
        expect(Array.isArray(result.testApp.data)).toBe(true);
        expect(result.testApp.data.length).toBe(0);
    });
    
    test('should throw error for invalid key', () => {
        const mockSchema = {
            testApp: {
                invalidKey: 'value'
            }
        };
        
        fs.readFileSync.mockReturnValue(JSON.stringify(mockSchema));
        
        expect(() => {
            loadSchema(tempPath);
        }).toThrow(/Invalid key/);
    });
    
    test('should throw error for empty file', () => {
        fs.readFileSync.mockReturnValue('  ');
        
        expect(() => {
            loadSchema(tempPath);
        }).toThrow('JSON file is empty');
    });
    
    test('should throw error for file not found', () => {
        const error = new Error('File not found');
        error.code = 'ENOENT';
        fs.readFileSync.mockImplementation(() => {
            throw error;
        });
        
        expect(() => {
            loadSchema(tempPath);
        }).toThrow('File not found');
    });
    
    test('should throw error for empty schema object', () => {
        fs.readFileSync.mockReturnValue('{}');
        
        expect(() => {
            loadSchema(tempPath);
        }).toThrow('Schema parsed to empty object');
    });
    
    test('should handle malformed JSON', () => {
        fs.readFileSync.mockReturnValue('{ "bad": "json"');
        
        expect(() => {
            loadSchema(tempPath);
        }).toThrow(SyntaxError);
    });
    
    test('should handle nested structure with valid properties', () => {
        const mockSchema = {
            app1: {
                path: '/app1',
                files: {
                    html: 'app1.html',
                    css: 'app1.css',
                    js: 'app1.js'
                }
            },
            app2: {
                data: 'array'
            }
        };
        
        fs.readFileSync.mockReturnValue(JSON.stringify(mockSchema));
        
        const result = loadSchema(tempPath);
        expect(Object.keys(result).length).toBe(2);
        expect(result.app1.files.html).toBe('app1.html');
        expect(Array.isArray(result.app2.data)).toBe(true);
    });
    
    test('should return null for invalid RegExp pattern', () => {
        const mockSchema = {
            testApp: {
                path: '^[' // Invalid regex pattern
            }
        };
        
        fs.readFileSync.mockReturnValue(JSON.stringify(mockSchema));
        
        const result = loadSchema(tempPath);
        expect(result.testApp.path).toBeNull();
    });
});
});