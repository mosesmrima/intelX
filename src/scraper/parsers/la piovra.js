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
                const divs_name = $('article');

                divs_name.each((index, element) => {
                    const title = $(element).find('h2.entry-title a').text().trim();
                    const description = $(element).find('div.entry-content').text().trim();
                    list_div.push({ title, description });
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
