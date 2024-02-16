const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];

    const $ = cheerio.load(htmlContent);

    $('div.bg-cover.border-rounded.mb-3').each((index, element) => {
        const title = $(element).find('h2[title="Company name"]').text().trim();
        const description = $(element).find('div.fs-5').text().trim();
        listDiv.push({ "title": title, "description": description });
    });

    $('div.col-lg-4.my-3.d-flex.flex-column.justify-content-between').each((index, element) => {
        const title = $(element).find('h2[title="Company name"]').text().trim();
        const description = $(element).find('div.mb-2.text-justify').text().trim();
        const link = $(element).find('div.d-flex.align-items-center.justify-content-between').find('a').attr('href');
        listDiv.push({ "title": title, "description": description, "link": link });
    });

    $('div.d-flex.flex-column.justify-content-between.flex-fill').each((index, element) => {
        const title = $(element).find('h2[title="Company name"]').text().trim();
        const description = $(element).find('small.text-justify').text().trim();
        const link = $(element).find('a.btn.btn-sm.btn-primary.h2.mb-0').attr('href');
        listDiv.push({ "title": title, "description": description, "link": link });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
