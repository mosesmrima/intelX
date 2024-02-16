const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    // Process links with green border
    $('a.flex.flex-col.justify-between.w-full.h-56.border-t-4.border-2.border-t-green-500.dark:border-gray-900.dark:border-t-green-500.rounded-[20px].bg-white.dark:bg-navy-800').each((i, div) => {
        const title = $(div).find('span.dark:text-gray-600').text().trim();
        const description = $(div).find('span.text-sm.dark:text-gray-600').text().trim();
        const link = $(div).attr('href');
        listDiv.push({"title": title, "description": description, 'link': link});
    });

    // Process links with red border
    $('a.flex.flex-col.justify-between.w-full.h-56.border-t-4.border-2.border-t-red-500.dark:border-gray-900.dark:border-t-red-500.rounded-[20px].bg-white.dark:bg-navy-800').each((i, div) => {
        const title = $(div).find('span.dark:text-gray-600').text().trim();
        const description = $(div).find('span.text-sm.dark:text-gray-600').text().trim();
        const link = $(div).attr('href');
        listDiv.push({"title": title, "description": description, 'link': link});
    });

    return listDiv;
}

module.exports = parseHTMLContent