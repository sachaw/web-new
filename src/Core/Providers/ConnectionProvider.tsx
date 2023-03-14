import { Types } from "@meshtastic/meshtasticjs";
import {
  Accessor,
  Component,
  JSX,
  Setter,
  createContext,
  createSignal,
  useContext,
} from "solid-js";

export interface ConnectionProviderProps {
  children: JSX.Element;
}

export type ConnectionContextProps = [
  connections: Accessor<Types.ConnectionType[]>,
  setConnections: Setter<Types.ConnectionType[]>,
];

const ConnectionContext = createContext<ConnectionContextProps>();

export const ConnectionProvider: Component<ConnectionProviderProps> = (
  props,
) => {
  const [connections, setConnections] = createSignal([]);

  return (
    <ConnectionContext.Provider value={[connections, setConnections]}>
      {props.children}
    </ConnectionContext.Provider>
  );
};

export const useConnections = () => useContext(ConnectionContext)!;
