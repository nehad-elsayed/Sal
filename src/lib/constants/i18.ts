import { msg } from "@lingui/core/macro";

export const I18N_DEFAULT_LANGUAGE = "en";

export const I18N_LANGUAGES = [
  {
    label: msg`English`,
    value: "en",
    shortLabel: "EN",
  },
  {
    label: msg`العربية`,
    value: "ar",
    shortLabel: "AR",
  },
] as const;

export type I18N_LANGUAGE = (typeof I18N_LANGUAGES)[number];
