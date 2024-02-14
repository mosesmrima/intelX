const cheerio = require('cheerio');

function parseHTML(htmlContent) {
    let posts = [];
    try {
        let $ = cheerio.load(htmlContent);
        let divsName = $('div.card');
        divsName.each((i, div) => {
            let title = $(div).find('h5.card-brand').text().trim();
            let description = $(div).find('div.card-desc').text().trim();
            posts.push({"title": title, "description": description, discovered: new Date()});
        });
    } catch(err) {
        console.log(err);
    }
    return posts;
}

module.exports = parseHTML
