const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const random_name = require('node-random-name');

var html = "<h1>Full Cycle Rocks!</h1>"
html += "<hr />"
html += "<ul>";

function insert_name() {
    const connection = mysql.createConnection(config)
    const name = random_name()
    console.log("Inserting name " + name)
    const sql = `INSERT INTO people(name) values('${name}')`
    connection.query(sql)
    connection.end()
}

function generate_html() {
    const connection = mysql.createConnection(config)
    const sql = `SELECT name FROM people`

    
    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            
            results = JSON.parse(JSON.stringify(result))
            results.forEach(element => {
                console.log(element)
                html += "<li>"+element['name']+"</li>"
            });
            html += "</ul>"
        });
    });
}

app.get('/', (req,res) => {
    insert_name()
    generate_html()
    res.send(html)
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})