const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'views', 'user', 'home.ejs');
let content = fs.readFileSync(filePath, 'utf8');

// Corrected regex
// Matches: <% if (laptop.stockQuantity === 0 || laptop.status === 'Out of Stock') { %>
// Note the { before %>

const oldBadgeRegex = /<% if\s*\(laptop\.stockQuantity\s*===\s*0\s*\|\|\s*laptop\.status\s*===\s*'Out of Stock'\)\s*\{\s*%>\s*<div[^>]*>\s*Out of Stock\s*<\/div>\s*<% } else { %>([\s\S]*?)<% } %>/g;

const replacement = `<% if (laptop.stockQuantity > 0 && laptop.status !== 'Out of Stock') { %>$1<% } %>`;

let matchCount = (content.match(oldBadgeRegex) || []).length;
console.log(`Found ${matchCount} old badge matches.`);

if (matchCount > 0) {
    let newContent = content.replace(oldBadgeRegex, replacement);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log("Successfully removed old badges.");
} else {
    console.log("No matches found.");
}
