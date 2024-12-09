"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { AccountTypeSchema } from "@/schemas/account-type";
import { getErrorMessage } from "@/lib/utils";

export const getAccountType = async (label: string) => {
  return prisma.accountType.findUnique({
    where: { label },
  }) as Promise<z.infer<typeof AccountTypeSchema>>;
};

export const getAllAccountTypes = async () => {
  return prisma.accountType.findMany() as Promise<
    z.infer<typeof AccountTypeSchema>[]
  >;
};
export const createAccountType = async (
  data: z.infer<typeof AccountTypeSchema>,
) => {
  const response: {
    success: string;
    error: string;
    accountType: z.infer<typeof AccountTypeSchema> | null;
  } = { success: "", error: "", accountType: null };
  const existingAccountType = await getAccountType(data.label);
  if (existingAccountType) {
    response.error = "Type de compte déjà existant";
    return response;
  }
  try {
    await prisma.$transaction(async (prisma) => {
      const accountType = await prisma.accountType.create({
        data,
      });
      response.success = "Type de compte créé avec succès";
      response.accountType = accountType;
    });
  } catch (e) {
    response.error = await getErrorMessage(e);
  }
  return response;
};

export const updateAccountType = async (
  data: z.infer<typeof AccountTypeSchema>,
) => {
  const response: {
    success: string;
    error: string;
    accountType: z.infer<typeof AccountTypeSchema> | null;
  } = { success: "", error: "", accountType: null };
  try {
    const accountType = await prisma.accountType.update({
      where: { id: data.id },
      data,
    });
    response.success = "Type de compte mis à jour avec succès";
    response.accountType = accountType;
  } catch (e) {
    response.error = await getErrorMessage(e);
  }
  return response;
};

export const deleteAccountType = async (id: number) => {
  const response: {
    success: string;
    error: string;
  } = { success: "", error: "" };
  try {
    await prisma.accountType.delete({
      where: { id },
    });
    response.success = "Type de compte supprimé avec succès";
  } catch (e) {
    response.error = await getErrorMessage(e);
  }
  return response;
};

export const dropAccountTypes = async () => {
  await prisma.$transaction(async (prisma) => {
    await prisma.$executeRaw`TRUNCATE TABLE account_type RESTART IDENTITY CASCADE;`;
  });
};
