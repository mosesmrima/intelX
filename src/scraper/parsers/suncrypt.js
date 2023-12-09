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
            const divs_name = dom.window.document.querySelectorAll('div.title.is-4');
            for (let div of divs_name) {
                list_div.push(div.querySelector('a').textContent.trim());
            }
        }
    }
    list_div = [...new Set(list_div)]; // remove duplicates
    console.log(list_div);
    return list_div;
}

main();
