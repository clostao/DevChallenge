const networks : { [key: number]: (string | undefined) } = {
  1: "Mainnet",
  3: "Ropsten",
  4: "Rinkeby",
  5: "Goerli",
  56: "Binance Smart Chain (Main-Net)"
}

const contract : { [key: number]: (string | undefined) } = {
  3: "0x2116e5658f83a06d5A1E737FAE2b7c4287f93595"
}

const config = {
  networks: networks,
  contract: contract
}

export default  config;