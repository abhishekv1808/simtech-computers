const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(f => {
            let dirPath = path.join(dir, f);
            let isDirectory = fs.statSync(dirPath).isDirectory();
            isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
        });
    }
}

const viewsDir = path.join(__dirname, 'views');
console.log(`Scanning directory: ${viewsDir}`);

walkDir(viewsDir, (filePath) => {
    if (filePath.endsWith('.ejs')) {
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            // Replace corrupted sequence â‚¹ and actual symbol if present
            let newContent = content.replace(/â‚¹/g, '&#8377;').replace(/₹/g, '&#8377;');

            if (content !== newContent) {
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`Updated ${filePath}`);
            }
        } catch (err) {
            console.error(`Error processing ${filePath}: ${err.message}`);
        }
    }
});
