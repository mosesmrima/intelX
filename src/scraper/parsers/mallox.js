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
                let divs_name = $('div.card.mb-4.box-shadow');
                divs_name.each((i, div) => {
                    let title = $(div).find('h4.card-title').text().trim();
                    let description = '';
                    $(div).find('p').each((j, p) => {
                        description += $(p).text() + '\n';
                    });
                    let linktmp = $(div).find('a.btn.btn-primary.btn-sm');
                    if (linktmp != null) {
                        let link = linktmp.attr('href');
                        list_div.push({"title" : title, "description" : description, "link": link, "slug": filename});
                    } else {
                        list_div.push({"title" : title, "description" : description});
                    }
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
