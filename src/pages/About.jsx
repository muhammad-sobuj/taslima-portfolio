import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import cvFile from "../assets/Sobuj_CV.pdf";
import heroImg from "../assets/art.jpg";
import {
  GraduationCap,
  Briefcase,
  PenTool,
  Code,
  Search,
  Download,
  Sparkles,
  Zap,
  Star,
  MapPin,
  Mail,
  Calendar,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const timelineRef = useRef(null);
  const imageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isAboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const isSkillsInView = useInView(skillsRef, { once: true, margin: "-100px" });
  const isTimelineInView = useInView(timelineRef, {
    once: true,
    margin: "-100px",
  });

  const skills = [
    {
      icon: PenTool,
      title: "MERN Web Developer",
      description:
        "Creating intuitive interfaces and delightful user experiences using Figma and Adobe XD.",
      proficiency: 90,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Code,
      title: "Front-End Developer",
      description:
        "Building responsive websites with HTML, CSS, JavaScript, React, and Tailwind CSS.",
      proficiency: 85,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description:
        "Improving website visibility and ranking on search engines through technical SEO.",
      proficiency: 75,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const education = [
    {
      period: "2016 - 2020",
      title: "Bachelor of Honor's (BSC)",
      institution: "National University",
      description:
        "Graduated with honors. Focused on Software Engineering and Human-Computer Interaction.",
      active: true,
      icon: GraduationCap,
    },
    {
      period: "2025 - 2026",
      title: "MERN Stack Developer",
      institution: "Programming Hero Institute",
      description:
        "Intensive course covering color theory, typography, and layout design principles.",
      active: false,
      icon: PenTool,
    },
  ];

  const experience = [
    {
      period: "2025 - Present",
      title: "MERN Web Developer",
      company: "Creative Agency",
      description:
        "Leading a team of designers, conducting user research, and overseeing the design system implementation.",
      active: true,
      icon: Briefcase,
    },
    {
      period: "2025 - 2026",
      title: "Front-End Developer",
      company: "Tech Startup",
      description:
        "Developed responsive web applications using React.js and improved site performance by 40%.",
      active: false,
      icon: Code,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current?.children,
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
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // About section animation
      gsap.fromTo(
        aboutRef.current?.children,
        {
          x: -100,
          opacity: 0,
          rotationY: -20,
        },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1.2,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Image animation with 3D effect
      gsap.fromTo(
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
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Skills animation
      gsap.fromTo(
        skillsRef.current?.children,
        {
          y: 100,
          opacity: 0,
          rotationX: -45,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Timeline animation
      gsap.fromTo(
        timelineRef.current?.querySelectorAll(".timeline-item"),
        {
          x: -50,
          opacity: 0,
          scale: 0.9,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Skill progress bars animation
      const progressBars = skillsRef.current?.querySelectorAll(".progress-bar");
      progressBars?.forEach((bar, index) => {
        const percentage = skills[index].proficiency;
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${percentage}%`,
            duration: 2,
            delay: 0.5 + index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Floating animation for skill icons
      const skillIcons = skillsRef.current?.querySelectorAll(".skill-icon");
      skillIcons?.forEach((icon, index) => {
        gsap.to(icon, {
          y: -15,
          duration: 2.5 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.4,
        });
      });

      // Continuous image hover effect
      gsap.to(imageRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
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
        staggerChildren: 0.1,
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
    <div ref={containerRef} className="relative w-full">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/5 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            x: [0, 150, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-16 py-20 lg:py-24 relative">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
        >
          <motion.p
            className="text-primary font-medium tracking-wider uppercase mb-2 text-sm relative"
            variants={itemVariants}
          >
            Get to know me
            <Sparkles
              className="absolute -top-1 -right-8 text-primary/60"
              size={16}
            />
          </motion.p>
          <motion.h1
            className="text-4xl lg:text-5xl font-bold font-display text-text-light dark:text-white"
            variants={itemVariants}
          >
            About{" "}
            <span className="text-primary relative">
              Me
              <motion.div
                className="absolute -top-2 -right-4"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Star className="text-primary/60" size={16} />
              </motion.div>
            </span>
          </motion.h1>
        </motion.div>

        {/* About Section */}
        <motion.div
          ref={aboutRef}
          className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-24"
          variants={containerVariants}
          initial="hidden"
          animate={isAboutInView ? "visible" : "hidden"}
        >
          <motion.div
            className="w-full lg:w-5/12 relative group"
            variants={itemVariants}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 to-orange-400/20 translate-x-3 translate-y-3 rounded-2xl transition-transform group-hover:translate-x-1 group-hover:translate-y-1"
              animate={{
                rotate: [0, 1, 0, -1, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              ref={imageRef}
              className="relative rounded-2xl overflow-hidden bg-surface-dark border border-gray-200 dark:border-white/10 shadow-2xl h-[400px] lg:h-[500px]"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                alt="Taslima Khatun "
                className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500"
                src={heroImg}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Overlay with info */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                initial={{ y: 20 }}
                whileHover={{ y: 0 }}
              >
                <div className="text-white">
                  <h3 className="font-bold text-lg">Taslima Khatun</h3>
                  <p className="text-sm opacity-90">MERN Stack Developer</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full lg:w-7/12 flex flex-col justify-center space-y-6"
            variants={itemVariants}
          >
            <motion.h2
              className="text-3xl font-bold font-display text-text-light dark:text-white"
              variants={itemVariants}
            >
              <span className="text-primary">MERN Web</span> Developer
            </motion.h2>

            <motion.p
              className="text-text-muted-light dark:text-text-muted-dark text-lg leading-relaxed"
              variants={itemVariants}
            >
              I Taslima Khatun, a passionate creative specializing in
              crafting intuitive and dynamic user experiences. With over 1 years
              of industry experience, I bridge the gap between design and
              technology.
            </motion.p>

            <motion.p
              className="text-text-muted-light dark:text-text-muted-dark text-lg leading-relaxed"
              variants={itemVariants}
            >
              My journey started with a curiosity for how things work on the
              web, which led me to pursue a degree in Computer Science. Today, I
              help businesses transform their ideas into functional, beautiful
              digital products.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4"
              variants={itemVariants}
            >
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "tslima16123@gmail.com",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Sirajganj, Dhaka Bangladesh",
                },
                { icon: Calendar, label: "Experience", value: "0.5+ Years" },
                {
                  icon: Zap,
                  label: "Availability",
                  value: "Open for projects",
                  special: true,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="text-primary" size={16} />
                  </div>
                  <div>
                    <span className="block text-text-muted-light dark:text-gray-400 text-sm uppercase tracking-wide">
                      {item.label}
                    </span>
                    <span
                      className={`block font-medium text-lg ${
                        item.special
                          ? "text-primary flex items-center gap-2"
                          : "text-text-light dark:text-white"
                      }`}
                    >
                      {item.special && (
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      )}
                      {item.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="pt-6" variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-primary to-orange-500 hover:from-orange-500 hover:to-primary text-white font-medium py-3 px-8 rounded-lg shadow-lg shadow-orange-500/30 relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />

                  <span>
                    <a
                      className="relative z-10 flex items-center gap-2"
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
          </motion.div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          className="mb-24"
          variants={containerVariants}
          initial="hidden"
          animate={isSkillsInView ? "visible" : "hidden"}
        >
          <motion.h3
            className="text-2xl lg:text-3xl font-bold font-display text-text-light dark:text-white mb-10 text-center relative inline-block left-1/2 -translate-x-1/2"
            variants={itemVariants}
          >
            My <span className="text-primary">Skills</span>
            <motion.span
              className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.h3>

          <motion.div
            ref={skillsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 group relative overflow-hidden h-full">
                  {/* Animated background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    initial={{ scale: 0, rotate: 45 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  />

                  <CardHeader className="p-0 mb-6">
                    <motion.div
                      className="skill-icon w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-2xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500 relative"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <skill.icon size={24} />
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(253, 110, 10, 0)",
                            "0 0 0 15px rgba(253, 110, 10, 0.1)",
                            "0 0 0 0 rgba(253, 110, 10, 0)",
                          ],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: index * 0.5,
                        }}
                      />
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-text-light dark:text-white mb-3 group-hover:text-primary transition-colors">
                      {skill.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0">
                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm mb-6 leading-relaxed">
                      {skill.description}
                    </p>

                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden relative">
                      <motion.div
                        className="progress-bar bg-gradient-to-r from-primary to-orange-400 h-full rounded-full relative"
                        initial={{ width: "0%" }}
                        style={{ width: "0%" }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/30"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </motion.div>
                    </div>

                    <div className="flex justify-between mt-3 text-sm font-medium">
                      <span className="text-text-muted-light dark:text-gray-400">
                        Proficiency
                      </span>
                      <motion.span
                        className="text-primary font-bold"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1 + index * 0.2 }}
                      >
                        {skill.proficiency}%
                      </motion.span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Education & Experience Timeline */}
        <motion.div
          ref={timelineRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={isTimelineInView ? "visible" : "hidden"}
        >
          {/* Education */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold font-display text-text-light dark:text-white mb-8 flex items-center">
              <motion.span
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 text-lg border border-primary/20"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <GraduationCap size={20} />
              </motion.span>
              Education
            </h3>

            <div className="border-l-2 border-gray-200 dark:border-gray-800 ml-5 space-y-12 pb-2">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  className="timeline-item relative pl-8 md:pl-10 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-background-light dark:border-background-dark transition-all duration-300 ${
                      item.active
                        ? "bg-primary scale-125"
                        : "bg-gray-300 dark:bg-gray-600 group-hover:bg-primary group-hover:scale-125"
                    }`}
                    whileHover={{ scale: 1.5 }}
                  />

                  <motion.span
                    className={`inline-block py-1 px-3 rounded bg-surface-light dark:bg-surface-dark text-xs font-bold mb-2 border border-gray-200 dark:border-gray-700 shadow-sm ${
                      item.active
                        ? "text-primary"
                        : "text-text-muted-light dark:text-gray-400"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.period}
                  </motion.span>

                  <h4 className="text-lg font-bold text-text-light dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
                    <item.icon size={16} className="text-primary" />
                    {item.title}
                  </h4>

                  <p className="text-sm text-text-muted-light dark:text-gray-500 mb-2">
                    {item.institution}
                  </p>
                  <p className="text-text-muted-light dark:text-text-muted-dark text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold font-display text-text-light dark:text-white mb-8 flex items-center">
              <motion.span
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 text-lg border border-primary/20"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Briefcase size={20} />
              </motion.span>
              Experience
            </h3>

            <div className="border-l-2 border-gray-200 dark:border-gray-800 ml-5 space-y-12 pb-2">
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  className="timeline-item relative pl-8 md:pl-10 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-background-light dark:border-background-dark transition-all duration-300 ${
                      item.active
                        ? "bg-primary scale-125"
                        : "bg-gray-300 dark:bg-gray-600 group-hover:bg-primary group-hover:scale-125"
                    }`}
                    whileHover={{ scale: 1.5 }}
                  />

                  <motion.span
                    className={`inline-block py-1 px-3 rounded bg-surface-light dark:bg-surface-dark text-xs font-bold mb-2 border border-gray-200 dark:border-gray-700 shadow-sm ${
                      item.active
                        ? "text-primary"
                        : "text-text-muted-light dark:text-gray-400"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.period}
                  </motion.span>

                  <h4 className="text-lg font-bold text-text-light dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
                    <item.icon size={16} className="text-primary" />
                    {item.title}
                  </h4>

                  <p className="text-sm text-text-muted-light dark:text-gray-500 mb-2">
                    {item.company}
                  </p>
                  <p className="text-text-muted-light dark:text-text-muted-dark text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
