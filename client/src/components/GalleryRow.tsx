import { motion } from "framer-motion";
import { Photo } from "@shared/schema";
import { PhotoCard } from "./PhotoCard";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";

interface GalleryRowProps {
  category: string;
  photos: Photo[];
  index: number;
}

export function GalleryRow({ category, photos, index }: GalleryRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  if (photos.length === 0) return null;

  return (
    <section className="relative py-16 md:py-24 border-b border-white/5 last:border-0">
      <div className="container mx-auto px-6 mb-8 flex items-end justify-between">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium uppercase tracking-widest text-white/40">Collection 0{index + 1}</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-light text-white">{category}</h2>
          </motion.div>
        </div>
        
        <button 
          onClick={scrollRight}
          className="hidden md:flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors group"
        >
          Scroll 
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-6 pb-8 pt-4 snap-x snap-mandatory no-scrollbar"
        style={{ scrollPaddingLeft: "1.5rem", scrollPaddingRight: "1.5rem" }}
      >
        {photos.map((photo, i) => (
          <PhotoCard key={photo.id} photo={photo} index={i} />
        ))}
        {/* Spacer for end of list padding */}
        <div className="w-1 shrink-0" />
      </div>
    </section>
  );
}
