const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

async function main() {
    let list_div = [];
    let list_api = [];

    const files = fs.readdirSync('source');
    for (let i = 0; i < files.length; i++) {
        const filename = files[i];
        if (filename.startsWith(__filename.split('.')[0] + '-')) {
            try {
                const html_doc = 'source/' + filename;
                const data = fs.readFileSync(html_doc, 'utf8');
                const $ = cheerio.load(data);
                
                if (filename.includes('api')) {
                    const jsonpart = $('pre').text();
                    const data = JSON.parse(jsonpart);
                    for (let entry of data['data']['leaks']) {
                        const title = entry['title'];
                        const description = entry['descryption'].trim();
                        const link = '/leak/' + entry['rndid'];
                        list_api.push({ "title": title, "description": description, "link": link, "slug": filename });
                    }
                } else {
                    const div = $('div.grid');
                    const divs_name = div.find('a');
                    divs_name.each((index, element) => {
                        const title = $(element).find('div.grid-caption__title').text().trim();
                        const description = '';
                        const link = $(element).attr('href');
                        list_div.push({ "title": title, "description": description, "link": link, "slug": filename });
                    });
                }
            } catch (error) {
                console.log("Failed during : " + filename);
            }
        }
    }

    for (let item of list_div) {
        for (let apiitem of list_api) {
            if (item['title'] === apiitem['title']) {
                item['description'] = apiitem['description'];
                break;
            }
        }
    }

    console.log(list_div);
    return list_div;
}

main();
