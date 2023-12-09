const fs = require('fs');
const cheerio = require('cheerio');

function main() {
    let listDiv = [];

    fs.readdirSync('source').forEach(filename => {
        try {
            if (filename.startsWith(__filename.split('.')[0]+'-')) {
                let htmlDoc = 'source/' + filename;
                let file = fs.readFileSync(htmlDoc, 'utf8');
                let $ = cheerio.load(file);
                let divsName = $('table.table.table-bordered.table-content');
                divsName.each((i, div) => {
                    let title = $(div).find('h1').text().trim();
                    let description = $(div).find('p').text().trim();
                    listDiv.push({title: title, description: description});
                });
            }
        } catch (error) {
            console.log("Failed during : " + filename);
        }
    });
    console.log(listDiv);
    return listDiv;
}

main();
