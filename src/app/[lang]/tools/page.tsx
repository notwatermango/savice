"use client";

import { InputDataForm } from "./TextInputForm";
import { useState } from "react";
import { useTranslation } from "~/app/i18n/client";

export default function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const [analysis, setAnalysis] = useState<string>("");
  const handleSubmit = (data: { chatData: string }) => {
    console.log(data);
    setAnalysis(data.chatData);
  };
  const { t } = useTranslation(lang, "tools", {});

  return (
    <div className="flex flex-col gap-x-6 py-6 lg:flex-row">
      <div className="flex-1">
        <InputDataForm handleSubmit={handleSubmit} />
      </div>
      <div className="flex-1 flex-row">{t("title")}</div>
    </div>
  );
}
