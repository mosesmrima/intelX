const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

function main() {
    let list_div = [];

    fs.readdirSync('source').forEach(filename => {
        if (filename.startsWith(path.basename(__filename, '.js') + '-')) {
            let html_doc = 'source/' + filename;
            let file = fs.readFileSync(html_doc, 'utf8');
            let $ = cheerio.load(file);
            let divs_name = $('h3');
            divs_name.each((i, div) => {
                $(div).contents().each((j, item) => {
                    list_div.push($(item).text().trim());
                });
            });
        }
    });
    list_div = [...new Set(list_div)]; // remove duplicates
    console.log(list_div);
    return list_div;
}

main();
