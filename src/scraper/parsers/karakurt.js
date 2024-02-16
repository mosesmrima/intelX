const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    // Process prereleases
    let prereleases = $('#companies_prereleases');
    let divsName = prereleases.find('div.col-md-4.col-sm-4.col-xs-12');
    divsName.each((i, div) => {
        let h3 = $(div).find('h3');
        let title = h3.text().trim();
        let description = $(div).find('div.post-des').find('p').text().trim();
        let link = h3.find('a').attr('href');
        listDiv.push({'title': title, 'description': description, 'link': link});
    });

    // Process additional divs
    divsName = $('div.col-xs-6.col-md-3.col-sm-3');
    divsName.each((i, div) => {
        let title = $(div).find('h3').find('a').text().trim();
        let description = $(div).find('div.post-des').text().trim();
        let link = $(div).find('h3').find('a').attr('href');
        listDiv.push({'title': title, 'description': description, 'link': link});
    });

    // Process category mid post two
    divsName = $('div.category-mid-post-two');
    divsName.each((i, div) => {
        let title = $(div).find('h2').find('a').text().trim();
        let description = $(div).find('div.post-des.dropcap').find('p').text().trim();
        let link = $(div).find('h2').find('a').attr('href');
        listDiv.push({'title': title, 'description': description, 'link': link});
    });

    return listDiv;
}

module.exports = parseHTMLContent;
