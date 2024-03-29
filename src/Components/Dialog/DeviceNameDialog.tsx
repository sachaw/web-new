import { Button } from "@components/UI/Button.js";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogProps,
  DialogTitle,
} from "@components/UI/Dialog.js";
import { Input } from "@components/UI/Input.js";
import { Label } from "@components/UI/Label.js";
import { Protobuf } from "@meshtastic/meshtasticjs";
import { Component } from "solid-js";

export interface User {
  longName: string;
  shortName: string;
}

export const DeviceNameDialog: Component<DialogProps> = (props) => {
  // const myNode = nodes.get(hardware.myNodeNum);

  // const { register, handleSubmit } = useForm<User>({
  //   values: {
  //     longName: myNode?.user?.longName ?? "Unknown",
  //     shortName: myNode?.user?.shortName ?? "Unknown"
  //   }
  // });

  // const onSubmit = handleSubmit((data) => {
  //   connection?.setOwner(
  //     new Protobuf.User({
  //       ...myNode?.user,
  //       ...data
  //     })
  //   );
  //   if (props.onOpenChange) {
  //     props.onOpenChange(false);
  //   }

  // });

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogTitle>Change Device Name</DialogTitle>
      <DialogDescription>
        The Device will restart once the config is saved.
      </DialogDescription>
      <div class="gap-4">
        <form>
          <Label>Long Name</Label>
          <Input />
          {/* <Input {...register("longName")} /> */}
          <Label>Short Name</Label>
          <Input />
          {/* <Input maxLength={4} {...register("shortName")} /> */}
        </form>
      </div>
      <DialogFooter>
        <Button>Save</Button>
        {/* <Button onClick={() => onSubmit()}>Save</Button> */}
      </DialogFooter>
    </Dialog>
  );
};
