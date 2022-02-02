import { generateABI } from './generate-abis/generate.mjs';

const main = async () => {
    const [ ,, address, name ] = process.argv;

    console.log('Loading ABI for address', address)

    return generateABI(address, name);
}

main()
    .then(result =>
        console.log(`Contract Name ${result.ContractName} saved to ${result.fullPath}`)
    )
    .catch(err => { console.error(err) })