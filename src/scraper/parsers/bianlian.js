const cheerio = require('cheerio');

function parseHTML(htmlContent) {
    let posts = [];
    try {
        let $ = cheerio.load(htmlContent);
        let divsName = $('section.list-item');
        divsName.each((i, div) => {
            let title = $(div).find('h1').text().trim();
            let description = $(div).find('div').text().trim();
            let link = $(div).find('a').attr('href');
            posts.push({'title': title, 'description': description, 'link': link});
        });
    } catch (error) {
        console.log(error);
    }
    return posts;
}

module.exports = parseHTML