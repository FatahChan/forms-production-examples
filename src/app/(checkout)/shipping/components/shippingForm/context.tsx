"use client";
import { type ReactNode, createContext, useContext, useCallback } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { shippingForm, type ShippingFormType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
type ShippingContextType = UseFormReturn<
  ShippingFormType,
  unknown,
  undefined
> & {
  submitHandler: (e?: React.SyntheticEvent) => Promise<unknown>;
  submitForm: () => Promise<void>;
};

const ShippingContext = createContext<ShippingContextType>(
  {} as ShippingContextType,
);

export function ShippingProvider({ children }: { children: ReactNode }) {
  const form = useForm<ShippingFormType>({
    resolver: zodResolver(shippingForm),
    mode: "onBlur",
    defaultValues: {
      country: "US",
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      zip: "",
      city: "",
      state: "",
      email: "",
      phone: "",
      emailMarketing: false,
      textMarketing: false,
    },
  });
  const submitHandler = form.handleSubmit(async (values) => {
    try {
      const { success, data } = await shippingForm.safeParseAsync(values);
      if (!success) {
        throw new Error("Invalid form data");
      }

      console.log("Shipping form data", data);
    } catch (e: unknown) {
      console.error(e);
    }
  });

  const submitForm = useCallback(async () => {
    // Trigger validations before submitting
    const isValid = await form.trigger();

    if (isValid) {
      await submitHandler();
    }
  }, [submitHandler, form]);

  return (
    <ShippingContext.Provider value={{ ...form, submitHandler, submitForm }}>
      {children}
    </ShippingContext.Provider>
  );
}

export function useShipping() {
  if (!ShippingContext) {
    throw new Error("useShipping must be used within ShippingProvider");
  }
  return useContext(ShippingContext);
}
