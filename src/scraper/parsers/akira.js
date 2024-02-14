const cheerio = require('cheerio');


function parseHTML(htmlContent) {
    let posts = [];
    try {
        let $ = cheerio.load(htmlContent);
        let jsonPart = $('pre').text();
        let data = JSON.parse(jsonPart);
        for (let entry of data) {
            let title = entry['title'].replace('\n', '').trim();
            let description = entry['content'].replace('\n', '').trim();
            posts.push({'title': title, 'description': description, discovered: new Date()});
        }
    } catch (err) {
        console.log(err);
    }
    return posts;
}

module.exports = parseHTML;
