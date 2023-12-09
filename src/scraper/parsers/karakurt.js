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
                let prereleases = $('#companies_prereleases');
                let divs_name = prereleases.find('div.col-md-4.col-sm-4.col-xs-12');
                divs_name.each((i, div) => {
                    let h3 = $(div).find('h3');
                    let title = h3.text().trim();
                    let description = $(div).find('div.post-des').find('p').text().trim();
                    let link = h3.find('a').attr('href');
                    list_div.push({'title':title, 'description': description, 'link': link, 'slug': filename});
                });
                divs_name = $('div.col-xs-6.col-md-3.col-sm-3');
                divs_name.each((i, div) => {
                    let title = $(div).find('h3').find('a').text().trim();
                    let description = $(div).find('div.post-des').text().trim();
                    let link = $(div).find('h3').find('a').attr('href');
                    list_div.push({'title':title, 'description': description, 'link': link, 'slug': filename});
                });
                divs_name = $('div.category-mid-post-two');
                divs_name.each((i, div) => {
                    let title = $(div).find('h2').find('a').text().trim();
                    let description = $(div).find('div.post-des.dropcap').find('p').text().trim();
                    let link = $(div).find('h2').find('a').attr('href');
                    list_div.push({'title':title, 'description': description, 'link': link, 'slug': filename});
                });
            }
        } catch (err) {
            console.log("Failed during : " + filename);
        }
    });
    console.log(list_div);
    return list_div;
}

main();
