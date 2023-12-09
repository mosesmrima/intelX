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
                let divs_name = $('a.flex.flex-col.justify-between.w-full.h-56.border-t-4.border-2.border-t-green-500.dark:border-gray-900.dark:border-t-green-500.rounded-[20px].bg-white.dark:bg-navy-800');
                divs_name.each((i, div) => {
                    let section = $(div).find('span.dark:text-gray-600');
                    let title = section.text().trim();
                    let description = $(div).find('span.text-sm.dark:text-gray-600').text().trim();
                    let link = $(div).attr('href');
                    list_div.push({"title" : title, "description" : description, 'link': link, 'slug': filename});
                });
                divs_name = $('a.flex.flex-col.justify-between.w-full.h-56.border-t-4.border-2.border-t-red-500.dark:border-gray-900.dark:border-t-red-500.rounded-[20px].bg-white.dark:bg-navy-800');
                divs_name.each((i, div) => {
                    let section = $(div).find('span.dark:text-gray-600');
                    let title = section.text().trim();
                    let description = $(div).find('span.text-sm.dark:text-gray-600').text().trim();
                    let link = $(div).attr('href');
                    list_div.push({"title" : title, "description" : description, 'link': link, 'slug': filename});
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
