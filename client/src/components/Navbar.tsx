import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Camera, Home, Info, Mail } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function Navbar() {
  const [active, setActive] = useState("home");
  const [isScrollingTo, setIsScrollingTo] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const { scrollY } = useScroll();

  const navItems = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "work", label: "Work", href: "#work" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isScrollingTo) return;
    
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Check if we're at the bottom of the page
    if (latest + windowHeight >= documentHeight - 50) {
      setActive("contact");
      return;
    }

    const sections = navItems.map(item => {
      const el = document.querySelector(item.href);
      if (!el) return { id: item.id, top: 0 };
      const rect = el.getBoundingClientRect();
      return { id: item.id, top: rect.top + window.scrollY };
    });

    const currentSection = sections.reduce((prev, curr) => {
      if (latest >= curr.top - 150) return curr;
      return prev;
    }, sections[0]);

    if (currentSection && currentSection.id !== active) {
      setActive(currentSection.id);
    }
  });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      // Cancel any ongoing animation
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      
      setActive(id);
      setIsScrollingTo(true);
      
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        // Mobile: chase-style animation that handles layout shifts
        const getTargetPosition = () => element.getBoundingClientRect().top + window.scrollY;
        const duration = 800;
        let startTime: number | null = null;

        const step = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;
          
          const targetPosition = getTargetPosition();
          const currentPosition = window.scrollY;
          const remainingDistance = targetPosition - currentPosition;
          const moveAmount = remainingDistance * 0.12;
          
          window.scrollTo(0, currentPosition + moveAmount);
          
          if (Math.abs(remainingDistance) > 2 && progress < duration) {
            animationFrameRef.current = window.requestAnimationFrame(step);
          } else {
            window.scrollTo(0, targetPosition);
            animationFrameRef.current = null;
            setTimeout(() => setIsScrollingTo(false), 50);
          }
        };
        animationFrameRef.current = window.requestAnimationFrame(step);
      } else {
        // Desktop: smooth easing animation
        const targetPosition = element.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1500;
        let startTime: number | null = null;

        const step = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;
          const percentage = Math.min(progress / duration, 1);
          
          const t = percentage;
          const easing = t < 0.5 
            ? 8 * t * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 4) / 2;
          
          window.scrollTo(0, startPosition + distance * easing);
          
          if (progress < duration) {
            animationFrameRef.current = window.requestAnimationFrame(step);
          } else {
            animationFrameRef.current = null;
            setTimeout(() => setIsScrollingTo(false), 50);
          }
        };
        animationFrameRef.current = window.requestAnimationFrame(step);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-[50] w-full max-w-md px-4">
      <motion.nav 
        initial={{ y: -20, opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ 
          duration: 1.5, 
          ease: [0.16, 1, 0.3, 1], 
          delay: 0.1
        }}
        className="
          flex items-center justify-between
          px-2 py-2 rounded-full
          bg-black/70 md:bg-black/30 backdrop-blur-md md:backdrop-blur-3xl
          border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        "
      >
        <div className="flex w-full justify-between items-center relative">
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href={item.href}
              className="relative flex-1 flex flex-col items-center justify-center py-2 px-4 group cursor-pointer"
              onClick={(e) => handleClick(e, item.href, item.id)}
            >
              <AnimatePresence mode="popLayout">
                {active === item.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ 
                      type: "spring", 
                      stiffness: 150,
                      damping: 25,
                      mass: 0.5
                    }}
                  />
                )}
              </AnimatePresence>
              <span className={`
                relative z-10 text-xs font-medium tracking-wide transition-colors duration-200
                ${active === item.id ? "text-white" : "text-white/50 group-hover:text-white/80"}
              `}>
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </motion.nav>
    </div>
  );
}
