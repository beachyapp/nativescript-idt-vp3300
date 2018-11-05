# Nativescript IDTech VP3300 SDK

*** IMPORTANT ***
Works only on iOS. Uses custom iOS (umbrella) framework that implements
IDTech Universal SDK

Subset of ID Tech Universal SDK's methods to support VP3300 EMV reader.

Contains of:
 - BLE device search
 - API methods for connecting to VP3300
 - API method for starting contactless/swipe/chip transaction

Returns *decrypted* data string
Decryption done following this guidance:

* https://idtechproducts.com/how-to-decrypt-credit-card-data-part-i/
* https://idtechproducts.com/how-to-decrypt-credit-card-data-part-ii/


*NOTE* this is just a tiny subset of available SDK methods.
That's simply all I needed to be able to get and parse CC data.

## Installation

```javascript
tns plugin add nativescript-idtech-vp3300
```

## Usage

```javascript
    const idtechVp3300 = new IdtechVp3300();

    //Handlers:
    idtechVp3300.onReaderConnected = () => {
      alert('connected');
    };

    idtechVp3300.onReaderDisconnected = () => {
      alert('disconnected');
    };

    idtechVp3300.onReaderData = (data: string) => {
      alert(data);
    };

    idtechVp3300.onReaderDataParseError = (error: string) => {
      alert(error);
    };

    // BLE
    idtechVp3300.onBluetoothAvailableDevicesListUpdate = (devices: Set<BluetoothDevice>) => {
        const devicesList = Array.from(devices) || [];
        const emvReaders = devicesList
            .filter((i: BluetoothDevice) => i.isSupportedEmv);

        if (available && available.length) {
            // Connect to the first one
            idtechVp3300
                .connectWithIdentifier(available[0].identifier)
        }
    }

    // Read
    idtechVp3300.readCardData(0); // $0

    // Connect
    idtechVp3300.connectWithIdentifier("ABC")
    idtechVp3300.connectWithFriendlyName("ID Tech")
```

## License

Apache License Version 2.0, January 2004
