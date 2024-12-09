import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Prisma } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = async (error: unknown) => {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return error instanceof Error
      ? error.message
      : "Une erreur inconnue s'est produite";
  }

  switch (error.code) {
    case "P2002":
      return "Entité déjà existante";
    case "P2025":
      return "Entité introuvable";
    default:
      return "Une erreur s'est produite" + error.message;
  }
};
