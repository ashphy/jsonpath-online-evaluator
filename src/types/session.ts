import * as v from "valibot";
import { SettingSchema } from "./setting";

export const SessionSchema = v.object({
  setting: SettingSchema,
  query: v.string(),
  document: v.string(),
});

export type Session = v.InferInput<typeof SessionSchema>;
