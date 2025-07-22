import { LuCoins, LuCreditCard, LuX } from "react-icons/lu";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Form/CheckoutForm";
import useAuth from "../../hooks/useAuth";

const PurchaseModal = ({ isOpen, onClose, package: pkg, onPurchase, stripePromise }) => {
	if (!isOpen || !pkg) return null;
	const { user } = useAuth();

	return (
		<div
			className='modal modal-open transition-all duration-300 ease-linear'
			role='dialog'
			aria-modal='true'
		>
			<div className='modal-box relative'>
				<button
					className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
					onClick={onClose}
				>
					<LuX className='w-6 h-6' />
				</button>
				<h3 className='font-bold text-lg mb-4'>
					{" "}
					<LuCreditCard className='inline' /> Confirm Purchase
				</h3>
				<div className='space-y-4'>
					<div className='bg-base-200 rounded-xl p-6'>
						<h4 className='font-semibold mb-2'>Payment Details</h4>
						<div className='flex justify-between items-center'>
							<h3>Package:</h3>
							<p>
								{pkg.coins} {pkg.bonus && <span className='text-green-600'>+{pkg.bonus}</span>} Micro coins
								<LuCoins className='inline ml-2' />
							</p>
						</div>
						<div className='flex justify-between items-center'>
							<h4 className='font-semibold'>Amount:</h4>
							<p className='font-bold text-blue-400 mt-1'>${pkg.price}</p>
						</div>
					</div>
					{/* User Info */}
					<div className='bg-base-200 rounded-xl p-6'>
						<h4 className='font-semibold mb-2'>Buyer Information</h4>
						<div className='flex justify-between items-center'>
							<h3>Name:</h3>
							<p>{user?.displayName}</p>
						</div>
						<div className='flex justify-between items-center'>
							<h3>Email:</h3>
							<p>{user?.email}</p>
						</div>
					</div>
					{/* Stripe Checkout Form */}
					<Elements stripe={stripePromise}>
						<CheckoutForm
							pkg={pkg}
							onSuccess={onPurchase}
						/>
					</Elements>
				</div>
			</div>
		</div>
	);
};

export default PurchaseModal;
