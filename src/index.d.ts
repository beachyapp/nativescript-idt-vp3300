export abstract class IdtechEmv {
    onBluetoothStatusUpdate: (status: String) => void;
    onBluetoothAvailableDevicesListUpdate: (devices: Set<BluetoothDevice>) => void;

    onReaderConnected: () => void;
    onReaderDisconnected: () => void;
    onReaderData: (data: String) => void;
    onReaderDataParseError: (errorMessage: String) => void;
    onReaderSendsMessage: (message: String) => void;

    abstract connectWithIdentifier(uuid: string): boolean;
    abstract connectWithFriendlyName(name: string): boolean;

    abstract readCardData(amount: number, timeout?: number): Promise<void>;

}

export declare class IdtechVp3300 extends IdtechEmv {
    private emvReaderControl;
    private delegate;
    constructor();
    setSleepAndPowerOffTimes(sleepTime: number, powerOffTime: number): void;
    connectWithFriendlyName(name: string): boolean;
    connectWithIdentifier(uuidString: string): boolean;
    cancelReadCardData(): void;
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