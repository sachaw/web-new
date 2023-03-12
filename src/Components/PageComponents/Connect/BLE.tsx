
import { Button } from "@ui/Button.js";
import { randId } from "@core/Utils/randId.js";
import { Constants, IBLEConnection } from "@meshtastic/meshtasticjs";
import { Mono } from "@ui/Typography/Mono.jsx";
import { Component, createSignal } from "solid-js";

export const BLE: Component = () => {
  const [bleDevices, setBleDevices] = createSignal<BluetoothDevice[]>([]);

  // const updateBleDeviceList = useCallback(async (): Promise<void> => {
  //   setBleDevices(await navigator.bluetooth.getDevices());
  // }, []);

  // useEffect(() => {
  //   void updateBleDeviceList();
  // }, [updateBleDeviceList]);

  const onConnect = async (BLEDevice: BluetoothDevice) => {
    const id = randId();
    // const device = addDevice(id);
    // setSelectedDevice(id);
    const connection = new IBLEConnection(id);
    await connection.connect({
      device: BLEDevice
    });
    // device.addConnection(connection);
    // subscribeAll(device, connection);
  };

  return (
    <div class="flex w-full flex-col gap-2 p-4">
      <div class="flex h-48 flex-col gap-2 overflow-y-auto">
        {bleDevices().map((device, index) => (
          <Button
            onClick={() => {
              void onConnect(device);
            }}
          >
            {device.name}
          </Button>
        ))}
        {bleDevices.length === 0 && (
          <Mono class="m-auto select-none">No devices paired yet.</Mono>
        )}
      </div>
      <Button
        onClick={() => {
          void navigator.bluetooth
            .requestDevice({
              filters: [{ services: [Constants.serviceUUID] }]
            })
            .then((device) => {
              const exists = bleDevices().findIndex((d) => d.id === device.id);
              if (exists === -1) {
                setBleDevices(bleDevices().concat(device));
              }
            });
        }}
      >
        <span>New device</span>
      </Button>
    </div>
  );
};
