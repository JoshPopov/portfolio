import { motion } from "framer-motion";
import { usePhotos } from "@/hooks/use-photos";
import { useState } from "react";
import { PhotoModal } from "./PhotoModal";
import type { Photo } from "@shared/schema";

export function PhotoGrid({ onPhotoSelect }: { onPhotoSelect?: (photo: Photo | null) => void }) {
  const { data: photos, isLoading } = usePhotos();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handlePhotoClick = (photo: Photo | null) => {
    setSelectedPhoto(photo);
    if (onPhotoSelect) {
      onPhotoSelect(photo);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-16 h-1 bg-white/20 overflow-hidden rounded-full">
          <motion.div 
            className="h-full bg-white w-full"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </div>
      </div>
    );
  }

  if (!photos?.length) return null;

  return (
    <>
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12">
          {photos.map((photo, index) => (
            <PhotoItem 
              key={photo.id} 
              photo={photo} 
              index={index} 
              onClick={() => handlePhotoClick(photo)}
            />
          ))}
        </div>
      </div>

      <PhotoModal 
        photo={selectedPhoto} 
        onClose={() => handlePhotoClick(null)} 
      />
    </>
  );
}

function PhotoItem({ photo, index, onClick }: { photo: Photo; index: number; onClick: () => void }) {
  return (
    <div 
      className="break-inside-avoid mb-12 group cursor-zoom-in"
      onClick={onClick}
      style={{ contentVisibility: 'auto' }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900 border border-white/5 p-3 transition-transform duration-300 hover:scale-[1.01]">
        <motion.div 
          layoutId={`photo-${photo.id}`}
          transition={{
            type: "tween",
            duration: 0.4,
            ease: [0.25, 1, 0.5, 1]
          }}
          className="relative z-0 rounded-xl overflow-hidden"
        >
          <img
            src={photo.url}
            alt={photo.title}
            loading="lazy"
            decoding="async"
            className="w-full h-auto"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none rounded-2xl">
          <div>
            <p className="text-white font-medium text-lg tracking-tight">{photo.title}</p>
            <p className="text-white/50 text-xs mt-1 uppercase tracking-widest">{photo.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
