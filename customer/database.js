const mysql = require('mysql2')



const pool = mysql.createPool({
    user: 'root',
    host: "localhost",
    password: '',
    database: 'ab-inbev'
}).promise()



const getAll = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM  notes")
        console.log(rows)
    } catch (error) {
        console.log(error)
    }
}

getAll()