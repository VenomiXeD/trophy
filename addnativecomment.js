const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(__dirname, 'out'); // Adjust this to your Lua build output directory

function addNativeComment(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const nativeComment = '--!native';

    if (!content.startsWith(nativeComment)) {
        const updatedContent = `${nativeComment}\n${content}`;
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Added --!native to ${filePath}`);
    }
}

function processDirectory(directory) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);

        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.lua')) {
            addNativeComment(fullPath);
        }
    });
}

processDirectory(buildDir);