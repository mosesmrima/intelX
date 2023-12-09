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
                let divs_name = $('div.ann-block');
                divs_name.each((i, div) => {
                    let title = $(div).find('div.a-b-n-name').text().trim();
                    let description = $(div).find('div.a-b-text').text().trim();
                    let link = $(div).find('button').attr('onclick').split("'")[1];
                    list_div.push({'title':title, 'description': description, 'link':link, 'slug': filename});
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
