import { History } from "lucide-react";
import StatusBadge from "../shared/StatusBadge";
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "../ui/table";
import { CardContent } from "../ui/card";

const WithdrawalHistory = ({ history = [] }) => {
	if (history.length === 0) {
		return (
			<CardContent>
				<div className="flex flex-col items-center gap-2 py-10 text-center">
					<History className="size-10 text-muted-foreground/40" />
					<h3 className="text-base font-semibold">No withdrawal history</h3>
					<p className="text-sm text-muted-foreground">
						Your withdrawal requests will appear here.
					</p>
				</div>
			</CardContent>
		);
	}

	return (
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Amount</TableHead>
						<TableHead>Coins</TableHead>
						<TableHead>Payment Method</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{history.map((req) => (
						<TableRow key={req._id}>
							<TableCell className="font-medium">
								${req.withdrawal_amount}
							</TableCell>
							<TableCell>{req.withdrawal_coin} coins</TableCell>
							<TableCell className="capitalize">
								{req.payment_system}
							</TableCell>
							<TableCell className="text-muted-foreground">
								{new Date(req.withdraw_date).toLocaleDateString()}
							</TableCell>
							<TableCell>
								<StatusBadge status={req.status} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	);
};

export default WithdrawalHistory;
