import { Component } from "solid-js";
import { hashicon, Params } from "@emeraldpay/hashicon";

export interface HashiconProps {
  hash: string | number;
  options?: Partial<Params>;
  class?: string;
}

export const Hashicon: Component<HashiconProps> = (params) => {
  const hash =
    typeof params.hash === "number" ? params.hash.toString() : params.hash;
  const icon = hashicon(hash, params.options);

  return <img src={icon.toDataURL()} alt={hash} class={params.class} />;
};
