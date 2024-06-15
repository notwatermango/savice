"use client";

import { InputDataForm } from "./TextInputForm";
import { useState } from "react";
import { useTranslation } from "~/app/i18n/client";
import { prompt } from "./actions";
import { type ChatPromptData } from "./type";
import AnalysisResult from "./AnalysisResult";
export interface AllData {
  translatedText?: string;
  originLanguage?: string;
  replyJson?: {
    targetLanguageReply: {
      informativeReply: string;
      affirmingReply: string;
      denyingReply: string;
    };
    originLanguageReply: {
      informativeReply: string;
      affirmingReply: string;
      denyingReply: string;
    };
  };
  type?: string;
  sentiment?: number;
  summary?: string[];
}

export default function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const [analysis, setAnalysis] = useState<AllData | null>(null);

  const handleSubmit = async (data: ChatPromptData) => {
    console.log(data);
    const allData = (await prompt(data)) as AllData;
    setAnalysis(allData);
  };
  const { t } = useTranslation(lang, "tools", {});

  return (
    <div className="flex flex-col gap-x-6 py-2 lg:grid lg:grid-cols-2">
      <div className="flex-1 lg:col-span-1">
        <InputDataForm handleSubmit={handleSubmit} />
      </div>
      <div className="flex-1 flex-row text-wrap lg:col-span-1">
        {!analysis && (
          <div className="flex h-full w-full items-center justify-center text-center text-gray-700">
            {t("noAnalysis")}
          </div>
        )}
        {analysis && <AnalysisResult data={analysis} />}
      </div>
    </div>
  );
}
