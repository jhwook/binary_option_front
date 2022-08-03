import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import kr from "./kr.json";

const lng = localStorage.getItem("lng");

const resources = {
  en: {
    translation: en,
  },
  kr: {
    translation: kr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: lng || "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
