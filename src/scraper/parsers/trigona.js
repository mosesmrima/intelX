const cheerio = require('cheerio');

function parseHTMLContent(htmlContent, jsonData) {
    let listDiv = [];
    let listApi = [];
    const $ = cheerio.load(htmlContent);

    for (let entry of jsonData['data']['leaks']) {
        const title = entry['title'];
        const description = entry['description'].trim();
        const link = '/leak/' + entry['rndid'];
        listApi.push({ "title": title, "description": description, "link": link });
    }

    $('div.grid a').each((index, element) => {
        const title = $(element).find('div.grid-caption__title').text().trim();
        const description = '';
        const link = $(element).attr('href');
        listDiv.push({ "title": title, "description": description, "link": link });
    });

    listDiv.forEach(item => {
        const apiItem = listApi.find(apiItem => apiItem.title === item.title);
        if (apiItem) {
            item.description = apiItem.description;
        }
    });

    return listDiv;
}

module.exports = parseHTMLContent;
