import { ShippingProvider } from "./components/ShippingForm/context";
import ShippingForm from "./components/ShippingForm/ShippingFormForm";
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
