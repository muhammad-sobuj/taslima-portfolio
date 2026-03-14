import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import {
  Instagram,
  Linkedin,
  Dribbble,
  Download,
  Sparkles,
  Zap,
  Star,
  Github,
  Facebook,
} from "lucide-react";
import Services from "./Services";
import About from "./About";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import cvFile from "../assets/Sobuj_CV.pdf";
import heroImg from "../assets/art.jpg";
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);
  const socialRef = useRef(null);
  const buttonsRef = useRef(null);
  const particlesRef = useRef([]);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating particles
      const createParticles = () => {
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement("div");
          particle.className = "absolute w-1 h-1 bg-primary/30 rounded-full";
          particle.style.left = Math.random() * 100 + "%";
          particle.style.top = Math.random() * 100 + "%";
          heroRef.current?.appendChild(particle);
          particlesRef.current.push(particle);

          gsap.to(particle, {
            y: -100 - Math.random() * 100,
            x: (Math.random() - 0.5) * 200,
            opacity: 0,
            duration: 3 + Math.random() * 4,
            repeat: -1,
            delay: Math.random() * 3,
            ease: "power2.out",
          });
        }
      };

      // Main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Hero entrance animations
      tl.fromTo(
        textRef.current?.children,
        {
          y: 100,
          opacity: 0,
          rotationX: -90,
          transformOrigin: "top center",
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
        }
      );

      // Image animation with 3D effect
      tl.fromTo(
        imageRef.current,
        {
          scale: 0.8,
          opacity: 0,
          rotationY: 45,
          z: -200,
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          z: 0,
          duration: 1.5,
          ease: "power2.out",
        },
        "-=0.8"
      );

      // Social links with bounce
      tl.fromTo(
        socialRef.current?.children,
        {
          scale: 0,
          rotation: -180,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      );

      // Buttons with magnetic effect
      tl.fromTo(
        buttonsRef.current?.children,
        {
          y: 50,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "elastic.out(1, 0.8)",
        },
        "-=0.4"
      );

      // Stats counter animation
      tl.fromTo(
        statsRef.current,
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.6"
      );

      // Animate numbers counting up
      const numbers = statsRef.current?.querySelectorAll(".stat-number");
      numbers?.forEach((number, index) => {
        const finalValue = [5, 20, 50][index];
        gsap.fromTo(
          number,
          { textContent: 0 },
          {
            textContent: finalValue,
            duration: 2,
            delay: 1,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function () {
              number.textContent =
                Math.ceil(this.targets()[0].textContent) + "+";
            },
          }
        );
      });

      createParticles();

      // Continuous animations
      gsap.to(imageRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      // Sparkle animation for title
      const sparkles = textRef.current?.querySelectorAll(".sparkle");
      sparkles?.forEach((sparkle, index) => {
        gsap.to(sparkle, {
          rotation: 360,
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6],
          duration: 2 + index * 0.5,
          repeat: -1,
          ease: "power2.inOut",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div  className="container mx-auto">
      <motion.div
        ref={containerRef}
        className="relative min-h-screen overflow-hidden"
        style={{ y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-64 h-64 bg-orange-400/5 rounded-full blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div
          ref={heroRef}
          className="container mx-auto px-6 lg:px-16 flex flex-col-reverse lg:flex-row items-center justify-between relative min-h-screen pt-14"
        >
          {/* Left Content */}
          <motion.div
            ref={textRef}
            className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 pt-10 lg:pt-0 z-10"
            variants={itemVariants}
          >
            <motion.div className="space-y-2" variants={itemVariants}>
              <motion.p
                className="text-lg lg:text-xl font-medium text-text-light dark:text-white"
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                transition={{ duration: 0.6 }}
              >
                Hi I am
              </motion.p>
              <motion.p
                className="text-xl lg:text-2xl font-medium text-text-muted-light dark:text-gray-400"
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Taslima Khatun
              </motion.p>
              <motion.h1
                className="text-5xl lg:text-6xl font-bold font-display text-primary leading-tight mt-2 relative"
                whileInView={{ opacity: [0, 1], y: [30, 0] }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
            MERN Stack Developer & Content Creator
                <Sparkles
                  className="sparkle absolute -top-2 -right-2 text-primary/60"
                  size={20}
                />
                <Star
                  className="sparkle absolute top-4 left-10 text-orange-400/60"
                  size={16}
                />
                <Zap
                  className="sparkle absolute bottom-2 right-20 text-primary/60"
                  size={18}
                />
              </motion.h1>
            </motion.div>

            {/* Social Links */}
            <motion.div
              ref={socialRef}
              className="flex items-center space-x-4 pt-2"
              variants={itemVariants}
            >
              {[
                {
                  icon: Linkedin,
                  href: "https://in/md-sobuj-hossain",
                  color: "hover:text-pink-500",
                },
                {
                  icon: Github,
                  href: "https://github.com/muhammad-sobuj",
                  color: "hover:text-pink-500",
                },
                {
                  icon: Facebook,
                  href: "https://www.facebook.com/muhammadsobujhossain20",
                  color: "hover:text-blue-500",
                },
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/muhammadsobujhossain",
                  color: "hover:text-pink-500",
                },
                { icon: Dribbble, href: "#", color: "hover:text-pink-400" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 text-text-muted-light dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:border-primary dark:hover:border-primary transition-all duration-300 ${social.color}`}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0 10px 25px rgba(253, 110, 10, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              ref={buttonsRef}
              className="flex flex-wrap items-center gap-4 pt-6"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-primary to-orange-500 hover:from-orange-500 hover:to-primary text-white font-medium py-3 px-8 rounded-lg shadow-lg shadow-orange-500/30 min-w-[140px] relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap size={16} />
                    Hire Me
                  </span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 text-text-light dark:text-white font-medium py-3 px-8 rounded-lg border border-gray-300 dark:border-gray-600 min-w-[140px] group"
                >
                  <span>
                    <a
                      className="flex items-center gap-2"
                      href={cvFile}
                      download="sobujCV.pdf"
                    >
                      <Download size={16} />
                      Download CV
                    </a>
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              ref={statsRef}
              className="bg-surface-light/80 dark:bg-surface-dark/50 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-xl p-6 flex flex-wrap justify-between items-center max-w-lg mt-8 lg:mt-12 shadow-lg dark:shadow-none"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col pr-6 border-r border-gray-200 dark:border-gray-700/50">
                <span className="stat-number text-primary text-xl lg:text-2xl font-bold">
                  06
                </span>
                <span className="text-sm text-text-muted-light dark:text-gray-400 mt-1">
                  Experiences
                </span>
              </div>

              <div className="flex flex-col px-6 border-r border-gray-200 dark:border-gray-700/50">
                <span className="stat-number text-primary text-xl lg:text-2xl font-bold"></span>
                <span className="text-sm text-text-muted-light dark:text-gray-400 mt-1">
                  Project done
                </span>
              </div>

              <div className="flex flex-col pl-6">
                <span className="stat-number text-primary text-xl lg:text-2xl font-bold">
                  0
                </span>
                <span className="text-sm text-text-muted-light dark:text-gray-400 mt-1">
                  Happy Clients
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            className="w-full lg:w-1/2 flex justify-center lg:justify-end items-end relative h-[500px] lg:h-[700px] overflow-visible"
            variants={itemVariants}
          >
            <motion.div
              className="absolute w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full hero-circle top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              ref={imageRef}
              className="relative z-10 h-full w-full flex items-end justify-center lg:justify-end"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                alt="Taslima Khatun - Content Creator"
                className="h-[350px] lg:h-[550px] object-contain object-bottom filter grayscale contrast-110 drop-shadow-2xl"
                src={heroImg}
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 80%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 80%, transparent 100%)",
                }}
                whileHover={{ filter: "grayscale(0) contrast(110%)" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <Services />
      <About />
      <Portfolio />
      <Contact />
    </div>
  );
};

export default Home;
