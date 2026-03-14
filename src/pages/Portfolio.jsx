import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  ExternalLink,
  ArrowRight,
  Filter,
  Sparkles,
  Eye,
  Heart,
  Share2,
} from "lucide-react";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [likedProjects, setLikedProjects] = useState(new Set());

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const filterRef = useRef(null);
  const gridRef = useRef(null);
  const projectRefs = useRef([]);
  const particlesRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const filters = [
    "All",
    "MERN Web Developer",
    "Web Design",
    "App Design",
    "Graphic Design",
  ];

  const projects = [
    {
      id: 1,
      title: "AirCalling Landing Page",
      category: "Web Design",
      description:
        "A modern landing page designed for a SaaS communication platform focusing on clarity and conversion.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuARPT-y0baScX61wr0_xF5Tn642ysKhPUZp97muKmS1r0q-J1uznGF0kDpBiCcYQMeNHy8408F1A7kogKkTXBBGp78Fk74QsEy0MpRHz3ZYilYZUh_lhxmnyuzwz-xDArjjk14nCBACwUYQQGwSutO1i2FKeX5jGshVJSkRloSlbx2YWmmjoQhRiXwGibPaKObNduhw04BLr1_m5dEC20Fcr5S6p_PE6XxAzjYJO9OVXyb21NEjdsMjAa6AuTv72nxTU62ipmUPZilN",
      tags: ["React", "Tailwind", "Framer Motion"],
      views: 1250,
      likes: 89,
    },
    {
      id: 2,
      title: "Business Finance App",
      category: "App Design",
      description:
        "Comprehensive mobile application UI kit for finance management with dark mode support.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD1COj9QIiRAt3wneo5D-K8y6_s2tP7aA7vWZdSHjDOnBsjFPpAIsdUI4kTEEE3w_b2PEdOMRjg3RsRBHyJW72-KkEECKhw1N7hqSQV7OWwtVb9J5NTSFE8zdA8I0HCMjhAuz1J7fif2EkoY9fKdc0WIotTAQOVjPDrDP8rLS8mEiA2KGjJMBwKHdLrHl9nI0I2Dj7rTA7q0KRJ1UAGBgEAnudHaLu6ebXrHJZinduKOGqE1XGaJoCWGCC1LqVcwq96h1aDkgdOAD2E",
      tags: ["Figma", "Mobile UI", "Dark Mode"],
      views: 2100,
      likes: 156,
    },
    {
      id: 3,
      title: "E-com Analytics Dashboard",
      category: "Content Creator",
      description:
        "A data-rich dashboard design for e-commerce store owners to track sales and inventory.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD8mOYiI0j0XyaF3qbuhwicG6GnpMU6Xaf_m6tvWGSbkMjpxytLmBozKdCKWwu_G97wr6HToN46L0R7lhYHPRvUBikrAj925z5JumruFtabbmn2UdOY0tpkz2WmhAeb_b_lqTJXyDrXHtFY4HDG43lP0QxZWJ3lf0TXZkZBxYU-nnQSPm_M6wCA9nSfaidR9HLjgQ3uLFthnITP5KWHSj19PtXCN6v0RoQbN6Gdg6a7h5Q1D42RAWEuvSZg_u_uo2MTzLt32b3sWp-F",
      tags: ["Dashboard", "Analytics", "Charts"],
      views: 1800,
      likes: 134,
    },
    {
      id: 4,
      title: "Food Delivery Website",
      category: "Web Design",
      description:
        "Redesigned the user experience for a local food delivery service resulting in 20% more orders.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBbwbOVrL__UbP1vzyO2vW4QwBAAgd5xu4ccG2761mPWWM7quZeIKPLlfB4DucaDh3he2CZq4rYah4Yk3s85cAg7opB9vA5yjQ9ZU6vQSuGWoU3Za4poMI8Zm3f-mKPA0I1_MBoH2l1tUML26GgspLHU5cOKuJ0QsmZVwG7A2pJi_Y8TPM_8shIBr7iXXshBEw1gk2ih9VturTwL_jCL3-8XsQ7oyhcC38hRirbXAVVO-d0KgfSR3CUVNRDPnOxk2faSBwCI3rrbgAN",
      tags: ["UX Research", "Conversion", "Mobile"],
      views: 950,
      likes: 67,
    },
    {
      id: 5,
      title: "NeoBrand Identity",
      category: "Graphic Design",
      description:
        "Complete corporate identity package including logo, stationery, and brand guidelines.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDeXrhNhHTEg2ZvsF49efhNOoY3oyRuMcj8XQm3auKpgGtXmzuXJvfecpQ9ETZywVFmLezYgJA5Oxs4B2HdPxaUWtdWdeafxf38BlFqqSVzeK-c_3S9OGTCBg6N2t5_rACTL_Ue-NBbV7QuzzUzAkQ-9Jd6ZgxEPoepcYLtfIttJMPqS3KhPiltnooHNYT98nSNHB4RuyOO5QzufoaISn4Qe6qhTi--EiOsoEUPvaAWuzFkhxnMOYzGJ8L6Quf_VzEiyu1offvmvI_m",
      tags: ["Branding", "Logo Design", "Print"],
      views: 1400,
      likes: 98,
    },
    {
      id: 6,
      title: "Task Management Tool",
      category: "Web Design",
      description:
        "Interactive prototype for a team collaboration and task management web application.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD-dr4RTfnv0Rc2zPpygTuyrWiQCkzKmGdkT7yIH9ExGpVUfuBUquPskVcYSGyzWnWMVCSTNJSgzwBpfOglMeMCmbdEpFLx7i07zKH3wzIN9v0OvTgibXBDhcVt9pJfSQeIQh8zSRFdZULuGBzaPrp6IR_qTYx1uN6BcSKbhPdXAOZEq8TFPfumBrJyDMyJwkVStIfhdi6XFenQmFeqkUEV6yDaY1P_nbqKZNwvrSSkf3ixqzIqQRLujtsw_Ijp2InASmwOXnIg-5ti",
      tags: ["Collaboration", "Productivity", "SaaS"],
      views: 1650,
      likes: 112,
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  useEffect(() => {
    if (isInView) {
      const tl = gsap.timeline();

      // Create floating particles
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.className = "absolute w-1 h-1 bg-primary/30 rounded-full";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        particlesRef.current?.appendChild(particle);

        gsap.to(particle, {
          y: -150,
          x: Math.random() * 100 - 50,
          opacity: 0,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          delay: Math.random() * 2,
          ease: "power2.out",
        });
      }

      // Animate header
      tl.fromTo(
        headerRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      // Animate filters
      tl.fromTo(
        filterRef.current?.children,
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );

      // Animate project grid
      tl.fromTo(
        projectRefs.current,
        { y: 100, opacity: 0, rotationX: -20 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }
  }, [isInView]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);

    // Animate filter change
    gsap.to(gridRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        gsap.to(gridRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });
  };

  const handleLike = (projectId) => {
    const newLiked = new Set(likedProjects);
    if (newLiked.has(projectId)) {
      newLiked.delete(projectId);
    } else {
      newLiked.add(projectId);
    }
    setLikedProjects(newLiked);
  };

  return (
    <div
      ref={containerRef}
      className="pt-20 px-4 md:px-12 lg:px-24 pb-20 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      />

      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Header */}
      <motion.div
        ref={headerRef}
        className="text-center mb-16"
        initial={{ opacity: 0, y: 80 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          My{" "}
          <span className="text-primary relative">
            Portfolio
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={20} className="text-primary opacity-60" />
            </motion.div>
          </span>
        </motion.h1>
        <motion.p
          className="text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Explore my latest projects showcasing my expertise in MERN Stack Developer,
          web development, and branding. Each project reflects my passion for
          creating intuitive and beautiful digital experiences.
        </motion.p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        ref={filterRef}
        className="flex flex-wrap justify-center gap-3 mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {filters.map((filter, index) => (
          <motion.div
            key={filter}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => handleFilterChange(filter)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-primary to-orange-500 text-white shadow-lg shadow-primary/25"
                  : "bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary dark:hover:text-primary"
              }`}
            >
              <motion.div
                className="absolute inset-0 bg-primary/10"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Filter size={16} />
                {filter}
              </span>
              {activeFilter === filter && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  layoutId="activeFilter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        layout
      >
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              layout
              initial={{ opacity: 0, y: 100, rotationX: -20 }}
              animate={{ opacity: 1, y: 0, rotationX: 0 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, rotateY: 5 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              <Card className="group bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border border-gray-100 dark:border-gray-800 relative">
                {/* Project Image */}
                <div className="relative overflow-hidden h-64">
                  <motion.img
                    alt={project.title}
                    className="w-full h-full object-cover"
                    src={project.image}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Action Buttons */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4">
                      <motion.button
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors"
                        initial={{ scale: 0, rotate: -180 }}
                        whileHover={{ scale: 1, rotate: 0 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ExternalLink size={20} />
                      </motion.button>

                      <motion.button
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors"
                        initial={{ scale: 0, rotate: 180 }}
                        whileHover={{ scale: 1, rotate: 0 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <Eye size={20} />
                      </motion.button>
                    </div>

                    {/* Stats */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <motion.div
                        className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs flex items-center gap-1"
                        initial={{ opacity: 0, x: 20 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Eye size={12} />
                        {project.views}
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Category Badge */}
                  <motion.div
                    className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {project.category}
                  </motion.div>
                </div>

                {/* Project Content */}
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <motion.button
                      className={`p-2 rounded-full transition-colors ${
                        likedProjects.has(project.id)
                          ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                          : "text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      }`}
                      onClick={() => handleLike(project.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart
                        size={18}
                        fill={
                          likedProjects.has(project.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </motion.button>
                  </div>

                  <CardDescription className="text-text-muted-light dark:text-text-muted-dark text-sm mb-4 line-clamp-2">
                    {project.description}
                  </CardDescription>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1 + tagIndex * 0.05,
                        }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "#FD6E0A",
                          color: "white",
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex items-center justify-between">
                    <motion.a
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-orange-600 transition-colors group"
                      href="#"
                      whileHover={{ x: 5 }}
                    >
                      View Details
                      <ArrowRight
                        className="ml-1 group-hover:translate-x-1 transition-transform"
                        size={16}
                      />
                    </motion.a>

                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Heart size={14} />
                        {project.likes +
                          (likedProjects.has(project.id) ? 1 : 0)}
                      </span>
                      <motion.button
                        className="hover:text-primary transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Share2 size={14} />
                      </motion.button>
                    </div>
                  </div>
                </CardContent>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  animate={
                    hoveredProject === project.id
                      ? { opacity: 1 }
                      : { opacity: 0 }
                  }
                />
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load More Button */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-gradient-to-r from-primary to-orange-500 hover:from-orange-500 hover:to-primary text-white font-medium py-4 px-12 rounded-full shadow-lg hover:shadow-orange-500/25 transition-all duration-300 relative overflow-hidden group">
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Load More Projects
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={18} />
              </motion.div>
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Portfolio;
