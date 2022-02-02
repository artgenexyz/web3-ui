import buildship from '../../buildship.json';
import chains from '../../chains.json';

export const AVAILABLE_NETWORKS = chains.filter(c => buildship.NETWORKS.includes(c.chainId))

// the network id that your dapp runs on
export let NETWORK = AVAILABLE_NETWORKS[0];

if (process.browser) {
    // Client-side-only code
    if (process.env.NODE_ENV == 'development' || window.location.origin.includes('rinkeby')) {
        NETWORK = AVAILABLE_NETWORKS.find(c => c.network === 'rinkeby');
    }

    if (window.location.origin.includes('bsc')) {
        NETWORK = AVAILABLE_NETWORKS.find(c => c.chain === 'BSC' && c.network === 'mainnet');
    }

    if (window.location.origin.includes('polygon')) {
        NETWORK = AVAILABLE_NETWORKS.find(c => c.chain === 'Matic(Polygon)' && c.network === 'mainnet');
    }

}

console.log('Using network:', NETWORK.chainId, NETWORK.name);

export const RPC_URL = NETWORK.rpc[0].replace('${INFURA_API_KEY}', buildship.INFURA_KEY);

export const EXPLORER = NETWORK.explorers[0];

// head to blocknative.com to create a key
export const BLOCKNATIVE_KEY = buildship.BLOCKNATIVE_KEY

export const CONTRACTS = buildship.CONTRACTS[NETWORK.chainId];

export const APP_NAME = buildship.name;

export const INFURA_KEY = buildship.INFURA_KEY;

export const ONBOARD_CONFIG_WALLETS = [
    { walletName: "coinbase" },
    { walletName: "trust", rpcUrl: RPC_URL },
    { walletName: "metamask", preferred: true },
    { walletName: "dapper" },
    { walletName: "fortmatic", preferred: true },
    // {
    //     walletName: 'trezor',
    //     appUrl: APP_URL,
    //     email: CONTACT_EMAIL,
    //     rpcUrl: RPC_URL
    // },
    {
        walletName: 'ledger',
        rpcUrl: RPC_URL,
        preferred: true,
    },
    {
        walletName: 'lattice',
        rpcUrl: RPC_URL,
        appName: APP_NAME
    },
    {
        walletName: "authereum"
    },
    {
        walletName: "walletConnect",
        preferred: true,
        infuraKey: INFURA_KEY
    },
    { walletName: "opera" },
    { walletName: "operaTouch" },
    { walletName: "torus" },
    { walletName: "status" },
    { walletName: "unilogin" },
    { walletName: "walletLink", rpcUrl: RPC_URL, appName: APP_NAME },
    { walletName: "imToken", rpcUrl: RPC_URL },
    { walletName: "meetone" },
    { walletName: "mykey", rpcUrl: RPC_URL },
    { walletName: "huobiwallet", rpcUrl: RPC_URL },
    { walletName: "hyperpay" },
    { walletName: "wallet.io", rpcUrl: RPC_URL },
]

