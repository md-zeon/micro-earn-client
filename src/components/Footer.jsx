import { Link } from "react-router";
import {
  Mail,
  Phone,
  MapPin,
  X,
  Globe,
  Heart,
} from "lucide-react";
import Logo from "./Logo";
import Container from "./Container";
import { motion } from "motion/react";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const Footer = () => {
  const socialLinks = [
    {
      icon: <LinkedinIcon className="size-5" />,
      href: "https://linkedin.com/in/zeanur-rahaman-zeon",
      label: "LinkedIn",
    },
    {
      icon: <GithubIcon className="size-5" />,
      href: "https://github.com/md-zeon",
      label: "GitHub",
    },
    {
      icon: <Globe className="size-5" />,
      href: "https://zeon-portfolio.netlify.app/",
      label: "Website",
    },
    { icon: <X className="size-5" />, href: "https://x.com/developerzeon", label: "X" },
  ];

  const footerLinks = {
    explore: [
      { name: "Home", path: "/" },
      { name: "All Tasks", path: "/all-tasks" },
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
    ],
    account: [
      { name: "Login", path: "/login" },
      { name: "Register", path: "/register" },
      { name: "Dashboard", path: "/dashboard" },
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
    ],
  };

  return (
    <footer className="relative border-t border-border/60 bg-gradient-to-b from-muted/40 to-background pt-20 pb-8 px-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />

      <Container>
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-border pb-10">
          {/* Brand */}
          <div>
            <Logo />
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed max-w-xs">
              Empowering people to earn through micro-tasks. Secure, flexible,
              and easy-to-use platform.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-emerald-600 hover:border-emerald-500/40 dark:hover:text-emerald-400 transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-gradient transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-3">
              {footerLinks.account.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-gradient transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-gradient" />
                <a
                  href="mailto:support@microearn.com"
                  className="hover:text-gradient transition-colors"
                >
                  support@microearn.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-gradient" />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-gradient" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} MicroEarn. All rights reserved.
          </p>
          <div className="flex items-center gap-1 mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" />{" "}
            by Zeon
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
