import { Input } from "@ui/Input.js";
import { PaperPlaneRightIcon } from "solid-phosphor/regular";
import type { Types } from "@meshtastic/meshtasticjs";
import { Button } from "@ui/Button.js";
import { Component, createMemo, createSignal } from "solid-js";
import { useConnection } from "@core/Providers/ConnectionProvider.jsx";
import { useDevice } from "@core/Providers/DeviceProvider.jsx";
import { createId } from "@paralleldrive/cuid2";
import { MessageScope, MessageStatus } from "@core/DB/chat.js";

export interface MessageInputProps {
  to: Types.Destination;
  channel: Types.ChannelNumber;
}

export const MessageInput: Component<MessageInputProps> = (props) => {
  const { getActiveConnection } = useConnection();
  const { deviceSetters, activeDevice } = useDevice();
  const connection = createMemo(() => getActiveConnection()?.connection);
  const [messageDraft, setMessageDraft] = createSignal("");

  const sendText = async (message: string) => {
    await connection()
      ?.sendText(message, props.to, true, props.channel)
      .then((data) => {
        deviceSetters.setMessage({
          from: activeDevice()?.nodeNum ?? 0,
          to: props.to,
          id: 0,
          timestamp: new Date(),
          scope: MessageScope.BROADCAST,
          channel: props.channel,
          status: MessageStatus.SENT,
        });
        //   console.log("from", from);

        //   processPacket({
        //     from: from,
        //     snr: 0,
        //     time: 0
        //   });
        //   setMessageState(
        //     to === "broadcast" ? "broadcast" : "direct",
        //     channel,
        //     to as number,
        //     myNodeNum,
        //     id,
        //     "ack"
        //   );
        // })
        // .catch((e: Types.PacketError) =>
        //   setMessageState(
        //     to === "broadcast" ? "broadcast" : "direct",
        //     channel,
        //     to as number,
        //     myNodeNum,
        //     e.id,
        //     e.error
        //   )
        // );
      });
  };

  return (
    <div class="flex gap-2">
      <form
        class="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          sendText(messageDraft());
          setMessageDraft("");
        }}
      >
        <div class="flex flex-grow gap-2">
          <span class="w-full">
            <Input
              autofocus
              minLength={2}
              placeholder="Enter Message"
              value={messageDraft()}
              onChange={(e) => setMessageDraft(e.target.value)}
            />
          </span>
          <Button>
            <PaperPlaneRightIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};
