import { Input } from "@ui/Input.js";
import { SendIcon } from "lucide-solid";
import type { Types } from "@meshtastic/meshtasticjs";
import { Button } from "@ui/Button.js";
import { Component } from "solid-js";

export interface MessageInputProps {
  to: Types.Destination;
  channel: Types.ChannelNumber;
}

export const MessageInput: Component<MessageInputProps> = (props) => {


  const myNodeNum = 0
  const connection = null

  const sendText = async (message: string) => {
    // await connection
    //   ?.sendText(message, props.to, true, props.channel)
    //   .then(({ id, from }: data) => {
    //     console.log("from", from);

    //     processPacket({
    //       from: from,
    //       snr: 0,
    //       time: 0
    //     });
    //     setMessageState(
    //       to === "broadcast" ? "broadcast" : "direct",
    //       channel,
    //       to as number,
    //       myNodeNum,
    //       id,
    //       "ack"
    //     );
    //   })
    //   .catch((e: Types.PacketError) =>
    //     setMessageState(
    //       to === "broadcast" ? "broadcast" : "direct",
    //       channel,
    //       to as number,
    //       myNodeNum,
    //       e.id,
    //       e.error
    //     )
    //   );
  };

  return (
    <div class="flex gap-2">
      <form
        class="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          // sendText(messageDraft);
          // setMessageDraft("");
        }}
      >
        <div class="flex flex-grow gap-2">
          <span class="w-full">
            <Input
              // autoFocus
              minLength={2}
              placeholder="Enter Message"
              // value={messageDraft}
              // onChange={(e) => setMessageDraft(e.target.value)}
            />
          </span>
          <Button>
            <SendIcon size={16} />
          </Button>
        </div>
      </form>
    </div>
  );
};
