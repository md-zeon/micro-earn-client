import { useForm } from "react-hook-form";
import { LuEye, LuEyeClosed, LuLock, LuLockOpen, LuMail, LuUser, LuUserPlus, LuVoicemail } from "react-icons/lu";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import GoogleSignIn from "./GoogleSignIn";
import { Link, useLocation, useNavigate } from "react-router";
import { imageUpload, saveUserInDb } from "../../api/utils";
import toast from "react-hot-toast";

const Register = () => {
	const { createUser, updateUserProfile, user } = useAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location?.state?.from?.pathname || "/";
	if (user) {
		navigate(from, { replace: true });
	}

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm();

	const password = watch("password");

	const onSubmit = async (data) => {
		const imageUrl = await imageUpload(data?.photo[0]);
		console.log(data, imageUrl);

		try {
			setLoading(true);
			// User Register
			const result = await createUser(data?.email, data?.password);
			// Update User Profile
			await updateUserProfile(data?.name, imageUrl);
			console.log(result);
			// save user in DB
			const newUser = {
				uid: result?.user?.uid,
				name: data?.name,
				email: data?.email,
				role: data?.role,
				photoURL: imageUrl,
			};
			console.log(newUser);
			// Save User In DB
			await saveUserInDb(newUser);

			setShowPassword(false);
			setShowConfirmPassword(false);
			toast.success("Account created successfully!");
			reset();
		} catch (error) {
			console.error("Registration Error:", error);
			toast.error(error.message || "Something went wrong during registration");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='bg-gradient py-12 min-h-screen flex justify-center items-center'>
			<div className='max-w-md mx-auto p-6 border rounded-xl bg-base-100 shadow text-base-content'>
				<div className='flex items-center justify-center mb-2 bg-gradient w-10 h-10 rounded-full mx-auto font-bold text-xl'>
					<LuUserPlus />
				</div>
				<h2 className='text-2xl font-bold text-center mb-2'>Create Account</h2>
				<p className='text-center text-xs text-gray-400 mb-5'>Join MicroEarn and start your earning journey today</p>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='space-y-4'
				>
					{/* Full Name */}
					<div>
						<label className='text-sm'>
							Full Name <span className='text-red-500'>*</span>
						</label>
						<div className='input input-bordered w-full'>
							<LuUser className='text-gray-500' />
							<input
								type='text'
								className='grow'
								placeholder='Enter your name'
								{...register("name", { required: "Name is required" })}
							/>
						</div>
						{errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
					</div>
					{/* Email */}
					<div>
						<label className='text-sm'>
							Email Address <span className='text-red-500 text-sm'>*</span>
						</label>
						<div className='input input-bordered w-full'>
							<LuMail className='text-gray-500' />
							<input
								type='email'
								className='grow'
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^\S+@\S+$/i,
										message: "Invalid email address",
									},
								})}
								placeholder='example@mail.com'
								autoComplete='email'
							/>
						</div>
						{errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
					</div>
					{/* Profile Picture Upload */}
					<div>
						<label className='text-sm'>
							Profile Picture <span className='text-red-500 text-sm'>*</span>
						</label>
						<input
							type='file'
							accept='image/*'
							className='file-input file-input-accent file-input-bordered w-full'
							{...register("photo", { required: "Photo is required" })}
						/>
						{errors.photo && <p className='text-red-500 text-sm'>{errors.photo.message}</p>}
					</div>
					{/* Role */}
					<div>
						<label className='text-sm'>
							Select Role <span className='text-red-500 text-sm'>*</span>
						</label>
						<select
							className='select select-bordered w-full'
							{...register("role", { required: "Select a role" })}
						>
							<option
								value=''
								disabled
							>
								Select Role
							</option>
							<option value='Worker'>Worker</option>
							<option value='Buyer'>Buyer</option>
						</select>
						{errors.role && <p className='text-red-500 text-sm'>{errors.role.message}</p>}
					</div>
					{/* Password */}
					<div>
						<label className='text-sm'>
							Password <span className='text-red-500 text-sm'>*</span>
						</label>
						<div className='input input-bordered w-full'>
							{showPassword ? (
								<LuLockOpen
									className='text-gray-700 cursor-pointer'
									onClick={() => setShowPassword(!showPassword)}
								/>
							) : (
								<LuLock
									className='text-gray-500 cursor-pointer'
									onClick={() => setShowPassword(!showPassword)}
								/>
							)}
							<input
								type={showPassword ? "text" : "password"}
								className='grow'
								{...register("password", {
									required: "Password is required",
									minLength: { value: 6, message: "Min 6 characters" },
									pattern: {
										value: /^(?=.*[A-Z])(?=.*[!@#$&*])/,
										message: "At least one uppercase and one special character",
									},
								})}
								placeholder='Enter your password'
								autoComplete='new-password'
							/>
							{!showPassword ? (
								<LuEye
									className='text-lg cursor-pointer'
									onClick={() => setShowPassword(!showPassword)}
								/>
							) : (
								<LuEyeClosed
									className='text-lg cursor-pointer'
									onClick={() => setShowPassword(!showPassword)}
								/>
							)}
						</div>
						{errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
					</div>
					{/* Confirm Password */}
					<div>
						<label className='text-sm'>
							Confirm Password <span className='text-red-500 text-sm'>*</span>
						</label>
						<div className='input input-bordered w-full'>
							{showConfirmPassword ? (
								<LuLockOpen
									className='text-gray-700 cursor-pointer'
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								/>
							) : (
								<LuLock
									className='text-gray-500 cursor-pointer'
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								/>
							)}
							<input
								type={showConfirmPassword ? "text" : "password"}
								className='grow'
								{...register("confirmPassword", {
									required: "Please confirm your password",
									minLength: { value: 6, message: "Min 6 characters" },
									validate: (value) => value === password || "Password did not match",
								})}
								placeholder='Confirm your password'
								autoComplete='new-password'
							/>
							{!showConfirmPassword ? (
								<LuEye
									className='text-lg cursor-pointer'
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								/>
							) : (
								<LuEyeClosed
									className='text-lg cursor-pointer'
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								/>
							)}
						</div>
						{errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}
					</div>

					<button
						type='submit'
						className='btn w-full bg-gradient text-white'
						disabled={loading}
					>
						{loading ? "Registering..." : "Create Account"}
					</button>
				</form>
				<GoogleSignIn
					loading={loading}
					setLoading={setLoading}
				/>
				{/* Login Link */}
				<div className='mt-6 text-center'>
					<p className='text-sm text-gray-400'>
						Already have an account?{" "}
						<Link
							to='/login'
							className='text-accent hover:underline font-medium'
						>
							Sign in here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
