import type { Protobuf, Types } from "@meshtastic/meshtasticjs";
import { Subtle } from "@ui/Typography/Subtle.jsx";
import { InboxIcon } from "lucide-solid";
import { Component } from "solid-js";
import { Message } from "./Message.jsx";
import { MessageInput } from "./MessageInput.jsx";

export interface ChannelChatProps {
  messages?: MessageWithState[];
  channel: Types.ChannelNumber;
  to: Types.Destination;
}

export interface MessageWithState extends Types.PacketMetadata<string> {
  state: MessageState;
  read: boolean;
}

export type MessageState = "ack" | "waiting" | Protobuf.Routing_Error;


export const ChannelChat: Component<ChannelChatProps> = (props) => {


  const nodes = new Map<number, Protobuf.NodeInfo>();

  return (
    <div class="flex flex-grow flex-col">
      <div class="flex flex-grow flex-col">
        {props.messages ? (
          props.messages.map((message, index) => (
            <Message
              message={message}
              lastMsgSameUser={
                index === 0 ? false : props.messages[index - 1].from === message.from
              }
              sender={nodes.get(message.from)}
            />
          ))
        ) : (
          <div class="m-auto">
            <InboxIcon class="m-auto" />
            <Subtle>No Messages</Subtle>
          </div>
        )}
      </div>
      <div class="p-3">
        <MessageInput to={props.to} channel={props.channel} />
      </div>
    </div>
  );
};
