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
import { useCreateBoardModal } from "@/hooks/useCreateBoardModal";
import { ElementRef, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { createList } from "@/actions/list/createList";
import { toast } from "sonner";
import { createCard } from "@/actions/card/createCard";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "name must be at least 3 characters.",
  }),
});

interface CreateCardFormProps {
  setIsEditing: (value: boolean) => void;
  listId:string
}

export function CreateCardForm({ setIsEditing,listId }: CreateCardFormProps) {
  const inputRef = useRef<ElementRef<"input">>(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const {id} = params
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const res = await createCard(values.name, id as string, listId);
    toast(res.message);
    form.reset();
    setIsEditing(false);
    setIsLoading(false);
    router.refresh()
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl ref={inputRef} className="focus:outline-none">
                <Input
                  className="bg-slate-300 text-black"
                  placeholder="card content"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between mt-2">
          <Button
            className=""
            variant="outline"
            type="button"
            onClick={() => setIsEditing(false)}
          >
            <X />
          </Button>
          <Button type="submit">Add</Button>
        </div>
      </form>
    </Form>
  );
}
