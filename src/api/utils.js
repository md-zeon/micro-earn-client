import axios from "axios";

// upload image to imgbb and return image url

const uploadToImgbb = async (imageData) => {
	const imageFormData = new FormData();
	imageFormData.append("image", imageData);
	// Upload image to imgbb
	const { data } = await axios.post(
		`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
		imageFormData,
	);
	// console.log(data);
	return data?.data?.display_url;
};

// upload image to cloudinary and return image url

const uploadToCloudinary = async (imageData) => {
	const imageFormData = new FormData();
	imageFormData.append("file", imageData);
	imageFormData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
	const { data } = await axios.post(
		`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
		imageFormData,
	);
	return data?.secure_url;
};

// upload image to cloudinary, falling back to imgbb if cloudinary is down

export const imageUpload = async (imageData) => {
	try {
		return await uploadToCloudinary(imageData);
	} catch (cloudinaryError) {
		console.error(
			"Cloudinary upload failed, falling back to imgbb:",
			cloudinaryError?.message,
		);
		return await uploadToImgbb(imageData);
	}
};

// Save or Update user in DB

export const saveUserInDb = async (user) => {
	try {
		const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/user`, user);
		return data;
	} catch (error) {
		console.error("User Save Error:", error?.message || error);
		throw new Error("Failed to save user. Please try again.");
	}
};

export const getFirebaseLoginError = (code) => {
	switch (code) {
		case "auth/invalid-credential":
			return "Incorrect email or password. Please try again.";
		case "auth/invalid-email":
			return "Invalid email format.";
		case "auth/user-disabled":
			return "This account has been disabled.";
		case "auth/too-many-requests":
			return "Too many requests. Please try again later.";
		default:
			return "Login failed. Please try again.";
	}
};

export const getFirebaseRegisterError = (code) => {
	switch (code) {
		case "auth/email-already-in-use":
			return "This email is already registered.";
		case "auth/invalid-email":
			return "Invalid email format.";
		case "auth/weak-password":
			return "Password is too weak. Minimum 6 characters.";
		case "auth/operation-not-allowed":
			return "Registration via email/password is not enabled.";
		default:
			return "Something went wrong during registration.";
	}
};

export const getGoogleAuthError = (code) => {
	switch (code) {
		case "auth/popup-closed-by-user":
			return "Popup closed before completing sign-in.";
		case "auth/cancelled-popup-request":
			return "Only one popup can be open at a time.";
		case "auth/popup-blocked":
			return "Popup was blocked by the browser.";
		case "auth/network-request-failed":
			return "Network error. Check your connection.";
		case "auth/account-exists-with-different-credential":
			return "An account with this email exists with a different sign-in method.";
		default:
			return "Google sign-in failed. Please try again.";
	}
};