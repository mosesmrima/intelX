const cheerio = require('cheerio');

function parseHTML(htmlContent) {
    let posts = [];
    try {
        let $ = cheerio.load(htmlContent);
        let divs_bad = $('div.post-block.bad');
        divs_bad.each((i, div) => {
            let title = $(div).find('div.post-title').text().trim();
            let description = $(div).find('div.post-block-text').text().trim();
            let link = $(div).attr('onclick').split("'")[1];
            posts.push({"title": title, "description": description, "link": link,});
        });

        let divs_good = $('div.post-block.good');
        divs_good.each((i, div) => {
            let title = $(div).find('div.post-title').text().trim();
            let description = $(div).find('div.post-block-text').text().trim();
            let link = $(div).attr('onclick').split("'")[1];
            posts.push({"title": title, "description": description, "link": link});
        });

        let links_bad = $('a.post-block.bad');
        links_bad.each((i, link) => {
            let title = $(link).find('div.post-title').text().trim();
            let description = $(link).find('div.post-block-text').text().trim();
            let linkUrl = $(link).attr('href');
            posts.push({"title": title, "description": description, "link": linkUrl});
        });

        let links_good = $('a.post-block.good');
        links_good.each((i, link) => {
            let title = $(link).find('div.post-title').text().trim();
            let description = $(link).find('div.post-block-text').text().trim();
            let linkUrl = $(link).attr('href');
            posts.push({"title": title, "description": description, "link": linkUrl});
        });

    } catch (err) {
        console.error(err);
    }
    return posts;
}

module.exports = parseHTML;
