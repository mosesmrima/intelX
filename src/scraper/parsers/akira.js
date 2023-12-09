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
                if (filename.includes('onion-n')) {
                    let jsonpart = $('pre').text();
                    let data = JSON.parse(jsonpart);
                    for (let entry of data) {
                        let title = entry['title'].replace('\n','').trim();
                        let description = entry['content'].replace('\n','').trim();
                        list_div.push({ 'title': title, 'description': description });
                    }
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
