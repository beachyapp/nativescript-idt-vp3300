import { Observable, EventData } from 'tns-core-modules/data/observable';
import { IdtechVp3300, BluetoothDevice } from 'nativescript-idtech-vp-sdk';

import { ListView, ItemEventData } from "tns-core-modules/ui/list-view";

export class HelloWorldModel extends Observable {
  public message: string = "disconnected";
  public myItems: BluetoothDevice[] = [];
  public canRead: boolean = false;

  private selected: BluetoothDevice;
  private idtechVp3300: IdtechVp3300;

  private startTime = new Date().getTime();
  private endTime = new Date().getTime();

  private isConnecting = false;
  private isConnected = false;

  constructor() {
    super();

    this.idtechVp3300 = new IdtechVp3300();
    this.idtechVp3300.onReaderConnected = () => {
      this.startTime = new Date().getTime();

      this.isConnecting = false;
      this.isConnected = true;

      this.set('message', 'connected');
      this.set('canRead', true);
    };

    this.idtechVp3300.onReaderDisconnected = () => {
      this.endTime = new Date().getTime();

      this.isConnecting = false;
      this.isConnected = false;

      console.log('EMV has been connected for: ',
        (this.endTime - this.startTime) / 1000);

      this.set('message', 'disconnected');
      this.set('canRead', false);
    };

    this.idtechVp3300.onReaderData = (data: string) => {
      alert(data);
    };

    this.idtechVp3300.onReaderDataParseError = (error: string) => {
      alert(error);
    };

    this.idtechVp3300.onBluetoothAvailableDevicesListUpdate = (devices: Set<BluetoothDevice>) => {
      if (devices === null) {
        return;
      }

      this.set('myItems', Array.from(devices) || []);

      let available = this.myItems
        .filter((i: BluetoothDevice) => i.isSupportedEmv);

      if (available && available.length) {
        this.selected = available[0];

        console.log('it might want to connect now...');

        setTimeout(() => {
          if (!this.isConnecting && !this.isConnected) {
            console.log('connecting ...');

            this.isConnecting = this.idtechVp3300
              .connectWithIdentifier(this.selected.identifier);
            this.set('message', `connecting ${this.selected.identifier}`);
          }
        }, 1000);
      }
    };
  }

  read() {
    this.idtechVp3300.readCardData(0);
  }

  onListViewLoaded(args: EventData) {
    // const listView = <ListView>args.object;

  }

  onItemTap(args: ItemEventData) {
      const index = args.index;
      console.log(`Second ListView item tap ${index}`);
  }
}
