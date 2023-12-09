const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

async function main() {
    let list_div = [];

    const files = fs.readdirSync('source');
    for (let i = 0; i < files.length; i++) {
        const filename = files[i];
        if (filename.startsWith(__filename.split('.')[0] + '-')) {
            try {
                const html_doc = 'source/' + filename;
                const data = fs.readFileSync(html_doc, 'utf8');
                const $ = cheerio.load(data);
                
                const divs_name = $('div.cls_record');
                divs_name.each((index, element) => {
                    const title = $(element).find('div.cls_recordTop').text().trim();
                    const description = '';
                    const link = $(element).find('a').attr('href');
                    list_div.push({ "title": title, "description": description, "link": link, "slug": filename });
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
