import { Observable } from 'tns-core-modules/data/observable';
import { IdtechVp3300 } from 'nativescript-idtech-vp3300';


export class HelloWorldModel extends Observable {
  public message: string;
  private idtechVp3300: IdtechVp3300;

  constructor() {
    super();

    this.idtechVp3300 = new IdtechVp3300();
    // this.idtechVp3300.setDelegate(this);
  }
}
