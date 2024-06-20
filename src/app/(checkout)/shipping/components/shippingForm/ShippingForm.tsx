"use client";

import React from "react";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils/cn";
import { SelectItem } from "@/components/ui/select";
import { useShipping } from "./context";
import FormInputField from "../FormInputField";
import FormCheckboxField from "../FormCheckboxField";
import FormSelectField from "../FormSelectField";
import type { ShippingFormType } from "./schema";
const gridTemplateArea = cn(
  "grid gap-4",
  "grid-cols-1",
  "sm:grid-cols-2 sm:[grid-template-areas:'country_country''firstName_lastName''address1_address1''address2_address2''city_city''state_zip''email_email''phone_phone''emailMarketing_emailMarketing''textMarketing_textMarketing']",
);

function ShippingForm() {
  const { submitHandler, ...form } = useShipping();
  return (
    <Form {...form}>
      <form
        onSubmit={submitHandler}
        className={cn(gridTemplateArea, "container max-w-xl py-8")}
      >
        <FormSelectField
          fieldName="country"
          formControl={form.control}
          containerClassName="[grid-area:country]"
          defaultValue="US"
          disabled
        >
          <SelectItem value="US">United States</SelectItem>
        </FormSelectField>
        <FormInputField
          fieldName="firstName"
          formControl={form.control}
          containerClassName="[grid-area:firstName]"
        />
        {FormInputField<ShippingFormType, "firstName">({
          formControl: form.control,
          fieldName: "firstName",
          containerClassName: "[grid-area:firstName]",
        })}
        <FormInputField
          formControl={form.control}
          fieldName="lastName"
          containerClassName="[grid-area:lastName]"
        />
        <FormInputField
          fieldName="address1"
          formControl={form.control}
          containerClassName="[grid-area:address1]"
        />
        <FormInputField
          fieldName="address2"
          formControl={form.control}
          containerClassName="[grid-area:address2]"
        />
        <FormInputField
          fieldName="city"
          formControl={form.control}
          containerClassName="[grid-area:city]"
        />
        <FormSelectField
          fieldName="state"
          formControl={form.control}
          containerClassName="[grid-area:state]"
        >
          <SelectItem value="CA">California</SelectItem>
        </FormSelectField>
        <FormInputField
          fieldName="zip"
          formControl={form.control}
          containerClassName="[grid-area:zip]"
          inputMode="numeric"
        />
        <FormInputField
          fieldName="email"
          formControl={form.control}
          containerClassName="[grid-area:email]"
        />
        <FormInputField
          fieldName="phone"
          formControl={form.control}
          containerClassName="[grid-area:phone]"
          type="tel"
        />
        <FormCheckboxField
          fieldName="emailMarketing"
          formControl={form.control}
          containerClassName="[grid-area:emailMarketing]"
        />
        <FormCheckboxField
          fieldName="textMarketing"
          formControl={form.control}
          containerClassName="[grid-area:textMarketing]"
        />
      </form>
    </Form>
  );
}

export default ShippingForm;
