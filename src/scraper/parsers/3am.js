const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

function main() {
    let list_div = [];

    fs.readdirSync('source').forEach(filename => {
        try {
            if (filename.startsWith(path.basename(__filename, '.js') + '-')) {
                let html_doc = 'siteSources/' + filename;
                let data = fs.readFileSync(html_doc, 'utf8');
                let $ = cheerio.load(data);
                let divs_name = $('.post.bad, .post.good');
                divs_name.each((i, div) => {
                    let title = $(div).find('.post-title-block div').text().trim();
                    let description = $(div).find('.post-text').text().trim();
                    let link = $(div).find('a').attr('onclick').split('=').slice(1).join('=').replace(/'/g, '');
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
