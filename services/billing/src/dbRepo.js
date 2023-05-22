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
    await pool.query(sql, [customer_id, order_id, amount, isCompleted, payment_method, formattedDate])
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

exports.getBillingInfo = async (order_id) => {
    const sql = `SELECT * FROM billings WHERE order_id = ?`
    const [data] = await pool.query(sql, [order_id])
    return data[0]
}

exports.update = async (id, amount) => {
    try {
        console.log(amount)
        const sql = "UPDATE billings SET amount = ?, isCompleted = 1 WHERE id = ?"
    await pool.query(sql, [amount, id])
    console.log('success')
    return 'payment completed'
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}