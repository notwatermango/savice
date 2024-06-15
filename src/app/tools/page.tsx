"use client";

import { type NextPage } from "next";
import { InputDataForm } from "./TextInputForm";
import { useState } from "react";

const Page: NextPage = () => {
  const [analysis, setAnalysis] = useState<string>("");
  const handleSubmit = (data: { chatData: string }) => {
    console.log(data);
    setAnalysis(data.chatData);
  };

  return (
    <div className="flex flex-col gap-x-6 py-6 lg:flex-row">
      <div className="flex-1">
        <InputDataForm handleSubmit={handleSubmit} />
      </div>
      <div className="flex-1">
        <div>hi this is the analysis {analysis}</div>
      </div>
    </div>
  );
};

export default Page;
