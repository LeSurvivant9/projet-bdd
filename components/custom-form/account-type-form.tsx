"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { createAccountType } from "@/actions/account-type.actions";
import { AccountTypeSchema } from "@/schemas/account-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useTransition } from "react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import SubmitButton from "@/components/submit-button";

export function AccountTypeForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createAccountType,
    onSuccess: (response) => {
      setError(response.error);
      setSuccess(response.success);
      queryClient.invalidateQueries({ queryKey: ["accountsTypes"] });
    },
    onError: (e) => {
      setError(e?.message || "Une erreur inattendue s'est produite.");
    },
  });

  const form = useForm<z.infer<typeof AccountTypeSchema>>({
    resolver: zodResolver(AccountTypeSchema),
    defaultValues: {
      label: "",
    },
  });

  function onSubmit(values: z.infer<typeof AccountTypeSchema>) {
    setError("");
    setSuccess("");
    startTransition(() => {
      mutation.mutate(values, {
        onSettled: () => {
          form.reset();
        },
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input type={"text"} placeholder="Free" {...field} />
              </FormControl>
              <FormDescription>Le nom du type de compte.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <SubmitButton isPending={isPending || mutation.isPending}>
          Ajouter un type de compte
        </SubmitButton>
      </form>
    </Form>
  );
}
