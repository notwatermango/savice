"use client";

import { type NextPage } from "next";
import { TextareaForm } from "./TextInputForm";
import { useState } from "react";

const Page: NextPage = () => {
  const [analysis, setAnalysis] = useState<string>("");
  const handleSubmit = (data: { chatData: string }) => {
    console.log(data);
    setAnalysis(data.chatData);
  };

  return (
    <div className="flex flex-row py-6">
      <TextareaForm handleSubmit={handleSubmit} />
      <div>hi this is the analysis {analysis}</div>
    </div>
  );
};

export default Page;
