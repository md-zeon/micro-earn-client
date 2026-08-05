import { Link } from "react-router";
import {
  LuGithub,
  LuMail,
  LuPhone,
  LuMapPin,
  LuX,
  LuLinkedin,
  LuGlobe,
  LuHeart,
} from "react-icons/lu";
import Logo from "./Logo";
import Container from "./Container";
import { motion } from "motion/react";

const Footer = () => {
  const socialLinks = [
    {
      icon: <LuLinkedin />,
      href: "https://linkedin.com/in/zeanur-rahaman-zeon",
      label: "LinkedIn",
    },
    { icon: <LuGithub />, href: "https://github.com/md-zeon", label: "GitHub" },
    {
      icon: <LuGlobe />,
      href: "https://zeon-portfolio.netlify.app/",
      label: "Website",
    },
    { icon: <LuX />, href: "https://x.com/developerzeon", label: "X" },
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
                <LuMail className="h-4 w-4 text-gradient" />
                <a
                  href="mailto:support@microearn.com"
                  className="hover:text-gradient transition-colors"
                >
                  support@microearn.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <LuPhone className="h-4 w-4 text-gradient" />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <LuMapPin className="h-4 w-4 text-gradient" />
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
            Made with <LuHeart className="h-4 w-4 text-red-500 fill-red-500" />{" "}
            by Zeon
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
