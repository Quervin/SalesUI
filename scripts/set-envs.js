const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();

const targetPath = './src/environments';

const environment = '/environment.ts'

const envFileContent = `
export const environment = {
    url_base: " ${ process.env['URL_BASE'] }"
};
`;

mkdirSync(targetPath, { recursive: true });

writeFileSync( targetPath + environment, envFileContent );
