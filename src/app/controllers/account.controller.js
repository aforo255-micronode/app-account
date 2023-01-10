const accountService = require('../services/account.service')

const getAccounts = async (req, res) => {
    return res.send(await accountService.getAccounts())
}

const getAccountById = async (req, res) => {
    const id = parseInt(req.params.id)
    return res.send(await accountService.getAccountById(id))
}

const addAccount = async (req, res) => {
    const { amount, customerId, fullname } = req.body
    return res.send(await accountService.addAccount(amount, customerId, fullname))
}

module.exports = { getAccounts, getAccountById, addAccount }