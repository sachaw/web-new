import { createStore } from "solid-js/store";
import { Types } from "@meshtastic/meshtasticjs";
import {
  Component,
  JSX,
  createContext,
  createSignal,
  useContext,
} from "solid-js";

export interface ConnectionProviderProps {
  children: JSX.Element;
}

export type ConnectionState = [
  Map<number, Types.ConnectionType>,
  {
    addConnection: (id: number, connection: Types.ConnectionType) => void;
    removeConnection: (id: number) => void;
  },
];

const ConnectionContext = createContext<ConnectionState>([
  new Map(),
  {
    addConnection: (id: number, connection: Types.ConnectionType) => {},
    removeConnection: (id: number) => {},
  },
]);

export const ConnectionProvider: Component<ConnectionProviderProps> = (
  props,
) => {
  const [state, setState] = createSignal(
    new Map<number, Types.ConnectionType>(),
  );

  return (
    <ConnectionContext.Provider
      value={[
        state(),
        {
          addConnection: (id: number, connection: Types.ConnectionType) => {
            setState(state().set(id, connection));
          },
          removeConnection: (id: number) => {
            // setState()
            state().delete(id);
          },
        },
      ]}
    >
      {props.children}
    </ConnectionContext.Provider>
  );
};

export const useConnectionStore = () => useContext(ConnectionContext);
