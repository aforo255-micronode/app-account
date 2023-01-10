const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.DB_POSTGRES_USER,
    password: process.env.DB_POSTGRES_PASSWORD,
    database: process.env.DB_POSTGRES_DATABASE_ACCOUNT,
    host: process.env.DB_POSTGRES_HOST,
    port: process.env.DB_POSTGRES_PORT,
    ssl: { 
        rejectUnauthorized: !Boolean(process.env.DB_POSTGRES_REJECTUNAUTHORIZED),
    },
    dialect: process.env.DB_POSTGRES_DIALECT,
})

const accountRepository = {
    getAccounts: async () => {
        var results = await pool.query('SELECT * FROM account')
        return results.rows
    },
    getAccountById: async (id) => {
        var results = await pool.query('SELECT * FROM account WHERE id = $1', [id])
        return results.rows
    },
    addAccount: async (amount, customerId, fullname) => {
        var results = await pool.query('INSERT INTO account (amount, customerid,fullname) VALUES ($1, $2, $3) RETURNING *', [amount, customerId, fullname])
        return results.rows
    }
}

module.exports = accountRepository;