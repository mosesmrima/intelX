const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];

    const $ = cheerio.load(htmlContent);

    $('div.relative.bg-white.rounded-lg.shadow.dark:bg-gray-700').each((i, div) => {
        try {
            const title = $(div).find('h3').text().trim().split('\n')[0].trim();
            const description = $(div).find('p.break-all').text().trim();
            listDiv.push({ "title": title, "description": description });
        } catch (error) {
            console.error("Failed parsing div:", error);
        }
    });

    $('div.flex.flex-col.space-y-8').each((i, div) => {
        try {
            const title = $(div).find('span.text-5xl.font-semibold').text().trim();
            const description = $(div).find('span.text-xl.font-normal').text().trim();
            const link = $(div).find('a').attr('href');
            listDiv.push({ "title": title, "description": description, "link": link });
        } catch (error) {
            console.error("Failed parsing div:", error);
        }
    });

    return listDiv;
}

module.exports = parseHTMLContent;
