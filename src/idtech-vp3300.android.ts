import { IdtechEmv } from './idtech-vp3300.common';

export class IdtechVp3300 extends IdtechEmv {
  cancelReadCardData(): void {

  }

  connectWithIdentifier(uuid: string): boolean {
    return false;
  }

  connectWithFriendlyName(name: string): boolean {
    return false;
  }

  readCardData(amount: number, timeout?: number): Promise<void> {
    return new Promise((resolve, reject) => {
      reject('We do not support android yet');
    });
  }
}
