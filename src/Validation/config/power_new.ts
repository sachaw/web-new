import { validator } from '@modular-forms/solid';
import { object, number, boolean, string, ObjectSchema } from 'yup'
import type { Protobuf } from "@meshtastic/meshtasticjs";
import { createForm } from '@felte/solid';

export const PowerValidation: ObjectSchema<Omit<Protobuf.Config_PowerConfig, keyof Protobuf.native.Message>> = object({
  isPowerSaving: boolean().required(),
  onBatteryShutdownAfterSecs: number().required(),
  adcMultiplierOverride:  number().required(),
  waitBluetoothSecs: number().required(),
  meshSdsTimeoutSecs: number().required(),
  sdsSecs: number().required(),
  lsSecs: number().required(),
  minWakeSecs: number().required(),
})