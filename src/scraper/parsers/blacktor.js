const fs = require('fs');
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function main() {
    let list_div = [];

    const files = fs.readdirSync('source');
    for (let i = 0; i < files.length; i++) {
        const filename = files[i];
        if (filename.startsWith(path.basename(__filename, '.js') + '-')) {
            const html_doc = path.join('source', filename);
            const file = fs.readFileSync(html_doc, 'utf-8');
            const dom = new JSDOM(file);
            const divs = dom.window.document.querySelectorAll('tbody');
            const divs_name = divs[0].querySelectorAll('tr');
            for (let j = 0; j < divs_name.length; j++) {
                const div = divs_name[j];
                list_div.push(div.children[3].textContent.trim());
            }
        }
    }
    list_div = [...new Set(list_div)];
    console.log(list_div);
    return list_div;
}

main();
