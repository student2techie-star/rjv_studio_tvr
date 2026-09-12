// src/pages/Frames.jsx
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Clock, Film } from "lucide-react";
import Seo from "../components/common/Seo";
import Container from "../components/common/Container";
import ImageUploader from "../components/frames/ImageUploader";
import { useScrollReveal } from "../hooks/useScrollReveal";

const NOTES = [
  {
    icon: ShieldCheck,
    title: "Private & secure",
    body: "Your photo goes straight to the studio. No public gallery, no third-party uploads.",
  },
  {
    icon: Lock,
    title: "Only the studio sees it",
    body: "We validate the file type and size before accepting it — your image stays yours.",
  },
  {
    icon: Clock,
    title: "Quick turnaround",
    body: "Send your frame and we'll work on it — edited frames come back on WhatsApp.",
  },
];

export default function Frames() {
  const reveal = useScrollReveal({ y: 16 });

  return (
    <>
      <Seo
        title="Send Your Frame"
        description="Private client upload — send your photograph in high quality to RJV Studios for framing and editing."
        path="/frames"
      />

      {/* Client-utility banner */}
      <section className="relative overflow-hidden bg-brand-900 pt-20 pb-14 lg:pt-28 lg:pb-20 text-center">
        <div className="absolute inset-0 opacity-20">
          <svg className="absolute -top-20 -right-20 w-[400px] h-[400px] text-brand-300" viewBox="0 0 200 200" aria-hidden="true">
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <ellipse key={a} cx="100" cy="100" rx="120" ry="34" fill="currentColor" transform={`rotate(${a} 100 100)`} />
            ))}
          </svg>
        </div>
        <Container className="relative">
          <motion.div {...reveal}>
            <p className="eyebrow text-brand-300 mb-4">Client utility · Private</p>
            <h1 className="text-section !text-white">Send your frame</h1>
            <p className="text-body !text-brand-100/90 mt-5 max-w-lg mx-auto">
              Upload your photograph in high quality. We'll frame, edit and send
              it back to you — no lines, no hassle.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Uploader */}
      <section className="py-14 lg:py-20 bg-brand-50 min-h-[50vh]">
          <div className="video-above-wrap">
            <video
              className="w-full h-48 object-cover rounded-2xl bg-brand-900"
              src={`${import.meta.env.BASE_URL}videos/frames-demo.mp4`}
              playsInline
              muted
              preload="metadata"
            />
            <p className="text-caption text-center mt-2">Reference video — replace with your final clip</p>
          </div>
        <Container className="max-w-3xl">
          <ImageUploader />

          <div className="mt-10 rounded-3xl border border-brand-100 bg-white p-6 sm:p-8 shadow-soft">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600">
                <Film size={20} />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-brand-900">Reference video</h2>
                <p className="text-caption mt-0.5">
                  A short demo clip. Replace <code className="rounded bg-brand-100 px-1.5 py-0.5 text-xs text-brand-700">public/videos/frames-demo.mp4</code> with your final video.
                </p>
              </div>
            </div>
            <video
              className="aspect-video w-full rounded-2xl bg-brand-900 object-cover"
              src={`${import.meta.env.BASE_URL}videos/frames-demo.mp4`}
              controls
              playsInline
              preload="metadata"
              title="Dummy video placeholder"
            />
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {NOTES.map((n) => (
              <div key={n.title} className="card-soft p-6 text-center">
                <span className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full bg-brand-100 text-brand-700">
                  <n.icon size={22} />
                </span>
                <h3 className="font-semibold text-brand-900">{n.title}</h3>
                <p className="text-caption mt-2">{n.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}