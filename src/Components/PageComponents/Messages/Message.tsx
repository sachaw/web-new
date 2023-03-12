import {
  CircleEllipsisIcon,
  AlertCircleIcon,
  CheckCircle2Icon
} from "lucide-solid";
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
        <CheckCircle2Icon size={16} class="my-auto text-textSecondary" />
      ) : props.message.state === "waiting" ? (
        <CircleEllipsisIcon size={16} class="my-auto text-textSecondary" />
      ) : (
        <AlertCircleIcon size={16} class="my-auto text-textSecondary" />
      )}
      <span
        class={`ml-4 border-l-2 border-l-backgroundPrimary pl-2 ${
          props.message.state === "ack" ? "text-textPrimary" : "text-textSecondary"
        }`}
      >
        {props.message.data}
      </span>
    </div>
  ) : (
    <div class="mx-4 mt-2 gap-2">
      <div class="flex gap-2">
        <div class="w-6 cursor-pointer">
          <Hashicon hash={(props.sender?.num ?? 0).toString()} options={{size:32}} />
        </div>
        <span class="cursor-pointer font-medium text-textPrimary">
          {props.sender?.user?.longName ?? "UNK"}
        </span>
        <span class="mt-1 font-mono text-xs text-textSecondary">
          {props.message.rxTime.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit"
          })}
        </span>
      </div>
      <div class="ml-1 flex">
        {props.message.state === "ack" ? (
          <CheckCircle2Icon size={16} class="my-auto text-textSecondary" />
        ) : props.message.state === "waiting" ? (
          <CircleEllipsisIcon
            size={16}
            class="my-auto text-textSecondary"
          />
        ) : (
          <AlertCircleIcon size={16} class="my-auto text-textSecondary" />
        )}
        <span
          class={`ml-4 border-l-2 border-l-backgroundPrimary pl-2 ${
            props.message.state === "ack" ? "text-textPrimary" : "text-textSecondary"
          }`}
        >
          {props.message.data}
        </span>
      </div>
    </div>
  );
};
