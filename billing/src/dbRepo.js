const mysql = require('mysql2')


const pool = mysql.createPool({
    user: 'root',
    host: "localhost",
    password: '          ',
    database: "billing_inbev"
}).promise()

exports.create = async (customer_id, order_id, amount, isCompleted, payment_method, payment_date) => {
    try {
    let formattedDate = formatDate(payment_date)
    const sql = "INSERT INTO billings (customer_id, order_id, amount, isCompleted, payment_method, payment_date) VALUES (?, ?, ?, ?, ?, ?)"
    const [data] = await pool.query(sql, [customer_id, order_id, amount, isCompleted, payment_method, formattedDate])
    console.log(data)
    return 'successful'
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const formatDate = (value) => {
    // '2023-01-12 6:23:12'
    let fullDate = new Date(value)
    let year = fullDate.getFullYear()
    let date = fullDate.getDate()
    let month = fullDate.getMonth()
    let time = `${fullDate.getHours()}:${fullDate.getMinutes()}:${fullDate.getSeconds()}`

    return `${year}-${month}-${date} ${time}`
}

exports.getUserWithEmail = async (email) => {
    const sql = `SELECT * FROM customers WHERE email = ?`
    const [data] = await pool.query(sql, [email])
    return data[0]
}