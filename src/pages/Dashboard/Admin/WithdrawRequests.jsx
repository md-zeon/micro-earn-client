import Swal from "sweetalert2";
import WithdrawRequestTable from "../../../components/Table/WithDrawRequestTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useWithdrawRequests from "../../../hooks/useWithdrawRequests";
import toast from "react-hot-toast";
import WithdrawRequestsSkeleton from "../../../components/ui/WithdrawRequestsSkeleton";
import PageTitle from "../../../components/PageTitle";

const WithdrawRequests = () => {
	const axiosSecure = useAxiosSecure();
	const { pendingRequests, approvedRequests, isWithdrawLoading, refetch } = useWithdrawRequests();
	if (isWithdrawLoading) return <WithdrawRequestsSkeleton />;

	const handleApprove = async (withdraw) => {
		try {
			const result = await Swal.fire({
				title: "Are you sure?",
				text: "You want to approve this withdrawal request?",
				icon: "warning",
				showCancelButton: true,
				buttonsStyling: false,
				customClass: {
					confirmButton: "btn mr-5 bg-gradient-success",
					cancelButton: "btn bg-gradient-error",
				},
				confirmButtonText: "Yes, approve it!",
			});
			if (result.isConfirmed) {
				// update withdraw status
				await axiosSecure.patch(`/admin/approve-withdraw/${withdraw._id}`, {
					status: "approved",
				});
				// update coins
				await axiosSecure.patch(`/update-coins/${withdraw?.worker_email}`, {
					coinsToUpdate: withdraw?.withdrawal_coin,
					status: "decrease",
				});
				toast.success("Withdrawal Approved");
				refetch();
			}
		} catch (err) {
			console.error("Error approving withdrawal:", err);
			toast.error("Failed to approve withdrawal");
		}
	};
	return (
		<div className='space-y-8'>
			<PageTitle
				title='Withdrawal Requests'
				description='Review and process user withdrawal requests.'
			/>
			<div>
				<div>
					<h2 className='text-2xl font-semibold mb-2'>Pending Requests</h2>

					<p className='text-gray-400 text-xs mb-4'>Pending withdrawal requests from workers</p>
				</div>
				<WithdrawRequestTable
					withdrawRequests={pendingRequests}
					handleApprove={handleApprove}
				/>
			</div>
			<div>
				<div>
					<h2 className='text-2xl font-semibold mb-2'>Approved Requests</h2>
					<p className='text-gray-400 text-xs mb-4'>Approved withdrawal requests from workers</p>
				</div>
				<WithdrawRequestTable
					withdrawRequests={approvedRequests}
					handleApprove={handleApprove}
				/>
			</div>
		</div>
	);
};

export default WithdrawRequests;
