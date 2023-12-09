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
            const divs_name = document.querySelectorAll('div.relative.bg-white.rounded-lg.shadow.dark:bg-gray-700');
            divs_name.forEach(div => {
                try {
                    const title = div.querySelector('h3').textContent.trim().split('\n')[0].trim();
                    const description = div.querySelector('p.break-all').textContent.trim();
                    list_div.push({"title" : title, "description" : description});
                } catch (error) {
                    console.log("Failed during : " + filename);
                }
            });
            const divs_name2 = document.querySelectorAll('div.flex.flex-col.space-y-8');
            divs_name2.forEach(div => {
                try {
                    const title = div.querySelector('span.text-5xl.font-semibold').textContent.trim();
                    const description = div.querySelector('span.text-xl.font-normal').textContent.trim();
                    const link = div.querySelector('a').href;
                    list_div.push({"title" : title, "description" : description, "link": link, "slug": filename});
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
