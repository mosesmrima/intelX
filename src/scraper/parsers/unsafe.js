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
            const divs_name = document.querySelectorAll('div.blog-card');
            divs_name.forEach(div => {
                try {
                    const title = div.querySelector('div h4').textContent.trim();
                    const description = "";
                    list_div.push({"title" : title, "description" : description});
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
