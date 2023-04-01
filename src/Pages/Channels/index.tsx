import { PageLayout } from "@components/Layout/PageLayout/Index.jsx";
import { Sidebar } from "@components/Layout/Sidebar/index.jsx";
import { useDevice } from "@core/Providers/DeviceProvider.jsx";
import { useDialog } from "@core/Providers/DialogProvider.jsx";
import { Protobuf, Types } from "@meshtastic/meshtasticjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/Tabs.jsx";
import { ImportIcon, QrCodeIcon } from "lucide-solid";
import { Component, createSignal } from "solid-js";
import { Channel } from "./Channel.jsx";

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
      <Sidebar />
      <PageLayout
        label={`Channel: ${
          currentChannel ? getChannelName(currentChannel) : "Loading..."
        }`}
        actions={[
          {
            icon: ImportIcon,
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
        <Tabs defaultValue="0">
          <TabsList>
            {activeDevice()?.channels.map((channel) => (
              <TabsTrigger value={channel.index.toString()}>
                {getChannelName(channel)}
              </TabsTrigger>
            ))}
          </TabsList>
          {activeDevice()?.channels.map((channel) => (
            <TabsContent value={channel.index.toString()}>
              <Channel channel={channel} />
            </TabsContent>
          ))}
        </Tabs>
      </PageLayout>
    </>
  );
};
