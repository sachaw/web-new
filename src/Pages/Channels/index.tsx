import { PageLayout } from "@components/Layout/PageLayout/Index.jsx";
import { useDevice } from "@core/Providers/DeviceProvider.jsx";
import { useDialog } from "@core/Providers/DialogProvider.jsx";
import { Protobuf, Types } from "@meshtastic/meshtasticjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/Tabs.jsx";
import { DownloadSimpleIcon, QrCodeIcon } from "solid-phosphor/regular";
import { Component, Show, createSignal } from "solid-js";
import { Channel } from "./Channel.jsx";
import { Select } from "@ui/Select.jsx";

export const getChannelName = (channel: Protobuf.Channel) =>
  channel.settings?.name.length
    ? channel.settings?.name
    : channel.index === 0
    ? "Primary"
    : `Ch ${channel.index}`;

export const ChannelsPage: Component = () => {
  const [activeChannel, setActiveChannel] = createSignal<Types.ChannelNumber>(
    Types.ChannelNumber.PRIMARY,
  );
  const { activeDevice } = useDevice();
  const { setDialog } = useDialog();

  const currentChannel = activeDevice()?.channels[activeChannel()];

  return (
    <>
      <PageLayout
        label="Channel:"
        labelElement={
          <Select
            value={activeChannel().toString()}
            options={
              activeDevice()?.channels.map((channel) => ({
                label: getChannelName(channel),
                value: channel.index.toString(),
                disabled: false,
              })) || []
            }
            placeholder="Loading..."
          />
        }
        actions={[
          {
            icon: DownloadSimpleIcon,
            onClick() {
              // setDialog("import", true);
            },
          },
          {
            icon: QrCodeIcon,
            onClick() {
              setDialog("QRCode", true);
            },
          },
        ]}
      >
        <Show
          when={currentChannel}
          fallback={
            <div class="flex flex-col items-center justify-center h-full">
              <p class="text-xl text-center">No channel selected</p>
            </div>
          }
        >
          <Channel channel={currentChannel!} />
        </Show>
      </PageLayout>
    </>
  );
};
