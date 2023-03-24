import { DeviceNameDialog } from "@components/Dialog/DeviceNameDialog.jsx";
import { NewDeviceDialog } from "@components/Dialog/NewDeviceDialog.jsx";
import { QRDialog } from "@components/Dialog/QRDialog.jsx";
import { JSX, createContext, createSignal, useContext } from "solid-js";

export interface DialogProviderProps {
  children: JSX.Element;
}
export type RegisteredDialogs = "newDevice" | "QRCode" | "deviceName";

export interface DialogContextProps {
  dialog: (dialog: RegisteredDialogs) => boolean;
  setDialog: (dialog: RegisteredDialogs, state: boolean) => void;
}

const DialogContext = createContext<DialogContextProps>();

export const DialogProvider = (props: DialogProviderProps) => {
  const [dialogs, setDialogs] = createSignal<Map<RegisteredDialogs, boolean>>(
    new Map(),
  );

  const setDialog = (dialog: RegisteredDialogs, state: boolean) => {
    const newDialogs = new Map(dialogs());
    newDialogs.set(dialog, state);
    setDialogs(newDialogs);
  };

  const dialog = (dialog: RegisteredDialogs) => {
    return dialogs().get(dialog) ?? false;
  };

  return (
    <DialogContext.Provider value={{ dialog, setDialog }}>
      <NewDeviceDialog
        isOpen={dialog("newDevice")}
        onOpenChange={(open) => setDialog("newDevice", open)}
      />
      <QRDialog
        isOpen={dialog("QRCode")}
        onOpenChange={(open) => setDialog("QRCode", open)}
      />
      <DeviceNameDialog
        isOpen={dialog("deviceName")}
        onOpenChange={(open) => setDialog("deviceName", open)}
      />
      {props.children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext)!;
