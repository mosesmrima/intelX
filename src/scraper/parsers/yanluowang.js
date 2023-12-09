const fs = require('fs');
const cheerio = require('cheerio');

function main() {
    let list_div = [];

    const files = fs.readdirSync('source');
    for (let i = 0; i < files.length; i++) {
        const filename = files[i];
        if (filename.startsWith(__filename.split('.')[0] + '-')) {
            try {
                const html_doc = 'source/' + filename;
                const data = fs.readFileSync(html_doc, 'utf8');
                const $ = cheerio.load(data);
                
                const divs_name = $('div.post.on-list');
                divs_name.each((index, element) => {
                    const title = $(element).find('h1 a').text().trim();
                    const description = $(element).find('div.post-content p').text().trim();
                    list_div.push({ "title": title, "description": description });
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
