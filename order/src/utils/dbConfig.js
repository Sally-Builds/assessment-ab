
const mysql = require('mysql2')


exports.createDB = async () => {
    const con = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "          "
      }).promise();

    let sql = "CREATE SCHEMA IF NOT EXISTS orders_inbev DEFAULT CHARACTER SET utf8 ;"
    await con.query(sql)
    console.log(`order db created successfully!!`)
    await createTable()
}

createTable = async () => {
    try {
    const pool = mysql.createPool({
        user: 'root',
        host: "localhost",
        password: '          ',
        database: "orders_inbev"
    }).promise()
        var sql = `CREATE TABLE 
        IF NOT EXISTS 
        orders (customer_id VARCHAR(255) NOT NULL, 
        price int NOT NULL, 
        qty int NOT NULL, 
        total int NOT NULL, 
        status VARCHAR(255) NOT NULL, 
        id int AUTO_INCREMENT, PRIMARY KEY(id))`;
        await pool.query(sql)
        console.log(`order TABLE created successfully!!`)
    } catch (error) {
        console.log(error)
    }
}
