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
                let divs_name = $('tr.trow');
                divs_name.each((i, div) => {
                    let item = $(div).find('td');
                    let title = $(item[0]).text().trim();
                    let description = $(item[2]).text().trim();
                    let link = $(item[5]).find('a').attr('href');
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
