import { toast } from "sonner";
import contactImage from "../../assets/contact.svg";
import PageTitle from "../../components/PageTitle";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const Contact = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <PageTitle
        title="Contact Us"
        description="Get in touch with the MicroEarn team for support, partnerships, or feedback."
      />
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gradient mb-3">Let's Talk</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Have a question? Reach out to the MicroEarn team—we'd love to hear
          from you!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Illustration */}
        <div>
          <img
            src={contactImage}
            alt="Contact Illustration"
            className="md:max-w-md"
          />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.target.reset();
            toast.success(
              "Thanks for reaching out! We'll get back to you soon.",
            );
          }}
          className="bg-card p-8 rounded-xl shadow-lg space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Your Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={4}
              placeholder="Type your message..."
              required
            />
          </div>
          <Button type="submit" className="w-full bg-gradient">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
