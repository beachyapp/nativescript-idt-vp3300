import { Observable, EventData } from 'tns-core-modules/data/observable';
import { IdtechVp3300, BluetoothDevice } from 'nativescript-idtech-vp-sdk';

import { ListView, ItemEventData } from "tns-core-modules/ui/list-view";

export class HelloWorldModel extends Observable {
  public message: string = "disconnected";
  public myItems: BluetoothDevice[] = [];
  public canRead: boolean = false;

  private selected: BluetoothDevice;
  private idtechVp3300: IdtechVp3300;

  constructor() {
    super();

    this.idtechVp3300 = new IdtechVp3300();
    this.idtechVp3300.onReaderConnected = () => {
      this.set('message', 'connected');
      this.set('canRead', true);
    };

    this.idtechVp3300.onReaderDisconnected = () => {
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

        this.set('message', `connecting ${this.selected.identifier}`);

        setTimeout(() => {
          this.idtechVp3300
            .connectWithIdentifier(this.selected.identifier);
        }, 3000);
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
