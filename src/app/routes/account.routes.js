const express = require('express')
const router = express.Router()

const { getAccounts, getAccountById, addAccount } = require('../controllers/account.controller')

router.get('/getAccounts', getAccounts) 
router.get('/getAccountById/:id', getAccountById)
router.post('/addAccount', addAccount)

module.exports = router