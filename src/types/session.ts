import * as v from "valibot";
import { SettingScehma } from "./setting";

export const SessionSchema = v.object({
  setting: SettingScehma,
  query: v.string(),
  document: v.string(),
});

export type Session = v.InferInput<typeof SessionSchema>;
