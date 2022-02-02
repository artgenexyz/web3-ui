import { ETHERSCAN_API_KEY, ETHERSCAN_API_NETWORK, } from './constants';

export const verifyContract = ({
   network,
   name,
   address,
   flattened,
   optimizerSettings,
   compilerVersion,
   constructorArgs,
}) => {
  const ROOT_URL = ETHERSCAN_API_NETWORK[network.chainId]
  const API_KEY = ETHERSCAN_API_KEY[network.chainId]

  const url = `${ROOT_URL}/api`
  const body = {
    module: "contract",
    action: "verifysourcecode",
    apikey: API_KEY,
    sourceCode: flattened,
    contractaddress: address,
    compilerversion: `v${compilerVersion}`,
    contractname: name,
    optimizationUsed: optimizerSettings.enabled ? "1" : "0",
    runs: optimizerSettings.runs.toString(),
    licenseType: "0",
    constructorArguements: constructorArgs
  }

  return fetch(url.toString(), {
    method: "POST",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    body: new URLSearchParams(body)
  })
    .then((response) => response.json())
    .then((response) => response.result)
    .catch(err => console.error(err))
}

export const getContractVerificationStatus = (network, address, guid) => {
  const ROOT_URL = ETHERSCAN_API_NETWORK[network.chainId]
  const API_KEY = ETHERSCAN_API_KEY[network.chainId]
  const url = new URL(`${ROOT_URL}/api`)
  const params = {
    apikey: API_KEY,
    guid: guid,
    module: "contract",
    action: "checkverifystatus"
  }
  url.search = (new URLSearchParams(params)).toString()
  return fetch(url.toString())
    .then((response) => response.json())
    .catch(err => console.error(err))
}
