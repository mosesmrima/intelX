const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

async function main() {
    let list_div = [];

    const directoryPath = path.join(__dirname, 'source');
    const files = fs.readdirSync(directoryPath);

    for (let i = 0; i < files.length; i++) {
        const filename = files[i];
        if (filename.startsWith(path.basename(__filename).split('.')[0] + '-')) {
            try {
                const html_doc = path.join(directoryPath, filename);
                const data = fs.readFileSync(html_doc, 'utf8');
                const $ = cheerio.load(data);
                const divs_name = $('div.col.d-flex.align-items-stretch.mb-3');

                divs_name.each((index, element) => {
                    const title = $(element).find('div.card-header').text().trim();
                    const description = $(element).find('p.card-text').text().trim();
                    const link = $(element).find('a.btn.btn-primary.btn-sm').attr('href');
                    list_div.push({ title, description, link, slug: filename });
                });
            } catch (error) {
                console.log("Failed during : " + filename);
            }
        }
    }

    console.log(list_div);
    return list_div;
}

main();
