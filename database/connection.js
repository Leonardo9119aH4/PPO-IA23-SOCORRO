const mysql = require('mysql2')
export const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'codegamix'
})

