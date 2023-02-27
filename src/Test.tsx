import { Component } from "solid-js";
import { ISerialConnection } from "@meshtastic/meshtasticjs";
import {openDB} from "idb"

const db = await openDB("meshtastic", 1, {
  upgrade(db, oldVersion, newVersion, transaction, event) {
    // console.log('Creating a new object store.');
    // if (!upgradeDb.objectStoreNames.contains('firstOS')) {
    //   upgradeDb.createObjectStore('firstOS');
    // }
    // …
  },
  blocked(currentVersion, blockedVersion, event) {
    // …
  },
  blocking(currentVersion, blockedVersion, event) {
    // …
  },
  terminated() {
    // …
  },
});

export const Test: Component = () => {
  const connection = new ISerialConnection();


  connection.events.onNodeInfoPacket.subscribe((nodeInfo) => {
    console.log("Node Info", nodeInfo);
  });

  return (
    <div>
      <button
        onClick={() =>
          connection.connect({
            concurrentLogOutput: false,
          })
        }
      >
        Connect
      </button>
    </div>
  );
};
