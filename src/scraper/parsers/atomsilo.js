const fs = require('fs');
const cheerio = require('cheerio');

function main() {
    let listDiv = [];

    fs.readdirSync('source').forEach(filename => {
        if (filename.startsWith(__filename.split('.')[0]+'-')) {
            let htmlDoc = 'source/' + filename;
            let data = fs.readFileSync(htmlDoc, 'utf8');
            let $ = cheerio.load(data);
            let divsName = $('h4.post-announce-name');

            divsName.each((i, div) => {
                listDiv.push($(div).text().trim());
            });
        }
    });

    listDiv = [...new Set(listDiv)]; // remove duplicates
    console.log(listDiv);
    return listDiv;
}

main();
