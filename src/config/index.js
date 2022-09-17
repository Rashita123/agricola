const lendABI = require('./lend.abi.json')
const usdcABI = require('./usdc.abi.json')

module.exports = {
    lend: {
        address: '0xe3aa62D983E06CE9e098Daf5669395AE1f5B9155',
        abi: lendABI
    },
    usdc: {
        address: '0x5931CD0bD6AE26623107eA805ed422F878dbc594',
        abi: usdcABI
    }
}