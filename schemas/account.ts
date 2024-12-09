import * as z from "zod";

export const AccountSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  hashedPassword: z.string().min(1, {
    message: "Veuillez entrer un mot de passe",
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
  accountTypeId: z
    .number({
      required_error: "Le type de compte est requis",
    })
    .int(),
});
