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
  const [analysis, setAnalysis] = useState<AllData | null>({
    translatedText:
      "Saudara, tolong bantu saya, komputer saya tidak bisa menyala sejak minggu lalu, apakah kamu tahu cara memperbaikinya? Apakah kamu memiliki garansi? Apakah bisa diperbaiki secara gratis?",
    originLanguage: "zh",
    replyJson: {
      targetLanguageReply: {
        informativeReply:
          "Untuk membantu Anda lebih lanjut, bisakah Anda memberikan informasi lebih lanjut tentang masalah yang Anda alami dengan komputer Anda? Selain itu, harap konfirmasi apakah komputer Anda masih dalam masa garansi.",
        affirmingReply:
          "Ya, jika komputer Anda masih dalam masa garansi, kami akan memberikan perbaikan gratis.",
        denyingReply:
          "Maaf, jika komputer Anda sudah tidak dalam masa garansi, kami tidak dapat menawarkan perbaikan gratis.",
      },
      originLanguageReply: {
        informativeReply:
          "為了進一步幫助您，您能否提供更多有關您的電腦問題的信息？此外，請確認您的電腦是否仍在保修期內。",
        affirmingReply:
          "是的，如果您的電腦仍在保修期內，我們將免費提供維修服務。",
        denyingReply: "抱歉，如果您的電腦已超出保修期，我們無法提供免費維修。",
      },
    },
    type: "json",
    sentiment: 3,
    summary: ["用戶的電腦無法開機", "用戶詢問是否有保固及免費修復"],
  });

  const handleSubmit = async (data: ChatPromptData) => {
    console.log(data);
    const allData = await prompt(data, lang);
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
        <InputDataForm handleSubmit={handleSubmit} t={t} />
      </div>
      <div className="flex-1 flex-row text-wrap lg:col-span-1">
        {!analysis && (
          <div className="flex h-full w-full items-center justify-center text-center text-gray-700">
            {t("noAnalysis")}
          </div>
        )}
        {analysis && <AnalysisResult data={analysis} t={t} />}
      </div>
    </div>
  );
}
