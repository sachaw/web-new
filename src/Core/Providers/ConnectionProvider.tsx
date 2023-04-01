import { Types } from "@meshtastic/meshtasticjs";
import {
  Accessor,
  Component,
  JSX,
  Setter,
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";
import { useDevice } from "./DeviceProvider.jsx";

export interface ConnectionProviderProps {
  children: JSX.Element;
}

export interface ConnectionContextProps {
  connections: ConnectionState[];
  addConnection: (connection: Types.ConnectionType) => void;
  getActiveConnection: (nodeNum: number) => ConnectionState | undefined;
}

interface ConnectionState {
  connection: Types.ConnectionType;
  registered: boolean;
  nodeNum: number;
}

const ConnectionContext = createContext<ConnectionContextProps>();

export const ConnectionProvider: Component<ConnectionProviderProps> = (
  props,
) => {
  const [connections, setConnections] = createStore<ConnectionState[]>([]);
  const { activeDevice, deviceSetters, addDevice } = useDevice();

  const addConnection = (connection: Types.ConnectionType) => {
    setConnections(connections.length, {
      connection,
      registered: false,
    });
  };

  const getActiveConnection = () => {
    return connections.find(
      (connection) => connection.nodeNum === activeDevice()?.nodeNum,
    );
  };

  createEffect(() => {
    connections.map((connection, index) => {
      if (!connection.registered) {
        setConnections(index, "registered", true);
        connection.connection.events.onNodeInfoPacket.subscribe(
          (nodeInfoPacket) => {
            deviceSetters.setNodeInfo(connection.nodeNum, nodeInfoPacket);
          },
        );

        connection.connection.events.onMyNodeInfo.subscribe(
          (myNodeInfoPacket) => {
            setConnections(index, "nodeNum", myNodeInfoPacket.myNodeNum);
            addDevice(myNodeInfoPacket.myNodeNum);
            deviceSetters.setMyNodeInfo(connection.nodeNum, myNodeInfoPacket);
          },
        );

        connection.connection.events.onChannelPacket.subscribe(
          (channelPacket) => {
            deviceSetters.setChannel(connection.nodeNum, channelPacket);
          },
        );

        connection.connection.events.onConfigPacket.subscribe(
          (configPacket) => {
            deviceSetters.setConfig(connection.nodeNum, configPacket);
          },
        );

        connection.connection.events.onModuleConfigPacket.subscribe(
          (moduleConfigPacket) => {
            deviceSetters.setModuleConfig(
              connection.nodeNum,
              moduleConfigPacket,
            );
          },
        );

        connection.connection.events.onPositionPacket.subscribe(
          (positionPacket) => {
            deviceSetters.setPosition(
              connection.nodeNum,
              positionPacket.from,
              positionPacket.data,
            );
          },
        );
      }
    });
  });

  return (
    <ConnectionContext.Provider
      value={{ connections, addConnection, getActiveConnection }}
    >
      {props.children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => useContext(ConnectionContext)!;
