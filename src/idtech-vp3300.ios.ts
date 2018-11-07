import { ios } from 'tns-core-modules/utils/utils';
import {
  IdtechEmv,
  BluetoothDevice,
} from './idtech-vp3300.common';

/**
 * Beachy EMVReaderControl delegate implementation
 */
class BeachyEMVReaderControlDelegate
  extends NSObject
  implements BeachyEMVReaderControlProtocol {

  public static ObjCProtocols = [BeachyEMVReaderControlProtocol];
  public static init(): BeachyEMVReaderControlDelegate {
    return <BeachyEMVReaderControlDelegate>BeachyEMVReaderControlDelegate.new();
  }

  onBluetoothStatusUpdate: (status: string) => void;
  onBluetoothAvailableDevicesListUpdate: (devices: Set<BluetoothDevice>) => void;
  onReaderConnected: () => void;
  onReaderDisconnected: () => void;
  onReaderData: (data: String) => void;
  onReaderDataParseError: (errorMessage: String) => void;
  onReaderSendsMessage: (message: String) => void;

  bluetoothAvailableDevicesListUpdateWithDevices(devices: NSSet<BLEDevice>): void {
    if (devices && devices.count) {
      const bleDevices = new Set<BluetoothDevice>();

      for (let i = 0; i < devices.count; i++) {
        let current = devices.allObjects[i] as NSObject;

        if (current) {
          bleDevices.add(new BluetoothDevice({
            identifier: current.valueForKey('identifier') ?
              current.valueForKey('identifier').toString() : null,
            name: current.valueForKey('name'),
            isSupportedEmv: current.valueForKey('isSupportedEmv'),
          }));
        }
      }

      if (this.onBluetoothAvailableDevicesListUpdate) {
        this.onBluetoothAvailableDevicesListUpdate(bleDevices);
      }
    }
  }

  bluetoothStatusUpdateWithStatus(status: string): void {
    if (this.onBluetoothStatusUpdate) {
      this.onBluetoothStatusUpdate(status);
    }
  }

  readerConnectedWithUuid(_uuid: String): void {
    if (this.onReaderConnected) {
      this.onReaderConnected();
    }
  }

  readerDataParseErrorWithErrorMessage(errorMessage: string): void {
    if (this.onReaderDataParseError) {
      this.onReaderDataParseError(errorMessage);
    }
  }

  readerDataWithData(data: string): void {
    if (this.onReaderData) {
      this.onReaderData(data);
    }
  }

  readerDisconnected(): void {
    if (this.onReaderDisconnected) {
      this.onReaderDisconnected();
    }
  }

  readerSendsMessageWithMessage(message: string): void {
    if (this.onReaderSendsMessage) {
      this.onReaderSendsMessage(message);
    }
  }
}

export class IdtechVp3300 extends IdtechEmv {
  private emvReaderControl: BeachyEMVReaderControl;
  private delegate: BeachyEMVReaderControlDelegate;

  constructor() {
    super();

    this.delegate = BeachyEMVReaderControlDelegate.init();

    this.delegate.onBluetoothStatusUpdate = (status: string) => {
      if (this.onBluetoothStatusUpdate) {
        this.onBluetoothStatusUpdate(status);
      }
    };

    this.delegate.onBluetoothAvailableDevicesListUpdate = (devices: Set<BluetoothDevice>) => {
      if (this.onBluetoothAvailableDevicesListUpdate) {
        this.onBluetoothAvailableDevicesListUpdate(devices);
      }
    };

    this.delegate.onReaderConnected = () => {
      if (this.onReaderConnected) {
        this.onReaderConnected();
      }
    };

    this.delegate.onReaderDisconnected = () => {
      if (this.onReaderDisconnected) {
        this.onReaderDisconnected();
      }
    };

    this.delegate.onReaderData = (data: String) => {
      if (this.onReaderData) {
        this.onReaderData(data);
      }
    };

    this.delegate.onReaderDataParseError = (error: String) => {
      if (this.onReaderDataParseError) {
        this.onReaderDataParseError(error);
      }
    };

    this.delegate.onReaderSendsMessage = (message: String) => {
      if (this.onReaderSendsMessage) {
        this.onReaderSendsMessage(message);
      }
    };

    this.emvReaderControl = ios.getter(
      BeachyEMVReaderControl,
      BeachyEMVReaderControl.shared);

    this.emvReaderControl.delegate = this.delegate;
  }

  /**
   * Connects with friendly name
   * @param name device friendly name
   * @returns true if connecting
   */
  connectWithFriendlyName(name: string): boolean {
    return this.emvReaderControl.connectWithFriendlyName(name);
  }

  /**
   * Connects with uuid
   * @param uuidString iOS UUID
   * @returns true if connecting
   */
  connectWithIdentifier(uuidString: string): boolean {
    const uuid = ios
      .getter(NSUUID, NSUUID.alloc)
      .initWithUUIDString(uuidString);

    return this.emvReaderControl.connectWithUuid(uuid);
  }

  /**
   * Reads card data
   * @param amount
   * @param [timeout] read card timeout
   * @returns parsed card data as a string
   */
  readCardData(
    amount: number,
    timeout: number = 60,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
     /**
      * return values
      * 0 - ok,
      * 1 - cannot start transaction,
      * 2 - device is not connected,
      * 3 - unknown error
      */
      const ret = this.emvReaderControl
        .readCardDataTimeout(amount, timeout);

      switch (ret) {
        case 0: {
          resolve();
        } break;

        case 1: {
          reject('Cannot start transaction. Device busy.');
        } break;

        case 2: {
          reject('Cannot start transaction. Device is not connected.');
        } break;

        default:
          reject('Cannot start transaction.');
      }
    });
  }
}
