

import { type ReactNode, useEffect } from "react";
import { i18n } from "@lingui/core";
import { I18nProvider as Lingui18nProvider } from "@lingui/react";

import { I18N_DEFAULT_LANGUAGE, type  I18N_LANGUAGE } from "@/lib/constants/i18";
import { dynamicActivate } from "@/lib/i18n/dynamicActivate";

interface Props {
  children: ReactNode;
}

export default function I18nProvider({ children }: Readonly<Props>) {
  useEffect(() => {
    const storedLocale = localStorage.getItem("i18n-language") as I18N_LANGUAGE["value"] | null;
    const language = storedLocale ?? I18N_DEFAULT_LANGUAGE;
    void dynamicActivate(storedLocale ?? I18N_DEFAULT_LANGUAGE);
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
  }, []);

  return <Lingui18nProvider i18n={i18n}>{children}</Lingui18nProvider>;
}
