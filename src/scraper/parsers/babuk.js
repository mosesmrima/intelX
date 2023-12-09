const fs = require('fs');
const cheerio = require('cheerio');

function main() {
    let listDiv = [];

    fs.readdirSync('source').forEach(filename => {
        if (filename.startsWith(__filename.split('.')[0]+'-')) {
            let htmlDoc = 'source/' + filename;
            let data = fs.readFileSync(htmlDoc, 'utf8');
            let $ = cheerio.load(data);
            let divsName = $('div.col-lg-4.col-sm-6.mb-4');

            divsName.each((i, div) => {
                let itemize = $(div).find('h5');
                itemize.each((j, item) => {
                    listDiv.push($(item).text().trim());
                });
            });
        }
    });

    listDiv = [...new Set(listDiv)]; // remove duplicates
    console.log(listDiv);
    return listDiv;
}

module.exports = main;
