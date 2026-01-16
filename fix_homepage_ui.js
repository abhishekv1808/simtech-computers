const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'views', 'user', 'home.ejs');
let content = fs.readFileSync(filePath, 'utf8');

console.log("Read file length:", content.length);

// 1. Fix Titles: Replace line-clamp-2 min-h-[40px] with truncate
// We match the specific class string used in Apple, Dell, HP, Lenovo sections
const titleRegex = /class="font-bold text-gray-900 text-sm leading-tight mb-2 line-clamp-2 min-h-\[40px\]"/g;
const titleReplacement = 'class="font-bold text-gray-900 text-sm leading-tight mb-2 truncate"';

let titleMatches = (content.match(titleRegex) || []).length;
console.log(`Found ${titleMatches} title matches to replace.`);
content = content.replace(titleRegex, titleReplacement);

// 2. Fix Images: Replace max-h-full max-w-full with h-full w-full
// This forces the image to try to fill the container height (h-48) while maintaining aspect ratio via object-contain
const imageRegex = /class="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"/g;
const imageReplacement = 'class="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"';

let imageMatches = (content.match(imageRegex) || []).length;
console.log(`Found ${imageMatches} image matches to replace.`);
content = content.replace(imageRegex, imageReplacement);

// 3. Also check for the Desktop/Monitor section which might already use truncate but still has max-h-full
// The Desktop section title class: class="font-bold text-gray-900 text-sm leading-tight mb-2 truncate" (Already correct)
// The Image class is the same.

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully updated homepage UI layout.");
