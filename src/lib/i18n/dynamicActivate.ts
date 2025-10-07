import { i18n } from "@lingui/core";

import { type I18N_LANGUAGE } from "@/lib/constants/i18";

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(locale: I18N_LANGUAGE["value"]) {
  const { messages } = (await import(`../../locales/${locale}/messages.ts`)) as {
    messages: Record<string, string>;
  };
  i18n.load(locale, messages);
  i18n.activate(locale);
}
