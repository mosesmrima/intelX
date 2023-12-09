const fs = require('fs');
const cheerio = require('cheerio');

function main() {
    let list_div = [];

    fs.readdirSync('source').forEach(filename => {
        try {
            if (filename.startsWith(__filename.split('.')[0]+'-')) {
                let html_doc = 'source/'+filename;
                let file = fs.readFileSync(html_doc, 'utf8');
                let $ = cheerio.load(file);
                let divs_name = $('td[valign="top"]');
                divs_name.each((i, div) => {
                    let title = $(div).find('font[size=4]').text().trim();
                    let link = $(div).find('a[style="text-decoration: none;"]').attr('href');
                    $(div).find('font[size=2][color="#5B61F6"]').each((j, description) => {
                        if (!$(description).find('b').text().trim().startsWith("http")) {
                            list_div.push({"title" : title, "description" : $(description).find('b').text().trim(), "link": link, "slug": filename});
                            return false; // equivalent to 'break' in the loop
                        }
                    });
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
