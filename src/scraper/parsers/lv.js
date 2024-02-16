const cheerio = require('cheerio');

function parseHTMLContent(htmlContent, isAPI) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    if (isAPI) {
        try {
            const jsonPart = $('pre').text();
            const data = JSON.parse(jsonPart);
            data['posts'].forEach(entry => {
                listDiv.push(entry['title'].trim());
            });
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    } else {
        $('div.blog-post.blog-main.posts_at_first').each((i, div) => {
            const title = $(div).find('h2 a').text().trim();
            listDiv.push(title);
        });
    }

    listDiv = [...new Set(listDiv)];
    return listDiv;
}

module.exports = parseHTMLContent;

