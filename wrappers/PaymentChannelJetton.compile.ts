import { CompilerConfig } from '@ton-community/blueprint';

export const compile: CompilerConfig = {
    lang: 'func',
    targets: ['contracts/payments/payment-channel-jetton.fc'],
};
