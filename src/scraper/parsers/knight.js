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
            const divs_name = document.querySelectorAll('div.card-body.p-3.pt-2');
            divs_name.forEach(div => {
                const a = div.querySelector('a.h5');
                const title = a.textContent.trim();
                const description = div.querySelector('p').textContent.trim();
                const link = a.href;
                list_div.push({"title" : title, "description" : description, 'link': link, 'slug': filename});
            });
            const divs_name2 = document.querySelectorAll('div.card-body');
            divs_name2.forEach(div => {
                try {
                    const h2 = div.querySelector('h2.card-title');
                    const title = h2.textContent.trim();
                    const description = div.querySelector('p').textContent.trim();
                    const link = h2.querySelector('a').href;
                    list_div.push({"title" : title, "description" : description, 'link': link, 'slug': filename});
                } catch (error) {
                    console.log("Failed during : " + filename);
                }
            });
        }
    }
    console.log(list_div);
    return list_div;
}

main();
