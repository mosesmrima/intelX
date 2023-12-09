const fs = require('fs');
const cheerio = require('cheerio');

function main() {
    let list_div = [];

    fs.readdirSync('source').forEach(filename => {
        if (filename.startsWith(__filename.split('.')[0]+'-')) {
            let html_doc = 'source/'+filename;
            let file = fs.readFileSync(html_doc, 'utf8');
            let $ = cheerio.load(file);
            let divs_name = $('h2.excerpt-title');
            divs_name.each((i, div) => {
                $(div).contents().each((j, item) => {
                    let text = $(item).text().trim();
                    if (text !== '') {
                        list_div.push(text);
                    }
                });
            });
        }
    });
    list_div = [...new Set(list_div)]; // remove duplicates
    console.log(list_div);
    return list_div;
}

main();
