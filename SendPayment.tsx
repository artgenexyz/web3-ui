import { useEffect, useState } from 'react'
import { Contract } from 'web3-eth-contract'
import { PromiEvent, TransactionReceipt } from 'web3-core'
import { getConnectedAddress, web3 } from './crypto'
import { initContract } from './crypto/initContract'
import { EXPLORER, NETWORK } from './crypto/constants'

type Props = {
    debug: boolean;
    className?: string;
    onTx?: (tx: PromiEvent<TransactionReceipt>) => void;
    address: string;
    value?: number;
}

function SendPayment(props: Props) {

    useEffect(() => {
        (async () => {
            // TODO: fetch ens

        })()
    }, [props.address, props.value])

    const sendTransaction = async () => {
        const { address, value } = props

        if (!address) { return console.error('No receiving address', address) }

        const account = await getConnectedAddress()

        if (!account) { return console.error('Account not connected', account) }

        console.log('sending ether', address, value)

        const tx = web3.eth.sendTransaction({
            from: account,
            to: address,
            // TODO: use BigNumber !!!
            value: props.value ? props.value*1e18 : 0,
        })

        tx.on('transactionHash', console.log)
        tx.on('confirmation', console.log)
        tx.on('error', console.error)

        props.onTx(tx)
    }

    if (!props.address) {
        return (
            <button disabled>
                Send (Unknown receiver)
            </button>   
        )
    }

    // if (!account) {
    //     return (
    //         <button disabled>
    //             Send (Not connected)
    //         </button>
    //     )
    // }

    return (
        <>

            {props.debug && (
            <pre className="bg-gray-100 rounded p-4 code">
                address: {props.address.slice(0, 10)}
                {' '}
                <a href={`${EXPLORER.url}/address/${props.address}`} target="_blank" rel="noreferrer">
                    (check)
                </a>
                {'\n'}
                value: {props.value} {NETWORK.nativeCurrency.symbol}
            </pre>
            )}

            <button
                className="
                    bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                "
                onClick={sendTransaction}
            >
                Send {props.value} {NETWORK.nativeCurrency.symbol}
            </button>
        </>
    )
}

export default SendPayment
