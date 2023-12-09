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
                const divs_name = dom.window.document.querySelectorAll('div.group.center.testimonials');
                for (let div of divs_name) {
                    let articles = div.querySelectorAll('article');
                    for (let article of articles) {
                        let title = article.querySelector('h6').textContent.trim();
                        let description = article.querySelector('blockquote').textContent.trim();
                        list_div.push({'title': title, 'description': description});
                    }
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
