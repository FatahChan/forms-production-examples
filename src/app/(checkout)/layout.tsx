import React from "react";
import { ShippingProvider } from "./shipping/components/shippingForm/context";

function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <ShippingProvider>{children}</ShippingProvider>;
}

export default CheckoutLayout;
