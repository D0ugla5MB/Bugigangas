import fs from 'fs';
import path from 'path';

const dirTarget = './apps/';

console.log(`Watching for changes in: ${dirTarget}`);

fs.watch(dirTarget, { persistent: true, recursive: true }, (eventType, fileName) => {
    if (fileName && eventType === 'rename') {
        const newDir = path.join(dirTarget, fileName);

        if (fs.existsSync(newDir) && fs.lstatSync(newDir).isDirectory()) {
            fs.writeFileSync(path.join(newDir, `${fileName}.js`), '');
            fs.writeFileSync(path.join(newDir, `${fileName}.html`), '');
            fs.writeFileSync(path.join(newDir, `${fileName}.css`), '');
            console.log(`Files created in: ${newDir}`);
        }
    }
});
