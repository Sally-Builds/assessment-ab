const mysql = require('mysql2')


const pool = mysql.createPool({
    user: 'root',
    host: "localhost",
    password: '          ',
    database: "customer_inbev"
}).promise()

exports.create = async (email, password, name, address) => {
    const sql = "INSERT INTO customers (email, password ,name, address) VALUES (?, ?, ?, ?)"
    const [data] = await pool.query(sql, [email, password, name, address])
    return 'successful'
}

exports.getUserWithEmail = async (email) => {
    const sql = `SELECT * FROM customers WHERE email = ?`
    const [data] = await pool.query(sql, [email])
    return data[0]
}