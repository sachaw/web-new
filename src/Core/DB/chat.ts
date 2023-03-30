import { Types } from "@meshtastic/meshtasticjs";
import { DBSchema, openDB } from "idb";

export enum MessageType {
  TEXT,
  LOCATION,
}

export enum MessageStatus {
  PENDING,
  SENT,
  DELIVERED,
  READ,
  FAILED,
}

export interface ChatSchema extends DBSchema {
  chats: {
    key: string;
    value: {
      id: string;
      nodeNum: string;
      message: string;
      type: MessageType;
      status: MessageStatus;
      channel: Types.ChannelNumber;
    };
    indexes: {
      "by-nodeNum": string;
      "by-messageType": string;
      "by-channel": string;
    };
  };
}

export const ChatDB = await openDB<ChatSchema>("chat", 1, {
  upgrade(db) {
    const chatStore = db.createObjectStore("chats", {
      keyPath: "id",
    });

    chatStore.createIndex("by-nodeNum", "node");
    chatStore.createIndex("by-messageType", "messageType");
    chatStore.createIndex("by-channel", "channel");
  },
});
