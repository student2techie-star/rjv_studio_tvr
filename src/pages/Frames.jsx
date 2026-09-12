// src/pages/Frames.jsx
import React from "react";
import { motion } from "framer-motion";
import { Upload, Sparkles, Clock, ShieldCheck } from "lucide-react";
import Seo from "../components/common/Seo";
import Container from "../components/common/Container";
import ImageUploader from "../components/frames/ImageUploader";
import { useScrollReveal, staggerContainer, staggerItem } from "../hooks/useScrollReveal";

// Replace this YouTube video ID with RJV Studio's actual reference video ID
const YOUTUBE_VIDEO_ID = "dQw4w9WgXcQ";

const HOW_IT_WORKS = [
  {
    icon: Upload,
    step: "01",
    title: "Upload your photo",
    body: "Select any high-resolution photo from your device and upload it securely to our studio.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "Our frames work for you",
    body: "We hand-pick the perfect frame style that complements your photo — portrait, landscape or square.",
  },
  {
    icon: Clock,
    step: "03",
    title: "Fast WhatsApp Delivery",
    body: "Receive your framed preview and options directly on WhatsApp within hours.",
  },
];

export default function Frames() {
  const reveal = useScrollReveal({ y: 16 });

  return (
    <>
      <Seo
        title="Custom Photo Frames & Printing Shop in Thiruvarur"
        description="Upload your photos and order custom handcrafted photo frames from RJV Studios Thiruvarur. High quality printing, 3D border frames & fast delivery."
        path="/frames"
      />

      {/* Hero banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-900 via-brand-950 to-brand-900 text-white pt-20 pb-16 lg:pt-28 lg:pb-20 text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <ellipse key={a} cx="100" cy="100" rx="120" ry="34" fill="currentColor" transform={`rotate(${a} 100 100)`} />
            ))}
          </svg>
        </div>
        <Container className="relative">
          <motion.div {...reveal}>
            <p className="eyebrow text-brand-300 mb-4">Client utility · Private</p>
            <h1 className="text-section !text-white">Our frames, your memories</h1>
            <p className="text-body !text-brand-100/90 mt-5 max-w-lg mx-auto">
              Upload your photo and let RJV Studios frame it beautifully — no queues, no hassle, delivered straight to your WhatsApp.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Upload Section with Video Above */}
      <section className="py-12 lg:py-16 bg-brand-50">
        <Container className="max-w-5xl">

          {/* Reference Video with Desktop Side-by-Side Trust Sentences */}
          <motion.div {...useScrollReveal({ delay: 0.05 })} className="mb-12">
            <p className="eyebrow mb-2 text-center lg:text-left">Reference Video</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-900 text-center lg:text-left mb-6 sm:mb-8">
              See how our frame works for you
            </h2>

            <div className="grid gap-8 items-center lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left Column: Trust-building sentences (Desktop/Laptop layout) */}
              <div className="space-y-4 order-2 lg:order-1">
                <div className="card-soft p-4 sm:p-5 border-3d bg-white flex items-start gap-3.5 sm:gap-4">
                  <div className="h-10 px-2.5 shrink-0 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center font-bold text-xs tracking-tight shadow-inner mt-0.5">
                    1000+
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-brand-900 text-sm sm:text-base leading-tight">1,000+ Frames Hand-Crafted</h3>
                    <p className="text-xs sm:text-sm text-brand-600 leading-relaxed mt-1">
                      Trusted by hundreds of families across Thiruvarur &amp; Tamil Nadu for premium photo framing with vibrant print quality.
                    </p>
                  </div>
                </div>

                <div className="card-soft p-4 sm:p-5 border-3d bg-white flex items-start gap-3.5 sm:gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center mt-0.5">
                    <Sparkles size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-brand-900 text-sm sm:text-base leading-tight">Expert Style Matching</h3>
                    <p className="text-xs sm:text-sm text-brand-600 leading-relaxed mt-1">
                      Our framers personally evaluate your uploaded photo's mood and color palette to recommend the perfect border &amp; finish.
                    </p>
                  </div>
                </div>

                <div className="card-soft p-4 sm:p-5 border-3d bg-white flex items-start gap-3.5 sm:gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mt-0.5">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-brand-900 text-sm sm:text-base leading-tight">100% Private &amp; Secure</h3>
                    <p className="text-xs sm:text-sm text-brand-600 leading-relaxed mt-1">
                      Your photo goes straight to our studio team for framing — no public uploads, complete data privacy guaranteed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Video player inside iPhone Mockup */}
              <div className="order-1 lg:order-2 flex justify-center w-full">
                <div className="relative mx-auto w-[270px] sm:w-[300px] aspect-[9/18.5] bg-slate-950 rounded-[46px] p-2.5 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.4),0_0_0_1px_rgba(255,255,255,0.1)] border-[4px] border-slate-800 ring-1 ring-slate-950 transition-transform duration-300 hover:scale-[1.01]">
                  {/* Speaker Bar */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-slate-800 rounded-full z-30 pointer-events-none" />

                  {/* Dynamic Island Notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-22 h-4.5 bg-black rounded-full z-30 flex items-center justify-between px-2.5 pointer-events-none shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                    <div className="w-2 h-2 rounded-full bg-slate-950 ring-1 ring-blue-900/60" />
                  </div>

                  {/* Screen Content */}
                  <div className="relative w-full h-full rounded-[36px] overflow-hidden bg-black flex items-center justify-center">
                    <video
                      src={`${import.meta.env.BASE_URL}videos/frame_video.mp4`}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover"
                      aria-label="RJV Studio frame showcase video"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 backdrop-blur-sm rounded-full z-30 pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Uploader */}
          <motion.div {...useScrollReveal({ delay: 0.08 })}>
            <ImageUploader />
          </motion.div>

          {/* Text below upload */}
          <motion.div
            {...useScrollReveal({ delay: 0.12 })}
            className="mt-10 rounded-3xl bg-white border border-brand-100 p-8 text-center shadow-sm"
          >
            <span className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-brand-100 text-brand-600 mx-auto mb-4">
              <Sparkles size={26} />
            </span>
            <h2 className="text-xl font-bold text-brand-900 mb-2">
              Our frames work for you
            </h2>
            <p className="text-body max-w-md mx-auto text-brand-600">
              Once you upload your image, our team personally selects the best frame style for your photo and delivers it right to your WhatsApp — simple, private, and beautiful.
            </p>
          </motion.div>

          {/* How it works steps */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10 grid gap-5 sm:grid-cols-3"
          >
            {HOW_IT_WORKS.map((item) => (
              <motion.div
                key={item.step}
                variants={staggerItem}
                className="card-soft p-6 text-center"
              >
                <span className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-brand-100 text-brand-700 mx-auto mb-3">
                  <item.icon size={20} />
                </span>
                <p className="text-xs font-bold tracking-widest text-brand-400 mb-1">STEP {item.step}</p>
                <h3 className="font-semibold text-brand-900 mb-2">{item.title}</h3>
                <p className="text-caption">{item.body}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Privacy note */}
          <motion.div
            {...useScrollReveal({ delay: 0.1 })}
            className="mt-8 flex items-center gap-3 rounded-2xl bg-green-50 border border-green-200 px-5 py-4"
          >
            <ShieldCheck size={22} className="text-green-600 shrink-0" />
            <p className="text-sm text-green-800">
              <strong>Private &amp; secure</strong> — your photo goes straight to the studio. No public gallery, no third-party uploads.
            </p>
          </motion.div>

        </Container>
      </section>
    </>
  );
}