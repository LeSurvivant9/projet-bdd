"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { createAccount } from "@/actions/account.actions";
import bcrypt from "bcryptjs";
import { AccountSchema } from "@/schemas/account";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllAccountTypes } from "@/actions/account-type.actions";
import SubmitButton from "@/components/submit-button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export function AccountForm() {
  const queryClient = useQueryClient();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const { data: accountsTypes } = useQuery({
    queryKey: ["accountsTypes"],
    queryFn: async () => await getAllAccountTypes(),
  });

  const mutation = useMutation({
    mutationFn: createAccount,
    onSuccess: (response) => {
      setSuccess(response.success);
      setError(response.error);
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (e) => {
      setError(e?.message || "Une erreur inattendue s'est produite.");
    },
  });

  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      email: "",
      hashedPassword: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof AccountSchema>) {
    setError("");
    setSuccess("");
    const hashedPassword = await bcrypt.hash(values.hashedPassword, 10);
    const data = {
      ...values,
      hashedPassword,
    };

    startTransition(() => {
      mutation.mutate(data, {
        onSettled: () => {
          form.reset();
        },
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type={"email"}
                  placeholder="example@test.domain"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                L&apos;adresse mail de votre compte.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hashedPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <div className={"flex items-center"}>
                <FormControl>
                  <Input
                    type={isPasswordVisible ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <Button
                  type={"button"}
                  className={"ml-1"}
                  variant={"ghost"}
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  title={
                    isPasswordVisible
                      ? "Masquer mot de passe"
                      : "Afficher mot de passe"
                  }
                >
                  {isPasswordVisible ? (
                    <FaEyeSlash className={""} size={"1.5em"} />
                  ) : (
                    <FaEye className={""} size={"1.5em"} />
                  )}
                </Button>
              </div>
              <FormDescription>
                Le mot de passe de votre compte.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountTypeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de compte</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(Number(value));
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type de compte" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type de compte</SelectLabel>
                    {accountsTypes?.map((accountType) => {
                      return (
                        <SelectItem
                          key={accountType.id}
                          value={String(accountType.id)}
                        >
                          {accountType.label}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormDescription>Type du compte créé</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <SubmitButton isPending={isPending || mutation.isPending}>
          Créer compte
        </SubmitButton>
      </form>
    </Form>
  );
}
