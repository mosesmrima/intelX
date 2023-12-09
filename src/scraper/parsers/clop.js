const fs = require('fs');
const cheerio = require('cheerio');

function main() {
    let list_div = [];
    let blacklist = ['HOME', 'HOW TO DOWNLOAD?', 'ARCHIVE'];

    fs.readdirSync('source').forEach(filename => {
        if (filename.startsWith(__filename.split('.')[0]+'-')) {
            let html_doc = 'source/'+filename;
            console.log(filename);
            let file = fs.readFileSync(html_doc, 'utf8');
            let $ = cheerio.load(file);
            let divs_name = $('span.g-menu-item-title');
            divs_name.each((i, div) => {
                $(div).contents().each((j, item) => {
                    let text = $(item).text().trim();
                    if (!blacklist.includes(text)) {
                        list_div.push(text);
                    }
                });
            });
        }
    });
    console.log(list_div);
    list_div = [...new Set(list_div)]; // remove duplicates
    return list_div;
}

main();
