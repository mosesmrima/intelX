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
            const divs_name = dom.window.document.querySelectorAll('section#openSource');
            for (let j = 0; j < divs_name.length; j++) {
                const div = divs_name[j];
                const items = div.querySelectorAll('a.a_href');
                for (let k = 0; k < items.length; k++) {
                    const item = items[k];
                    list_div.push(item.textContent.replace(' - ', '#').split('#')[0].replace('+', '').trim());
                }
            }
        }
    }
    list_div = [...new Set(list_div)];
    console.log(list_div);
    return list_div;
}

main();
