const cheerio = require('cheerio');

function parseHTMLContent(htmlContent, isDisclosed) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    if (isDisclosed) {
        const jsonPart = $('pre').text();
        try {
            const data = JSON.parse(jsonPart);
            data.forEach(entry => {
                listDiv.push({"title": entry['title'].trim(), "description": entry["description"].trim()});
            });
        } catch (e) {
            console.error("Failed to parse JSON content", e);
        }
    } else {
        const divsName = $('div.blog-card-info');
        divsName.each((i, div) => {
            const title = $(div).find('h2').text().trim();
            let description = $(div).find('p').text().trim();
            if (!description) description = null;
            listDiv.push({'title': title, 'description': description});
        });
    }

    return listDiv;
}

module.exports = parseHTMLContent;
