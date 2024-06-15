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
}

export function InputDataForm({ handleSubmit }: InputDataFormProps) {
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
                  placeholder="Paste any text format here"
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
                  Options
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
                        <FormLabel>Include translation</FormLabel>
                        <FormDescription>
                          Translate the chat data into another language.
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
                        <FormLabel>Include sentiment analysis</FormLabel>
                        <FormDescription>
                          Analyze the sentiment of the chat data.
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
                        <FormLabel>Include reply suggestion</FormLabel>
                        <FormDescription>
                          Generate reply suggestions based on the chat data.
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
                        <FormLabel>Include text summarization</FormLabel>
                        <FormDescription>
                          Summarize the chat data into a shorter version.
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
        <FormDescription>
          Please provide the chat data and select the options you want to
          include in the analysis.
        </FormDescription>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
