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
                let divsName = $('th.News');
                divsName.each((i, div) => {
                    let title = $(div).next().text().trim();
                    let description = "";
                    let link = null;
                    try {
                        link = $(div).attr('onclick').split("'")[1];
                        link = 'topic.php?id=' + link;
                    } catch (error) {
                        console.log(error);
                    }
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
