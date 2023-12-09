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
                let divsName = $('div.list-text');
                divsName.each((i, div) => {
                    let title = $(div).find('a').attr('href').split('/')[2];
                    let description = $(div).find('a').text().trim();
                    let link = $(div).find('a').attr('href');
                    listDiv.push({title: title, description: description, link: link, slug: filename});
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
