
const mysql = require('mysql2')


exports.createDB = async () => {
    const con = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "          "
      }).promise();

    let sql = "CREATE SCHEMA IF NOT EXISTS billing_inbev DEFAULT CHARACTER SET utf8 ;"
    await con.query(sql)
    console.log(`billing db created successfully!!`)
    await createTable()
}

createTable = async () => {
    try {
    const pool = mysql.createPool({
        user: 'root',
        host: "localhost",
        password: '          ',
        database: "billing_inbev",
        dateStrings: true,
    }).promise()
        var sql = `CREATE TABLE 
        IF NOT EXISTS 
        billings (payment_method VARCHAR(255) NOT NULL, payment_date TIMESTAMP NOT NULL, customer_id int NOT NULL, order_id int NOT NULL, amount int NOT NULL, isCompleted VARCHAR(255) NOT NULL, id int AUTO_INCREMENT, PRIMARY KEY(id))`;
        await pool.query(sql)
        console.log(`billing TABLE created successfully!!`)
    } catch (error) {
        console.log(error)
    }
}
