import React from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <select
      value={i18n.language}
      onChange={handleChange}
      className="px-2 py-1.5 text-[13px] font-[600] border border-[#E5E7EB] dark:border-[#1F2937] dark:bg-[#1F2937] rounded text-[#111927] dark:text-white outline-none cursor-pointer"
    >
      {LANGUAGES.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageToggle;
