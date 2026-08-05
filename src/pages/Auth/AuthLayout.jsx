const AuthLayout = ({ children }) => {
  return (
    <div className="relative flex min-h-[calc(100vh-23rem)] items-center justify-center px-4 py-12 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-emerald-500/[0.07] blur-3xl" />
        <div className="absolute bottom-0 right-[8%] h-64 w-64 rounded-full bg-teal-500/[0.06] blur-3xl" />
      </div>
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
};

export default AuthLayout;
