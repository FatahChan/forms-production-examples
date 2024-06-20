import { z } from "zod";

const shippingForm = z.object({
  firstName: z
    .string()
    .min(1, "Required")
    .min(2, "Must be at least 2 character")
    .max(50),
});
type ShippingFormType = z.infer<typeof shippingForm>;

export { shippingForm };
export type { ShippingFormType };
