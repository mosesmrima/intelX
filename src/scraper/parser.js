const fs = require('fs');
const path = require('path');


const moduleDirectory = path.join(__dirname, 'parsers');
let parserCount;

fs.readdir(moduleDirectory, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }
    const jsFiles = files.filter(file => file.endsWith('.js'));
    parserCount = jsFiles.length;
    jsFiles.forEach(jsFile => {
        const modulePath = path.join(moduleDirectory, jsFile);
        const moduleName = path.basename(jsFile, '.js'); // Module name without .js extension

        try {

            const importedModule = require(modulePath);

            // Call a function or use the module as needed
            if (typeof importedModule === 'function') {
                // You can call a function if the module exports a function
                importedModule();
            } else {
                // You can use the imported module's properties/methods here
                console.log(`Module ${moduleName} loaded.`);
            }
        } catch (error) {
            console.error(`Error importing module ${moduleName}:`, error);
        }
    });
});

module.exports = parserCount