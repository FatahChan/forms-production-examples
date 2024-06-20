"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useShipping } from "./context";

function SubmitButton() {
  const { submitHandler, formState } = useShipping();
  return (
    <Button
      type="submit"
      onClick={submitHandler}
      disabled={
        !formState.isValid || formState.isLoading || formState.isSubmitting
      }
    >
      Submit
    </Button>
  );
}

export default SubmitButton;
