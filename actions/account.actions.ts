"use server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { AccountSchema } from "@/schemas/account";
import { getErrorMessage } from "@/lib/utils";

export const getAccount = async (email: string) => {
  return prisma.account.findUnique({
    where: { email },
  }) as Promise<z.infer<typeof AccountSchema>>;
};

export const getAllAccounts = async () => {
  return prisma.account.findMany() as Promise<z.infer<typeof AccountSchema>[]>;
};

export const createAccount = async (data: z.infer<typeof AccountSchema>) => {
  const response: {
    success: string;
    error: string;
    account: z.infer<typeof AccountSchema> | null;
  } = { success: "", error: "", account: null };
  const existingAccount = await getAccount(data.email);
  if (existingAccount) {
    response.error = "Compte déjà existant";
    return response;
  }
  try {
    await prisma.$transaction(async (prisma) => {
      const account = await prisma.account.create({
        data,
      });
      response.success = "Compte créé avec succès";
      response.account = account;
    });
  } catch (e) {
    response.error = await getErrorMessage(e);
  }
  return response;
};
