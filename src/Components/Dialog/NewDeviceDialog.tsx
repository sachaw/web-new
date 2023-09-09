import { BLE } from "@components/PageComponents/Connect/BLE.jsx";
import { HTTP } from "@components/PageComponents/Connect/HTTP.jsx";
import { Serial } from "@components/PageComponents/Connect/Serial.jsx";
import {
  Dialog,
  DialogDescription,
  DialogProps,
  DialogTitle,
} from "@ui/Dialog.jsx";
import { Link } from "@ui/Link.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/Tabs.jsx";
import { Subtle } from "@ui/Typography/Subtle.jsx";
import { Component, Show } from "solid-js";

const tabs = [
  {
    label: "HTTP",
    element: HTTP,
    disabled: false,
  },
  {
    label: "Bluetooth",
    element: BLE,
    disabled: !navigator.bluetooth,
    disabledMessage:
      "Web Bluetooth is currently only supported by Chromium-based browsers: https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API#browser_compatibility",
  },
  {
    label: "Serial",
    element: Serial,
    disabled: !navigator.serial,
    disabledMessage:
      "WebSerial is currently only supported by Chromium based browsers: https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API#browser_compatibility",
  },
];

export const NewDeviceDialog: Component<DialogProps> = (props) => (
  <Dialog open={props.open} onOpenChange={props.onOpenChange}>
    <DialogTitle>Connect New Device</DialogTitle>
    <DialogDescription>Description</DialogDescription>
    <Tabs defaultValue="HTTP">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger value={tab.label} disabled={tab.disabled}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent value={tab.label}>
          <Show when={tab.disabled} fallback={<tab.element />}>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              {tab.disabledMessage}
            </p>
          </Show>
        </TabsContent>
      ))}
    </Tabs>

    <Show when={!(navigator.bluetooth && navigator.serial)}>
      <Subtle>
        Web Bluetooth and Web Serial are currently only supported by
        Chromium-based browsers.
      </Subtle>
      <Subtle>
        Read more:&nbsp;
        <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API#browser_compatibility">
          Web Bluetooth
        </Link>
        &nbsp;
        <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API#browser_compatibility">
          Web Serial
        </Link>
      </Subtle>
    </Show>
  </Dialog>
);
