const fs = require('fs');
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function main() {
    let list_div = [];

    const files = fs.readdirSync('source');
    for (let i = 0; i < files.length; i++) {
        const filename = files[i];
        try {
            if (filename.startsWith(path.basename(__filename, '.js') + '-')) {
                const html_doc = path.join('source', filename);
                const file = fs.readFileSync(html_doc, 'utf-8');
                const dom = new JSDOM(file);
                const divs_name = dom.window.document.querySelectorAll('div.block-content');
                for (let j = 0; j < divs_name.length; j++) {
                    const div = divs_name[j];
                    const title = div.querySelector('h2').textContent;
                    const description = div.querySelector("strong").textContent.trim();
                    const link = div.querySelector('a').href;
                    list_div.push({ "title": title, "description": description, 'link': link, 'slug': filename });
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
