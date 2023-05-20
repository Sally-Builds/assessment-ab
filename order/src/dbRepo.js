const mysql = require('mysql2')


const pool = mysql.createPool({
    user: 'root',
    host: "localhost",
    password: '          ',
    database: "orders_inbev"
}).promise()

exports.create = async (customer_id, qty, price, total, status) => {
    try {
    const sql = "INSERT INTO orders (customer_id, qty ,price, total, status) VALUES (?, ?, ?, ?, ?)"
    const [data] = await pool.query(sql, [customer_id, qty, price, total, status])
    console.log(data.insertId)
    return data.insertId
    } catch (error) {
        throw new Error(error)
    }
}

exports.findOne = async (id) => {
    try {
        const sql = `SELECT * FROM customers WHERE id = ?`
        const [data] = await pool.query(sql, [id])
        return data
} catch (error) {
        throw new Error(error)
    }
}

exports.getUserWithEmail = async (email) => {
    const sql = `SELECT * FROM customers WHERE email = ?`
    const [data] = await pool.query(sql, [email])
    return data[0]
}