import Onboard from 'bnc-onboard'
import Web3 from 'web3'
import { BLOCKNATIVE_KEY, NETWORK, RPC_URL, ONBOARD_CONFIG_WALLETS } from './constants'

export enum WalletState {
    NOT_LOADED,
    WEB3_LOADED,
    WEB3_CONNECTED,
    WRONG_NETWORK,
    UNKNOWN_ERROR,
}

// set a variable to store instantiated web3
export let web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))

// initialize onboard
const onboard = Onboard({
    dappId: BLOCKNATIVE_KEY,
    walletSelect: {
        wallets: ONBOARD_CONFIG_WALLETS,
    },
    networkId: NETWORK.chainId,
        subscriptions: {
        wallet: wallet => {
            // instantiate web3 when the user has selected a wallet
            web3 = new Web3(wallet.provider)
            console.log(`${wallet.name} connected!`)

            ;(window as any).web3 = web3

            if (wallet.name)
                localStorage.setItem("selectedWallet", wallet.name);

        }
    }
})

export const tryConnectWallet = () => {
    const selectedWallet = localStorage.getItem("selectedWallet");

    if (selectedWallet) {
        return connectWallet(selectedWallet)
    }

    return Promise.resolve(false)
}

export const connectWallet = async (_selectedWallet?) => {
    const selectedWallet = _selectedWallet || localStorage.getItem("selectedWallet");

    const isWallet = await onboard.walletSelect(selectedWallet || undefined);

    if (isWallet) {
        const isSuccess = await onboard.walletCheck();

        if (!isSuccess) {
            // if can't connect, forget Selected Wallet
            localStorage.removeItem("selectedWallet");
        }

        return isSuccess
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));

        return false
    }

}

export const checkConnectionWallet = async () => {
    // if (localStorage ... ) { }
    // // Prompt user to select a wallet
    // const selected = await onboard.walletSelect()

    // console.log(`selected: ${selected}`)

    // // Run wallet checks to make sure that user is ready to transact
    // const connected = await onboard.walletCheck()

    // console.log(`connected: ${connected}`)

    // return connected
}

export const getConnectedAddress = async () => {
    const accounts = await web3.eth.getAccounts()

    return accounts[0]
}

export const shrinkedAddress = (address: string) => {
    return address && `${address.slice(0, 6)}...${address.slice(-4)}`;
};
