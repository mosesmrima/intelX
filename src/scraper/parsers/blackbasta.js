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
                let divs_name = $('div.card');
                divs_name.each((i, div) => {
                    let title = $(div).find('a.blog_name_link').text().trim();
                    let descs = $(div).find('p');
                    let description = '';
                    descs.each((j, desc) => {
                        description += $(desc).text().trim();
                    });
                    list_div.push({'title': title, 'description': description});
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
