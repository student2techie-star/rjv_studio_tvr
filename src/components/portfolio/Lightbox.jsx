// src/components/portfolio/Lightbox.jsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ items, index, onIndexChange, onClose }) {
  const total = items.length;
  const hasPrev = total > 1;
  const hasNext = total > 1;

  const prev = () => hasPrev && onIndexChange((index - 1 + total) % total);
  const next = () => hasNext && onIndexChange((index + 1) % total);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total, onClose]);

  const item = items[index];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-50/95 backdrop-blur-md p-4 sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        role="dialog"
        aria-modal="true"
        aria-label={item?.title}
        onClick={onClose}
      >
        {/* Close */}
        <button
          type="button"
          className="absolute top-5 right-5 grid place-items-center w-11 h-11 rounded-full bg-white border border-brand-200 text-brand-800 shadow-lg transition-colors hover:bg-brand-100"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <X size={22} />
        </button>

        <motion.div
          className="flex flex-col items-center max-w-4xl w-full"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.96, y: 12 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 12, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Drag to swipe on touch / horizontal */}
          <motion.div
            className="relative w-full overflow-hidden rounded-2xl bg-white shadow-2xl shadow-brand-900/15"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) next();
              if (info.offset.x > 80) prev();
            }}
          >
            <img
              key={item.id}
              src={item.image}
              alt={item.alt}
              className="max-h-[74vh] w-full object-contain"
              width={1280}
              height={960}
            />
          </motion.div>

          {/* Caption */}
          <div className="mt-4 text-center">
            <p className="text-xl font-semibold text-brand-900">{item.title}</p>
            <p className="mt-1 text-caption uppercase tracking-widest">
              {item.category.replace("-", " ")}
            </p>
          </div>
        </motion.div>

        {/* Prev / Next */}
        {hasPrev && (
          <button
            type="button"
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-full bg-white border border-brand-200 text-brand-800 shadow-lg transition-colors hover:bg-brand-100"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        {hasNext && (
          <button
            type="button"
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-full bg-white border border-brand-200 text-brand-800 shadow-lg transition-colors hover:bg-brand-100"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}