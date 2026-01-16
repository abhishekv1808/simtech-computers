const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, 'views', 'user', 'home.ejs');
let content = fs.readFileSync(homePath, 'utf8');

// Regex to find the images in the category section and add rounded-xl class
// We look for the specific class string we added earlier
const targetClass = 'max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300';
const newClass = 'max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300 rounded-xl';

if (content.includes(targetClass)) {
    // Replace all occurrences
    content = content.split(targetClass).join(newClass);
    fs.writeFileSync(homePath, content, 'utf8');
    console.log('Successfully added rounded-xl to category images');
} else {
    console.log('Target class string not found');
}
