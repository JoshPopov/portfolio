import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import type { Photo } from "@shared/schema";

interface PhotoModalProps {
  photo: Photo | null;
  onClose: () => void;
}

export function PhotoModal({ photo, onClose }: PhotoModalProps) {
  useEffect(() => {
    if (photo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [photo]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md"
          onClick={onClose}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X size={24} />
          </button>

          <motion.div
            layoutId={`photo-${photo.id}`}
            className="relative w-fit h-fit max-w-[95vw] max-h-[95vh] overflow-hidden rounded-lg shadow-2xl flex items-center justify-center bg-neutral-950 transform-gpu"
            onClick={(e) => e.stopPropagation()}
            transition={{ 
              type: "tween",
              duration: 0.4,
              ease: [0.25, 1, 0.5, 1]
            }}
          >
            <div className="relative group">
              <img 
                src={photo.url} 
                alt={photo.title}
                className="block w-auto h-auto max-w-[95vw] max-h-[95vh] object-contain"
                style={{ willChange: "transform, opacity" }}
              />
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="absolute inset-x-0 bottom-0 p-6 md:p-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"
              >
                <div className="transform translate-y-1">
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-2 font-display tracking-tight">{photo.title}</h3>
                  {photo.description && (
                    <p className="text-white/70 font-light text-sm md:text-lg max-w-2xl">{photo.description}</p>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
