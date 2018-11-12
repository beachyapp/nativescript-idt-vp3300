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
  abstract cancelReadCardData(): void;
}

export class BluetoothDevice {
  isSupportedEmv: boolean;
  name: string;
  identifier: string;

  constructor(payload: {
    identifier: string,
    name: string,
    isSupportedEmv: boolean,
  }) {
    this.identifier = payload.identifier;
    this.name = payload.name;
    this.isSupportedEmv = payload.isSupportedEmv;
  }
}
