import { useForm } from "react-hook-form";
import { LuEye, LuEyeClosed, LuLock, LuLockOpen, LuMail, LuUserPlus } from "react-icons/lu";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import GoogleSignIn from "./GoogleSignIn";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const { signInUser, user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location?.state?.from?.pathname || "/dashboard";

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	if (user) {
		navigate(from, { replace: true });
	}

	const onSubmit = async (data) => {
		console.log(data);
		try {
			setLoading(true);
			const result = await signInUser(data?.email, data?.password);
			console.log(result);
			toast.success(`Welcome ${result?.user?.displayName}`);
			setShowPassword(false);
			reset();
		} catch (error) {
			console.error("Login Error:", error);
			toast.error(error.message || "Something went wrong during login");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='bg-gradient-to-br from-blue-500 to-green-500 py-12 min-h-screen flex justify-center items-center'>
			<div className='max-w-md mx-auto p-6 border rounded-xl bg-base-100 shadow text-base-content'>
				<div className='flex items-center justify-center mb-2 bg-gradient w-10 h-10 rounded-full mx-auto font-bold text-xl'>
					<LuUserPlus />
				</div>
				<h2 className='text-2xl font-bold text-center mb-2'>Welcome Back</h2>
				<p className='text-center text-xs text-gray-400 mb-5'>Sign in to your MicroEarn account</p>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='space-y-4'
				>
					{/* Email */}
					<div>
						<label className='text-sm'>Email Address</label>
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

					<button
						type='submit'
						className='btn w-full bg-gradient text-white'
					>
						{loading ? "Signing In..." : "Sign In"}
					</button>
				</form>
				<GoogleSignIn
					loading={loading}
					setLoading={setLoading}
				/>
				{/* Login Link */}
				<div className='mt-6 text-center'>
					<p className='text-sm text-gray-400'>
						Don't have an account?{" "}
						<Link
							to='/register'
							className='text-accent hover:underline font-medium'
						>
							Create one now
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
