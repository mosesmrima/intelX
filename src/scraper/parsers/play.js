const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('th.News').each((i, div) => {
        let title = $(div).next().text().trim();
        let description = ""; // Description remains empty as per original logic
        let link = null;

        try {
            // Attempt to extract 'onclick' attribute and parse it for the link
            let onclickValue = $(div).attr('onclick');
            if (onclickValue) {
                let linkPart = onclickValue.split("'")[1];
                link = 'topic.php?id=' + linkPart;
            }
        } catch (error) {
            console.error("Error extracting link:", error);
        }

        listDiv.push({ 'title': title, 'description': description, 'link': link });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
