import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

import { format as formatDate, formatDistance, formatRelative, isDate } from "date-fns";
import { enUS as en, et as ee, lv, lt } from "date-fns/locale";

const locales = { en, ee, lv, lt };

i18n
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: process.env.REACT_APP_LOCALE,
    debug: true,

    interpolation: {
      format: (value, format, lng) => {
        if (isDate(value)) {
          const locale = locales[lng];

          if (format === "short") return formatDate(value, "P", { locale });
          if (format === "long") return formatDate(value, "PPP", { locale });
          if (format === "relative") return formatRelative(value, new Date(), { locale });
          if (format === "ago")
            return formatDistance(value, new Date(), {
              locale,
              addSuffix: true,
            });

          return formatDate(value, format, { locale });
        }

        return value;
      },
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
