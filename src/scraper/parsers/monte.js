const fs = require('fs');
const cheerio = require('cheerio');

function main() {
    let listDiv = [];

    fs.readdirSync('source').forEach(filename => {
        try {
            if (filename.startsWith(__filename.split('.')[0] + '-')) {
                let htmlDoc = 'source/' + filename;
                let file = fs.readFileSync(htmlDoc, 'utf8');
                let $ = cheerio.load(file);
                let divsName = $('div.blog-card.p-3.col-md-9');
                divsName.each((i, div) => {
                    let title = $(div).find('div.post-header.col-md-12.no-pad.px-3').children().first().text().trim();
                    let description = $(div).find('div.post-short-description.col-md-12.no-pad.px-3.mt-5').children().first().text().trim();
                    listDiv.push({ 'title': title, 'description': description });
                });
                divsName = $('div.container.product.mt-4');
                divsName.each((i, div) => {
                    let title = $(div).find('div.product-header').children().first().text().trim();
                    let description = $(div).find('div.product-list-description.col-md-7.mt-3.no-pad').children().first().text().trim();
                    listDiv.push({ 'title': title, 'description': description });
                });
            }
        } catch (error) {
            console.log("Failed during : " + filename);
        }
    });
    console.log(listDiv);
    return listDiv;
}

main();
