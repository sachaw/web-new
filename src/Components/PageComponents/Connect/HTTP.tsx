import { Input } from "@ui/Input.jsx";
import { Switch } from "@ui/Switch.jsx";
import { Button } from "@ui/Button.jsx";
import { randId } from "@core/Utils/randId.js";
import { IHTTPConnection } from "@meshtastic/meshtasticjs";
import { Label } from "@ui/Label.jsx";
import { Component } from "solid-js";

export const HTTP: Component = () => {
  // const { register, handleSubmit, control } = useForm<{
  //   ip: string;
  //   tls: boolean;
  // }>({
  //   defaultValues: {
  //     ip: ["client.meshtastic.org", "localhost"].includes(
  //       window.location.hostname
  //     )
  //       ? "meshtastic.local"
  //       : window.location.hostname,
  //     tls: location.protocol === "https:"
  //   }
  // });

  // const TLSEnabled = useWatch({
  //   control,
  //   name: "tls",
  //   defaultValue: location.protocol === "https:"
  // });

  // const onSubmit = handleSubmit((data) => {
  //   const id = randId();
  //   const device = addDevice(id);
  //   setSelectedDevice(id);
  //   const connection = new IHTTPConnection(id);
  //   // TODO: Promise never resolves
  //   void connection.connect({
  //     address: data.ip,
  //     fetchInterval: 2000,
  //     tls: data.tls
  //   });
  //   device.addConnection(connection);
  //   subscribeAll(device, connection);
  // });

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form class="flex w-full flex-col gap-2 p-4">
      <div class="flex h-48 flex-col gap-2">
        <Label>IP Address/Hostname</Label>
        <Input
          // label="IP Address/Hostname"
          prefix="http://"
          // prefix={TLSEnabled ? "https://" : "http://"}
          placeholder="000.000.000.000 / meshtastic.local"
          // {...register("ip")}
        />
        {/* <Controller
          name="tls"
          control={control}
          render={({ field: { value, ...rest } }) => ( */}
        <Label>Use TLS</Label>
        <Switch
        // label="Use TLS"
        // description="Description"
        // disabled={location.protocol === "https:"}
        // checked={value}
        // {...rest}
        />
        {/* )}
        /> */}
      </div>
      <Button>
        <span>Connect</span>
      </Button>
    </form>
  );
};
