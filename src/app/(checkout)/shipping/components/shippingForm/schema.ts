import { z } from "zod";

const shippingForm = z.object({
  country: z.string().refine((_value) => {
    // TODO: Add country code validation
    return true;
  }),
  firstName: z
    .string()
    .min(2, "Fist Name must be at least 2 character")
    .max(50),
  lastName: z.string().min(2, "Last Name must be at least 2 character").max(50),
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  state: z.string().refine((_value) => {
    // TODO: Add US state validation
    return true;
  }),
  zip: z.coerce.number().refine((_value) => {
    console.log(_value);
    return true;
  }),
  email: z
    .string()
    .email()
    .refine((_value) => {
      // TODO: Add MX verification
      return true;
    }),
  phone: z.string().refine((_value) => {
    console.log(_value);
    if (_value.replace(/\D/g, "").length < 10) {
      return "Phone number must be at least 10 digits";
    }
  }),
  emailMarketing: z.boolean(),
  textMarketing: z.boolean(),
});

type ShippingFormType = z.infer<typeof shippingForm>;

export { shippingForm };
export type { ShippingFormType };
