import { Observable, EventData } from 'tns-core-modules/data/observable';
import { IdtechVp3300 } from 'nativescript-idtech-vp3300';

import { ListView, ItemEventData } from "tns-core-modules/ui/list-view";

export class HelloWorldModel extends Observable {
  public message: string;
  private idtechVp3300: IdtechVp3300;

  constructor() {
    super();

    this.idtechVp3300 = new IdtechVp3300();
    this.idtechVp3300.onBluetoothAvailableDevicesListUpdate = (devices: BLEDevice) => {

    };
  }

  onListViewLoaded(args: EventData) {
    const listView = <ListView>args.object;
  }

  onItemTap(args: ItemEventData) {
      const index = args.index;
      console.log(`Second ListView item tap ${index}`);
  }
}
