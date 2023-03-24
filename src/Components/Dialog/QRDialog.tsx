import { fromByteArray } from "base64-js";
import { QRCodeSVG } from "solid-qr-code";
import { Checkbox } from "@ui/Checkbox.js";
import { Input } from "@ui/Input.js";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogProps,
  DialogTitle,
} from "@ui/Dialog.js";
import { ClipboardIcon } from "lucide-solid";
import { Protobuf, Types } from "@meshtastic/meshtasticjs";
import { Label } from "@ui/Label.js";
import { Component, For, createEffect, createSignal } from "solid-js";

export const QRDialog: Component<DialogProps> = (props) => {
  const [selectedChannels, setSelectedChannels] = createSignal<number[]>([0]);
  const [QRCodeURL, setQRCodeURL] = createSignal<string>("");

  const loraConfig: Protobuf.Config_LoRaConfig =
    new Protobuf.Config_LoRaConfig();
  const channels: Protobuf.Channel[] = [];

  createEffect(() => {
    const channelsToEncode = channels
      .filter((ch) => selectedChannels().includes(ch.index))
      .map((channel) => channel.settings)
      .filter((ch): ch is Protobuf.ChannelSettings => !!ch);
    const encoded = new Protobuf.ChannelSet(
      new Protobuf.ChannelSet({
        loraConfig: loraConfig,
        settings: channelsToEncode,
      }),
    );
    const base64 = fromByteArray(encoded.toBinary())
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    setQRCodeURL(`https://meshtastic.org/e/#${base64}`);
  });

  return (
    <Dialog isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogTitle>Generate QR Code</DialogTitle>
      <DialogDescription>
        The current LoRa configuration will also be shared.
      </DialogDescription>
      <div class="grid gap-4 py-4">
        <div class="flex gap-3 px-4 py-5 sm:p-6">
          <div class="flex w-40 flex-col gap-2">
            <For each={channels}>
              {(channel) => (
                <div class="flex justify-between">
                  <Label>
                    {channel.settings?.name.length
                      ? channel.settings.name
                      : channel.role === Protobuf.Channel_Role.PRIMARY
                      ? "Primary"
                      : `Channel: ${channel.index}`}
                  </Label>
                  <Checkbox
                    isChecked={selectedChannels().includes(channel.index)}
                    onCheckedChange={() => {
                      if (selectedChannels().includes(channel.index)) {
                        setSelectedChannels(
                          selectedChannels().filter((c) => c !== channel.index),
                        );
                      } else {
                        setSelectedChannels([
                          ...selectedChannels(),
                          channel.index,
                        ]);
                      }
                    }}
                  />
                </div>
              )}
            </For>
          </div>
          <QRCodeSVG
            value={QRCodeURL()}
            size={200}
            // qrStyle="dots"
          />
        </div>
      </div>
      <DialogFooter>
        <Label>Sharable URL</Label>
        <Input
          value={QRCodeURL()}
          disabled
          // action={{
          //   icon: ClipboardIcon,
          //   onClick() {
          //     void navigator.clipboard.writeText(QRCodeURL());
          //   }
          // }}
        />
      </DialogFooter>
    </Dialog>
  );
};
