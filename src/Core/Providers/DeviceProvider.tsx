import { MessageScope, MessageStatus, MessageType } from "@core/DB/chat.js";
import { Protobuf, Types } from "@meshtastic/meshtasticjs";
import {
  Accessor,
  Component,
  JSX,
  JSXElement,
  Setter,
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";

export interface ConnectionProviderProps {
  children: JSXElement;
}

export interface DeviceContextProps {
  devices: DeviceState[];
  deviceSetters: {
    setNodeInfo: (nodeNum: number, nodeInfo: Protobuf.NodeInfo) => void;
    setMyNodeInfo: (nodeNum: number, nodeInfo: Protobuf.MyNodeInfo) => void;
    setChannel: (nodeNum: number, channel: Protobuf.Channel) => void;
    setConfig: (nodeNum: number, config: Protobuf.Config) => void;
    setModuleConfig: (nodeNum: number, config: Protobuf.ModuleConfig) => void;
    setPosition: (
      nodeNum: number,
      from: number,
      positions: Protobuf.Position,
    ) => void;
    setMessage: (message: TextMessage | LocationMessage) => void;
  };
  activeDevice: () => DeviceState | undefined;
  addDevice: (nodeNum: number) => void;
  setActiveDevice: Setter<number | undefined>;
  UISetters: {
    setActivePage: (page: Page) => void;
  };
}

export interface Message {
  from: number;
  to: number;
  id: number;
  timestamp: Date;
  scope: MessageScope;
  channel: Types.ChannelNumber;
  status: MessageStatus;
}

interface TextMessage extends Message {
  type: MessageType.TEXT;
  text: string;
}

interface LocationMessage extends Message {
  type: MessageType.LOCATION;
  position: Protobuf.Position;
}

export interface DeviceState {
  nodeNum: number;
  myNodeInfo: Protobuf.MyNodeInfo;
  nodes: Protobuf.NodeInfo[];
  channels: Protobuf.Channel[];
  config: Protobuf.Config;
  moduleConfig: Protobuf.ModuleConfig;
  messages: (TextMessage | LocationMessage)[];
  UI: DeviceUIState;
}

export type Page = "messages" | "config" | "channels" | "peers";

export interface DeviceUIState {
  activePage: Page;
}

const DeviceContext = createContext<DeviceContextProps>();

export const DeviceProvider: Component<ConnectionProviderProps> = (props) => {
  const [devices, setDevices] = createStore<DeviceState[]>([]);
  const [activeDeviceNum, setActiveDevice] = createSignal<number>();

  const activeDevice = () => {
    return devices.find((device) => device.nodeNum === activeDeviceNum());
  };

  const addDevice = (nodeNum: number) => {
    if (!devices.find((dev) => dev.nodeNum === nodeNum)) {
      setDevices(devices.length, {
        nodeNum,
        myNodeInfo: new Protobuf.MyNodeInfo(),
        nodes: [],
        channels: [],
        config: new Protobuf.Config(),
        moduleConfig: new Protobuf.ModuleConfig(),
        messages: [],
        UI: {
          activePage: "messages",
        },
      });
    }
  };

  const deviceSetters = {
    setNodeInfo: (nodeNum: number, nodeInfo: Protobuf.NodeInfo) => {
      const deviceIndex = devices.findIndex(
        (device) => device.nodeNum === nodeNum,
      );
      setDevices(
        (device) => device.nodeNum === nodeNum,
        "nodes",
        devices[deviceIndex].nodes.length,
        nodeInfo,
      );
    },
    setMyNodeInfo: (nodeNum: number, nodeInfo: Protobuf.MyNodeInfo) => {
      setDevices(
        (device) => device.nodeNum === nodeNum,
        "myNodeInfo",
        nodeInfo,
      );
    },
    setChannel: (nodeNum: number, channel: Protobuf.Channel) => {
      setDevices(
        (device) => device.nodeNum === nodeNum,
        "channels",
        channel.index,
        channel,
      );
    },
    setConfig: (nodeNum: number, config: Protobuf.Config) => {
      setDevices((device) => device.nodeNum === nodeNum, "config", config);
    },
    setModuleConfig: (nodeNum: number, config: Protobuf.ModuleConfig) => {
      setDevices(
        (device) => device.nodeNum === nodeNum,
        "moduleConfig",
        config,
      );
    },
    setPosition: (
      nodeNum: number,
      from: number,
      position: Protobuf.Position,
    ) => {
      //TODO: handle setting out own position
      setDevices(
        (device) => device.nodeNum === nodeNum,
        "nodes",
        (node) => node.num === from,
        "position",
        position,
      );
    },
    setMessage: (message: TextMessage | LocationMessage) => {
      const deviceIndex = devices.findIndex(
        (device) => device.nodeNum === activeDeviceNum(),
      );
      setDevices(
        (device) => device.nodeNum === message.to,
        "messages",
        devices[deviceIndex].messages.length,
        message,
      );
    },
  };

  const deviceUISetters = {
    setActivePage: (page: Page) => {
      setDevices(
        (device) => device.nodeNum === activeDeviceNum(),
        "UI",
        "activePage",
        page,
      );
    },
  };

  return (
    <DeviceContext.Provider
      value={{
        devices,
        deviceSetters,
        activeDevice,
        addDevice,
        setActiveDevice,
        UISetters: deviceUISetters,
      }}
    >
      {props.children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => useContext(DeviceContext)!;
