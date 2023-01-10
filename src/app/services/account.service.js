const accountRepository = require('../repositories/account.repository')

const accountService = {
    getAccounts: async () => {
        return await accountRepository.getAccounts()
    },
    getAccountById: async (id) => {
        return await accountRepository.getAccountById(id)
    },
    addAccount: async (amount, customerId, fullname) => {
        return await accountRepository.addAccount(amount, customerId, fullname)
    }
}

module.exports = accountService