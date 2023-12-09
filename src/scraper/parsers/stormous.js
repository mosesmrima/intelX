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

                $('center').each((i, div) => {
                    try {
                        let title = $(div).find('p.h1').text();
                        let description = $(div).find('p.description').text().trim();
                        list_div.push({"title" : title, "description" : description});
                    } catch (error) {
                        // pass
                    }
                });

                $('div.item-details').each((i, div) => {
                    let title = $(div).find('h3').text();
                    let description = $(div).find('p').text().trim();
                    list_div.push({"title" : title, "description" : description});
                });

                $('table').each((i, div) => {
                    let title = $(div).find('img').attr('src').split('/')[-1].split('.')[0];
                    let description = $(div).find('p.description').text().trim();
                    let link = $(div).find('p.textprice').find('a').attr('href');
                    list_div.push({"title" : title, "description" : description, "link": link, "slug": filename});
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
