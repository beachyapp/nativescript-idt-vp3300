import { Common } from './idtech-vp3300.common';
export declare class IdtechVp3300 extends Common {
    private emvReaderControl;
    private delegate;
    onBluetoothStatusUpdate: any;
    onBluetoothAvailableDevicesListUpdate: any;
    constructor();
    connectWithFriendlyName(name: string): boolean;
    connectWithUuid(uuidString: string): boolean;
    readCardData(amount: number, timeout?: number): Promise<void>;
}
