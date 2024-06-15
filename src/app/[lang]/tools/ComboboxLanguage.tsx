"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Globe } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "~/app/i18n/client";

const FormSchema = z.object({
  language: z.string({
    required_error: "Please select a language.",
  }),
});

const languages = [
  { label: "English", value: "en" },
  { label: "Bahasa Indonesia", value: "id" },
];

export function ComboboxForm({ lang }: { lang: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      language: lang,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // router.replace(`${data.language}`);
    // http://localhost:3000/id/tools

    // change tools to a dynamic variable get from pathname

    router.push(`/${data.language}/${pathname.substring(4)}`);
    router.refresh();
  }

  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              {/* <FormLabel>Language</FormLabel> */}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "flex gap-2",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <Globe height={24} />
                      {field.value
                        ? languages
                            .find((language) => language.value === field.value)
                            ?.value.toUpperCase()
                        : "Select language"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {languages.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={async () => {
                            form.setValue("language", language.value);
                            await form.handleSubmit(onSubmit)();
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              language.value === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {language.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
