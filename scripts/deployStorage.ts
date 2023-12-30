import { toNano } from 'ton-core';
import { Storage } from '../wrappers/Storage';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const storage = provider.open(Storage.createFromConfig({}, await compile('Storage')));

    await storage.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(storage.address);

    // run methods on `storage`
}
