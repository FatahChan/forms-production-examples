import { ShippingProvider } from "./components/ShippingForm/context";
import ShippingForm from "./components/ShippingForm/shippingForm";
import SubmitButton from "./components/ShippingForm/ShippingFormSubmitButton";

function Shipping() {
  return (
    <ShippingProvider>
      <ShippingForm />
      <SubmitButton />
    </ShippingProvider>
  );
}

export default Shipping;
