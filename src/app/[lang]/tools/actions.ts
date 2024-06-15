/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use server";

import { env } from "~/env";
import { type Chat, type ChatPromptData } from "./type";
import extract from "extract-json-from-string";

import { OpenAI } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

export async function prompt(data: ChatPromptData) {
  const { chatData, options } = data;
  const {
    includeTranslation,
    includeSentimentAnalysis,
    includeReplySuggestion,
    includeTextSummarization,
  } = options;

  const translateResponse = await translate(chatData, "id");
  console.log(translateResponse.originLanguage);
  const summaryResponse = await summary(chatData, "id");
  console.log(summaryResponse.summary);
  const sentimentResponse = await sentimentAnalysis(chatData, "id");
  console.log(sentimentResponse.sentiment);
  const recommendationResponse = await recommendation(
    data,
    summaryResponse.summary,
    translateResponse.originLanguage,
    "id",
  );
  console.log(recommendationResponse.replyJson);

  return {
    type: "json",
    data: {
      ...(includeTranslation && translateResponse),
      ...(includeReplySuggestion && recommendationResponse),
      ...(includeSentimentAnalysis && sentimentResponse),
      ...(includeTextSummarization && summaryResponse),
    },
  };
}

export async function summary(chat: string, lang: string) {
  const apiKey = env.OPENAI_BEARER;
  const promptSummary = `Help me summarize the following chat data
  You can only reply in this format, showing the summarized text in a bullet point but formatted into an array of strings in JSON
  {
    "summary": ["bullet1", "bullet2"]
  }
  Your output will be validated by the system, so don't add any extra text

  Your response should be in the language: ${lang}
  Summarize the following chat data:
  ${chat}
  `;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: promptSummary,
        },
      ],
    }),
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const resJson = await res.json();
  console.log(resJson);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const summary = extract(resJson.choices[0].message.content)[0] as {
    summary: string[];
  };
  return summary;
}

export async function sentimentAnalysis(chat: string, lang: string) {
  const apiKey = env.OPENAI_BEARER;
  const promptSentiment = `Help me analyze the sentiment of the following chat data,
  You can only reply in this format, showing the sentiment of the chat data ranging from 1 to 7
  where 1 is very negative and 7 is very positive
  {
    "sentiment": 3
  }
  Your output will be validated by the system, so don't add any extra text

  Your response should be in the language: ${lang}
  Analyze the sentiment of the following chat data:
  ${chat}
  `;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: promptSentiment,
        },
      ],
    }),
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const resJson = await res.json();
  console.log(resJson);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const sentiment = extract(resJson.choices[0].message.content)[0] as {
    sentiment: number;
  };
  return sentiment;
}

export async function recommendation(
  data: ChatPromptData,
  summary: string,
  orilang: string,
  lang: string,
) {
  const { chat, options } = data;

  const apiKey = env.OPENAI_BEARER;
  const promptRecommendation = `Imagine you are a helpful customer service agent replying to a customer.
  The customer has asked a question or made a statement in the chat data below.
  The data may be a chat, email, or any other form of text communication.
  You can only reply in this format, showing the recommended reply text with different responses
  {
    "targetLanguageReply": {
      "informativeReply": yourInformativeReply,
      "affirmingReply": yourAffirmingReply,
      "denyingReply": denyingReply,
    },
    "originLanguageReply":{
      "informativeReply": yourInformativeReply,
      "affirmingReply": yourAffirmingReply,
      "denyingReply": denyingReply,
    }
  }
  informativeReply should answer the question informatively, or ask more information from the user depending on the context
  affirmingReply should reply that affirm the customer's statement or question
  denyingReply should deny the customer's statement or question
  Your output will be validated by the system, so don't add any extra text

  Your output should be then translated to targetLanguage ${lang},
  and the originLanguage of the chat

  The originLanguage should be in ${orilang}
  The targetLanguage should be in ${lang}
  
  It will be used to recommend a reply to the following chat data replying to a customer as a customer service agent
  So if they give long text, you can summarize it and reply accordingly
  Below is the chat:
  ${chat}
  Here is the important part of the chat that need to be addressed in your reply:
  ${summary}
  `;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: promptRecommendation,
        },
      ],
    }),
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const resJson = await res.json();
  console.log(resJson);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  const replyJson = extract(resJson.choices[0].message.content)[0] as {
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
  return {
    replyJson,
    type: "json",
  };
}

export async function translate(chat: string, lang: string) {
  const apiKey = env.OPENAI_BEARER;
  const promptTranslation = `Help me translate this in a form of JSON, 
  and detect what language is the data in
  You can only reply in this format, showing the translated text and the origin language
  {
    "translatedText": yourTranslatedText,
    "originLanguage": yourOriginLanguage
  }

  Your output will be validated by the system, so don't add any extra text

  Translate the following text to language ${lang} and detect the origin language

  Here is the data to translate
  ${chat}
  `;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: promptTranslation,
        },
      ],
    }),
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const resJson = await res.json();
  console.log(resJson);
  // const translated = resJson.choices[0].message.content;
  const translatedJson = extract(resJson.choices[0].message.content)[0] as {
    translatedText: string;
    originLanguage: string;
  };
  console.log("What");
  console.log(translatedJson);
  return translatedJson;
}
