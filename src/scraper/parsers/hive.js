const fs = require('fs');
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function main() {
    let list_div = [];

    const files = fs.readdirSync('source');
    for (let i = 0; i < files.length; i++) {
        const filename = files[i];
        if (filename.startsWith(path.basename(__filename).split('.')[0]+'-')) {
            const html_doc = 'source/'+filename;
            const data = fs.readFileSync(html_doc, 'utf8');
            const dom = new JSDOM(data);
            const document = dom.window.document;
            if (filename.includes('disclosed')) {
                const jsonpart = document.querySelector('pre').textContent;
                const data = JSON.parse(jsonpart);
                for (let entry of data) {
                    list_div.push({"title": entry['title'].trim(), "description": entry["description"].trim()});
                }
            } else {
                const divs_name = document.querySelectorAll('div.blog-card-info');
                divs_name.forEach(div => {
                    const title = div.querySelector('h2').textContent.trim();
                    let description = null;
                    if (div.querySelector('p') !== null) {
                        description = div.querySelector('p').textContent.trim();
                    }
                    list_div.push({'title': title, 'description': description});
                });
            }
        }
    }
    console.log(list_div);
    return list_div;
}

main();
