import { useState, useEffect } from "react";
import { LuMail, LuCalendarDays, LuShield, LuUser, LuCoins, LuPen } from "react-icons/lu";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import useAvailableCoins from "../../../hooks/useAvailableCoins";
import PageTitle from "../../../components/PageTitle";
import { imageUpload } from "../../../api/utils";
import ProfileSkeleton from "../../../components/ui/ProfileSkeleton";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
	const { user, updateUserProfile, refreshUser, loading } = useAuth();
	const { role, isLoading: roleLoading } = useRole();
	const { microCoins: coins, isMicroCoinsLoading } = useAvailableCoins();
	const axiosSecure = useAxiosSecure();

	const createdAt = user?.metadata?.creationTime || "2024-01-01";
	const memberSince = new Date(createdAt).toISOString().split("T")[0];

	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(user?.displayName || "");
	const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
	const [photoFile, setPhotoFile] = useState(null);
	const [preview, setPreview] = useState(photoURL);
	const [originalName, setOriginalName] = useState(name);
	const [originalPhotoURL, setOriginalPhotoURL] = useState(photoURL);

	useEffect(() => {
		setName(user?.displayName || "");
		setPhotoURL(user?.photoURL || "");
		setPreview(user?.photoURL || "");
		setOriginalName(user?.displayName || "");
		setOriginalPhotoURL(user?.photoURL || "");
	}, [user]);

	useEffect(() => {
		if (!photoFile) return;
		const objectUrl = URL.createObjectURL(photoFile);
		setPreview(objectUrl);
		return () => URL.revokeObjectURL(objectUrl);
	}, [photoFile]);

	if (loading || roleLoading || isMicroCoinsLoading) return <ProfileSkeleton />;

	const handleSave = async () => {
		try {
			let updatedPhotoURL = photoURL;

			if (photoFile) {
				updatedPhotoURL = await imageUpload(photoFile);
			}

			await updateUserProfile(name, updatedPhotoURL);
			await axiosSecure.patch("/update-profile", { name, photoURL: updatedPhotoURL });
			await refreshUser();
			setOriginalName(name);
			setOriginalPhotoURL(updatedPhotoURL);
			setPreview(updatedPhotoURL);
			setPhotoFile(null);
			setPhotoURL(updatedPhotoURL);
			setIsEditing(false);
		} catch (error) {
			console.error("Failed to update profile:", error);
			toast.error("Failed to update profile. Please try again.");
		}
	};

	const handleCancel = () => {
		setName(originalName);
		setPhotoURL(originalPhotoURL);
		setPreview(originalPhotoURL);
		setPhotoFile(null);
		setIsEditing(false);
	};

	return (
		<div className='max-w-3xl mx-auto sm:p-4 md:p-6'>
			<PageTitle
				title='My Profile'
				description='View and update your account information and preferences.'
			/>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-2xl font-bold'>My Profile</h2>
				{!isEditing && (
					<button
						className='btn btn-sm btn-outline bg-base-300 text-base-content flex items-center gap-1'
						onClick={() => setIsEditing(true)}
					>
						<LuPen /> Edit Profile
					</button>
				)}
			</div>

			<div className='card bg-base-100 border shadow-sm'>
				<div className='card-body'>
					<h3 className='text-lg font-semibold mb-4'>Profile Information</h3>

					<div className='flex flex-col md:flex-row gap-6 md:items-center'>
						<img
							src={preview}
							alt='User Avatar'
							referrerPolicy='no-referrer'
							className='w-24 h-24 rounded-full mx-auto sm:mx-0 border'
						/>

						<div className='flex flex-col gap-2'>
							{isEditing ? (
								<>
									<input
										type='text'
										className='input input-bordered w-full'
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder='Enter your name'
									/>

									<input
										type='text'
										className='input input-bordered w-full'
										value={photoURL}
										placeholder='Enter photo URL'
										onChange={(e) => {
											setPhotoURL(e.target.value);
											setPhotoFile(null);
											setPreview(e.target.value);
										}}
									/>

									<input
										type='file'
										accept='image/*'
										className='file-input file-input-bordered input-accent w-full'
										onChange={(e) => {
											const file = e.target.files?.[0];
											if (file) {
												setPhotoFile(file);
												setPhotoURL("");
											}
										}}
									/>

									<div className='flex gap-2 mt-2'>
										<button
											className='btn btn-sm bg-gradient'
											onClick={handleSave}
										>
											Save
										</button>
										<button
											className='btn btn-sm bg-gradient-error'
											onClick={handleCancel}
										>
											Cancel
										</button>
									</div>
								</>
							) : (
								<>
									<h2 className='text-2xl font-bold flex items-center justify-center sm:justify-start gap-2'>
										{name || "Unnamed User"}
									</h2>
									<div className='flex items-center justify-center sm:justify-start gap-2 mt-2'>
										<span className='badge badge-soft capitalize badge-accent'>{role}</span>
										<span className='flex items-center gap-1 text-sm text-gradient'>
											<LuCoins className='text-blue-500' /> {coins} coins
										</span>
									</div>
								</>
							)}
						</div>
					</div>

					<hr className='my-6' />

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-base-content'>
						<div className='flex items-start gap-3'>
							<LuMail className='text-xl mt-0.5' />
							<div>
								<p>Email</p>
								<p className='font-medium'>{user?.email}</p>
							</div>
						</div>

						<div className='flex items-start gap-3'>
							<LuCalendarDays className='text-xl mt-0.5' />
							<div>
								<p>Member Since</p>
								<p className='font-medium'>{memberSince}</p>
							</div>
						</div>

						<div className='flex items-start gap-3'>
							<LuShield className='text-xl mt-0.5' />
							<div>
								<p>Account Type</p>
								<p className='font-medium capitalize'>{role}</p>
							</div>
						</div>

						<div className='flex items-start gap-3'>
							<LuUser className='text-xl mt-0.5' />
							<div>
								<p>Status</p>
								<p className='font-medium text-green-600'>Active</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
