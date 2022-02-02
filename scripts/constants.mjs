import fs from 'fs';

const buildship = JSON.parse(fs.readFileSync('./buildship.json', 'utf8'));

export const ETHERSCAN_API_KEY = {
    1: buildship.ETHERSCAN_API_KEY,
    4: buildship.ETHERSCAN_API_KEY,
    56: buildship.BSCSCAN_API_KEY,
    137: buildship.POLYGONSCAN_API_KEY,
}

export const ETHERSCAN_API_NETWORK = {
    1: 'https://api.etherscan.io',
    4: 'https://api-rinkeby.etherscan.io',
    56: 'https://api.bscscan.io',
    137: 'https://api.polygonscan.com',
}

export const PREFIX = '' // can be something like 'ABI-'
export const ABI_DIRECTORY = 'abi' // use null or '' to save to current dir
