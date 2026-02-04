import { motion } from "framer-motion";
import { type Photo } from "@shared/schema";
import { useState } from "react";

interface PhotoCardProps {
  photo: Photo;
  index: number;
}

export function PhotoCard({ photo, index }: PhotoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1], // Apple-like ease
          delay: index * 0.1 
        } 
      }}
      viewport={{ once: true, margin: "-10%" }}
      className="group relative h-[400px] min-w-[300px] md:h-[500px] md:min-w-[400px] lg:h-[600px] lg:min-w-[500px] shrink-0 snap-center overflow-hidden rounded-md bg-white/5"
    >
      <div className={`absolute inset-0 bg-white/5 transition-opacity duration-700 ${isLoaded ? 'opacity-0' : 'opacity-100'}`} />
      
      <motion.img
        src={photo.url}
        alt={photo.title}
        className={`h-full w-full object-cover transition-all duration-700 will-change-transform ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="absolute bottom-0 left-0 w-full translate-y-4 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="font-serif text-2xl italic text-white">{photo.title}</p>
        {photo.description && (
          <p className="mt-2 text-sm text-white/70 line-clamp-2">{photo.description}</p>
        )}
      </div>
    </motion.div>
  );
}
