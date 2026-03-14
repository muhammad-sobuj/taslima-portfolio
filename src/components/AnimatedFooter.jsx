import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Heart,
  Sparkles,
  ArrowUp,
  Zap,
  Download,
} from "lucide-react";

const AnimatedFooter = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const footerRef = useRef(null);
  const contactRef = useRef(null);
  const socialRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isInView) {
      const tl = gsap.timeline();

      tl.fromTo(
        contactRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      tl.fromTo(
        socialRef.current?.children,
        { scale: 0, rotation: 180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );

      // Create floating particles (optimized to 10 instead of 20 for performance)
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement("div");
        particle.className = "absolute w-1 h-1 bg-primary/30 rounded-full";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        footerRef.current?.appendChild(particle);

        gsap.to(particle, {
          y: -100,
          x: Math.random() * 200 - 100,
          opacity: 0,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          delay: Math.random() * 2,
          ease: "power2.out",
        });
      }
    }
  }, [isInView]);

  const scrollToTop = () => {
    window.lenis?.scrollTo(0, { duration: 1.5 });
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://mail.google.com/mail/u/0/#inbox", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("Thanks for subscribing! 📩");
        setEmail("");
      } else {
        alert("Something went wrong. Please try again!");
      }
    } catch (error) {
      console.error(error);
      alert("Network error!");
    }
  };

  const socialLinks = [
    { href: "#", icon: Facebook, color: "#1877F2" },
    { href: "#", icon: Twitter, color: "#1DA1F2" },
    { href: "#", icon: Instagram, color: "#E4405F" },
    { href: "#", icon: Linkedin, color: "#0A66C2" },
    { href: "#", icon: Github, color: "#181717" },
  ];

  return (
    <motion.footer
      ref={footerRef}
      className="relative bg-gradient-to-br pt-50 from-gray-900 to-black text-gray-300 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      aria-label="Footer"
    >
      <motion.div
        className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-multiply pointer-events-none"
        style={{ y: backgroundY }}
      />

      <div className="container mx-auto px-6 lg:px-16 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              Taslima <span className="text-primary">Khatun</span>
              <Sparkles className="text-orange-500" size={24} />
            </h2>
            <p className="mb-6 leading-relaxed">
              Crafting digital experiences that blend creativity with technology
              to bring your vision to life.
            </p>
            <Button
              className="bg-gradient-to-r from-primary to-orange-500 hover:from-orange-500 hover:to-primary text-white font-medium py-2 px-6 rounded-full shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              aria-label="Download Resume"
            >
              <Download size={16} className="mr-2" />
              Resume
            </Button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["Home", "Services", "About", "Portfolio", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      to={`/${link.toLowerCase()}`}
                      className="hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <ArrowUp size={14} className="rotate-45" />
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">
              Newsletter
            </h3>
            <p className="mb-4">
              Stay updated with my latest projects and insights.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email for newsletter"
                className="flex-grow"
              />
              <Button type="submit" className="bg-primary text-white">
                <Send size={16} />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div ref={contactRef} className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-6">Contact</h3>
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-primary" />
              <a
                href="mailto:taslima16123@gmail.com"
                className="hover:text-primary"
              >
                taslima16123@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-primary" />
              <a href="tel:+1234567890" className="hover:text-primary">
                +8801234567890
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-primary" />
              <span>Sirajganj, Dhaka Bangladesh</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Social & Copyright */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 lg:px-16 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <motion.div
              ref={socialRef}
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 group"
                  whileHover={{
                    scale: 1.2,
                    backgroundColor: social.color,
                    rotate: 10,
                  }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Social link to ${social.icon.name}`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>

            {/* Copyright */}
            <motion.div
              className="text-gray-400 text-sm text-center md:text-right"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <p>
                © {currentYear}{" "}
                <span className="text-primary font-semibold">
                 Taslima Khatun
                </span>
                . All rights reserved.
              </p>

              <p className="mt-1">
                Crafted with{" "}
                <span role="img" aria-label="love">
                  ❤️
                </span>{" "}
                and lots of{" "}
                <span role="img" aria-label="coffee">
                  ☕
                </span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-primary to-orange-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary/30 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
        }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        transition={{ duration: 0.3 }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </motion.button>
    </motion.footer>
  );
};

export default AnimatedFooter;
