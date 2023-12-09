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
                let divsName = $('div.post');
                divsName.each((i, div) => {
                    let title = $(div).find('h2').text().trim();
                    let descriptions = $(div).find('p');
                    let description = '';
                    descriptions.each((j, p) => {
                        description += $(p).text();
                    });
                    listDiv.push({title: title, description: description.trim()});
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
