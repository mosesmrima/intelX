const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

function main() {
    let list_div = [];

    fs.readdirSync('source').forEach(filename => {
        try {
            if (filename.startsWith(path.basename(__filename, '.js') + '-')) {
                let html_doc = 'source/' + filename;
                let file = fs.readFileSync(html_doc, 'utf8');
                let $ = cheerio.load(file);
                let tbody = $('tbody');
                let divs_name = tbody.find('tr');
                divs_name.each((i, div) => {
                    let tds = $(div).find('td');
                    let title = $(tds[0]).text().trim();
                    let description = $(tds[2]).text().trim();
                    let magnets = $(tds[2]).find('span.magnet_link');
                    magnets.each((j, magnet) => {
                        list_div.push({"title" : title, "description" : description, "magnet": $(magnet).text().trim()});
                    });
                });
            }
        } catch (err) {
            console.log("Failed during : " + filename);
        }
    });
    console.log(list_div);
    return list_div;
}

main();
