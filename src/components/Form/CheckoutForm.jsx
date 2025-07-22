import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = ({ pkg, onSuccess }) => {
	const stripe = useStripe();
	const elements = useElements();
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();

	const [clientSecret, setClientSecret] = useState("");
	const [cardError, setCardError] = useState("");
	const [processing, setProcessing] = useState(false);

	const totalPrice = pkg?.price;

	useEffect(() => {
		if (totalPrice) {
			axiosSecure
				.post("/create-payment-intent", { amount: totalPrice })
				.then((res) => setClientSecret(res.data.clientSecret))
				.catch(() => toast.error("Failed to initialize payment."));
		}
	}, [axiosSecure, totalPrice]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements || !clientSecret || !user) return;

		const card = elements.getElement(CardElement);
		if (!card) return;

		const { error: methodErr, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card,
			billing_details: {
				name: user?.name,
				email: user?.email,
			},
		});

		if (methodErr) {
			setCardError(methodErr.message);
			return;
		}
		setCardError("");
		setProcessing(true);

		const { paymentIntent, error: confirmErr } = await stripe.confirmCardPayment(clientSecret, {
			payment_method: paymentMethod.id,
			receipt_email: user?.email,
		});

		if (confirmErr) {
			setCardError(confirmErr.message);
			setProcessing(false);
			return;
		}

		if (paymentIntent.status === "succeeded") {
			// Payment successful!
			await onSuccess(pkg); // Call parent function to update DB & coins
		}

		setProcessing(false);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4'
		>
			<CardElement
				options={{
					style: {
						base: {
							fontSize: "16px",
							color: "#6a7282",
						},
						invalid: { color: "#fa755a" },
					},
				}}
			/>
			{cardError && <p className='text-red-500 text-sm'>{cardError}</p>}
			<button
				type='submit'
				className='btn bg-gradient w-full'
				disabled={!stripe || !clientSecret || processing}
			>
				{processing ? "Processing..." : `Confirm Payment ($${totalPrice})`}
			</button>
		</form>
	);
};

export default CheckoutForm;
