const cheerio = require('cheerio');

function parseHTML(htmlContent) {
    let posts = [];
    try {
        let $ = cheerio.load(htmlContent);
        let divsName = $('div.col-lg-4.col-sm-6.mb-4');

        divsName.each((i, div) => {
            let itemize = $(div).find('h5');
            itemize.each((j, item) => {
                posts.push($(item).text().trim());
            });
        });
    } catch(err) {
        console.log(err);
    }
    posts = [... new Set(posts)];
    return posts;
}

module.exports = parseHTML