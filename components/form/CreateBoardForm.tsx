"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createboard } from "@/actions/board/createboard";
import { cn } from "@/lib/utils";
import { useCreateBoardModal } from "@/hooks/useCreateBoardModal";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "name must be at least 3 characters.",
  }),
});

export function BoardForm({ image }: { image: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const {onClose} = useCreateBoardModal()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

 async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    createboard({name:values.name, image:image})
    form.reset( )
    onClose()
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-slate-300 text-black"
                  placeholder="board name"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className={cn("text-center w-full disabled:opacity-50")} type="submit">
          Create
        </Button>
      </form>
    </Form>
  );
}
