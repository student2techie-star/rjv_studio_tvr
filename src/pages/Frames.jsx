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
    title: "Receive it on WhatsApp",
    body: "Your beautifully framed photo is sent back to you directly — quick, private, and hassle-free.",
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-900 pt-20 pb-14 lg:pt-28 lg:pb-20 text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="absolute -top-20 -right-20 w-[400px] h-[400px] text-brand-300" viewBox="0 0 200 200" aria-hidden="true">
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

      {/* Frame Video Showcase */}
      <section className="py-12 bg-white border-b border-brand-100">
        <Container className="max-w-3xl">
          <motion.div {...useScrollReveal({ delay: 0.05 })}>
            <p className="eyebrow mb-3 text-center">See how it works</p>
            <h2 className="text-section text-center mb-8">Watch our frame showcase</h2>
            <div className="rounded-3xl overflow-hidden shadow-xl border border-brand-100 aspect-video bg-black">
              <video
                src={`${import.meta.env.BASE_URL}videos/frame_video.mp4`}
                controls
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                aria-label="RJV Studio frame video"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Upload Section */}
      <section className="py-14 lg:py-20 bg-brand-50">
        <Container className="max-w-3xl">

          {/* Uploader */}
          <motion.div {...useScrollReveal({ delay: 0.05 })}>
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