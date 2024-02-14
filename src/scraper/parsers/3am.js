const cheerio = require('cheerio');

function parseHTML(htmlContent) {
    let list_div = [];
    let $ = cheerio.load(htmlContent);

    const postClasses = ['.post.bad', '.post.good'];
    postClasses.forEach(postClass => {
        let divs_name = $(postClass);
        divs_name.each((i, div) => {
            let title = $(div).find('.post-title-block > div').first().text().trim();
            let description = $(div).find('.post-text').text().trim();
            let link = $(div).find('a').attr('onclick') ? $(div).find('a').attr('onclick').split('=').slice(1).join('=').replace(/'/g, '') : '';
            list_div.push({ title, description, 'link': link, discovered: new Date() });
        });
    });

    return list_div;
}

module.exports = parseHTML;
