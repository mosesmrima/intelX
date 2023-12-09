const fs = require('fs');
const cheerio = require('cheerio');

function main() {
    let listDiv = [];

    fs.readdirSync('source').forEach(filename => {
        if (filename.startsWith(__filename.split('.')[0]+'-')) {
            let htmlDoc = 'source/' + filename;
            let file = fs.readFileSync(htmlDoc, 'utf8');
            let $ = cheerio.load(file);
            let divsName = $('a[target="_blank"]');
            divsName.each((i, div) => {
                $(div).find('font[color="#5B61F6"]').each((j, item) => {
                    listDiv.push($(item).text().trim());
                });
            });
        }
    });
    listDiv = [...new Set(listDiv)]; // Remove duplicates
    console.log(listDiv);
    return listDiv;
}

main();
