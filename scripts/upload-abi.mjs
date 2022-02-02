import fs from 'fs';

// parse buildship.json location from command line arguments process.argv
const [,, ...args] = process.argv;

const [ buildshipLocation, contractName, contractAddress, artifactLocation ] = args;

// read buildship.json
// parse json
// parse buildship.CONTRACTS[1]
// add key-value to buildship.CONTRACTS[1]: contractName: contractAddress

const buildship = fs.readFileSync(buildshipLocation, 'utf8');
const parsedBuildship = JSON.parse(buildship);

parsedBuildship.CONTRACTS[1][contractName] = contractAddress;

// save buildship.json
fs.writeFileSync(buildshipLocation, JSON.stringify(parsedBuildship, null, 4));

// fetch artifact from artifactLocation
// save abi to abi/ETH/mainnet/{contractName}.json

const artifact = fs.readFileSync(artifactLocation, 'utf8');

// parse JSON and extract .abi
const { abi } = JSON.parse(artifact);

fs.writeFileSync(`./abi/ETH/mainnet/${contractName}.json`, JSON.stringify({ abi, address: contractAddress }, null, 4));
