const fs = require('fs');
const path = require('path');

const sourceDir = 'C:/Users/Administrator/.gemini/antigravity/brain/904471c1-00ea-4924-8da6-096b84343f3b';
const destDir = path.join(__dirname, 'public', 'images', 'categories');

const mapping = {
    'desktop_pc_1768558911332.png': 'desktop.png',
    'workstation_pc_1768558925508.png': 'workstation.png',
    'server_rack_1768558939493.png': 'server.png',
    'computer_monitor_1768558957223.png': 'monitor.png',
    'networking_gear_1768558982366.png': 'networking.png',
    'computer_accessories_1768558996440.png': 'accessories.png',
    'repair_tools_1768559011907.png': 'repair.png'
};

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

Object.entries(mapping).forEach(([srcFile, destFile]) => {
    const srcPath = path.join(sourceDir, srcFile);
    const destPath = path.join(destDir, destFile);

    try {
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied ${srcFile} to ${destFile}`);
        } else {
            console.error(`Source file not found: ${srcPath}`);
        }
    } catch (err) {
        console.error(`Error copying ${srcFile}:`, err);
    }
});
