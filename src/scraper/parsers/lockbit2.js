const fs = require('fs');
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function main() {
    let list_div = [];

    const files = fs.readdirSync('source');
    for (const filename of files) {
        try {
            if (filename.startsWith(path.basename(__filename, '.js') + '-')) {
                const html_doc = path.join('source', filename);
                const file = fs.readFileSync(html_doc, 'utf-8');
                const dom = new JSDOM(file);
                const document = dom.window.document;
                const divs_name = document.querySelectorAll('div.post-block.bad');
                for (const div of divs_name) {
                    const title = div.querySelector('div.post-title').textContent.trim();
                    const description = div.querySelector('div.post-block-text').textContent.trim();
                    list_div.push({ title, description });
                }
            }
        } catch (error) {
            console.log("Failed during : " + filename);
        }
    }
    console.log(list_div);
    return list_div;
}

main();
