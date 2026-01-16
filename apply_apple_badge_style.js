const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'views', 'user', 'home.ejs');
let content = fs.readFileSync(filePath, 'utf8');

// Regex to match the current badge block (centered style)
// Captures the variable name (laptop, desktop, monitor) in group 1
// Matches flexible whitespace and newlines
const targetRegex = /<% if\s*\(([a-zA-Z0-9]+)\.stockQuantity\s*===\s*0\s*\|\|\s*\1\.status\s*===\s*'Out of Stock'\s*\)\s*\{\s*%>\s*<div[\s\S]*?Out of Stock[\s\S]*?<\/div>\s*<\/div>\s*<% } %>/g;

// Replacement using the Apple style and the captured variable name
const replacement = `<% if ($1.stockQuantity===0 || $1.status==='Out of Stock') { %>
                                                    <div class="absolute top-3 left-1/2 -translate-x-1/2 bg-red-600/95 text-white text-sm font-bold px-4 py-1 rounded-md shadow-md -skew-x-6 transform pointer-events-none">
                                                        Out of Stock
                                                    </div>
                                                <% } %>`;

let matchCount = (content.match(targetRegex) || []).length;
console.log(`Found ${matchCount} matches to replace.`);

if (matchCount > 0) {
    let newContent = content.replace(targetRegex, replacement);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log("Successfully updated badge style to match Apple section.");
} else {
    console.log("No matches found. Dumping snippet for debugging:");
    const index = content.indexOf("Out of Stock");
    if (index !== -1) {
        console.log(content.substring(index - 100, index + 200));
    }
}
