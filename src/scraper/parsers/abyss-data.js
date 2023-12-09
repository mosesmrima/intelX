const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

function main() {
    let list_div = [];

    fs.readdirSync('source').forEach(filename => {
        try {
            if (filename.startsWith(path.basename(__filename, '.js') + '-')) {
                let html_doc = 'source/' + filename;
                let data = fs.readFileSync(html_doc, 'utf8');
                let $ = cheerio.load(data);
                let divs_name = $('.card-body');
                divs_name.each((i, div) => {
                    let title = $(div).find('.card-title').text().trim();
                    let description = $(div).find('.card-text').text().trim();
                    list_div.push({ 'title': title, 'description': description });
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
