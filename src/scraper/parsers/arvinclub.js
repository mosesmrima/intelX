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
                let divs_name = $('h2.type-list-title');
                divs_name.each((i, div) => {
                    let title = $(div).text().trim();
                    list_div.push({ 'title': title, 'description': '' });
                });
                divs_name = $(".post-content.markdown-body");
                divs_name.each((i, div) => {
                    let data = $(div).find("code.language-text");
                    let title = $(data[0]).text().trim();
                    let description = $(data[1]).text().trim();
                    list_div.push({ 'title': title, 'description': description });
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
