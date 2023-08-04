const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();

const targetPath = './src/environments';

const environments = '/environments.ts'

const envFileContent = `
export const environments = {
    url_base: " ${ process.env['URL_BASE'] }"
};
`;

mkdirSync(targetPath, { recursive: true });

writeFileSync( targetPath + environments, envFileContent );
