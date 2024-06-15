import { useEffect } from "react";
import { type AllData } from "./page";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Dot } from "lucide-react";

interface AnalysisResultProps {
  data: AllData;
}

export default function AnalysisResult({ data }: AnalysisResultProps) {
  useEffect(() => {
    console.log(data);
  }, [data]);
  const allData = data;
  return (
    <div className="mt-12 flex flex-col gap-2 lg:mt-0">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Output
      </h3>
      {allData.originLanguage && (
        // translation is ON
        <Card>
          <CardHeader>
            <CardTitle>Translation</CardTitle>
          </CardHeader>
          <CardContent>{allData.translatedText}</CardContent>
        </Card>
      )}
      {allData.sentiment && (
        // sentiment analysis is ON
        <Card>
          <CardHeader>
            <CardTitle>Sentiment</CardTitle>
          </CardHeader>
          <CardContent>Sentiment: {allData.sentiment}</CardContent>
        </Card>
      )}
      {allData.summary && (
        // text summarization is ON
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="ms-4 list-outside list-disc">
              {allData.summary?.map((summary, index) => (
                <li key={index}>{summary}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      {allData.replyJson && (
        // reply suggestion is ON
        <Card>
          <CardHeader>
            <CardTitle>Reply Suggestion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex w-full flex-row">
                <div className="basis-1/2 text-gray-400">Original</div>
                <div className="basis-1/2 text-gray-400">Translated</div>
              </div>
              <div className="flex w-full flex-row">
                <div className="basis-1/2">
                  {allData.replyJson.originLanguageReply.informativeReply}
                </div>
                <div className="basis-1/2">
                  {allData.replyJson.targetLanguageReply.informativeReply}
                </div>
              </div>
              <div className="flex w-full flex-row">
                <div className="basis-1/2">
                  {allData.replyJson.originLanguageReply.affirmingReply}
                </div>
                <div className="basis-1/2">
                  {allData.replyJson.targetLanguageReply.affirmingReply}
                </div>
              </div>
              <div className="flex w-full flex-row">
                <div className="basis-1/2">
                  {allData.replyJson.originLanguageReply.denyingReply}
                </div>
                <div className="basis-1/2">
                  {allData.replyJson.targetLanguageReply.denyingReply}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
