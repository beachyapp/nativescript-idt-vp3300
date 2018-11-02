import { IdtechEmv } from './idtech-vp3300.common';
export declare class IdtechVp3300 extends IdtechEmv {
    private emvReaderControl;
    private delegate;
    constructor();
    connectWithFriendlyName(name: string): boolean;
    connectWithIdentifier(uuidString: string): boolean;
    readCardData(amount: number, timeout?: number): Promise<void>;
}

export declare class BluetoothDevice {
    isSupportedEmv: boolean;
    name: string;
    identifier: string;
    constructor(payload: {
        identifier: string;
        name: string;
        isSupportedEmv: boolean;
    });
}