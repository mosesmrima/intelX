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
                let divs_name = $('.list-group-item');
                divs_name.each((i, div) => {
                    let title = $(div).find('a').text().split(':')[0].trim();
                    let description = $(div).find('.small.opacity-50').text().trim();
                    let link = $(div).find('a').attr('href');
                    list_div.push({ 'title': title, 'description': description, 'link': link, 'slug': filename });
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
