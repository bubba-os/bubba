"use client";

import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import { useI18n } from "@/locales/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bubba/ui/select";
import { Globe } from "lucide-react";

const languages = {
  en: "English",
  no: "Norsk",
} as const;

export const LocaleSwitch = () => {
  const t = useI18n();
  const locale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  return (
    <div className="flex items-center relative">
      <Select
        defaultValue={locale}
        onValueChange={(value: keyof typeof languages) => changeLocale(value)}
      >
        <SelectTrigger className="w-full pl-6 pr-3 py-1.5 bg-transparent outline-none capitalize h-[32px] text-xs">
          <SelectValue placeholder={t("language.placeholder")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.entries(languages).map(([code, name]) => (
              <SelectItem key={code} value={code} className="capitalize">
                {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="absolute left-2 pointer-events-none">
        <Globe size={12} />
      </div>
    </div>
  );
};
