const logProvider = require('../middlewares/logprovider');

const home = async (req, res) => {
    logProvider.info('Start home in home.controller.js')
    return res.send({message: "Hello Home"});
}

module.exports = { home }