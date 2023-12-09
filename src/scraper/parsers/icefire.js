const fs = require('fs');
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function main() {
    let list_div = [];

    const files = fs.readdirSync('source');
    for (const filename of files) {
        if (filename.startsWith(path.basename(__filename, '.js') + '-')) {
            const html_doc = path.join('source', filename);
            const file = fs.readFileSync(html_doc, 'utf-8');
            const dom = new JSDOM(file);
            const document = dom.window.document;
            const divs_name = document.querySelectorAll('tr.fw-normal');
            for (const div of divs_name) {
                for (const item of div.querySelector('td').childNodes) {
                    const text = item.textContent.trim();
                    if (text === '') {
                        continue;
                    }
                    list_div.push(text);
                }
            }
        }
    }
    list_div = [...new Set(list_div)]; // remove duplicates
    const index = list_div.indexOf('updating');
    if (index !== -1) {
        list_div.splice(index, 1); // remove 'updating'
    }
    console.log(list_div);
    return list_div;
}

main();
