import {BigNumber, ethers} from 'ethers';

export default class ContractManager {

    private contract: ethers.Contract | undefined;

    async init (address : string, signer : any) {
        this.contract = new ethers.Contract(address, require('./interfaces/ABI.json'), signer);
    }

    async getLastNum() : Promise<BigNumber>{
        return await this.contract?.lastNum();
    }

    async assessMe(value : number | string | BigNumber) {
        return this.contract?.assessMe(value);
    }

}