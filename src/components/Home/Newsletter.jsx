import { useState } from "react";
import { LuMail } from "react-icons/lu";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // TODO: Implement logic to send the email to a backend API or service
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
            Stay Updated
          </h2>
          <p className="mb-8 max-w-2xl mx-auto text-gray-500">
            Subscribe to our newsletter and never miss out on new tasks, platform updates, and earning tips.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <div className="flex-1">
              <div className="input input-bordered w-full flex items-center gap-2 text-base-content">
                <LuMail className="text-gray-500" />
                <input
                  type="email"
                  className="grow"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn bg-gradient font-semibold">
              Subscribe
            </button>
          </form>
          
          <p className="text-gray-600 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
    </section>
  );
};

export default Newsletter;