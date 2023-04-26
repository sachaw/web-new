import { Hashicon } from "@components/Hashicon.jsx";
import { PageLayout } from "@components/Layout/PageLayout/Index.jsx";
import { ChannelChat } from "@components/PageComponents/Messages/ChannelChat.jsx";
import { useDevice } from "@core/Providers/DeviceProvider.jsx";
import { Protobuf, Types } from "@meshtastic/meshtasticjs";
import { Component, createMemo, createSignal } from "solid-js";

export const MessagesPage: Component = () => {
  const [chatType, setChatType] =
    createSignal<Types.PacketDestination>("broadcast");
  const [activeChat, setActiveChat] = createSignal<number>(
    Types.ChannelNumber.PRIMARY,
  );
  const { activeDevice } = useDevice();
  const filteredChannels = createMemo(() => {
    return (
      activeDevice()?.channels.filter(
        (channel) => channel.role !== Protobuf.Channel_Role.DISABLED,
      ) ?? []
    );
  });

  const filteredNodes = createMemo(() => {
    return (
      activeDevice()?.nodes.filter(
        (node) => node.num !== activeDevice()?.nodeNum,
      ) ?? []
    );
  });

  const messages = {
    broadcast: new Map(),
    direct: new Map(),
  };

  const currentChannel = 0;
  const getChannelName = (channel: Protobuf.Channel) => {
    return channel.settings?.name.length
      ? channel.settings?.name
      : channel.index === 0
      ? "Primary"
      : `Ch ${channel.index}`;
  };

  // <SidebarSection label="Channels">
  //         {filteredChannels().map((channel) => (
  //           <SidebarButton
  //             label={
  //               channel.settings?.name.length
  //                 ? channel.settings?.name
  //                 : channel.index === 0
  //                 ? "Primary"
  //                 : `Ch ${channel.index}`
  //             }
  //             active={activeChat() === channel.index}
  //             // badgeCount={
  //             //   messages.broadcast.get(channel.index)?.filter((m) => m.read)
  //             //     .length
  //             // }
  //             onClick={() => {
  //               setChatType("broadcast");
  //               setActiveChat(channel.index);
  //             }}
  //           >
  //             <HashIcon class="mr-2" />
  //           </SidebarButton>
  //         ))}
  //       </SidebarSection>
  //       <SidebarSection label="Peers">
  //         {filteredNodes().map((node) => (
  //           <SidebarButton
  //             label={node.user?.longName ?? "Unknown"}
  //             active={activeChat() === node.num}
  //             // badgeCount={
  //             //   messages.direct.get(node.num)?.filter((m) => m.read).length
  //             // }
  //             onClick={() => {
  //               setChatType("direct");
  //               setActiveChat(node.num);
  //             }}
  //           >
  //             <Hashicon hash={node.num.toString()} options={{ size: 20 }} />
  //           </SidebarButton>
  //         ))}
  //       </SidebarSection>

  return (
    <>
      <PageLayout
        label="TMP"
        // label={`Messages: ${
        //   chatType() === "broadcast" && currentChannel
        //     ? getChannelName(currentChannel)
        //     : chatType() === "direct" &&
        //       nodes().find((n) => n.num === activeChat())
        //     ? nodes().find((n) => n.num === activeChat())?.user?.longName ??
        //       "Unknown"
        //     : "Loading..."
        // }`}
      >
        {activeDevice()?.channels.map(
          (channel) =>
            activeChat() === channel.index && (
              <ChannelChat
                to="broadcast"
                messages={messages.broadcast.get(channel.index)}
                channel={channel.index}
              />
            ),
        )}
        {filteredNodes().map(
          (node) =>
            activeChat() === node.num && (
              <ChannelChat
                to={activeChat()}
                messages={messages.direct.get(node.num)}
                channel={Types.ChannelNumber.PRIMARY}
              />
            ),
        )}
      </PageLayout>
    </>
  );
};
