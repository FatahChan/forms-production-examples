"use client";
import { type ReactNode, createContext, useContext } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { shippingForm, type ShippingFormType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
type ShippingContextType = UseFormReturn<
  ShippingFormType,
  unknown,
  undefined
> & {
  onSubmit: (e?: React.SyntheticEvent) => Promise<unknown>;
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
    },
  });
  const onSubmit = form.handleSubmit((values) => {
    console.log(values);
  });

  return (
    <ShippingContext.Provider value={{ ...form, onSubmit }}>
      {children}
    </ShippingContext.Provider>
  );
}

export function useShipping() {
  return useContext(ShippingContext);
}
