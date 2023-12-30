import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type StorageConfig = {};

export function storageConfigToCell(config: StorageConfig): Cell {
    return beginCell().endCell();
}

export class Storage implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Storage(address);
    }

    static createFromConfig(config: StorageConfig, code: Cell, workchain = 0) {
        const data = storageConfigToCell(config);
        const init = { code, data };
        return new Storage(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
