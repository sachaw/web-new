import { fromByteArray, toByteArray } from "base64-js";
import { Protobuf } from "@meshtastic/meshtasticjs";
import { Component } from "solid-js";

export interface ChannelProps {
  channel: Protobuf.Channel;
}

export const Channel: Component<ChannelProps> = (props) => {
  //   const onSubmit = (data: ChannelValidation) => {
  //     const channel = new Protobuf.Channel({
  //       ...data,
  //       settings: {
  //         ...data.settings,
  //         psk: toByteArray(data.settings.psk ?? "")
  //       }
  //     });
  //     connection?.setChannel(channel).then(() => {
  //       toast({
  //         title: `Saved Channel: ${channel.settings?.name}`
  //       });
  //       addChannel(channel);
  //     });
  //   };

  return (
    // <DynamicForm<ChannelValidation>
    //   onSubmit={onSubmit}
    //   submitType="onSubmit"
    //   hasSubmitButton={true}
    //   defaultValues={{
    //     ...channel,
    //     ...{
    //       settings: {
    //         ...channel?.settings,
    //         psk: fromByteArray(channel?.settings?.psk ?? new Uint8Array(0))
    //       }
    //     }
    //   }}
    //   fieldGroups={[
    //     {
    //       label: "Channel Settings",
    //       description: "Crypto, MQTT & misc settings",
    //       fields: [
    //         {
    //           type: "select",
    //           name: "role",
    //           label: "Role",
    //           description: "Description",
    //           properties: {
    //             enumValue: Protobuf.Channel_Role
    //           }
    //         },
    //         {
    //           type: "password",
    //           name: "settings.psk",
    //           label: "pre-Shared Key",
    //           description: "Description",
    //           properties: {
    //             // act
    //           }
    //         },
    //         {
    //           type: "number",
    //           name: "settings.channelNum",
    //           label: "Channel Number",
    //           description: "Description"
    //         },
    //         {
    //           type: "text",
    //           name: "settings.name",
    //           label: "Name",
    //           description: "Description"
    //         },
    //         {
    //           type: "number",
    //           name: "settings.id",
    //           label: "ID",
    //           description: "Description"
    //         },
    //         {
    //           type: "toggle",
    //           name: "settings.uplinkEnabled",
    //           label: "Uplink Enabled",
    //           description: "Description"
    //         },
    //         {
    //           type: "toggle",
    //           name: "settings.downlinkEnabled",
    //           label: "Downlink Enabled",
    //           description: "Description"
    //         }
    //       ]
    //     }
    //   ]}
    // />
    <div>placeholder</div>
  );
};
