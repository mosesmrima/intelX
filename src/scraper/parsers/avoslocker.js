const fs = require('fs');
const cheerio = require('cheerio');

function main() {
    let listDiv = [];

    fs.readdirSync('source').forEach(filename => {
        try {
            if (filename.startsWith(__filename.split('.')[0]+'-')) {
                let htmlDoc = fs.readFileSync('source/'+filename, 'utf8');
                let $ = cheerio.load(htmlDoc);
                let divsName = $('div.card');
                divsName.each((i, div) => {
                    let title = $(div).find('h5.card-brand').text().trim();
                    let description = $(div).find('div.card-desc').text().trim();
                    listDiv.push({"title": title, "description": description});
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
