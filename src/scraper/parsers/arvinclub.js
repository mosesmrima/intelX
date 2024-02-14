const cheerio = require('cheerio');

function parseHTML(htmlContent) {
    let posts = [];
    try {
        let $ = cheerio.load(htmlContent);

        $('h2.type-list-title').each((i, element) => {
            let title = $(element).text().trim();
            posts.push({ 'title': title, 'description': '' });
        });


        $('.post-content.markdown-body').each((i, element) => {
            let codes = $(element).find("code.language-text");
            if (codes.length >= 2) {
                let title = $(codes[0]).text().trim();
                let description = $(codes[1]).text().trim();
                posts.push({ 'title': title, 'description': description });
            }
        });
    } catch (err) {
        console.error("Error during HTML parsing:", err);
    }
    return posts;
}

module.exports = parseHTML;
