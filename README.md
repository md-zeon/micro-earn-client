# MicroEarn - Client Side

## Overview

The client side of MicroEarn is a responsive micro-tasking platform interface built with React.js and Tailwind CSS. It serves three primary user roles—Workers, Buyers, and Admins—allowing them to interact with tasks, submissions, and earnings through a user-friendly dashboard experience. The app integrates Firebase for authentication, uses React Router for seamless navigation, and communicates securely with the backend via Axios.

## 🌐 Live Site

**URL:** [https://micro-earn-7be08.web.app/](https://micro-earn-7be08.web.app/)

## 👤 Admin Credentials

**Email:** [admin@microearn.com](mailto:admin@microearn.com)  
**Password:** Admin@1234

---

## ✨ Key Features

- 🔐 **Role-Based Authentication** – Firebase authentication with Buyer, Worker, and Admin roles
- 📋 **Task Creation** – Buyers can post tasks with descriptions, instructions, and required workers
- 🨠 **Task Discovery** – Workers can browse tasks with filters by category, coins, deadline, etc.
- 📝 **Task Submission** – Workers can submit proof with file upload and message
- ✅ **Buyer Review System** – Buyers approve/reject submissions; coins awarded upon approval
- 📤 **ImgBB Upload** – Workers upload task proof/images via ImgBB API
- 💰 **Coin-Based Economy** – Buyers buy coins with Stripe, Workers earn coins from tasks
- 💸 **Withdrawals** – Workers can withdraw coins (20 coins = $1, min 200 coins); status = pending until admin approval
- 📊 **Dashboards** – Role-specific dashboards showing tasks, payments, coins, and submissions
- 📥 **Notifications** – Real-time alerts for submission approvals, rejections, new tasks, and withdrawals
- 🧑‍💼 **Admin Panel** – Manage users, tasks, and approve withdrawals
- 📄 **Payment History** – Buyers see purchase history; Workers see withdrawals
- 🛡️ **Secure Routes** – Route protection and role-based redirection
- 🖼️ **Profile Management** – Edit name, profile photo, and track performance
- 📱 **Responsive UI** – Fully responsive layout with TailwindCSS + DaisyUI
- 📈 **Performance Analytics** – Track total coins earned, tasks completed, and payment history
- 🪪 **Form Validation** – Clean forms using React Hook Form + custom validation
- ⚙️ **Custom Hooks** – All role and auth logic separated into reusable hooks

---

## 📋 Feature Overview Table

| Feature                   | Description                                                         |
| ------------------------- | ------------------------------------------------------------------- |
| Role-Based Authentication | Separate login access for Workers, Buyers, and Admins               |
| Task Creation             | Buyers can post detailed tasks with instructions and deadlines      |
| Task Submission           | Workers can submit task proofs with image upload                    |
| Buyer Review System       | Buyers approve or reject submissions; status updates in real-time   |
| Worker Earnings           | Earn coins per approved task; track coin balance                    |
| Coin-Based Economy        | Internal system where 20 coins = $1 for withdrawal                  |
| Stripe Payments           | Buyers purchase coins securely using Stripe                         |
| Withdrawals               | Workers can request to withdraw money after earning minimum coins   |
| Admin Panel               | Manage users, tasks, and withdrawal requests                        |
| Notifications             | Bell-based alert system for submissions, approvals, and withdrawals |

---

## 🛠️ Tech Stack

### Frontend

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0FC8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://daisyui.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query)
[![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-EF00FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)](https://react-hook-form.com/)

### Backend

[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Firebase Admin](https://img.shields.io/badge/Firebase_Admin-FFA611?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/docs/admin)
[![Stripe API](https://img.shields.io/badge/Stripe_API-008CDD?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/docs/api)
[![dotenv](https://img.shields.io/badge/dotenv-8DD6F9?style=for-the-badge&logo=dotenv&logoColor=black)](https://www.npmjs.com/package/dotenv)

---

## 🧪 Pages and Routes

| Route                          | Description                                     |
| ------------------------------ | ----------------------------------------------- |
| `/`                            | Homepage with banner, features, and top workers |
| `/login`                       | User login page                                 |
| `/register`                    | User registration page                          |
| `/dashboard`                   | Redirects based on user role                    |
| `/dashboard/my-tasks`          | Buyer: Manage own tasks                         |
| `/dashboard/create-task`       | Buyer: Post a task                              |
| `/dashboard/payments`          | Buyer: View payments                            |
| `/dashboard/take-task`         | Worker: Browse available tasks                  |
| `/dashboard/my-submissions`    | Worker: See submitted tasks                     |
| `/dashboard/request-withdraw`  | Worker: Submit a withdrawal request             |
| `/dashboard/withdrawals`       | Worker: View withdrawal history                 |
| `/dashboard/all-users`         | Admin: View/manage users                        |
| `/dashboard/all-tasks`         | Admin: View/delete tasks                        |
| `/dashboard/stats`             | Admin: View platform stats                      |
| `/dashboard/withdraw-requests` | Admin: Approve withdrawals                      |

## 🔑 Environment Variables

Create a `.env.local` file in the root:

```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_messaging_id
VITE_appId=your_app_id
VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_API_URL=https://micro-earn-server.vercel.app
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## 🛠️ Installation

```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-md-zeon
cd b11a12-client-side-md-zeon
npm install
```

Run the development server:

```bash
npm run dev
```

## 🧾 Notes

- Uses JWT from Firebase for secure API communication.
- Fully responsive and mobile-friendly.
- Includes loading states, error boundaries, and fallback UIs.
- Integrated with backend server hosted at: [https://micro-earn-server.vercel.app](https://micro-earn-server.vercel.app)

## 🧪 Testing

- Tested manually across major routes and dashboard flows.
- Protected routes tested for all roles.

---

## 👥 User Roles

### 👷 Workers

- Browse and complete available tasks
- Earn coins and withdraw real money
- View task history and performance stats

### 💼 Buyers

- Create and manage tasks
- Review and approve/reject submissions
- Monitor task performance and payments

### 🛡️ Admins

- Oversee the entire platform
- Manage users, tasks, and withdrawal requests
- Monitor overall platform statistics and earnings

---

## 📄 License

This project is for educational purpose only.

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit pull requests. Whether it's fixing bugs, improving documentation, or adding new features — all efforts are appreciated.

## 📬 Contact

If you have any questions or feedback, feel free to reach out:

**Developer:** Zeanur Rahaman Zeon  
**Email:** [zeon.cse@gmail.com](mailto:zeon.cse@gmail.com)  
**LinkedIn:** [https://www.linkedin.com/in/zeanur-rahaman-zeon](https://www.linkedin.com/in/zeanur-rahaman-zeon)
