import { z } from "zod";

export const CardSchema = z.object({
  number: z
    .string()
    .min(1, "Card number is required")
    .regex(/^\d{16}$/, "Card number must be 16 digits"),

  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format")
    .refine((val) => {
      const [month, year] = val.split("/").map(Number);
      const expiry = new Date(2000 + year, month - 1, 1);
      const current = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      return expiry >= current;
    }, "Card has expired"),

  cvc: z
    .string()
    .regex(/^\d{3}$/, "CVC must be 3 digits"),

  email: z.email("Invalid email address"),

  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(64, "Name is too long"),

  postalCode: z
    .string()
    .regex(
      /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i,
      "Enter a valid UK postal code"
    ),
});

export type CardFormData = z.infer<typeof CardSchema>;