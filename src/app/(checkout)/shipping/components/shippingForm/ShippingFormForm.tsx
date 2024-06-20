"use client";

import React from "react";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils/cn";
import { useShipping } from "./context";
import FormInputField from "../FormInputField";

function ShippingForm() {
  const { submitHandler, ...form } = useShipping();
  return (
    <Form {...form}>
      <form onSubmit={submitHandler} className={cn("container max-w-xl py-8")}>
        <FormInputField
          fieldName="firstName"
          formControl={form.control}
          containerClassName="[grid-area:firstName]"
        />
      </form>
    </Form>
  );
}

export default ShippingForm;
