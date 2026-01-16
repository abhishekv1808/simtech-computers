const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, 'views', 'user', 'home.ejs');
let content = fs.readFileSync(homePath, 'utf8');

const replacements = [
    {
        // Laptops - Update existing img to add classes
        find: /<img src="https:\/\/s3ng\.cashify\.in\/builder\/3e1f26febd3f4056a7ac5104a122aa94\.webp\?w=300"\s+alt="">/,
        replace: '<img src="https://s3ng.cashify.in/builder/3e1f26febd3f4056a7ac5104a122aa94.webp?w=300" alt="Laptops" class="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300">'
    },
    {
        // Desktops
        find: /<i\s+class="fas fa-desktop text-4xl sm:text-5xl text-cyan-600 group-hover:scale-110 transition-transform duration-300"><\/i>/,
        replace: '<img src="/images/categories/desktop.png" alt="Desktops" class="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300">'
    },
    {
        // Workstations
        find: /<i\s+class="fas fa-microchip text-4xl sm:text-5xl text-cyan-600 group-hover:scale-110 transition-transform duration-300"><\/i>/,
        replace: '<img src="/images/categories/workstation.png" alt="Workstations" class="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300">'
    },
    {
        // Servers
        find: /<i\s+class="fas fa-server text-4xl sm:text-5xl text-cyan-600 group-hover:scale-110 transition-transform duration-300"><\/i>/,
        replace: '<img src="/images/categories/server.png" alt="Servers" class="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300">'
    },
    {
        // Monitors
        find: /<i\s+class="fas fa-tv text-4xl sm:text-5xl text-cyan-600 group-hover:scale-110 transition-transform duration-300"><\/i>/,
        replace: '<img src="/images/categories/monitor.png" alt="Monitors" class="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300">'
    },
    {
        // Networking
        find: /<i\s+class="fas fa-network-wired text-4xl sm:text-5xl text-cyan-600 group-hover:scale-110 transition-transform duration-300"><\/i>/,
        replace: '<img src="/images/categories/networking.png" alt="Networking" class="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300">'
    },
    {
        // Accessories
        find: /<i\s+class="fas fa-keyboard text-4xl sm:text-5xl text-cyan-600 group-hover:scale-110 transition-transform duration-300"><\/i>/,
        replace: '<img src="/images/categories/accessories.png" alt="Accessories" class="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300">'
    },
    {
        // Repair Service
        find: /<i\s+class="fas fa-screwdriver-wrench text-4xl sm:text-5xl text-cyan-600 group-hover:scale-110 transition-transform duration-300"><\/i>/,
        replace: '<img src="/images/categories/repair.png" alt="Repair Service" class="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300">'
    }
];

let modified = false;
replacements.forEach(({ find, replace }) => {
    if (content.match(find)) {
        content = content.replace(find, replace);
        console.log(`Replaced: ${replace.substring(0, 50)}...`);
        modified = true;
    } else {
        console.log(`Not found: ${find}`);
    }
});

if (modified) {
    fs.writeFileSync(homePath, content, 'utf8');
    console.log('Successfully updated home.ejs');
} else {
    console.log('No changes made to home.ejs');
}
