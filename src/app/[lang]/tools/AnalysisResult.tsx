import { useEffect } from "react";
import { type AllData } from "./page";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { toast } from "~/components/ui/use-toast";
import Image from "next/image";

interface AnalysisResultProps {
  data: AllData;
  t: (key: string) => string;
}

export default function AnalysisResult({ data, t }: AnalysisResultProps) {
  useEffect(() => {
    console.log(data);
  }, [data]);
  const allData = data;
  return (
    <div className="mt-12 flex flex-col gap-2 lg:mt-0">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {t("output")}
      </h3>
      {allData.originLanguage && (
        // translation is ON
        <Card>
          <CardHeader>
            <CardTitle>{t("otranslation")}</CardTitle>
          </CardHeader>
          <CardContent
            className="cursor-pointer hover:text-gray-300 active:text-gray-400"
            onClick={async () => {
              await navigator.clipboard.writeText(allData.translatedText!);
              toast({
                title: "Copied to clipboard",
                duration: 1000,
              });
            }}
          >
            {allData.translatedText}
          </CardContent>
        </Card>
      )}
      {allData.sentiment && (
        // sentiment analysis is ON
        <Card>
          <CardHeader>
            <CardTitle>{t("osentiment")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row justify-center gap-x-8">
              <Image
                src="https://i.ibb.co.com/4N8rDrk/sent1.png"
                alt="sent1"
                width="64"
                height="64"
                className={allData.sentiment === 1 ? "" : "opacity-10"}
              />
              <Image
                src="https://i.ibb.co.com/yPzBDWG/sent2.png"
                alt="sent1"
                width="64"
                height="64"
                className={allData.sentiment === 2 ? "" : "opacity-10"}
              />
              <Image
                src="https://i.ibb.co.com/QmQhYzp/sent3.png"
                alt="sent1"
                width="64"
                height="64"
                className={allData.sentiment === 3 ? "" : "opacity-10"}
              />
              <Image
                src="https://i.ibb.co.com/X4XKvgy/sent4.png"
                alt="sent1"
                width="64"
                height="64"
                className={allData.sentiment === 4 ? "" : "opacity-10"}
              />
              <Image
                src="https://i.ibb.co.com/tp6gFwd/sent5.png"
                alt="sent1"
                width="64"
                height="64"
                className={allData.sentiment === 5 ? "" : "opacity-10"}
              />
            </div>
          </CardContent>
        </Card>
      )}
      {allData.summary && (
        // text summarization is ON
        <Card>
          <CardHeader>
            <CardTitle>{t("osummary")}</CardTitle>
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
                <div className="basis-1/2 text-gray-400">{t("translated")}</div>
              </div>
              <div className="flex w-full flex-row gap-2">
                <div
                  className="basis-1/2 cursor-pointer hover:text-gray-300 active:text-gray-400"
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      allData.replyJson!.originLanguageReply.informativeReply,
                    );
                    toast({
                      title: "Copied to clipboard",
                      duration: 1000,
                    });
                  }}
                >
                  {allData.replyJson.originLanguageReply.informativeReply}
                </div>
                <div
                  className="basis-1/2 cursor-pointer hover:text-gray-300 active:text-gray-400"
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      allData.replyJson!.originLanguageReply.informativeReply,
                    );
                    toast({
                      title: "Copied to clipboard",
                      duration: 1000,
                    });
                  }}
                >
                  {allData.replyJson.targetLanguageReply.informativeReply}
                </div>
              </div>
              <div className="flex w-full flex-row gap-2">
                <div
                  className="basis-1/2 cursor-pointer hover:text-gray-300 active:text-gray-400"
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      allData.replyJson!.originLanguageReply.affirmingReply,
                    );
                    toast({
                      title: "Copied to clipboard",
                      duration: 1000,
                    });
                  }}
                >
                  {allData.replyJson.originLanguageReply.affirmingReply}
                </div>
                <div
                  className="basis-1/2 cursor-pointer hover:text-gray-300 active:text-gray-400"
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      allData.replyJson!.originLanguageReply.affirmingReply,
                    );
                    toast({
                      title: "Copied to clipboard",
                      duration: 1000,
                    });
                  }}
                >
                  {allData.replyJson.targetLanguageReply.affirmingReply}
                </div>
              </div>
              <div className="flex w-full flex-row gap-2">
                <div
                  className="basis-1/2 cursor-pointer hover:text-gray-300 active:text-gray-400"
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      allData.replyJson!.originLanguageReply.denyingReply,
                    );
                    toast({
                      title: "Copied to clipboard",
                      duration: 1000,
                    });
                  }}
                >
                  {allData.replyJson.originLanguageReply.denyingReply}
                </div>
                <div
                  className="basis-1/2 cursor-pointer hover:text-gray-300 active:text-gray-400"
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      allData.replyJson!.originLanguageReply.denyingReply,
                    );
                    toast({
                      title: "Copied to clipboard",
                      duration: 1000,
                    });
                  }}
                >
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
