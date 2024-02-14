const cheerio = require('cheerio');


function parseHTML(htmlContent) {
    let posts = [];
    try {
        let $ = cheerio.load(htmlContent);
        let divs_name = $('.col-lg-4.col-sm-6.mb-4');
        divs_name.each((i, div) => {
            let title = $(div).find('h5').text().trim();
            let description = $(div).find('p').text().trim();
            let link = $(div).find('a').attr('href');
            posts.push({ title, description, link, discovered: new Date()});
        });
    } catch (err) {
        console.log(err);
    }
    return posts;
}

module.exports = parseHTML
