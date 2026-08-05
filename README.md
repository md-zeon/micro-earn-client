# MicroEarn - Client Side

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-7-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)
![shadcn/ui](https://img.shields.io/badge/shadcn--ui-000000)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28)
![Stripe](https://img.shields.io/badge/Stripe-635BFF)
![Node](https://img.shields.io/badge/Node.js-22-green)

## Live URL

🔗 **Live Website:** [https://micro-earn-7be08.web.app/](https://micro-earn-7be08.web.app/)

## Demo Credentials

| Role | Email | Password |
| -------- | -------- | -------- |
| **Admin** | `admin@microearn.com` | `Admin@1234` |
| **Buyer** | Create your own account | - |
| **Worker** | Create your own account | - |

---

## Key Features

- **🔐 Authentication** – Email/password registration & login with Firebase Authentication.
- **⚡ Task Posting** – Buyers create tasks with images, descriptions, and deadlines. The required coin cost is deducted from the buyer's balance **server-side** on creation.
- **📝 Rich Task Submissions** – Workers complete tasks and submit proof (image + details).
- **💰 Coin-Based Economy** – Buyers purchase coins via **Stripe**; coins are credited idempotently through the Stripe webhook. Creating a task deducts coins; deleting an active task refunds unfilled slot costs.
- **🖼️ Image Upload** – Workers upload proof images via **Cloudinary** (with **ImgBB** fallback).
- **✅ Admin Panel** – Manage users, tasks, submissions, and approve/reject withdrawal requests.
- **🔔 Notifications** – In-app notifications with mark-as-read / mark-all-read; unread count polling every 30 seconds.
- **🛡️ Secure Routes** – Route protection and role-based redirection (Buyer / Worker / Admin).
- **📊 Analytics Dashboard** – Track earnings, completed tasks, and payment history with Recharts.
- **🎨 Modern UI** – Tailwind CSS v4 + **shadcn/ui** components with light/dark styling, smooth Motion animations, and a responsive design.

## Feature Overview

| Feature | Description |
| ------- | ----------- |
| **User Authentication** | Firebase Auth handles registration, login, and protected routes. |
| **Task Management** | Buyers can post, edit, and delete tasks with rich text details (TipTap). |
| **Task Discovery** | Search, filter by category, and paginate through available tasks. |
| **Submission System** | Workers submit proof; buyers review and approve/reject. |
| **Coin-Based Economy** | Buyers purchase coins (Stripe), tasks cost coins, completions reward coins. |
| **Withdrawal System** | Workers request withdrawals after reaching the minimum balance (20 coins = $1, min 200 coins). |
| **Admin Panel** | Manage users, tasks, and withdrawal requests. |
| **Payment History** | View Stripe purchase history and transaction records. |
| **Profile Management** | Users can update their profile, and buyers can become workers (role switching). |

## Tech Stack

- **React 19** – UI framework
- **Vite 7** – Build tool & dev server
- **Tailwind CSS v4** – Styling
- **shadcn/ui + Base UI** – Component library & primitives
- **React Router 7** – Client-side routing
- **TanStack Query 5** – Server state management
- **React Hook Form + Zod** – Form handling & validation
- **Axios** – HTTP client
- **Firebase** – Authentication
- **Stripe** – Payment processing
- **Recharts** – Charts
- **TipTap** – Rich text editor
- **Motion** – Animations
- **Swiper** – Carousels
- **GSAP** – Scroll animations
- **Sonner** – Toasts
- **react-helmet-async** – SEO / document head management
- **lucide-react** – Icons

## Pages and Routes

### Public Pages
| Route | Page |
| ----- | ---- |
| `/` | Home (Hero, Trust Bar, Stats, How It Works, Why Choose Us, Featured Tasks, Best Workers, Testimonials, FAQ, CTA, Newsletter) |
| `/all-tasks` | Browse & search all tasks |
| `/task-details/:id` | Public task details |
| `/worker/:id` | Public worker profile |
| `/pricing` | Pricing |
| `/about` | About |
| `/contact` | Contact |
| `/terms` | Terms & Conditions |
| `/privacy` | Privacy Policy |
| `/login` | Login |
| `/register` | Register |
| `/forbidden` | 403 – unauthorized access |
| `*` | 404 – not found |

### Buyer Dashboard
| Route | Page |
| ----- | ---- |
| `/dashboard` | Buyer dashboard overview |
| `/dashboard/add-task` | Create a new task |
| `/dashboard/my-tasks` | My posted tasks |
| `/dashboard/edit-task/:id` | Edit a posted task |
| `/dashboard/purchase-coin` | Buy coins (Stripe) |
| `/dashboard/payment-history` | Payment history |
| `/dashboard/tasks-to-review` | Review worker submissions |

### Worker Dashboard
| Route | Page |
| ----- | ---- |
| `/dashboard/tasks-list` | Available tasks |
| `/dashboard/task-details/:id` | Submit work on a task |
| `/dashboard/my-submissions` | My submissions |
| `/dashboard/approved-submissions` | Approved & paid submissions |
| `/dashboard/withdrawals` | Withdraw earnings |

### Admin Dashboard
| Route | Page |
| ----- | ---- |
| `/dashboard/manage-users` | Manage all users |
| `/dashboard/manage-tasks` | Approve / reject / delete tasks |
| `/dashboard/withdraw-requests` | Approve / reject withdrawals |

### Common Dashboard
| Route | Page |
| ----- | ---- |
| `/dashboard/profile` | Profile management |
| `/dashboard/notifications` | Notifications |

## Project Structure

```
micro-earn-client/
├── public/
├── src/
│   ├── api/              # API configuration & utilities
│   ├── assets/           # Images and static assets
│   ├── components/       # Reusable UI components
│   │   ├── Home/         # Landing page sections
│   │   ├── ui/           # shadcn/ui primitives
│   │   └── ...
│   ├── contexts/         # React contexts
│   ├── firebase/         # Firebase config
│   ├── hooks/            # Custom hooks
│   ├── layouts/          # Layout components
│   ├── pages/            # Page components
│   ├── providers/        # Provider components
│   ├── Routes/           # Router configuration
│   ├── index.css         # Global styles
│   └── main.jsx          # Application entry point
├── components.json       # shadcn/ui config
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

## Environment Variables

Create a `.env.local` file in the project root:

```
VITE_apiKey=
VITE_authDomain=
VITE_projectId=
VITE_storageBucket=
VITE_messagingSenderId=
VITE_appId=
VITE_API_URL=https://micro-earn-server.vercel.app
VITE_STRIPE_PUBLISHABLE_KEY=
VITE_CLOUDINARY_UPLOAD_PRESET=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_IMGBB_API_KEY=
```

## Installation

Clone/download the project and install dependencies:

```bash
npm install
```

## Run Locally

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run the linter:

```bash
npm run lint
```

## Deployment

The app is deployed on **Firebase Hosting** (`firebase.json` / `.firebaserc`).

```bash
npm run build
firebase deploy
```

## Testing & Verification

- App is tested manually against the live backend at `https://micro-earn-server.vercel.app`.
- `npm run lint` passes with 0 errors.
- `npm run build` completes successfully (Vite 7).

## Notes

- The app uses **Firebase ID tokens** (JWT) sent via the `Authorization: Bearer` header for authenticated API calls.
- Task creation cost = `required_workers × payable_amount`; it is computed client-side for the UI but **charged server-side**.
- The backend is hosted at **Vercel** and the frontend at **Firebase Hosting**.

## License

This project was created for educational purposes as part of the **Programming Hero Next Level Development** course.
