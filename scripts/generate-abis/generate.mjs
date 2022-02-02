import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { ETHERSCAN_API_KEY, ETHERSCAN_API_NETWORK, PREFIX, ABI_DIRECTORY } from '../constants.mjs';
import delay from 'delay';

const loadABI = (network, address) => {
    const ROOT_URL = ETHERSCAN_API_NETWORK[network.chainId]
    const API_KEY = ETHERSCAN_API_KEY[network.chainId]

    // fetch from url
    const url = `${ROOT_URL}/api?module=contract&action=getabi&address=${address}&apiKey=${API_KEY}`

    return fetch(url)
        .then((response) => response.json())
        .then((response) => JSON.parse(response.result))
        .catch(err => console.error(err))
}

const loadContractInfo = (network, address) => {
    const ROOT_URL = ETHERSCAN_API_NETWORK[network.chainId]
    const API_KEY = ETHERSCAN_API_KEY[network.chainId]

    const url = `${ROOT_URL}/api?module=contract&action=getsourcecode&address=${address}&apiKey=${API_KEY}`

    return fetch(url)
        .then((response) => response.json())
        .then((response) => response.result)
        .catch(err => console.error(err))
}


export const generateABI = async (network, address, name) => {
    if (!address) {
        throw new Error('Provide address')
    }

    if (!ETHERSCAN_API_KEY[network.chainId]) {
        throw new Error('Please provide ETHERSCAN_API_KEY for ' + network.chain)
    }

    const abi = await loadABI(network, address)

    console.log(' -- Throttle requests by 100 ms to not hit etherscan limit')
    await delay(100)

    const [ info ] = await loadContractInfo(network, address)

    console.log(' -- Throttle requests by 100 ms to not hit etherscan limit')
    await delay(100)

    if (ABI_DIRECTORY) {
        fs.mkdirSync(`./${ABI_DIRECTORY}/${network.chain}/${network.network}`, { recursive: true })
    }

    const fileName = `${PREFIX}${name || info.ContractName}.json`
    const fullPath = path.join('.', ABI_DIRECTORY, network.chain, network.network, fileName)

    fs.writeFileSync(fullPath, JSON.stringify({ abi, address }))

    return {
        ContractName: info.ContractName,
        fileName,
        fullPath,
        abi,
        info,
    }
}
