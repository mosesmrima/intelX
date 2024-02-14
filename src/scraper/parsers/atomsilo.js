const cheerio = require('cheerio');

function parseHTML(htmlContent) {
    let posts = [];

    try {
        let $ = cheerio.load(htmlContent);
        let divsName = $('h4.post-announce-name');

        divsName.each((i, div) => {
            posts.push($(div).text().trim());
        });

        posts = [...new Set(posts)];
    } catch (err) {
        console.error(err);
    }

    return posts;
}

module.exports = parseHTML;
