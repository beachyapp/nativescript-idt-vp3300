import { Common } from './idtech-vp3300.common';
import { ios } from 'tns-core-modules/utils/utils';

class BeachyEMVReaderControlDelegate
  extends NSObject
  implements BeachyEMVReaderControlProtocol {

  public static ObjCProtocols = [BeachyEMVReaderControlProtocol];

  public static init(): BeachyEMVReaderControlDelegate {
    return <BeachyEMVReaderControlDelegate>BeachyEMVReaderControlDelegate.new();
  }

  onBluetoothStatusUpdate: (status: string) => void;
  onBluetoothAvailableDevicesListUpdate: (devices: Set<BLEDevice>) => void;

  bluetoothAvailableDevicesListUpdateWithDevices(devices: NSSet<BLEDevice>): void {

    if (this.onBluetoothAvailableDevicesListUpdate) {
      this.onBluetoothAvailableDevicesListUpdate(new Set<BLEDevice>([]));
    }
  }

  bluetoothStatusUpdateWithStatus(status: string): void {

    if (this.onBluetoothStatusUpdate) {
      this.onBluetoothStatusUpdate(status);
    }
  }

  readerConnected(): void {

  }

  readerDataParseErrorWithErrorMessage(errorMessage: string): void {

  }

  readerDataWithData(data: string): void {

  }

  readerDisconnected(): void {

  }

  readerSendsMessageWithMessage(message: string): void {

  }
}

export class IdtechVp3300 extends Common {
  private emvReaderControl: BeachyEMVReaderControl;
  private delegate: BeachyEMVReaderControlDelegate;

  public onBluetoothStatusUpdate;
  public onBluetoothAvailableDevicesListUpdate;

  constructor() {
    super();

    this.delegate = BeachyEMVReaderControlDelegate.init();

    // this.delegate.onBluetoothStatusUpdate = (status: string) => {
    //   if (this.onBluetoothStatusUpdate) {
    //     this.onBluetoothStatusUpdate(status);
    //   }
    // };

    // this.delegate.onBluetoothAvailableDevicesListUpdate = (devices: Set<BLEDevice>) => {
    //   if (this.onBluetoothAvailableDevicesListUpdate) {
    //     this.onBluetoothAvailableDevicesListUpdate(devices);
    //   }
    // };

    this.emvReaderControl = BeachyEMVReaderControl.shared;
    this.emvReaderControl.delegate = this.delegate;
  }

  connectWithFriendlyName(name: string): boolean {
    return this.emvReaderControl.connectWithFriendlyName(name);
  }

  connectWithUuid(uuidString: string): boolean {
    const uuid = ios
      .getter(NSUUID, NSUUID.alloc)
      .initWithUUIDString(uuidString);

    return this.emvReaderControl.connectWithUuid(uuid);
  }

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
