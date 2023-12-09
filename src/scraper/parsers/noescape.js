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
                
                const divs_name1 = $('div.bg-cover.border-rounded.mb-3');
                divs_name1.each((index, element) => {
                    const title = $(element).find('h2[title="Company name"]').text().trim();
                    const description = $(element).find('div.fs-5').text().trim();
                    list_div.push({ "title": title, "description": description });
                });

                const divs_name2 = $('div.col-lg-4.my-3.d-flex.flex-column.justify-content-between');
                divs_name2.each((index, element) => {
                    const title = $(element).find('h2[title="Company name"]').text().trim();
                    const description = $(element).find('div.mb-2.text-justify').text().trim();
                    const link = $(element).find('div.d-flex.align-items-center.justify-content-between').find('a').attr('href');
                    list_div.push({ "title": title, "description": description, "link": link, "slug": filename });
                });

                const divs_name3 = $('div.d-flex.flex-column.justify-content-between.flex-fill');
                divs_name3.each((index, element) => {
                    const title = $(element).find('h2[title="Company name"]').text().trim();
                    const description = $(element).find('small.text-justify').text().trim();
                    const link = $(element).find('a.btn.btn-sm.btn-primary.h2.mb-0').attr('href');
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
