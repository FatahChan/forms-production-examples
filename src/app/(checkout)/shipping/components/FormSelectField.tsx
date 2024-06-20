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
import React, { type PropsWithChildren } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export default FormSelectField;
