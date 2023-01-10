const epxress = require('express')
const router = epxress.Router()

router.use('/', require('./home.routes'))
router.use('/account', require('./account.routes'))


router.get('*', (req, res) => {
    res.status(404)
    res.send({ error: 'Not found' })
})

module.exports = router