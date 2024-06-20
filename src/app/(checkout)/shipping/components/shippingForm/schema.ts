import { z } from "zod";

const shippingForm = z
  .object({
    country: z.string().refine((_value) => {
      // TODO: Add country code validation
      return true;
    }),
    firstName: z
      .string()
      .min(1, "Required")
      .min(2, "Must be at least 2 character")
      .max(50),
    lastName: z
      .string()
      .min(1, "Required")
      .min(2, "Must be at least 2 character")
      .max(50),
    address1: z.string().min(1, "Required"),
    address2: z.string().optional(),
    city: z.string().min(1, "Required"),
    state: z
      .string()
      .min(1, "Required")
      .refine((_value) => {
        // TODO: Add US state validation
        return true;
      }),
    zip: z.coerce
      .string({ message: "Required" })
      .min(1, "Required")
      .refine((value) => {
        if (isNaN(Number(value))) return false;
        if (Number(value) < 501) return false;
        return true;
      }, "Invalid ZIP code"),
    email: z
      .string()
      .min(1, "Required")
      .email()
      .refine((_value) => {
        // TODO: Add MX verification
        return true;
      }),
    phone: z
      .string()
      .min(1, "Required")
      .superRefine((value, ctx) => {
        if (value.replace(/\D/g, "").length < 10) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Must be at least 10 digits",
          });
          return;
        }
        return true;
      })
      .transform((val) => {
        return val.replace(/\D/g, "");
      }),
    emailMarketing: z.boolean(),
    textMarketing: z.boolean(),
  })
  .superRefine((val, _ctx) => {
    return val.country === "US";
  });

type ShippingFormType = z.infer<typeof shippingForm>;

export { shippingForm };
export type { ShippingFormType };
