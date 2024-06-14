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

const FormSchema = z.object({
  chatData: z
    .string()
    .min(10, {
      message: "Chat data must be at least 10 characters.",
    })
    .max(160, {
      message: "Chat data must not be longer than 30 characters.",
    }),
});

interface TextareaFormProps {
  handleSubmit: (data: z.infer<typeof FormSchema>) => void;
}

export function TextareaForm({ handleSubmit }: TextareaFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 space-y-6">
        <FormField
          control={form.control}
          name="chatData"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chat data</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste any text format here"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Choose whether to perform sentiment analysis, text
                summarization, or both below
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
