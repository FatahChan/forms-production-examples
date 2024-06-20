"use client";
import { type FieldValues, type Path, type Control } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { camelCaseToTitleCase } from "@/lib/utils/camelCaseToTitleCase";
import { cn } from "@/lib/utils/cn";
import React, { type PropsWithChildren, type ChangeEvent } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useShipping } from "./context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

type FormInputFieldProps<
  TForm extends FieldValues,
  TFields extends Path<TForm>,
> = React.ComponentPropsWithoutRef<typeof Input> & {
  fieldName: TFields;
  formControl: Control<TForm, unknown>;
  containerClassName?: string;
};

function FormInputField<
  TForm extends FieldValues,
  TFields extends Path<TForm>,
>({
  fieldName,
  formControl,
  containerClassName,
  ...inputProps
}: FormInputFieldProps<TForm, TFields>) {
  return (
    <FormField
      control={formControl}
      name={fieldName}
      render={({ field: { name, onChange, ...restField } }) => (
        <FormItem className={cn("relative", containerClassName)}>
          <div className="flex items-end gap-2">
            <FormLabel className="capitalize">
              {camelCaseToTitleCase(name)}
            </FormLabel>
            <FormMessage className="text-xs leading-none" />
          </div>
          <FormControl>
            <Input
              {...restField}
              {...inputProps}
              onChange={getOnChangeInputHandlerWithWrapper(
                onChange,
                inputProps,
              )}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

type FormCheckboxFieldProps<
  TForm extends FieldValues,
  TFields extends Path<TForm>,
> = React.ComponentPropsWithoutRef<typeof Checkbox> & {
  fieldName: TFields;
  formControl: Control<TForm, unknown>;
  containerClassName?: string;
};

function FormCheckboxField<
  TForm extends FieldValues,
  TFields extends Path<TForm>,
>({
  fieldName,
  formControl,
  containerClassName,
  ...checkboxProp
}: FormCheckboxFieldProps<TForm, TFields>) {
  return (
    <FormField
      control={formControl}
      name={fieldName}
      render={({ field }) => (
        <FormItem
          className={cn(
            "relative flex items-center gap-4 space-y-0",
            containerClassName,
          )}
        >
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange({ target: { value: checked } });
                return checked;
              }}
              {...checkboxProp}
            />
          </FormControl>
          <FormLabel className="capitalize">
            {camelCaseToTitleCase(field.name)}
          </FormLabel>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}

type FormSelectFieldProps<
  TForm extends FieldValues,
  TFields extends Path<TForm>,
> = React.ComponentPropsWithoutRef<typeof Select> & {
  fieldName: TFields;
  formControl: Control<TForm, unknown>;
  containerClassName?: string;
};

function FormSelectField<
  TForm extends FieldValues,
  TFields extends Path<TForm>,
>({
  fieldName,
  formControl,
  containerClassName,
  children,
  ...selectProps
}: PropsWithChildren<FormSelectFieldProps<TForm, TFields>>) {
  return (
    <FormField
      control={formControl}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={cn("relative", containerClassName)}>
          <div className="flex items-end gap-2">
            <FormLabel className="capitalize">
              {camelCaseToTitleCase(field.name)}
            </FormLabel>
            <FormMessage className="text-xs leading-none" />
          </div>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            {...selectProps}
          >
            <FormControl>
              <SelectTrigger onBlur={field.onBlur}>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{children}</SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}

function getOnChangeInputHandlerWithWrapper(
  onChange: (e: ChangeEvent<HTMLInputElement>) => unknown,
  inputProps: React.ComponentPropsWithoutRef<typeof Input>,
) {
  if (inputProps.type === "number" || inputProps.inputMode === "numeric") {
    return (e: ChangeEvent<HTMLInputElement>) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
      return onChange(e);
    };
  }
  if (inputProps.type === "tel") {
    return (e: ChangeEvent<HTMLInputElement>) => {
      // remove all non-digit characters
      e.target.value = e.target.value.replace(/\D/g, "");
      if (e.target.value.length > 10) {
        return;
      }
      // format phone number (xxx) xxx-xxxx
      if (e.target.value.length <= 3) {
        e.target.value = e.target.value.replace(/(\d{1,3})/, "($1");
      } else if (e.target.value.length <= 6) {
        e.target.value = e.target.value.replace(
          /(\d{3})(\d{1,3})(\d*)/,
          "($1) $2",
        );
      } else {
        e.target.value = e.target.value.replace(
          /(\d{3})(\d{3})(\d{1,4})/,
          "($1) $2-$3",
        );
      }

      return onChange(e);
    };
  }

  return onChange;
}
export default ShippingForm;
