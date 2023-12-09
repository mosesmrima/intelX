const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function main() {
    let list_div = [];
    const directoryPath = path.join(__dirname, 'source');
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        files.forEach(function (filename) {
            if(filename.startsWith(path.basename(__filename).split('.')[0]+'-')) {
                console.log(filename);
                let data = fs.readFileSync(path.join(directoryPath, filename));
                let $ = cheerio.load(data);
                if (filename.includes('api')) {
                    let jsonpart = $('pre').text();
                    let data = JSON.parse(jsonpart);
                    for (let entry of data['posts']) {
                        list_div.push(entry['title'].trim());
                    }
                } else {
                    let divs_name = $('div.blog-post.blog-main.posts_at_first');
                    divs_name.each((i, div) => {
                        list_div.push($(div).find('h2 a').text().trim());
                    });
                }
            }
        });
        list_div = [...new Set(list_div)];
        console.log(list_div);
    });
}

main();
