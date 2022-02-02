import { Contract } from "web3-eth-contract";
import { EXPLORER } from "./crypto/constants"
import {Button, CircularProgress, Typography} from "@mui/material";
import de from "@walletconnect/qrcode-modal/dist/cjs/browser/languages/de";

type Props = {
    hash: string;
    txObject?: any;
    deployedAddress?: string;
    // txObject?: TransactionReceipt | Contract;
}

function TransactionStatus({ hash, txObject, deployedAddress }: Props) {
    if (!hash) { return null }

    const deployedContract = txObject?.contractAddress || deployedAddress
    if (txObject) {
      // This gives error for some reason
      // const isContract = txObject instanceof Contract
      const isContract = deployedContract !== undefined
      const status = isContract ? deployedContract : txObject.status
      const explorerURL = isContract ? `${EXPLORER.url}/address/${deployedContract}#code`: `${EXPLORER.url}/tx/${hash}`
      return (
            <div className="flex flex-col items-center justify-center h-1/2">
                <div className="text-7xl mb-4">{status ? "✅" : "❌"}</div>
                <Typography variant="h4">
                    {status ? "Success" : "Error"}
                </Typography>

                <Button
                    variant="contained"
                    className="!mt-4"
                    href={explorerURL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  {isContract ? "View contract" : "View details"}
                </Button>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center h-1/2">
            <CircularProgress color="inherit" size={36} />
            <div className="text-grey-400 !mt-3">Confirming transaction...</div>
            <Button
              href={`${EXPLORER.url}/tx/${hash}`}
              target="_blank"
              variant="text"
              size="small"
              className="!mt-4"
              rel="noopener noreferrer">
            Check status
            </Button>
        </div>
    )
}

export default TransactionStatus
