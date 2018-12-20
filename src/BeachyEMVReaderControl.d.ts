
declare class BLEDevice extends NSObject {

	static alloc(): BLEDevice; // inherited from NSObject

	static new(): BLEDevice; // inherited from NSObject

	readonly isSupportedEmv: boolean;

	getIdentifier(): NSUUID;

	getName(): string;
}

declare class BeachyEMVReaderControl extends NSObject {

	static alloc(): BeachyEMVReaderControl; // inherited from NSObject

	static new(): BeachyEMVReaderControl; // inherited from NSObject

	static setShared(value: BeachyEMVReaderControl): void;

	delegate: BeachyEMVReaderControlProtocol;

	static shared: BeachyEMVReaderControl;

	cancelReadCardData(): void;

	configureSleepModeAndPowerOffTimesWithSleepTimeInSecPowerOffTimeInSec(sleepTimeInSec: number, powerOffTimeInSec: number): number;

	connectWithFriendlyName(friendlyName: string): boolean;

	connectWithUuid(uuid: NSUUID): boolean;

	readCardDataTimeout(amount: number, timeout: number): number;
}

interface BeachyEMVReaderControlProtocol {

	bluetoothAvailableDevicesListUpdateWithDevices(devices: NSSet<BLEDevice>): void;

	bluetoothStatusUpdateWithStatus(status: string): void;

	readerConnected(): void;

	readerDataParseErrorWithErrorMessage(errorMessage: string): void;

	readerDataWithData(data: string): void;

	readerDisconnected(): void;

	readerSendsMessageWithMessage(message: string): void;
}
declare var BeachyEMVReaderControlProtocol: {

	prototype: BeachyEMVReaderControlProtocol;
};

declare var BeachyEMVReaderControlVersionNumber: number;

declare var BeachyEMVReaderControlVersionString: interop.Reference<number>;
