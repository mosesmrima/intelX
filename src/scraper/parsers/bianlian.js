const fs = require('fs');
const cheerio = require('cheerio');

export default function main() {
    let listDiv = [];

    fs.readdirSync('source').forEach(filename => {
        try {
            if (filename.startsWith(__filename.split('.')[0]+'-')) {
                let htmlDoc = fs.readFileSync('source/'+filename, 'utf8');
                let $ = cheerio.load(htmlDoc);
                let divsName = $('section.list-item');
                divsName.each((i, div) => {
                    let title = $(div).find('h1').text().trim();
                    let description = $(div).find('div').text().trim();
                    let link = $(div).find('a').attr('href');
                    listDiv.push({'title':title, 'description': description, 'link': link, 'slug': filename});
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
