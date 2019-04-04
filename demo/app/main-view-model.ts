import { Observable, EventData } from 'tns-core-modules/data/observable';
import { IdtechVp3300, BluetoothDevice } from 'nativescript-idtech-vp-sdk';

import { ItemEventData } from "tns-core-modules/ui/list-view";

export class HelloWorldModel extends Observable {
  public message: string = "disconnected";
  public myItems: BluetoothDevice[] = [];
  public canRead: boolean = false;
  public logs: string = "App started";

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

      const aliveTime = (this.endTime - this.startTime) / 1000;

      this.set('message', `disconnected after ${aliveTime}`);
      this.set('canRead', false);
    };

    this.idtechVp3300.onReaderData = (data: string) => {
      alert(data);
    };

    this.idtechVp3300.onReaderDataParseError = (error: string) => {
      alert(error);
    };

    this.idtechVp3300.onReaderSendsMessage = (message: string) => {
      const msgs = `${this.logs}\n${message}`;

      this.set('logs', msgs);
    }

    this.idtechVp3300.onBluetoothAvailableDevicesListUpdate = (devices: Set<BluetoothDevice>) => {
      if (devices === null) {
        return;
      }

      this.set('myItems', Array.from(devices) || []);

      let available = this.myItems
        .filter((i: BluetoothDevice) => i.isSupportedEmv);

      if (available && available.length) {
        this.selected = available[0];

        setTimeout(() => {
          if (!this.isConnecting && !this.isConnected) {
            this.isConnecting = this.idtechVp3300
              .connectWithIdentifier(this.selected.identifier);
            if (this.isConnecting) {
              this.set('message', `connecting ${this.selected.identifier}`);
            }
          }
        }, 1000);
      }
    };
  }

  read() {
    this.idtechVp3300.readCardData(0, 30);
  }

  onListViewLoaded(_args: EventData) {

  }

  onItemTap(args: ItemEventData) {
      const index = args.index;
      console.log(`Second ListView item tap ${index}`);
  }
}
