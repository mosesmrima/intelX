const cheerio = require('cheerio');


function parseHTML (htmlContent) {
    let posts = [];
    try {
        let $ = cheerio.load(htmlContent);
        try {
            let jsonpart = $('pre').text();
            let data = JSON.parse(jsonpart);
            for (let entry of data['items']) {
                let title = entry['title'].trim();
                let description = entry['publication']['description'].trim();
                let link = '/' + entry['id'];
                posts.push({ 'title': title, 'description': description, 'link': link, 'slug': filename });
            }
        } catch {
            let divs_name = $('.post');
            divs_name.each((i, div) => {
                let title = $(div).find('.post-header').text().trim();
                let description = $(div).find('.post-description').text().trim();
                let link = $(div).find('.post-footer-right a').attr('href');
                posts.push({title, description, link, discovered: new Date()});
            });
        }
    } catch (err) {
        console.log(err);
    }

    return posts;
}

module.exports = parseHTML