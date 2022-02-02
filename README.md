# web3-ui

UI library for building web3 apps

## How to use (draft)

1. Clone to the root of your project: `git clone git@github.com:buildship-dev/web3-ui.git`
2. Add `buildship.json` to the root of your project with proper configuration (see next paragraph): `echo "{}" > buildship.json`
3. Import UI elements from `web3-ui`: `import { ConnectWallet } from '../web3-ui/ConnectWallet.tsx'`

## Example buildship.json

```json
{
  "name": "Project Name",
  "INFURA_KEY": "Your infura key",
  "BLOCKNATIVE_KEY": "Find one at https://docs.blocknative.com/onboard",
  "ETHERSCAN_API_KEY": "etherscan.io/api",
  "POLYGONSCAN_API_KEY": "",
  "NETWORKS": [1, 4, 56, 97, 137, 80001],
  "CONTRACTS": {
    "1": {
      "ContractName": "Address on Mainnet"
    },
    "4": {
      "ContractName": "Address on Rinkeby"
    },
    "56": {},
    "137": {}
  }
}
```

## Usage

```js
import { useContext } from "react";
import ConnectWallet from "../../web3-ui/ConnectWallet";
import { Web3Context } from "../../web3-ui/Web3Context";
import { WalletState } from "../../web3-ui/crypto";

export const App = () => {
  const [web3State, _] = useContext(Web3Context);

  return (
    <div className="header">
        {web3State?.walletState === WalletState.WEB3_CONNECTED && (
          <ConnectWallet />
        )}
    </div>
  );
};

export default App;
```



## Using as Etherscan Write Contract replacement:

If you have build artifacts for a contract, and you need nice interface to send them to client without verifiyng on Etherscan, use this script.

```sh
node web3-ui/scripts/upload-abi.mjs ./buildship.json EthlantisWhitelist 0x0128B1897108E0b57533Bc9774326bfb30310Dbe ../nft-contracts-buildship/build/contracts/WhitelistMerkleTreeExtension.json
```

The arguments are:
- buildship.json location
- name for the contract you are uploading
- address for the contract
- artifact location from truffle build

Another useful line:

```sh
cat ../nft-contracts-buildship/build/contracts/WhitelistMerkleTreeExtension.json | jq .abi | pbcopy
```

## Building

Config file is located at `buildship.json`, and all the relevant generators are in `web3-ui`.

Edit `buildship.json` with your network configuration and smart-contracts and run this:

```sh
node web3-ui/utils/buildship.mjs
```

This should generate `abi` directory in the root of your project. After this, you can use `web3-ui` directory inside your code:


```javascript

import ConnectWallet from '../../web3-ui/ConnectWallet'
import SendTransaction from '../../web3-ui/SendTransaction'


...

<ConnectWallet />

<SendTransaction
    debug={true} // do yo
    onTx={updateTxInfo} // use this to receive tx object and react to changes
    contractName={_contractName}
    method={_method}
    params={_params} // array of string parameters
    value={_value} // optional
/>

```
