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
                let divs_name = $('div.list-group-item.rounded-3.py-3.bg-body-secondary.text-bg-dark.mb-2.position-relative');
                divs_name.each((i, div) => {
                    let title = $(div).find('a').text().trim();
                    let description = $(div).find('div.small.opacity-50').text().trim();
                    let link = $(div).find('a').attr('href');
                    list_div.push({"title" : title, "description" : description, 'link': link, 'slug': filename});
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
