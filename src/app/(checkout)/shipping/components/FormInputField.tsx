"use client";
import { type FieldValues, type Path, type Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { camelCaseToTitleCase } from "@/lib/utils/camelCaseToTitleCase";
import { cn } from "@/lib/utils/cn";
import React, { type ChangeEvent } from "react";

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

export default FormInputField;
