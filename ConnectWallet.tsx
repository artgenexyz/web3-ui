import { useContext, useEffect, useState} from 'react'
import { connectWallet, getConnectedAddress, shrinkedAddress, tryConnectWallet, WalletState, web3 } from './crypto'
import {Web3Context} from "./Web3Context";
import {Button} from "@mui/material";

type Props = {
    className?: string;
}

function ConnectWallet(props: Props) {
    const [ connectState, setConnectState ] = useState(WalletState.NOT_LOADED);
    const [ connectedAddress, updateConnectedAddress ] = useState<string|undefined>();
    const [ web3State, setWeb3State ] = useContext(Web3Context);

    useEffect(() => {
        if (web3State.walletState === WalletState.WEB3_CONNECTED) {
            getConnectedAddress().then(address => updateConnectedAddress(address))
        }

        if (web3State.walletState === WalletState.NOT_LOADED) {
            tryConnectWallet()
                .then(isConnected => {
                    if (isConnected) {
                        setWeb3State({ walletState: WalletState.WEB3_CONNECTED })
                    }
                })
        }

    }, [web3State]);

    const onClick = async () => {
        const isConnected = await connectWallet()

        if (isConnected) {
            setWeb3State({walletState: WalletState.WEB3_CONNECTED})
        } else {
            setWeb3State({walletState: WalletState.UNKNOWN_ERROR})
        }
    }

    return (
        <Button
            className="!mt-6"
            variant="contained"
            onClick={onClick}
            {...props}
        >
            {web3State.walletState !== WalletState.WEB3_CONNECTED && 'Connect Wallet'}
            {web3State.walletState === WalletState.WEB3_CONNECTED && `Connected ${shrinkedAddress(connectedAddress)}`}
        </Button>
    )
}

export default ConnectWallet
