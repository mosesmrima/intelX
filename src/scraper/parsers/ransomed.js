const fs = require('fs');
const cheerio = require('cheerio');

function main() {
    let list_div = [];

    fs.readdirSync('source').forEach(filename => {
        if (filename.startsWith(__filename.split('.')[0]+'-')) {
            try {
                let html_doc = 'source/'+filename;
                console.log(filename);
                let file = fs.readFileSync(html_doc, 'utf8');
                let $ = cheerio.load(file);
                let divs_name = $('li.wp-block-post');
                divs_name.each((i, div) => {
                    let meta = $(div).find('a');
                    let title = meta.text().trim();
                    let description = $(div).find('div.wp-block-post-excerpt').text().trim();
                    let link = meta.attr('href');
                    list_div.push({"title": title, "description": description, "link": link, "slug": filename});
                });
            } catch (error) {
                // pass
            }
        }
    });
    console.log(list_div);
    return list_div;
}

main();
