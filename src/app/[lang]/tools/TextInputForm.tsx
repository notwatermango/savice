"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { Checkbox } from "~/components/ui/checkbox";
import { useState } from "react";

const FormSchema = z.object({
  chatData: z.string().min(1, {
    message: "Paste chat data here",
  }),
  options: z.object({
    includeTranslation: z.boolean().default(true),
    includeSentimentAnalysis: z.boolean().default(false),
    includeReplySuggestion: z.boolean().default(false),
    includeTextSummarization: z.boolean().default(false),
  }),
});

interface InputDataFormProps {
  handleSubmit: (data: z.infer<typeof FormSchema>) => void;
  t: (key: string) => string;
}

export function InputDataForm({ handleSubmit, t }: InputDataFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      chatData: "",
      options: {
        includeTranslation: true,
        includeSentimentAnalysis: false,
        includeReplySuggestion: false,
        includeTextSummarization: false,
      },
    },
  });

  const [errorMessage, setErrorMessage] = useState("");

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    if (
      !data.options.includeTranslation &&
      !data.options.includeSentimentAnalysis &&
      !data.options.includeReplySuggestion &&
      !data.options.includeTextSummarization
    ) {
      setErrorMessage("Please select at least one option.");
      return;
    }
    setErrorMessage("");
    handleSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="chatData"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Chat data</FormLabel> */}
              <FormControl>
                <Textarea
                  placeholder={t("text-placeholder")}
                  className="h-96 resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormField
            control={form.control}
            name="options"
            render={({}) => (
              <FormItem>
                <FormLabel className={errorMessage ? "text-destructive" : ""}>
                  {t("options")}
                </FormLabel>
                <FormField
                  control={form.control}
                  name="options.includeTranslation"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>{t("translation")}</FormLabel>
                        <FormDescription>
                          {t("translation-detail")}
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="options.includeSentimentAnalysis"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>{t("sentiment")}</FormLabel>
                        <FormDescription>
                          {t("sentiment-detail")}
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="options.includeReplySuggestion"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>{t("suggestion")}</FormLabel>
                        <FormDescription>
                          {t("suggestion-detail")}
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="options.includeTextSummarization"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>{t("summarize")}</FormLabel>
                        <FormDescription>
                          {t("summarize-detail")}
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                {errorMessage && (
                  <div className="text-destructive">{errorMessage}</div>
                )}
              </FormItem>
            )}
          />
        </div>
        <FormDescription>{t("instruction")}</FormDescription>
        <Button type="submit">{t("submit")}</Button>
      </form>
    </Form>
  );
}
