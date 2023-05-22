
const mysql = require('mysql2')


exports.createDB = async () => {
    const con = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "          "
      }).promise();

    let sql = "CREATE SCHEMA IF NOT EXISTS customer_inbev DEFAULT CHARACTER SET utf8 ;"
    await con.query(sql)
    console.log(`customer db created successfully!!`)
    await createTable()
}

createTable = async () => {
    try {
    const pool = mysql.createPool({
        user: 'root',
        host: "localhost",
        password: '          ',
        database: "customer_inbev"
    }).promise()
        var sql = "CREATE TABLE IF NOT EXISTS customers (name VARCHAR(255), address VARCHAR(255), email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255), id int AUTO_INCREMENT, PRIMARY KEY(id))";
        await pool.query(sql)
        console.log(`customer TABLE created successfully!!`)
    } catch (error) {
        console.log(error)
    }
}