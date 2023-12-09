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
                if (filename.endsWith('xml.html')) {
                    let items = $('item');
                    items.each((i, item) => {
                        let title = $(item).find('title').text();
                        let description = $(item).find('description').text();
                        list_div.push({"title" : title, "description" : description});
                    });
                } else {
                    let liste = $('ul.list');
                    let divs_name = liste.find('li');
                    divs_name.each((i, div) => {
                        let title = $(div).find('a').attr('title').trim();
                        let description = "";
                        let link = $(div).find('a').attr('href');
                        list_div.push({"title" : title, "description" : description, "link": link, "slug": filename});
                    });
                }
            }
        } catch (err) {
            console.log("Failed during : " + filename);
        }
    });
    console.log(list_div);
    return list_div;
}

main();
