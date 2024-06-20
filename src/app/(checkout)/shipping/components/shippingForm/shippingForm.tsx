"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils/cn";
import { SelectItem } from "@/components/ui/select";
import { useShipping } from "./context";
import { FormInputField } from "./FormInputField";
import { FormCheckboxField } from "./FormCheckboxField";
import { FormSelectField } from "./FormSelectField";

const gridTemplateArea = cn(
  "grid gap-4",
  "grid-cols-1",
  "sm:grid-cols-2 sm:[grid-template-areas:'country_country''firstName_lastName''address1_address1''address2_address2''city_city''state_zip''email_email''phone_phone''emailMarketing_emailMarketing''textMarketing_textMarketing''submit_submit']",
);

function ShippingForm() {
  const { onSubmit, ...form } = useShipping();
  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
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
        <FormInputField
          fieldName="lastName"
          formControl={form.control}
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
        <Button type="submit" className="[grid-area:submit]">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default ShippingForm;
