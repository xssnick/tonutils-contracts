import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { Storage } from '../wrappers/Storage';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Storage', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Storage');
    });

    let blockchain: Blockchain;
    let storage: SandboxContract<Storage>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        storage = blockchain.openContract(Storage.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await storage.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: storage.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and storage are ready to use
    });
});
