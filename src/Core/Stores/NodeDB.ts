import { createStore } from "solid-js/store";
import { Protobuf } from "@meshtastic/meshtasticjs";

export const NodeDB = createStore<Protobuf.NodeInfo[]>([]);
