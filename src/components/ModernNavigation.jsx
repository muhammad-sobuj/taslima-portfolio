import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, Zap, Star } from "lucide-react";
// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const ModernNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeHover, setActiveHover] = useState(null);
  const location = useLocation();

  // Refs for GSAP animations
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);
  const hireButtonRef = useRef(null);
  const backgroundRef = useRef(null);
  const sparkleRefs = useRef([]);

  // Framer Motion scroll hook
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [0.95, 0.8]);
  const navScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  const navItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Services", path: "/services", icon: "⚡" },
    { name: "About me", path: "/about", icon: "👨‍💻" },
    { name: "Portfolio", path: "/portfolio", icon: "🎨" },
    { name: "Contact me", path: "/contact", icon: "📧" },
  ];

  const isActive = (path) => location.pathname === path;

  // Advanced GSAP entrance animations
  useEffect(() => {
    const tl = gsap.timeline();

    // Create floating particles effect
    const createParticles = () => {
      for (let i = 0; i < 5; i++) {
        const particle = document.createElement("div");
        particle.className =
          "absolute w-1 h-1 bg-primary rounded-full opacity-30";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        backgroundRef.current?.appendChild(particle);

        gsap.to(particle, {
          y: -50,
          x: Math.random() * 100 - 50,
          opacity: 0,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          delay: Math.random() * 2,
        });
      }
    };

    // Navbar entrance with elastic effect
    tl.fromTo(
      navRef.current,
      {
        y: -120,
        opacity: 0,
        rotationX: -90,
        transformOrigin: "top center",
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.8)",
      }
    );

    // Logo with 3D rotation and glow
    tl.fromTo(
      logoRef.current,
      {
        scale: 0,
        rotation: -360,
        filter: "brightness(0)",
      },
      {
        scale: 1,
        rotation: 0,
        filter: "brightness(1)",
        duration: 1,
        ease: "back.out(2)",
      },
      "-=0.8"
    );

    // Menu items with wave effect
    tl.fromTo(
      menuItemsRef.current,
      {
        y: -30,
        opacity: 0,
        rotationY: 90,
      },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: "start",
        },
        ease: "power3.out",
      },
      "-=0.6"
    );

    // Hire button with bounce and glow
    tl.fromTo(
      hireButtonRef.current,
      {
        scale: 0,
        opacity: 0,
        filter: "blur(10px)",
      },
      {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "bounce.out",
      },
      "-=0.4"
    );

    // Create particles
    createParticles();

    // Advanced logo hover effects
    const logoElement = logoRef.current;
    if (logoElement) {
      const handleMouseEnter = () => {
        gsap.to(logoElement, {
          scale: 1.1,
          rotation: 5,
          textShadow: "0 0 30px #FD6E0A, 0 0 60px #FD6E0A",
          duration: 0.3,
          ease: "power2.out",
        });

        // Create sparkle burst
        sparkleRefs.current.forEach((sparkle, index) => {
          if (sparkle) {
            gsap.fromTo(
              sparkle,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                delay: index * 0.1,
                ease: "back.out(1.7)",
              }
            );
          }
        });
      };

      const handleMouseLeave = () => {
        gsap.to(logoElement, {
          scale: 1,
          rotation: 0,
          textShadow: "0 0 0px #FD6E0A",
          duration: 0.3,
          ease: "power2.out",
        });

        // Hide sparkles
        sparkleRefs.current.forEach((sparkle) => {
          if (sparkle) {
            gsap.to(sparkle, { scale: 0, opacity: 0, duration: 0.2 });
          }
        });
      };

      logoElement.addEventListener("mouseenter", handleMouseEnter);
      logoElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        logoElement.removeEventListener("mouseenter", handleMouseEnter);
        logoElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  // Advanced scroll effects with GSAP ScrollTrigger
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isScrolled = scrollY > 50;
      setScrolled(isScrolled);
      setScrollPosition(scrollY);

      // Calculate dynamic colors based on scroll position
      const scrollProgress = Math.min(scrollY / 500, 1); // Normalize to 0-1 over 500px

      // Dynamic navbar transformation with color progression
      gsap.to(navRef.current, {
        backdropFilter: isScrolled
          ? `blur(${20 + scrollProgress * 10}px) saturate(${
              150 + scrollProgress * 50
            }%)`
          : "blur(10px)",
        backgroundColor: isScrolled
          ? `rgba(${15 + scrollProgress * 20}, ${15 + scrollProgress * 20}, ${
              25 + scrollProgress * 20
            }, ${0.85 + scrollProgress * 0.1})`
          : "rgba(249, 250, 251, 0.1)",
        borderColor: isScrolled
          ? `rgba(253, 110, 10, ${0.3 + scrollProgress * 0.4})`
          : "rgba(229, 231, 235, 0.2)",
        boxShadow: isScrolled
          ? `0 8px 32px rgba(253, 110, 10, ${0.1 + scrollProgress * 0.2})`
          : "0 4px 16px rgba(0, 0, 0, 0.05)",
        duration: 0.4,
        ease: "power2.out",
      });

      // Parallax effect for background elements
      gsap.to(backgroundRef.current, {
        y: scrollY * 0.1,
        duration: 0.3,
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu item hover effects
  const handleMenuItemHover = (index, isHovering) => {
    const item = menuItemsRef.current[index];
    if (!item) return;

    if (isHovering) {
      setActiveHover(index);
      gsap.to(item, {
        y: -5,
        scale: 1.05,
        color: "#FD6E0A",
        textShadow: "0 0 10px rgba(253, 110, 10, 0.5)",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      setActiveHover(null);
      gsap.to(item, {
        y: 0,
        scale: 1,
        color: "",
        textShadow: "none",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Mobile menu variants with advanced animations
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const mobileItemVariants = {
    closed: {
      x: -50,
      opacity: 0,
      rotateY: -90,
    },
    open: {
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
  };

  return (
    <motion.nav
      ref={navRef}
      role="navigation"
      style={{ opacity: navOpacity, scale: navScale }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-gradient-to-r from-gray-900/60 via-gray-800/70 to-gray-900/60 dark:from-gray-900/80 dark:via-black/90 dark:to-gray-900/80 backdrop-blur-3xl shadow-2xl border-b-2 border-primary/40"
          : "bg-gradient-to-r from-white/10 via-white/5 to-white/10 dark:from-gray-900/20 dark:via-gray-900/10 dark:to-gray-900/20 backdrop-blur-lg border-b border-gray-200/30 dark:border-white/5"
      }`}
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Animated background particles */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{
            background: scrolled
              ? [
                  "radial-gradient(circle at 20% 50%, rgba(253, 110, 10, 0.2) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(253, 110, 10, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 40% 50%, rgba(253, 110, 10, 0.25) 0%, transparent 50%)",
                ]
              : [
                  "radial-gradient(circle at 20% 50%, rgba(253, 110, 10, 0.05) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(253, 110, 10, 0.08) 0%, transparent 50%)",
                  "radial-gradient(circle at 40% 50%, rgba(253, 110, 10, 0.06) 0%, transparent 50%)",
                ],
          }}
          transition={{
            duration: scrolled ? 4 : 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative w-full py-4 px-6 lg:px-16 flex items-center justify-between">
        {/* Enhanced Logo */}
        <motion.div
          ref={logoRef}
          className="relative cursor-pointer group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div className="text-2xl font-bold font-display tracking-wide relative">
            <span className="text-primary relative inline-block">
               TASLIMA
              {/* Floating sparkles around logo */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  ref={(el) => (sparkleRefs.current[i] = el)}
                  className="absolute"
                  style={{
                    top: [-10, -5, -15, -8][i],
                    left: [-5, 45, 20, 35][i],
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {
                    [
                      <Sparkles size={8} />,
                      <Star size={6} />,
                      <Zap size={7} />,
                      <Sparkles size={5} />,
                    ][i]
                  }
                </motion.div>
              ))}
            </span>
          </motion.div>

          {/* Dynamic underline */}
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary via-orange-400 to-primary"
            initial={{ width: 0, opacity: 0 }}
            whileHover={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </motion.div>

        {/* Desktop Navigation with enhanced effects */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              ref={(el) => (menuItemsRef.current[index] = el)}
              className="relative group"
              onMouseEnter={() => handleMenuItemHover(index, true)}
              onMouseLeave={() => handleMenuItemHover(index, false)}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={item.path}
                className={`relative flex items-center gap-2 transition-all duration-300 ${
                  isActive(item.path)
                    ? "text-primary font-bold"
                    : "text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary"
                }`}
              >
                <span className="text-xs">{item.icon}</span>
                {item.name}

                {/* Active indicator with morphing effect */}
                {isActive(item.path) && (
                  <motion.div
                    className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-primary to-orange-400 rounded-full"
                    layoutId="activeIndicator"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "backOut" }}
                  />
                )}

                {/* Hover glow effect */}
                <motion.div
                  className="absolute -inset-2 bg-primary/10 rounded-lg -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Ultra-enhanced Hire Me Button */}
        <motion.div
          ref={hireButtonRef}
          className="hidden md:block"
          whileHover={{ scale: 1.05, rotateZ: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className="relative overflow-hidden bg-gradient-to-r from-primary via-orange-500 to-primary bg-size-200 hover:bg-pos-100 text-white font-medium py-3 px-8 rounded-xl shadow-2xl shadow-orange-500/30 transition-all duration-500 group nav-glow">
            {/* Animated background layers */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0 bg-primary/20"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <span className="relative z-10 flex items-center gap-2">
              <Zap size={16} />
              Hire Me
            </span>
          </Button>
        </motion.div>

        {/* Enhanced Mobile Menu Button */}
        <motion.button
          className="md:hidden text-text-light dark:text-text-dark text-2xl relative z-10 p-2 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9, rotate: 15 }}
          animate={{
            rotate: isOpen ? 180 : 0,
            backgroundColor: isOpen ? "rgba(253, 110, 10, 0.1)" : "transparent",
          }}
          transition={{ duration: 0.4, ease: "backOut" }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -180, opacity: 0, scale: 0 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 180, opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, ease: "backOut" }}
              >
                <X />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 180, opacity: 0, scale: 0 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -180, opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, ease: "backOut" }}
              >
                <Menu />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Enhanced Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden overflow-hidden bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-2xl border-t border-primary/20 mobile-menu"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex flex-col space-y-2 p-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={mobileItemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  transition={{
                    delay: index * 0.1,
                    duration: 0.4,
                    ease: "backOut",
                  }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 py-4 px-6 rounded-xl transition-all duration-300 ${
                      isActive(item.path)
                        ? "text-primary font-bold bg-gradient-to-r from-primary/10 to-orange-500/10 border border-primary/20"
                        : "text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-white/5 dark:hover:to-white/10"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.name}
                    {isActive(item.path) && (
                      <motion.div
                        className="ml-auto w-2 h-2 bg-primary rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={mobileItemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                transition={{
                  delay: navItems.length * 0.1,
                  duration: 0.4,
                  ease: "backOut",
                }}
                className="pt-4"
              >
                <Button className="w-full bg-gradient-to-r from-primary to-orange-500 hover:from-orange-500 hover:to-primary text-white font-medium py-4 px-6 rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-300 flex items-center justify-center gap-2">
                  <Zap size={16} />
                  Hire Me
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default ModernNavigation;
