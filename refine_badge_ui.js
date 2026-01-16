const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'views', 'user', 'home.ejs');
let content = fs.readFileSync(filePath, 'utf8');

console.log("Read file length:", content.length);

// 1. Remove Old Badge from Header
// We look for the block we added previously.
// Pattern:
// <% if (laptop.stockQuantity === 0 || laptop.status === 'Out of Stock') { %>
//     <div class="bg-red-600 ...">Out of Stock</div>
// <% } else { %>
//     <div class="bg-gray-900 ...">RG COMPUTERS ASSURED</div>
// <% } %>

// We want to replace it with just:
// <% if (laptop.stockQuantity > 0 && laptop.status !== 'Out of Stock') { %>
//     <div class="bg-gray-900 ...">RG COMPUTERS ASSURED</div>
// <% } %>

const oldBadgeRegex = /<% if \(laptop\.stockQuantity === 0 \|\| laptop\.status === 'Out of Stock'\) %>\s+<div class="bg-red-600[^"]+[^>]+>\s+Out of Stock\s+<\/div>\s+<% } else { %>(\s+<div class="bg-gray-900[^"]+[^>]+>\s+<i class="fas fa-check-circle[^"]+[^>]+><\/i>\s+<span>RG COMPUTERS ASSURED<\/span>\s+<\/div>\s+)<% } %>/g;

const headerReplacement = `<% if (laptop.stockQuantity > 0 && laptop.status !== 'Out of Stock') { %>$1<% } %>`;

// 2. Add New Badge to Image Container
// Pattern:
// <div
//     class="relative w-full h-48 mb-3 flex items-center justify-center bg-gray-50 rounded-lg p-4 overflow-hidden">
//     <img ...>

// We want to insert the badge inside this div, before the img.

const imageContainerRegex = /(<div\s+class="relative w-full h-48 mb-3 flex items-center justify-center bg-gray-50 rounded-lg p-4 overflow-hidden">)/g;

const newBadgeHtml = `
                                                <% if (laptop.stockQuantity === 0 || laptop.status === 'Out of Stock') { %>
                                                    <div class="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                                                        <div class="bg-red-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg transform -rotate-2">
                                                            Out of Stock
                                                        </div>
                                                    </div>
                                                <% } %>`;

const imageReplacement = `$1${newBadgeHtml}`;

let matchCountOld = (content.match(oldBadgeRegex) || []).length;
let matchCountImage = (content.match(imageContainerRegex) || []).length;

console.log(`Found ${matchCountOld} old badge matches and ${matchCountImage} image container matches.`);

let newContent = content.replace(oldBadgeRegex, headerReplacement);
newContent = newContent.replace(imageContainerRegex, imageReplacement);

if (content === newContent) {
    console.log("No changes made.");
} else {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log("Successfully updated home.ejs");
}
