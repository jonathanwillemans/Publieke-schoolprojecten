import http  from 'http'
import axios from 'axios'
import json2html from 'node-json2html'

const hostname = 'localhost'
const port = 9000


const server = http.createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
    switch(path) {
         
        case '/news/all':
            res.writeHead(200, { 'Content-Type': 'text/html' })
            // call data => build html with data => write html => end response
            makeGetRequest().then(data => buildHtml(data)).then(html => res.write(html)).then(() => res.end())
            break   
        case '/news/add':
            let data;
            req.on('data', chunk => {
                data = JSON.parse(chunk.toString());
            });
            req.on('end', () => {
                let title = data["title"];
                let text = data["text"];
                let author = data["author"]
                makePostRequest(title, text, author);
                res.writeHead(302, { Location: "/news/all" });
                res.end();
                });
                break;    
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/ press Ctrl-C to terminate....`)
 })

async function makeGetRequest () {
    let res = await axios.get('http://localhost:8080/LectorsAjax_war/Controller?command=Overview')
    return res.data
}

async function makePostRequest (title, text, author) {

    let data = "title=" + title + "&text=" + text + "&author=" +author

    let res = await axios.post('http://localhost:8080/LectorsAjax_war/Controller?command=Add', data)
    return res.data 
}

function buildHtml(data) {
    let html = json2html.transform(data,
        {"<>": "li", "html":[{"<>": "span", "text": "${title}    ${content}  ${datum.dayOfMonth}-${datum.monthValue}-${datum.year}   ${autheur} "}]})
 
    return  '<!DOCTYPE html>'+ 
            '<html>'+
                '<head>News</head>'+ 
                '<body>' + html + '</body>'+
            '</html>'
  }