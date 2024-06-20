"use client";
import { type FieldValues, type Path, type Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { camelCaseToTitleCase } from "@/lib/utils/camelCaseToTitleCase";
import { cn } from "@/lib/utils/cn";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

type FormCheckboxFieldProps<
  TForm extends FieldValues,
  TFields extends Path<TForm>,
> = React.ComponentPropsWithoutRef<typeof Checkbox> & {
  fieldName: TFields;
  formControl: Control<TForm, unknown>;
  containerClassName?: string;
};
export function FormCheckboxField<
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
