import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-screen flex justify-center items-center"
    >
      <Loader2 className="h-10 w-10 animate-spin text-gradient" />
      <span className="sr-only">Loading…</span>
    </div>
  );
};

export default Loader;
