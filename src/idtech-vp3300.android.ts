import { IdtechEmv } from './idtech-vp3300.common';

export class IdtechVp3300 extends IdtechEmv {

  connectWithIdentifier(uuid: string): boolean {
    throw new Error("Method not implemented.");
  }

  connectWithFriendlyName(name: string): boolean {
    throw new Error("Method not implemented.");
  }

  readCardData(amount: number, timeout?: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
