import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { PaymentChannel } from '../wrappers/PaymentChannel';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('PaymentChannel', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('PaymentChannel');
    });

    let blockchain: Blockchain;
    let paymentChannel: SandboxContract<PaymentChannel>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        paymentChannel = blockchain.openContract(PaymentChannel.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await paymentChannel.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: paymentChannel.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and paymentChannel are ready to use
    });
});
