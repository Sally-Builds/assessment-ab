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
    } catch (error) {
        throw new Error(error)
    }
}

exports.findOne = async (id) => {
    try {
        const sql = `SELECT * FROM orders WHERE id = ?`
        const [data] = await pool.query(sql, [id])
        return data[0]
} catch (error) {
        throw new Error(error)
    }
}

exports.updateStatus = async (id, status) => {
    const sql = `UPDATE orders SET status = ? WHERE id = ?`
    const [result] = await pool.query(sql, [status, id])

    return result
}