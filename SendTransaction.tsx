import { useEffect, useState } from 'react'
import { Contract, EventData } from 'web3-eth-contract'
import { PromiEvent, TransactionReceipt } from 'web3-core'
import { getConnectedAddress, web3 } from './crypto'
import { EXPLORER, NETWORK } from './crypto/constants'
import { initContract } from './crypto/initContract'
import {Button} from "@mui/material";

type Props = {
    debug: boolean;
    className?: string;
    contractName: string;
    onTx?: (tx: PromiEvent<TransactionReceipt>) => void;
    onEvent?: (event: EventData) => void;
    method: string;
    params: string[];
    value?: number;
}

function SendTransaction(props: Props) {
    const [ contract, setContract ] = useState<Contract|undefined>()

    const [ contractAddress, setContractAddress ] = useState<string|undefined>()

    useEffect(() => {
        (async () => {
            const name = props.contractName

            if (!name) { return }

            const { contract, abi, address } = await initContract(web3, name)

            if (!contract) { return }

            console.log('abi', abi[props.method])

            setContract(contract)
            setContractAddress(address)

            // ;(window as any).contract = contract

        })()
    }, [props.contractName, props.method])

    const sendTransaction = async () => {
        const { contractName, method, params } = props

        if (!contractName) { return console.error('Contract not initialized', contractName) }

        const { contract } = await initContract(web3, contractName)

        if (!contract) { return console.error('Contract not initialized', contract) }

        const account = await getConnectedAddress()

        if (!account) { return console.error('Account not connected', account) }

        console.log('calling contract', method, ...params)

        try {
            contract.once('NFTCreated', (error: Error, event: EventData) => {
                if (event) props?.onEvent(event)
            })
        } catch (err) {
            console.error(err)
        }

        const estimatedGas = await contract.methods[method](...params).estimateGas({
            from: account,
            // TODO: use BigNumber !!!
            value: props.value ? props.value*1e18 : 0,
        })
        console.log("GAS LIMIT", estimatedGas)

        const tx = contract.methods[method](...params).send({
            from: account,
            // TODO: use BigNumber !!!
            value: props.value ? props.value*1e18 : 0,
            gasLimit: estimatedGas + 5000
        })

        tx.on('transactionHash', console.log)
        tx.on('confirmation', console.log)
        tx.on('error', console.error)

        props.onTx(tx)
    }

    if (!contract) {
        return (
            <Button
                className="!mt-6"
                variant="contained"
                disabled>
                Send (Unknown contract)
            </Button>
        )
    }

    return (
        <>

            {props.debug && (
            <pre className="bg-gray-100 rounded p-4 code">
                Contract: {contractAddress?.slice(0, 10)}{'...'}
                {' '}
                <a className="text-blue-400"
                    href={`${EXPLORER.url}/address/${contractAddress}#code`}
                    target="_blank"
                    rel="noreferrer">
                    (view source)
                </a>
                {'\n'}
                Payment: {props.value || 0} {NETWORK.nativeCurrency.symbol} + gas
                {'\n'}
                Parameters: {'\n'}
                {'  '}{props.params.join(',\n  ')}
                {'\n'}
            </pre>
            )}

            <Button
                variant="contained"
                className="!mt-6"
                onClick={sendTransaction}
            >
                Send
            </Button>
        </>
    )
}

export default SendTransaction
