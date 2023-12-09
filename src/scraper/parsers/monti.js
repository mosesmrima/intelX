const fs = require('fs');
const cheerio = require('cheerio');

function main() {
    let list_div = [];

    fs.readdirSync('source').forEach(filename => {
        try {
            if (filename.startsWith(__filename.split('.')[0]+'-')) {
                let html_doc = 'source/'+filename;
                let file = fs.readFileSync(html_doc, 'utf8');
                let $ = cheerio.load(file);
                let divs_name = $('a.leak-card.p-3');
                divs_name.each((i, div) => {
                    let title = $(div).find('h5').text().trim();
                    let description = $(div).find('p').text().trim();
                    let link = $(div).attr('href');
                    list_div.push({'title':title, 'description': description, "link": link, "slug": filename});
                });
            }
        } catch (error) {
            console.log("Failed during : " + filename);
        }
    });
    console.log(list_div);
    return list_div;
}

main();
