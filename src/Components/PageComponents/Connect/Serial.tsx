import { randId } from "@core/Utils/randId.js";
import { ISerialConnection } from "@meshtastic/meshtasticjs";
import { Button } from "@ui/Button.jsx";
import { Mono } from "@ui/Typography/Mono.jsx";
import { Component, createSignal } from "solid-js";

export const Serial: Component = ()=> {
  const [serialPorts, setSerialPorts] = createSignal<SerialPort[]>([]);
  // const { addDevice } = useDeviceStore();
  // const { setSelectedDevice } = useAppStore();

  const updateSerialPortList = async () => {
    setSerialPorts(await navigator.serial.getPorts());
  };

  navigator.serial.addEventListener("connect", () => {
    updateSerialPortList()
  });
  navigator.serial.addEventListener("disconnect",() => {
    updateSerialPortList()
  });
  updateSerialPortList()

  const onConnect = async (port: SerialPort) => {
    const id = randId();
    // const device = addDevice(id);
    // setSelectedDevice(id);
    const connection = new ISerialConnection(id);
    await connection
      .connect({
        port,
        baudRate: undefined,
        concurrentLogOutput: true
      })
      .catch((e: Error) => console.log(`Unable to Connect: ${e.message}`));
    // device.addConnection(connection);
    // subscribeAll(device, connection);
  };

  return (
    <div class="flex w-full flex-col gap-2 p-4">
      <div class="flex h-48 flex-col gap-2 overflow-y-auto">
        {serialPorts().map((port, index) => (
          <Button
            disabled={port.readable !== null}
            onClick={() => {
              void onConnect(port);
            }}
          >
            {`# ${index} - ${port.getInfo().usbVendorId ?? "UNK"} - ${
              port.getInfo().usbProductId ?? "UNK"
            }`}
          </Button>
        ))}
        {serialPorts.length === 0 && (
          <Mono class="m-auto select-none">No devices paired yet.</Mono>
        )}
      </div>
      <Button
        onClick={() => {
          void navigator.serial.requestPort().then((port) => {
            setSerialPorts(serialPorts().concat(port));
          });
        }}
      >
        <span>New device</span>
      </Button>
    </div>
  );
};
