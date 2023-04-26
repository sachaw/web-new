import { Component } from "solid-js";

export const Topbar: Component = () => {
  return (
    <div class="h-12 w-full flex mx-4">
      <img src="/Logo_White.svg" alt="logo" class="h-12 w-12" />
      <div class="flex gap-2 mx-auto">
        <div class="bg-accent-800 shadow-highlight rounded-md px-2 py-1 my-auto">
          App
        </div>
        <div class="bg-gray-800 shadow-highlight rounded-md px-2 py-1 my-auto">
          Flasher
        </div>
      </div>
    </div>
  );
};
