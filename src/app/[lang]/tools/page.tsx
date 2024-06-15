"use client";

import { InputDataForm } from "./TextInputForm";
import { useState } from "react";
import { useTranslation } from "~/app/i18n/client";
import { prompt } from "./actions";
import { type ChatPromptData } from "./type";
import AnalysisResult from "./AnalysisResult";
import { Loader2 } from "lucide-react";
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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: ChatPromptData) => {
    setLoading(true);
    setAnalysis(null);
    const allData = await prompt(data, lang);
    setLoading(false);
    console.log(allData);
    setAnalysis(allData.data);
  };

  const { t } = useTranslation(lang, "tools", {});

  return (
    <div className="flex flex-col gap-x-6 py-2 lg:grid lg:grid-cols-2">
      <div className="flex-1 lg:col-span-1">
        <h3 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight">
          {t("input")}
        </h3>
        <InputDataForm handleSubmit={handleSubmit} t={t} loading={loading} />
      </div>
      <div className="flex-1 flex-row text-wrap lg:col-span-1">
        {!analysis && !loading && (
          <div className="flex h-full w-full items-center justify-center text-center text-gray-700">
            {t("noAnalysis")}
          </div>
        )}
        {loading && (
          <div className="flex h-full w-full items-center justify-center text-center text-gray-700">
            Loading <Loader2 className="ml-2 h-6 w-6 animate-spin" />
          </div>
        )}
        {analysis && <AnalysisResult data={analysis} t={t} />}
      </div>
    </div>
  );
}
