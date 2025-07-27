# MicroEarn - Earn Money from Small Online Tasks

MicroEarn is a comprehensive micro-task platform where users can earn money by completing small online tasks. Built with cutting-edge web technologies, it offers a seamless and responsive user experience tailored for Workers, Buyers, and Admins.

## 🌐 Live Site
**URL:** [https://micro-earn-7be08.web.app/](https://micro-earn-7be08.web.app/)

## 👤 Admin Credentials
**Email:** [admin@microearn.com](mailto:admin@microearn.com)  
**Password:** Admin@1234

---

## ✨ Key Features

* 🔐 **Role-Based Authentication** – Firebase authentication with Buyer, Worker, and Admin roles
* 📋 **Task Creation** – Buyers can post tasks with descriptions, instructions, and required workers
* 🨠 **Task Discovery** – Workers can browse tasks with filters by category, coins, deadline, etc.
* 📝 **Task Submission** – Workers can submit proof with file upload and message
* ✅ **Buyer Review System** – Buyers approve/reject submissions; coins awarded upon approval
* 📤 **ImgBB Upload** – Workers upload task proof/images via ImgBB API
* 💰 **Coin-Based Economy** – Buyers buy coins with Stripe, Workers earn coins from tasks
* 💸 **Withdrawals** – Workers can withdraw coins (20 coins = $1, min 200 coins); status = pending until admin approval
* 📊 **Dashboards** – Role-specific dashboards showing tasks, payments, coins, and submissions
* 📥 **Notifications** – Real-time alerts for submission approvals, rejections, new tasks, and withdrawals
* 🧑‍💼 **Admin Panel** – Manage users, tasks, and approve withdrawals
* 📄 **Payment History** – Buyers see purchase history; Workers see withdrawals
* 🛡️ **Secure Routes** – Route protection and role-based redirection
* 🖼️ **Profile Management** – Edit name, profile photo, and track performance
* 📱 **Responsive UI** – Fully responsive layout with TailwindCSS + DaisyUI
* 📈 **Performance Analytics** – Track total coins earned, tasks completed, and payment history
* 🪪 **Form Validation** – Clean forms using React Hook Form + custom validation
* ⚙️ **Custom Hooks** – All role and auth logic separated into reusable hooks

---

## 📋 Feature Overview Table

| Feature                   | Description                                                                  |
|--------------------------|------------------------------------------------------------------------------|
| Role-Based Authentication| Separate login access for Workers, Buyers, and Admins                        |
| Task Creation            | Buyers can post detailed tasks with instructions and deadlines               |
| Task Submission          | Workers can submit task proofs with image upload                             |
| Buyer Review System      | Buyers approve or reject submissions; status updates in real-time            |
| Worker Earnings          | Earn coins per approved task; track coin balance                             |
| Coin-Based Economy       | Internal system where 20 coins = $1 for withdrawal                           |
| Stripe Payments          | Buyers purchase coins securely using Stripe                                  |
| Withdrawals              | Workers can request to withdraw money after earning minimum coins            |
| Admin Panel              | Manage users, tasks, and withdrawal requests                                 |
| Notifications            | Bell-based alert system for submissions, approvals, and withdrawals          |
| Performance Tracking     | Track number of tasks submitted, earnings, approval rate                     |
| Task Filters & Sorting   | Workers can sort and filter tasks by category, reward, or deadline           |

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

## 🚀 Getting Started

1. **Clone the repository**
2. **Install dependencies:** `npm install`
3. **Set up environment variables** (Firebase config, Stripe keys, etc.)
4. **Run the development server:** `npm run dev`

---

## 👥 User Roles

### 👷 Workers
* Browse and complete available tasks
* Earn coins and withdraw real money
* View task history and performance stats

### 💼 Buyers
* Create and manage tasks
* Review and approve/reject submissions
* Monitor task performance and payments

### 🛡️ Admins
* Oversee the entire platform
* Manage users, tasks, and withdrawal requests
* Monitor overall platform statistics and earnings

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
