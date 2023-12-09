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
                if (filename.includes('api')) {
                    let jsonpart = $('pre').text();
                    let data = JSON.parse(jsonpart);
                    for (let entry of data['items']) {
                        let title = entry['title'].trim();
                        let description = entry['publication']['description'].trim();
                        let link = '/' + entry['id'];
                        list_div.push({ 'title': title, 'description': description, 'link': link, 'slug': filename });
                    }
                } else {
                    let divs_name = $('.post');
                    divs_name.each((i, div) => {
                        let title = $(div).find('.post-header').text().trim();
                        let description = $(div).find('.post-description').text().trim();
                        let link = $(div).find('.post-footer-right a').attr('href');
                        list_div.push({ 'title': title, 'description': description, 'link': link, 'slug': filename });
                    });
                }
            }
        } catch (error) {
            console.log("Failed during : " + filename);
        }
    });
    console.log(list_div);
    return list_div;
}

main();
