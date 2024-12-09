import * as z from "zod";

export const AccountTypeSchema = z.object({
  id: z.number().int(),
  label: z.string().min(1, {
    message: "Le label est requis",
  }),
});
