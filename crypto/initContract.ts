import Web3 from 'web3';

import { NETWORK, CONTRACTS } from './constants';

export const initContract = async (web3: Web3, name: string, _address?: string) => {
    if (!Object.keys(CONTRACTS).includes(name)) {
        return {}
    }

    // TODO: need to automatically find project root
    let { abi, address } = require(`../../abi/${NETWORK.chain}/${NETWORK.network}/${name}.json`);

    address = _address || address

    const contract = new web3.eth.Contract(abi, address);

    return { contract, abi, address };
}

export const initContracts = async (web3: Web3) => {
    return Object.keys(CONTRACTS).reduce((acc, name) => {
        return {
            ...acc,
            [name]: initContract(web3, name, CONTRACTS[name]),
        };
    }, {})
}

export default initContract;