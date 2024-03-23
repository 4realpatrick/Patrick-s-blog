"use client";
import { LocaleContext } from "@/components/dictionary-provider";
import React, { useContext } from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh";
import { getFormatterByLocale } from "@/lib/time";
import { FaCalendar } from "react-icons/fa";

export const BlogDate = ({ date }: { date: string }) => {
  const locale = useContext(LocaleContext);
  return (
    <div className="flex items-center gap-2">
      <FaCalendar className="text-muted-foreground" />
      {dayjs(date).locale(locale).format(getFormatterByLocale(locale))}
    </div>
  );
};
