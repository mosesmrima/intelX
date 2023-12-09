const fs = require('fs');
const cheerio = require('cheerio');

function main() {
    let listDiv = [];

    fs.readdirSync('source').forEach(filename => {
        try {
            if (filename.startsWith(__filename.split('.')[0] + '-')) {
                let htmlDoc = 'source/' + filename;
                let file = fs.readFileSync(htmlDoc, 'utf8');
                let $ = cheerio.load(file);
                let divsName = $('tr.trow');
                divsName.each((i, div) => {
                    let title = $(div).find('td').first().text().trim();
                    let description = $(div).find('td').eq(2).text().trim();
                    let link = $(div).find('td').eq(5).children().first().attr('href');
                    listDiv.push({ 'title': title, 'description': description, 'link': link, 'slug': filename });
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
