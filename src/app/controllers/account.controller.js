const accountService = require('../services/account.service')
const logProvider = require('../middlewares/logprovider');

const getAccounts = async (req, res) => {
    logProvider.info('Start getAccounts in account.controller.js')
    return res.send(await accountService.getAccounts())
}

const getAccountById = async (req, res) => {
    logProvider.info('Start getAccountById in account.controller.js')
    const id = parseInt(req.params.id)
    return res.send(await accountService.getAccountById(id))
}

const addAccount = async (req, res) => {
    logProvider.info('Start addAccount in account.controller.js')
    const { amount, customerId, fullname } = req.body
    return res.send(await accountService.addAccount(amount, customerId, fullname))
}

module.exports = { getAccounts, getAccountById, addAccount }