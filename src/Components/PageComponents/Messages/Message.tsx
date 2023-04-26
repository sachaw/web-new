import {
  DotsThreeCircleIcon,
  CheckCircleIcon,
  WarningCircleIcon,
} from "solid-phosphor/regular";
import type { Protobuf } from "@meshtastic/meshtasticjs";
import { Component } from "solid-js";
import { Hashicon } from "@components/Hashicon.jsx";
import { MessageWithState } from "./ChannelChat.jsx";

export interface MessageProps {
  lastMsgSameUser: boolean;
  message: MessageWithState;
  sender?: Protobuf.NodeInfo;
}

export const Message: Component<MessageProps> = (props) => {
  return props.lastMsgSameUser ? (
    <div class="ml-5 flex">
      {props.message.state === "ack" ? (
        <CheckCircleIcon class="my-auto text-gray-400" />
      ) : props.message.state === "waiting" ? (
        <DotsThreeCircleIcon class="my-auto text-gray-400" />
      ) : (
        <WarningCircleIcon class="my-auto text-gray-400" />
      )}
      <span
        class={`ml-4 border-l-2 border-l-gray-500 pl-2 ${
          props.message.state === "ack" ? "text-gray-300" : "text-gray-400"
        }`}
      >
        {props.message.data}
      </span>
    </div>
  ) : (
    <div class="mx-4 mt-2 gap-2">
      <div class="flex gap-2">
        <div class="w-6 cursor-pointer">
          <Hashicon
            hash={(props.sender?.num ?? 0).toString()}
            options={{ size: 32 }}
          />
        </div>
        <span class="cursor-pointer font-medium text-gray-300">
          {props.sender?.user?.longName ?? "UNK"}
        </span>
        <span class="mt-1 font-mono text-xs text-gray-400">
          {props.message.rxTime.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <div class="ml-1 flex">
        {props.message.state === "ack" ? (
          <CheckCircleIcon class="my-auto text-gray-400" />
        ) : props.message.state === "waiting" ? (
          <DotsThreeCircleIcon class="my-auto text-gray-400" />
        ) : (
          <WarningCircleIcon class="my-auto text-gray-400" />
        )}
        <span
          class={`ml-4 border-l-2 border-l-gray-500 pl-2 ${
            props.message.state === "ack" ? "text-gray-300" : "text-gray-400"
          }`}
        >
          {props.message.data}
        </span>
      </div>
    </div>
  );
};
