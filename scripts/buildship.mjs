import fs from 'fs';
import { generateABI } from './generate-abis/generate.mjs';

const chains = JSON.parse(fs.readFileSync('./chains.json', 'utf8'));
const buildshipConfig = fs.readFileSync('./buildship.json', 'utf8');
const { CONTRACTS } = JSON.parse(buildshipConfig);

chains.reduce(async (prevChainLoaded, chain) => {
    // waiting until each request is finished before starting the next
    await prevChainLoaded;

    const contracts = CONTRACTS[chain.chainId] || {};
    console.log(`\nLoaded config ${chain.chain} ${chain.network}`, contracts);

    await Object.keys(contracts).reduce(async (previousRequest, contractName) => {
        // waiting until each request is finished before starting the next
        await previousRequest;

        const address = contracts[contractName];
        const result = await generateABI(chain, address, contractName);

        console.log(`Contract Name ${result.ContractName} saved to ${result.fullPath}`);
    }, Promise.resolve());
}, Promise.resolve());
