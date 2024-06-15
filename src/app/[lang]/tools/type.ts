export type ChatPromptData = {
  options: {
    includeTranslation: boolean;
    includeSentimentAnalysis: boolean;
    includeReplySuggestion: boolean;
    includeTextSummarization: boolean;
  };
} & Chat;

export type Chat = {
  chatData: string;
};
