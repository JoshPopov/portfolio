import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PhotoGrid } from "@/components/PhotoGrid";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [isPhotoActive, setIsPhotoActive] = useState(false);

  return (
    <div className="bg-background min-h-screen selection:bg-white/20">
      <AnimatePresence>
        {!isPhotoActive && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-x-0 top-0 z-[50]"
          >
            <Navbar />
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="relative">
        <section id="home">
          <Hero />
        </section>
        
        <section id="about" className="relative z-10 bg-background py-32 px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-4">
              <h2 className="text-sm font-medium text-white/40 uppercase tracking-[0.3em]">About</h2>
              <p className="text-4xl md:text-5xl font-display font-light text-white leading-tight">
                Creating visual experiences.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 text-white/60 leading-relaxed">
              <p>
                Based in Toronto, I create unparalleled photography, film, and technology, defined by simplicity and intention.
              </p>
              <p>
                I deeply explore the space where modern technology meets the natural world; Where technology seamlessly blends with your environment instead of creating distractions from it. I believe every piece of technology should feel wonderful to use.
              </p>
            </div>
          </div>
        </section>

        <div id="work" className="relative z-10 bg-background pt-20">
          <div className="text-center py-12">
            <h2 className="text-sm font-medium text-white/40 uppercase tracking-[0.3em]">Selected Work</h2>
          </div>
          
          <PhotoGrid onPhotoSelect={(photo) => setIsPhotoActive(!!photo)} />
        </div>
      </main>

      <AnimatePresence>
        {!isPhotoActive && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
