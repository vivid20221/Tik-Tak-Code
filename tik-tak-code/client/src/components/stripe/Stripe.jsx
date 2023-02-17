import './Stripe.css';
import StripeCheckout from "react-stripe-checkout";
function Stripe() {

  const onToken = (token) => {

  }
  return (
    <div className="App">
      <StripeCheckout
        token={onToken}
        name= "TIK-TAK-CODE DONATION"
        currency= "usd"
        amount= "100"
        stripeKey="pk_test_51ManRPFfVYAaaJ90iLxf49f0zUNOvUejmfSiv4m6ZR3XEarSNQxrJUSsSNgOVnNstLcFf6jv5O3yL7JPbPdUq7OE00MCZTMho0"
      />
    </div>
  );
}

export default Stripe;