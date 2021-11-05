import { ethers } from "ethers";

class WalletManager {

    private provider;

    constructor() {
        // @ts-ignore
        this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        // @ts-ignore
        window.ethereum.on('accountsChanged', () => window.location.reload());
        // @ts-ignore
        window.ethereum.on('chainChanged', () => window.location.reload());
    }

    async getWalletInformation() {
        // @ts-ignore
        const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return { address: addresses[0], chainId: (await this.provider.getNetwork()).chainId, signer: await this.provider.getSigner()};
    }

}

export default WalletManager;