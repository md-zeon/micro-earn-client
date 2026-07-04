import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Loader2 className="h-10 w-10 animate-spin text-gradient" />
    </div>
  );
};

export default Loader;
