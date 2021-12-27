import { harmony } from "../../deps.ts";

export type EventImport = {
  default: {
    name: keyof harmony.ClientEvents;
    once: boolean;
    execute(...args: any): void;
  };
};

export type CommandImport = { default: harmony.Command };
