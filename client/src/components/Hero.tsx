import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div
      ref={ref}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image Parallax */}
      <motion.div
        style={{ y, scale, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-10" />
        {/* Using a high-res Unsplash image for the hero */}
        <img
          src="/images/hero-bg.jpg"
          alt="Hero background mountain landscape"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Text Content */}
      <div className="relative z-20 text-left md:text-center px-6 md:px-4 w-full md:max-w-4xl mx-auto h-full flex flex-col items-start md:items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 w-full flex flex-col items-start md:items-center"
        >
          <h1 className="font-display font-medium leading-[1.15] text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] md:mx-auto w-fit text-[clamp(1.1rem,5vw,1.3rem)] sm:text-[clamp(1.5rem,5vw,2.5rem)] md:text-3xl lg:text-4xl">
            {/* Mobile: 3-line balanced layout with shortened quote */}
            <div className="md:hidden flex flex-col items-start gap-4">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="block opacity-90"
              >
                The people who are crazy enough to
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="block"
              >
                <span className="italic underline decoration-white/30 underline-offset-8">think</span>&nbsp; they can change the world,
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 1 }}
                className="block font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40"
              >
                are the ones who do.
              </motion.span>
            </div>

            {/* Desktop: Original clean 2-line layout with effects */}
            <div className="hidden md:block">
              <span className="block mb-1 whitespace-nowrap">
                Because the people who are crazy enough to <span className="italic underline decoration-white/30 underline-offset-8">think</span>&nbsp; they
              </span>
              <span className="block whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40 pb-2 -mb-2">
                can change the world, are the ones who do.
              </span>
            </div>
          </h1>
          <p className="text-sm font-display font-medium text-white/90 tracking-wide drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
            — Steve Jobs
          </p>
        </motion.div>
      </div>

      {/* Credit Text at bottom - replacing scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 w-full"
      >
        <p className="text-[10px] text-white/30 font-light tracking-[0.4em] uppercase">
          designed by josh popov
        </p>
      </motion.div>
    </div>
  );
}
